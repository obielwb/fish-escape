export class Cloud {
  constructor(scene, x, y) {
    const cloud = scene.clouds.create(x, y, "cloud");

    // Animação de rotação
    scene.tweens.add({
      targets: cloud,
      angle: 360,
      duration: 2000,
      ease: "Linear",
      repeat: -1,
    });

    // Define um limite de tempo para a nuvem aparecer na tela
    scene.time.delayedCall(scene.constants.CLOUD_LIFETIME, () => {
      if (cloud.active) cloud.destroy();
    });
  }
}
