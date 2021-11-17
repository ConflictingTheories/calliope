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

import BLOCK from '../blocks';
export default class Physics {
  constructor(world = null) {
    this.world = world;
    this.lastStep = -1;
  }

  // Assigns a world to simulate to this physics simulator.
  setWorld(world) {
    this.world = world;
  }

// Simulate Change Iteration
  simulate() {
    const { world } = this;
    const { blocks } = world;

    const step = Math.floor(new Date().getTime() / 100);
    if (step === this.lastStep) return;
    this.lastStep = step;

    // Gravity
    if (step % 1 === 0) {
      for (let x = 0; x < world.sx; x++) {
        for (let y = 0; y < world.sy; y++) {
          for (let z = 0; z < world.sz; z++) {
            if (blocks[x][y][z].gravity && z > 0 && blocks[x][y][z - 1] == BLOCK.AIR) {
              world.setBlock(x, y, z - 1, blocks[x][y][z]);
              world.setBlock(x, y, z, BLOCK.AIR);
            }
          }
        }
      }
    }

    // Fluids
    if (step % 10 === 0) {
      // Newly spawned fluid blocks are stored so that those aren't
      // updated in the same step, creating a simulation avalanche.
      const newFluidBlocks = {};

      for (let x = 0; x < world.sx; x++) {
        for (let y = 0; y < world.sy; y++) {
          for (let z = 0; z < world.sz; z++) {
            const material = blocks[x][y][z];
            if (material.fluid && newFluidBlocks[`${x},${y},${z}`] == null) {
              if (x > 0 && blocks[x - 1][y][z] == BLOCK.AIR) {
                world.setBlock(x - 1, y, z, material);
                newFluidBlocks[`${x - 1},${y},${z}`] = true;
              }
              if (x < world.sx - 1 && blocks[x + 1][y][z] == BLOCK.AIR) {
                world.setBlock(x + 1, y, z, material);
                newFluidBlocks[`${x + 1},${y},${z}`] = true;
              }
              if (y > 0 && blocks[x][y - 1][z] == BLOCK.AIR) {
                world.setBlock(x, y - 1, z, material);
                newFluidBlocks[`${x},${y - 1},${z}`] = true;
              }
              if (y < world.sy - 1 && blocks[x][y + 1][z] == BLOCK.AIR) {
                world.setBlock(x, y + 1, z, material);
                newFluidBlocks[`${x},${y + 1},${z}`] = true;
              }
            }
          }
        }
      }
    }
  }
}
