export class PowerUp {
  static TYPES = [
    {
      type: "speed",
      scale: 0.6,
      color: 0xff0000,
      effect: (player) => (player.speed *= 1.25),
    },
    {
      type: "grow",
      scale: 0.6,
      color: 0x00ff00,
      effect: (player) => player.grow(),
    },
    {
      type: "shield",
      scale: 0.6,
      color: 0x0000ff,
      effect: (player) => (player.shield = true),
    },
  ];

  constructor(scene, x, y) {
    const type =
      PowerUp.TYPES[Math.floor(Math.random() * PowerUp.TYPES.length)]; // Escolhe um tipo aleatório de power-up

    this.effect = type.effect;
    this.sprite = scene.physics.add
      .sprite(x, y, "powerUp")
      .setScale(0.6)
      .setTint(type.color);

    // Define um limite de tempo para o power-up aparecer na tela
    scene.time.delayedCall(scene.constants.POWERUP_LIFETIME, () => {
      if (this.sprite.active) this.sprite.destroy();
    });
  }
}
