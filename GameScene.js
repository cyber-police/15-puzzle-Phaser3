import winDialogue from "./winDialogue.js";

export default class GameScene extends Phaser.Scene {
  positions = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 0, 15],
  ];

  a = 0;
  xCord = 200;
  yCord = 100;
  self;

  container;

  constructor() {
    super("game-scene");
    self = this;
  }

  preload() {
    for (var i = 1; i <= 15; i++) {
      this.load.image(`stain-${i}`, `images/stain-${i}.jpg`);
    }

    this.load.image(`button`, `images/button.jpg`);
    this.load.image(`dialogBackground1`, `images/dialogBackground1.jpg`);
    this.load.image(`dialogBackground2`, `images/dialogBackground2.jpg`);
  }

  create() {
    this.container = this.add.container();
    for (var i = 0; i <= 15; i++) {
      var j = Math.trunc(i / 4);

      var numberOfelement = this.positions[j][this.a];

      this.a++;

      if (numberOfelement != 0) {
        var img = this.add.image(
          this.xCord,
          this.yCord,
          `stain-${numberOfelement}`
        );
        img.id = numberOfelement;

        img.setInteractive();

        this.container.add(img);
      }

      this.xCord += 170;

      if (this.a > 3) {
        this.a = 0;
        this.xCord = 200;
        this.yCord += 160;
      }
    }
    this.input.on("gameobjectdown", this.onDown);
    this.input.on("gameobjectover", this.onOver);
    this.input.on("gameobjectout", this.onOut);
  }

  onOver(pointer, gameobject) {
    gameobject.tint = 0x00ff00;
  }

  onOut(pointer, gameobject) {
    gameobject.tint = 0xffffff;
  }

  onDown(pointer, gameobject) {
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        if (gameobject.id == self.positions[i][j]) {
          var activeElement = [i, j];
          break;
        }
      }
    }

    if (
      self.positions[activeElement[0] - 1] != null &&
      self.positions[activeElement[0] - 1][activeElement[1]] == 0
    ) {
      self.positions[activeElement[0] - 1][activeElement[1]] =
        self.positions[activeElement[0]][activeElement[1]];
      self.positions[activeElement[0]][activeElement[1]] = 0;
      self.tweens.add({
        targets: gameobject,
        x: gameobject.x,
        y: gameobject.y - 160,
        duration: 300,
      });
    } else if (
      self.positions[activeElement[0] + 1] != null &&
      self.positions[activeElement[0] + 1][activeElement[1]] == 0
    ) {
      self.positions[activeElement[0] + 1][activeElement[1]] =
        self.positions[activeElement[0]][activeElement[1]];
      self.positions[activeElement[0]][activeElement[1]] = 0;
      self.tweens.add({
        targets: gameobject,
        x: gameobject.x,
        y: gameobject.y + 160,
        duration: 300,
      });
    } else if (self.positions[activeElement[0]][activeElement[1] + 1] == 0) {
      self.positions[activeElement[0]][activeElement[1] + 1] =
        self.positions[activeElement[0]][activeElement[1]];
      self.positions[activeElement[0]][activeElement[1]] = 0;
      self.tweens.add({
        targets: gameobject,
        x: gameobject.x + 170,
        y: gameobject.y,
        duration: 300,
      });
    } else if (self.positions[activeElement[0]][activeElement[1] - 1] == 0) {
      self.positions[activeElement[0]][activeElement[1] - 1] =
        self.positions[activeElement[0]][activeElement[1]];
      self.positions[activeElement[0]][activeElement[1]] = 0;
      self.tweens.add({
        targets: gameobject,
        x: gameobject.x - 170,
        y: gameobject.y,
        duration: 300,
      });
    }
    self.onWinConditions();
  }

  onWinConditions() {
    var countPos = self.positions.length - 1;
    var stainCounter = 1;

    for (var i = 0; i <= countPos; i++) {
      for (var j = 0; j <= countPos; j++) {
        if (i == countPos && j == countPos) {
          self.showWinDialogue();
        }
        if (self.positions[i][j] != stainCounter) {
          return;
        }
        stainCounter++;
      }
    }
  }

  showWinDialogue() {
    this.destroy();
    this.add.existing(new winDialogue(self, 100, 100));
  }

  destroy() {
    for (var i = 0; i <= 14; i++) {
      self.container.list[i].removeInteractive();
      self.container.list[i].tint = 0xffffff;
    }
  }
}
