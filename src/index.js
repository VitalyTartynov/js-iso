import Phaser, { Game, Scene } from 'phaser';
import IsoPlugin from 'phaser3-plugin-isometric/src/IsoPlugin';

import tile from '../assets/tile.png';

class IsoGame extends Scene {
  constructor() {
    const sceneConfig = {
      key: 'IsoInteractionExample',
      mapAdd: { isoPlugin: 'iso' }
    };

    super(sceneConfig);
  }

  preload() {
    this.load.image('tile', tile);

    this.load.scenePlugin({
      key: 'IsoPlugin',
      url: IsoPlugin,
      sceneKey: 'iso'
    });
  }

  create() {
    this.isoGroup = this.add.group();

    this.iso.projector.origin.setTo(0.5, 0.1);

    this.spawnTiles();

    var cursors = this.input.keyboard.createCursorKeys();
    var controlConfig = {
      camera: this.cameras.main,
      left: cursors.left,
      right: cursors.right,
      up: cursors.up,
      down: cursors.down,
      acceleration: 0.03,
      drag: 0.0005,
      maxSpeed: 0.5
    };

    this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);

    this.fps = this.add.text(this.cameras.main.x + 10, this.cameras.main.y + 15, Math.round(this.game.loop.actualFps));
  }

  update(time, delta) {
    this.controls.update(delta);
    this.fps.text = Math.round(this.game.loop.actualFps);
  }

  spawnTiles() {
    let t;
    for (let x = 0; x < 16; x += 1) {
      for (let y = 0; y < 16; y += 1) {
        t = this.add.isoSprite(x*38, y*38, 0, 'tile', this.isoGroup);
        t.setInteractive();

        t.on('pointerover', function() {
          this.tint = 0x86bfda;
          this.isoZ += 5;
        });

        t.on('pointerout', function() {
          this.tint = 0xffffff;
          this.isoZ -= 5;
        });
      }
    }
  }
}

const config = {
  type: Phaser.AUTO,
  pixelArt: true,
  disableContextMenu: true,
  scene: IsoGame
};

window.game = new Game(config);
