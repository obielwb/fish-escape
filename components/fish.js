import { Cloud } from "./cloud.js";

export class PlayerFish {
  constructor(scene, x, y) {
    this.scene = scene;
    this.fish = scene.physics.add.sprite(x, y, "fish").setScale(0.5);
    this.fish.setCollideWorldBounds(true);
    this.speed = this.scene.constants.CHARACTER_SPEED; // Velocidade Inicial
    this.shield = false;
  }

  update(cursors) {
    const { BOOST_AMOUNT } = this.scene.constants;

    this.fish.setVelocityX(
      cursors.left.isDown ? -this.speed : cursors.right.isDown ? this.speed : 0
    );
    this.fish.setVelocityY(
      cursors.up.isDown ? -this.speed : cursors.down.isDown ? this.speed : 0
    );

    if (Phaser.Input.Keyboard.JustDown(cursors.space)) {
      // Calcula a direção do vetor de velocidade do peixe
      let direction = new Phaser.Math.Vector2(
        this.fish.body.velocity.x,
        this.fish.body.velocity.y
      ).normalize();

      if (direction.length() === 0) direction.setTo(1, 0);

      // Salva a posição atual do peixe, antes do boost, para poder colocar a nuvem posteriormente
      const oldX = this.fish.x;
      const oldY = this.fish.y;

      // Move o peixe na direção do vetor de velocidade
      this.fish.x += direction.x * BOOST_AMOUNT;
      this.fish.y += direction.y * BOOST_AMOUNT;

      // Impede o boost caso o peixe esteja colidindo com um obstáculo, evitando assim que ele o atravesse
      let canBoost = true;
      this.scene.obstacles.children.iterate((obstacle) => {
        if (
          obstacle &&
          Phaser.Geom.Intersects.RectangleToRectangle(
            this.fish.getBounds(),
            obstacle.getBounds()
          )
        ) {
          canBoost = false;
        }
      });

      if (canBoost) {
        new Cloud(this.scene, oldX, oldY); // Se o boost foi bem sucedido, cria uma nuvem no local anterior do peixe
        this.shrink();
      } else {
        // Reverte a posição do peixe caso o boost o fizesse colidir com um obstáculo
        this.fish.x = oldX;
        this.fish.y = oldY;
      }
    }
  }

  shrink() {
    const { SHRINK_FACTOR, MIN_SIZE } = this.scene.constants;
    this.fish.setScale(this.fish.scale * SHRINK_FACTOR);
    this.scene.gameState.size -= 1; // Diminui o tamanho do peixe

    // Caso ele tenha encolhido demais, o jogo acaba
    if (
      this.fish.displayWidth < MIN_SIZE ||
      this.fish.displayHeight < MIN_SIZE
    ) {
      this.fish.setVisible(false);
      this.scene.gameOver();
    }
  }

  grow() {
    this.fish.setScale(this.fish.scale * this.scene.constants.GROW_FACTOR); // Aumenta o tamanho do peixe de acordo com o fator de crescimento
  }
}
