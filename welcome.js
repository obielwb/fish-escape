export class WelcomeScene extends Phaser.Scene {
  constructor() {
    super("WelcomeScene");
  }

  preload() {
    this.load.image("background", "assets/background.png");
  }
  create() {
    this.add.image(500, 400, "background").setScale(1.5);

    // Título do jogo
    this.add
      .text(500, 200, "Fish Escape", {
        fontSize: "90px",
        fontFamily: "Arial",
        color: "#ffffff",
        align: "center",
      })
      .setOrigin(0.5);

    // Botão de play
    const playButton = this.add
      .text(500, 400, "Play", {
        fontSize: "48px",
        fontFamily: "Arial",
        color: "#ffffff",
        backgroundColor: "#027BCE",
        padding: { x: 20, y: 10 },
      })
      .setOrigin(0.5)
      .setInteractive();

    playButton.on("pointerdown", () => {
      this.scene.start("GameScene");
    });

    // Botão de "Como Jogar"
    const howToPlayButton = this.add
      .text(500, 500, "How to Play", {
        fontSize: "48px",
        fontFamily: "Arial",
        color: "#027BCE",
        backgroundColor: "#ffffff",
        padding: { x: 20, y: 10 },
      })
      .setOrigin(0.5)
      .setInteractive();

    howToPlayButton.on("pointerdown", () => {
      this.scene.start("HowToPlayScene");
    });

    // Efeitos de hover
    playButton.on("pointerover", () =>
      playButton.setStyle({ color: "#D0D0D0" })
    );
    playButton.on("pointerout", () =>
      playButton.setStyle({ color: "#ffffff" })
    );
    howToPlayButton.on("pointerover", () =>
      howToPlayButton.setStyle({ color: "#004574" })
    );
    howToPlayButton.on("pointerout", () =>
      howToPlayButton.setStyle({ color: "#027BCE" })
    );
  }
}
