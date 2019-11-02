import Phaser, { Game, Scene } from 'phaser'
import IsoPlugin from 'phaser3-plugin-isometric/src/IsoPlugin'

import tile from '../assets/tile.png'

class IsoGame extends Scene {
  constructor () {
    const sceneConfig = {
      key: 'IsoInteractionExample',
      mapAdd: { isoPlugin: 'iso' }
    }

    super(sceneConfig)
  }

  preload () {
    this.load.image('tile', tile)

    this.load.scenePlugin({
      key: 'IsoPlugin',
      url: IsoPlugin,
      sceneKey: 'iso'
    })
  }

  create () {
    this.isoGroup = this.add.group()

    this.iso.projector.origin.setTo(0.5, 0.3)

    this.spawnTiles()
  }

  spawnTiles () {
    let t
    for (let x = 0; x < 512; x += 38) {
      for (let y = 0; y < 512; y += 38) {
        t = this.add.isoSprite(x, y, 0, 'tile', this.isoGroup)
        t.setInteractive()

        t.on('pointerover', function () {
          this.tint = 0x86bfda
          this.isoZ += 5
        })

        t.on('pointerout', function () {
          this.tint = 0xffffff
          this.isoZ -= 5
        })
      }
    }
  }
}

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  pixelArt: true,
  scene: IsoGame
}

window.game = new Game(config)
