/*                                                 *\
** ----------------------------------------------- **
**             Calliope - Site Generator   	       **
** ----------------------------------------------- **
**  Copyright (c) 2020-2021 - Kyle Derby MacInnis  **
**                                                 **
**    Any unauthorized distribution or transfer    **
**       of this work is strictly prohibited.      **
**                                                 **
**               All Rights Reserved.              **
** ----------------------------------------------- **
\*                                                 */

import { Vector } from "../utils/vector";
import BLOCK from "./blocks";

export default class World {
  constructor(sx, sy, sz) {
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

  // Flat World at given height
  createFlatWorld(height) {
    this.spawnPoint = new Vector(this.sx / 2 + 0.5, this.sy / 2 + 0.5, height);
    for (let x = 0; x < this.sx; x++)
      for (let y = 0; y < this.sy; y++)
        for (let z = 0; z < this.sz; z++)
          this.blocks[x][y][z] = z < height ? BLOCK.DIRT : BLOCK.AIR;
  }

  // Creates a world from a string representation.
  createFromString(str, spawn = null) {
    this.spawnPoint = spawn
      ? spawn
      : new Vector(this.sx / 2 + 0.5, this.sy / 2 + 0.5, this.sz);
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

  // Gett block at location
  getBlock(x, y, z) {
    if (
      x < 0 ||
      y < 0 ||
      z < 0 ||
      x > this.sx - 1 ||
      y > this.sy - 1 ||
      z > this.sz - 1
    )
      return BLOCK.AIR;
    return this.blocks[x][y][z];
  }

  // Set Block at location
  setBlock(x, y, z, type) {
    this.blocks[x][y][z] = type;
    if (this.scene != null) this.scene.onBlockChanged(x, y, z);
  }

  // Return a string representation of the world
  toNetworkString() {
    const blockArray = [];

    for (let x = 0; x < this.sx; x++)
      for (let y = 0; y < this.sy; y++)
        for (let z = 0; z < this.sz; z++)
          blockArray.push(String.fromCharCode(97 + this.blocks[x][y][z].id));

    return blockArray.join("");
  }

  // Set Scene Handler
  setScene(scene) {
    this.scene = scene;
  }
}
