import GameScene from "./GameScene.js";

const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  scene: [GameScene],
};

export default new Phaser.Game(config);
