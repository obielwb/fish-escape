export class Obstacle {
  constructor(scene, x, y) {
    this.scene = scene;
    this.sprite = scene.physics.add.sprite(x, y, "obstacle").setScale(0.75);
  }
}
