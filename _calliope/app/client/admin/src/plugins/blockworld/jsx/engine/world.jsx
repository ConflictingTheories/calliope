/* eslint-disable no-plusplus */
// ==========================================
// World container
//
// This class contains the elements that make up the game world.
// Other modules retrieve information from the world or alter it
// using this class.
// ==========================================

// Constructor( sx, sy, sz )
//
// Creates a new world container with the specified world size.
// Up and down should always be aligned with the Z-direction.
//
// sx - World size in the X-direction.
// sy - World size in the Y-direction.
// sz - World size in the Z-direction.
import { Vector } from '../utils/vector';
import BLOCK from './blocks';

export default class World {
  constructor(sx, sy, sz) {
    // Initialise world array
    this.blocks = new Array(sx);
    for (let x = 0; x < sx; x++) {
      this.blocks[x] = new Array(sy);
      for (let y = 0; y < sy; y++) {
        this.blocks[x][y] = new Array(sz);
      }
    }
    this.sx = sx;
    this.sy = sy;
    this.sz = sz;

    this.players = {};
  }

  // createFlatWorld()
  //
  // Sets up the world so that the bottom half is filled with dirt
  // and the top half with air.
  createFlatWorld(height) {
    this.spawnPoint = new Vector(this.sx / 2 + 0.5, this.sy / 2 + 0.5, height);

    for (let x = 0; x < this.sx; x++)
      for (let y = 0; y < this.sy; y++)
        for (let z = 0; z < this.sz; z++) this.blocks[x][y][z] = z < height ? BLOCK.DIRT : BLOCK.AIR;
  }

  // createFromString( str )
  //
  // Creates a world from a string representation.
  // This is the opposite of toNetworkString().
  //
  // NOTE: The world must have already been created
  // with the appropriate size!
  createFromString(str) {
    let i = 0;

    for (let x = 0; x < this.sx; x++) {
      for (let y = 0; y < this.sy; y++) {
        for (let z = 0; z < this.sz; z++) {
          this.blocks[x][y][z] = BLOCK.fromId(str.charCodeAt(i) - 97);
          i += 1;
        }
      }
    }
  }

  // getBlock( x, y, z )
  //
  // Get the type of the block at the specified position.
  // Mostly for neatness, since accessing the array
  // directly is easier and faster.
  getBlock(x, y, z) {
    if (x < 0 || y < 0 || z < 0 || x > this.sx - 1 || y > this.sy - 1 || z > this.sz - 1) return BLOCK.AIR;
    return this.blocks[x][y][z];
  }

  // setBlock( x, y, z )
  setBlock(x, y, z, type) {
    this.blocks[x][y][z] = type;
    if (this.scene != null) this.scene.onBlockChanged(x, y, z);
  }

  // toNetworkString()
  //
  // Returns a string representation of this world.
  toNetworkString() {
    const blockArray = [];

    for (let x = 0; x < this.sx; x++)
      for (let y = 0; y < this.sy; y++)
        for (let z = 0; z < this.sz; z++) blockArray.push(String.fromCharCode(97 + this.blocks[x][y][z].id));

    return blockArray.join('');
  }

  // Set Scene Handler
  setScene(scene) {
    this.scene = scene;
  }
}
