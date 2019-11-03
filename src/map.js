export class Map {
  constructor(size = 16) {
    this.size = size;
  }
  
  create() {
    this.tiles = new Array(this.size);
    for (let x = 0; x < this.size; x++) {
      this.tiles[x] = new Array(this.size);
      for (let y = 0; y < this.size; y++) {
        const tile  = new Tile();
        if (y === 3 || y === 8 || x === 3 || x === 8) {
          tile.type = 0;
        }
        this.tiles[x][y] = tile;
      }
    }
  }
}

export class Tile {
  constructor() {
    this.type = 1;
  }
}