import { PowerUp } from "./components/powerup.js";
import { Shark } from "./components/shark.js";
import { Obstacle } from "./components/obstacle.js";
import { WelcomeScene } from "./welcome.js";
import { HowToPlayScene } from "./howtoplay.js";
import { PlayerFish } from "./components/fish.js";
import { GameUI } from "./components/gameui.js";

class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
    this.constants = {
      BOOST_AMOUNT: 50,
      SHRINK_FACTOR: 0.9,
      GROW_FACTOR: 1.1,
      MIN_SIZE: 20,
      SHARK_SPAWN_INTERVAL: 300, // ms
      POWERUP_SPAWN_INTERVAL: 4000, // ms
      POWERUP_LIFETIME: 3500, // ms
      CLOUD_LIFETIME: 500, // ms
      OBSTACLE_SPAWN_INTERVAL: 6000, // ms
      ENEMY_SPEED: 200, // ms
      CHARACTER_SPEED: 200, // ms
    };
  }

  preload() {
    this.load.image("fish", "assets/fish.png");
    this.load.image("background", "assets/background.png");
    this.load.image("obstacle", "assets/obstacle.png");
    this.load.image("powerUp", "assets/powerup.png");
    this.load.image("cloud", "assets/cloud.png");
    this.load.spritesheet("shark", "assets/shark.png", {
      frameWidth: 64,
      frameHeight: 58,
    });
  }

  create() {
    this.add.image(500, 400, "background").setScale(1.5);

    this.gameState = {
      score: 0,
      size: 11,
      isGameOver: false,
    };

    this.player = new PlayerFish(this, 400, 300);

    // Adiciona grupos para os elementos do jogo
    this.sharks = this.physics.add.group();
    this.powerUps = this.physics.add.group();
    this.obstacles = this.physics.add.group();
    this.clouds = this.physics.add.group();

    // Adiciona UI e controles
    this.ui = new GameUI(this);
    this.cursors = this.input.keyboard.createCursorKeys();

    // Array de spawners para diferentes tipos de inimigos
    this.spawners = [
      {
        delay: this.constants.SHARK_SPAWN_INTERVAL,
        callback: this.spawnShark.bind(this),
      },
      {
        delay: this.constants.POWERUP_SPAWN_INTERVAL,
        callback: this.spawnPowerUp.bind(this),
      },
      {
        delay: this.constants.OBSTACLE_SPAWN_INTERVAL,
        callback: this.spawnObstacle.bind(this),
      },
    ];

    // Uso da condicional de repetição For para criar os eventos de spawn
    this.spawners.forEach((spawner) => {
      this.time.addEvent({
        delay: spawner.delay,
        callback: spawner.callback,
        callbackScope: this,
        loop: true,
      });
    });

    this.physics.add.overlap(
      this.player.fish,
      this.sharks,
      this.handleSharkCollision,
      null,
      this
    );
    this.physics.add.overlap(
      this.player.fish,
      this.powerUps,
      this.collectPowerUp,
      null,
      this
    );

    this.physics.add.collider(this.player.fish, this.obstacles);

    this.anims.create({
      key: "shark_anim",
      frames: this.anims.generateFrameNumbers("shark"),
      frameRate: 10,
      repeat: -1, // Loop infinito
    });
  }

  update() {
    if (this.gameState.isGameOver) return; // Caso o jogo tenha terminado, não atualiza
    this.player.update(this.cursors);
    this.ui.update(this.gameState.score, this.gameState.size);

    // Para cada elemento do grupo de tubarões, atualiza a posição
    this.sharks.children.iterate((shark) => {
      if (shark && shark.body) {
        shark.setVelocityX(-this.constants.ENEMY_SPEED);
        if (shark.x < -shark.width) shark.destroy();
      }
    });

    // Para cada elemento do grupo de obstáculos, atualiza a posição
    this.obstacles.children.iterate((obstacle) => {
      if (obstacle && obstacle.body) {
        obstacle.setVelocityX(-this.constants.ENEMY_SPEED);
        obstacle.setImmovable(true);
        if (obstacle.x < -obstacle.width) obstacle.destroy();
      }
    });
  }

  spawnShark() {
    if (this.gameState.isGameOver) return; // Não spawna inimigos se o jogo acabou
    const shark = new Shark(this, 1000, Phaser.Math.Between(0, 800));
    this.sharks.add(shark.sprite);
  }

  handleSharkCollision(_, shark) {
    if (this.player.shield) {
      this.player.shield = false; // Consome o escudo
      shark.destroy(); // Remove o tubarão
    } else {
      this.gameOver();
    }
  }

  spawnPowerUp() {
    if (this.gameState.isGameOver) return; // Não spawna power-ups se o jogo acabou
    const powerUp = new PowerUp(
      this,
      Phaser.Math.Between(100, 900),
      Phaser.Math.Between(100, 700)
    );
    this.powerUps.add(powerUp.sprite);

    // Liga a instância de PowerUp ao sprite para podermos acessar as propriedades do objeto posteriormente
    powerUp.sprite.setData("powerUp", powerUp);
  }

  spawnObstacle() {
    if (this.gameState.isGameOver) return; // Não spawna obstáculos se o jogo acabou
    const obstacle = new Obstacle(this, 1000, Phaser.Math.Between(0, 800));
    this.obstacles.add(obstacle.sprite);
  }

  collectPowerUp(_, powerUpSprite) {
    const powerUp = powerUpSprite.getData("powerUp"); // Acessa a instância de PowerUp associada ao sprite
    if (powerUp && powerUp.effect) {
      powerUp.effect(this.player); // Aplica o efeito do power-up

      this.gameState.score += 1;

      // Caso o power-up seja o de crescimento
      if (powerUp.effect === PowerUp.TYPES[1].effect) {
        this.gameState.size += 1;
      }
      powerUpSprite.destroy();
    }
  }

  gameOver() {
    this.gameState.isGameOver = true;
    this.physics.pause();
    this.ui.showGameOver(() => this.restartGame());
  }

  restartGame() {
    this.scene.restart();
  }
}

const config = {
  type: Phaser.AUTO,
  width: 1000,
  height: 800,
  physics: {
    default: "arcade",
    arcade: { gravity: { x: 0, y: 0 }, debug: false }, // Debug on to visualize
  },
  scene: [WelcomeScene, HowToPlayScene, GameScene],
};
const game = new Phaser.Game(config);
