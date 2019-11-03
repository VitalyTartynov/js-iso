import Phaser, { Game, Scene } from 'phaser';
import IsoPlugin from 'phaser3-plugin-isometric/src/IsoPlugin';

//import sampletile from '../assets/tile.png';
//import stone from '../assets/stone.png';
import stoneblock from '../assets/stone-block.png';

import { Map } from './map';

class IsoGame extends Scene {
  constructor() {
    const sceneConfig = {
      key: 'IsoInteractionExample',
      mapAdd: { isoPlugin: 'iso' }
    };

    super(sceneConfig);
  }

  preload() {
    //this.load.image('tileimage', sampletile);
    //this.load.image('tileimage', stone);
    this.load.image('tileimage', stoneblock);

    this.load.scenePlugin({
      key: 'IsoPlugin',
      url: IsoPlugin,
      sceneKey: 'iso'
    });
  }

  create() {
    this.isoGroup = this.add.group();

    this.iso.projector.origin.setTo(0.5, 0.1);

    this.map = new Map();
    this.map.create();
    
    this.drawMap(this.map);

    const cursors = this.input.keyboard.createCursorKeys();
    const controlConfig = {
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

  drawMap(map) {
    let tile;
    for (let x = 0; x < map.size; x += 1) {
      for (let y = 0; y < map.size; y += 1) {
        if (map.tiles[x][y].type === 1) {
          //t = this.add.isoSprite(x * 38, y * 38, 0, 'tileimage', this.isoGroup);
          tile = this.add.isoSprite(x * 18, y * 18, 0, 'tileimage', this.isoGroup);

          tile.setInteractive();

          tile.on('pointerover', function () {
            this.tint = 0x86bfda;
            this.isoZ += 3;
          });

          tile.on('pointerout', function () {
            this.tint = 0xffffff;
            this.isoZ -= 3;
          });
        }
      }
    }
  }
}

const config = {
  type: Phaser.AUTO,
  disableContextMenu: true,
  render: {
    antialias: false,
    pixelArt: true
  },
  scene: [IsoGame]
};

window.game = new Game(config);
