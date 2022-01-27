export default class winDialogue extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.create();
  }

  create() {
    this.scene.add.image(500, 360, `dialogBackground1`);
    this.scene.add.image(500, 360, `dialogBackground2`);
    var restartButton = this.scene.add.image(513, 338, `button`);
    restartButton.setInteractive();
    var exitButton = this.scene.add.image(513, 398, `button`);
    exitButton.setInteractive();
    var restartText = this.scene.add.text(0, 0, `RESTART`, {
      font: `34px`,
    });
    Phaser.Display.Align.In.Center(restartText, restartButton);
    var exitText = this.scene.add.text(0, 0, `EXIT`, {
      font: `34px`,
    });
    Phaser.Display.Align.In.Center(exitText, exitButton);
    restartButton.on("pointerdown", this.onRestart);
    exitButton.on("pointerdown", this.onExit);
  }
  onRestart() {
    document.location.reload();
  }
  onExit() {
    window.open("https://www.google.com", "_self");
  }
}
