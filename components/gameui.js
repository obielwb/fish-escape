export class GameUI {
  constructor(scene) {
    this.scene = scene;
    this.scoreText = scene.add.text(16, 16, "Score: 0", {
      fontSize: "32px",
      fill: "#fff",
    });
    this.sizeText = scene.add.text(16, 50, "Current Size: 11", {
      fontSize: "32px",
      fill: "#fff",
    });
  }

  // Método para atualizar o texto de pontuação e tamanho
  update(score, size) {
    this.scoreText.setText(`Score: ${score}`);
    this.sizeText.setText(`Current Size: ${size}`);
  }

  showGameOver(restartCallback) {
    this.scene.add.text(370, 350, "Game Over", {
      fontSize: "54px",
      fill: "#fff",
    });
    this.scene.add
      .text(450, 450, "Restart", { fontSize: "32px", fill: "#ff0000" })
      .setInteractive()
      .on("pointerdown", restartCallback);
  }
}
