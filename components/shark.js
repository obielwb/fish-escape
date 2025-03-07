export class Shark {
  constructor(scene, x, y) {
    this.scene = scene;
    this.sprite = scene.physics.add.sprite(x, y, "shark");

    // Diminui a caixa de colisão para se adequar melhor ao sprite
    this.sprite.body.setSize(this.sprite.width * 0.5, this.sprite.height * 0.5);

    // Centraliza a caixa de colisão
    this.sprite.body.setOffset(
      (this.sprite.width - this.sprite.body.width) / 2,
      (this.sprite.height - this.sprite.body.height) / 2
    );
    this.sprite.play("shark_anim");
    this.sprite.rotation = Phaser.Math.DegToRad(-90); // Rotaciona o sprite para a esquerda
  }
}
