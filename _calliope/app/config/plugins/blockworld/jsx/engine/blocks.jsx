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

import { pushQuad } from "../utils/vector";
import { DIRECTION } from "./enums";

// Block Object Model
export default (() => {
  // Default Functions
  const BLK = {
    // Find Block by ID
    fromId: (id) => {
      for (const mat in BLK)
        if (typeof BLK[mat] === "object" && BLK[mat].id === id) return BLK[mat];
      return null;
    },

    // Push Top Vertices
    pushTop: (vertices, x, y, z, bH, c, lm) => {
      pushQuad(
        vertices,
        [x, y, z + bH, c[0], c[1], lm, lm, lm, 1.0],
        [x + 1.0, y, z + bH, c[2], c[1], lm, lm, lm, 1.0],
        [x + 1.0, y + 1.0, z + bH, c[2], c[3], lm, lm, lm, 1.0],
        [x, y + 1.0, z + bH, c[0], c[3], lm, lm, lm, 1.0]
      );
    },

    // Push Front Vertices
    pushFront: (vertices, x, y, z, bH, c, lm) => {
      pushQuad(
        vertices,
        [x, y, z, c[0], c[3], lm, lm, lm, 1.0],
        [x + 1.0, y, z, c[2], c[3], lm, lm, lm, 1.0],
        [x + 1.0, y, z + bH, c[2], c[1], lm, lm, lm, 1.0],
        [x, y, z + bH, c[0], c[1], lm, lm, lm, 1.0]
      );
    },

    // Push Back Vertices
    pushBack: (vertices, x, y, z, bH, c, lm) => {
      pushQuad(
        vertices,
        [x, y, z + bH, c[2], c[1], lm, lm, lm, 1.0],
        [x, y + 1.0, z + bH, c[0], c[1], lm, lm, lm, 1.0],
        [x, y + 1.0, z, c[0], c[3], lm, lm, lm, 1.0],
        [x, y, z, c[2], c[3], lm, lm, lm, 1.0]
      );
    },

    // Push Bottom Vertices
    pushBottom: (vertices, x, y, z, c, lm) => {
      pushQuad(
        vertices,
        [x, y + 1.0, z, c[0], c[3], lm, lm, lm, 1.0],
        [x + 1.0, y + 1.0, z, c[2], c[3], lm, lm, lm, 1.0],
        [x + 1.0, y, z, c[2], c[1], lm, lm, lm, 1.0],
        [x, y, z, c[0], c[1], lm, lm, lm, 1.0]
      );
    },

    // Push Right Vertices
    pushRight: (vertices, x, y, z, bH, c, lm) => {
      pushQuad(
        vertices,
        [x + 1.0, y, z, c[0], c[3], lm, lm, lm, 1.0],
        [x + 1.0, y + 1.0, z, c[2], c[3], lm, lm, lm, 1.0],
        [x + 1.0, y + 1.0, z + bH, c[2], c[1], lm, lm, lm, 1.0],
        [x + 1.0, y, z + bH, c[0], c[1], lm, lm, lm, 1.0]
      );
    },

    // Push Left Vertices
    pushLeft: (vertices, x, y, z, bH, c, lm) => {
      pushQuad(
        vertices,
        [x, y, z + bH, c[2], c[1], lm, lm, lm, 1.0],
        [x, y + 1.0, z + bH, c[0], c[1], lm, lm, lm, 1.0],
        [x, y + 1.0, z, c[0], c[3], lm, lm, lm, 1.0],
        [x, y, z, c[2], c[3], lm, lm, lm, 1.0]
      );
    },

    // Pushes the vertices necessary for rendering
    pushVertices: (vertices, world, lightmap, x, y, z) => {
      const { blocks } = world;
      const blockLit = z >= lightmap[x][y];
      const block = blocks[x][y][z];
      const bH =
        block.fluid && (z === world.sz - 1 || !blocks[x][y][z + 1].fluid)
          ? 0.9
          : 1.0;

      // Top
      if (
        z === world.sz - 1 ||
        world.blocks[x][y][z + 1].transparent ||
        block.fluid
      ) {
        const c = block.texture(
          world,
          lightmap,
          blockLit,
          x,
          y,
          z,
          DIRECTION.UP
        );

        let lightMultiplier = z >= lightmap[x][y] ? 1.0 : 0.6;
        if (block.selflit) lightMultiplier = 1.0;

        BLK.pushTop(vertices, x, y, z, bH, c, lightMultiplier);
      }

      // Bottom
      if (z === 0 || world.blocks[x][y][z - 1].transparent) {
        const c = block.texture(
          world,
          lightmap,
          blockLit,
          x,
          y,
          z,
          DIRECTION.DOWN
        );

        const lightMultiplier = block.selflit ? 1.0 : 0.6;

        BLK.pushBottom(vertices, x, y, z, c, lightMultiplier);
      }

      // Front
      if (y === 0 || world.blocks[x][y - 1][z].transparent) {
        const c = block.texture(
          world,
          lightmap,
          blockLit,
          x,
          y,
          z,
          DIRECTION.FORWARD
        );

        let lightMultiplier = y === 0 || z >= lightmap[x][y - 1] ? 1.0 : 0.6;
        if (block.selflit) lightMultiplier = 1.0;

        // Push Shader Vertex Shaders
        BLK.pushFront(vertices, x, y, z, bH, c, lightMultiplier);
      }

      // Back
      if (y === world.sy - 1 || world.blocks[x][y + 1][z].transparent) {
        const c = block.texture(
          world,
          lightmap,
          blockLit,
          x,
          y,
          z,
          DIRECTION.BACK
        );

        const lightMultiplier = block.selflit ? 1.0 : 0.6;

        BLK.pushBack(vertices, x, y, z, bH, c, lightMultiplier);
      }

      // Left
      if (x === 0 || world.blocks[x - 1][y][z].transparent) {
        const c = block.texture(
          world,
          lightmap,
          blockLit,
          x,
          y,
          z,
          DIRECTION.LEFT
        );

        const lightMultiplier = block.selflit ? 1.0 : 0.6;

        BLK.pushLeft(vertices, x, y, z, bH, c, lightMultiplier);
      }

      // Right
      if (x === world.sx - 1 || world.blocks[x + 1][y][z].transparent) {
        const c = block.texture(
          world,
          lightmap,
          blockLit,
          x,
          y,
          z,
          DIRECTION.RIGHT
        );
        console.log(c);
        let lightMultiplier =
          x === world.sx - 1 || z >= lightmap[x + 1][y] ? 1.0 : 0.6;
        if (block.selflit) lightMultiplier = 1.0;

        BLK.pushRight(vertices, x, y, z, bH, c, lightMultiplier);
      }
    },

    // Pushes vertices with the data needed for picking.
    pushPickingVertices: (vertices, x, y, z) => {
      const color = { r: x / 255, g: y / 255, b: z / 255 };

      // Top
      pushQuad(
        vertices,
        [x, y, z + 1, 0, 0, color.r, color.g, color.b, 1 / 255],
        [x + 1, y, z + 1, 1, 0, color.r, color.g, color.b, 1 / 255],
        [x + 1, y + 1, z + 1, 1, 1, color.r, color.g, color.b, 1 / 255],
        [x, y + 1, z + 1, 0, 0, color.r, color.g, color.b, 1 / 255]
      );

      // Bottom
      pushQuad(
        vertices,
        [x, y + 1, z, 0, 0, color.r, color.g, color.b, 2 / 255],
        [x + 1, y + 1, z, 1, 0, color.r, color.g, color.b, 2 / 255],
        [x + 1, y, z, 1, 1, color.r, color.g, color.b, 2 / 255],
        [x, y, z, 0, 0, color.r, color.g, color.b, 2 / 255]
      );

      // Front
      pushQuad(
        vertices,
        [x, y, z, 0, 0, color.r, color.g, color.b, 3 / 255],
        [x + 1, y, z, 1, 0, color.r, color.g, color.b, 3 / 255],
        [x + 1, y, z + 1, 1, 1, color.r, color.g, color.b, 3 / 255],
        [x, y, z + 1, 0, 0, color.r, color.g, color.b, 3 / 255]
      );

      // Back
      pushQuad(
        vertices,
        [x, y + 1, z + 1, 0, 0, color.r, color.g, color.b, 4 / 255],
        [x + 1, y + 1, z + 1, 1, 0, color.r, color.g, color.b, 4 / 255],
        [x + 1, y + 1, z, 1, 1, color.r, color.g, color.b, 4 / 255],
        [x, y + 1, z, 0, 0, color.r, color.g, color.b, 4 / 255]
      );

      // Left
      pushQuad(
        vertices,
        [x, y, z + 1, 0, 0, color.r, color.g, color.b, 5 / 255],
        [x, y + 1, z + 1, 1, 0, color.r, color.g, color.b, 5 / 255],
        [x, y + 1, z, 1, 1, color.r, color.g, color.b, 5 / 255],
        [x, y, z, 0, 0, color.r, color.g, color.b, 5 / 255]
      );

      // Right
      pushQuad(
        vertices,
        [x + 1, y, z, 0, 0, color.r, color.g, color.b, 6 / 255],
        [x + 1, y + 1, z, 1, 0, color.r, color.g, color.b, 6 / 255],
        [x + 1, y + 1, z + 1, 1, 1, color.r, color.g, color.b, 6 / 255],
        [x + 1, y, z + 1, 0, 0, color.r, color.g, color.b, 6 / 255]
      );
    },
  };

  // Block types
  const blockType = [
    "AIR",
    "DIRT",
    "BEDROCK",
    "BOOKCASE",
    "BRICK",
    "COBBLESTONE",
    "CONCRETE",
    "DIAMOND",
    "GLASS",
    "GOLD",
    "GRAVEL",
    "LAVA",
    "OBSIDIAN",
    "PLANK",
    "SPONGE",
    "TNT",
    "WOOD",
  ];

  // Add Block Types
  blockType.forEach((type) => {
    BLK[type] = require(`./blockTypes/${type}.jsx`).default;
  });

  return BLK;
})();
