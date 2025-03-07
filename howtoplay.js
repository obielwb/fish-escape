export class HowToPlayScene extends Phaser.Scene {
  constructor() {
    super("HowToPlayScene");
  }
  preload() {
    this.load.image("background", "assets/background.png");
  }

  create() {
    this.add.image(500, 400, "background").setScale(1.5);

    this.add
      .text(500, 100, "How to Play Fish Escape", {
        fontSize: "48px",
        fontFamily: "Arial",
        color: "#000000",
        align: "center",
      })
      .setOrigin(0.5);

    // Texto de instruções
    const instructions = [
      "Use ARROW KEYS to move the fish.",
      "Press SPACEBAR to boost and shrink (leaves a cloud).",
      "Avoid SHARKS - they end the game!",
      "Collect POWER-UPS to score points:",
      " - RED (Speed): Increases movement speed.",
      " - GREEN (Grow): Increases size.",
      " - BLUE (Shield): Protects from one shark hit.",
      "Dodge OBSTACLES - they block your path!",
      "If you shrink too much (size = 0), game over!",
    ];

    // Uso da condicional de repetição For para adicionar as instruções na tela
    instructions.forEach((line, index) => {
      this.add
        .text(500, 200 + index * 50, line, {
          fontSize: "28px",
          fontFamily: "Arial",
          color: "#000000",
          align: "center",
        })
        .setOrigin(0.5);
    });

    const backButton = this.add
      .text(500, 670, "Back", {
        fontSize: "48px",
        fontFamily: "Arial",
        color: "#ffffff",
        backgroundColor: "#000000",
        padding: { x: 20, y: 10 },
      })
      .setOrigin(0.5)
      .setInteractive();

    backButton.on("pointerdown", () => {
      this.scene.start("WelcomeScene");
    });

    backButton.on("pointerover", () =>
      backButton.setStyle({ color: "#cc0000" })
    );
    backButton.on("pointerout", () =>
      backButton.setStyle({ color: "#ffffff" })
    );
  }
}
