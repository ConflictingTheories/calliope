/* eslint-disable no-unused-vars */
// ==========================================
// Block types
//
// This file contains all available block types and their properties.
// ==========================================
import { pushQuad } from '../utils/vector';
import { DIRECTION } from './enums';

// Block Object Model
export default (() => {
  // Default Functions
  const BLK = {
    // Air
    AIR: {
      id: 0,
      spawnable: false,
      selflit: false,
      gravity: false,
      fluid: false,
      transparent: true,
    },

    // Bedrock
    BEDROCK: {
      id: 1,
      spawnable: false,
      selflit: false,
      gravity: false,
      fluid: false,
      transparent: false,
      texture: (world, lightmap, lit, x, y, z, dir) => [1 / 16, 1 / 16, 2 / 16, 2 / 16],
    },

    // Dirt
    DIRT: {
      id: 2,
      spawnable: true,
      transparent: false,
      selflit: false,
      gravity: false,
      fluid: false,
      texture: (world, lightmap, lit, x, y, z, dir) => {
        if (dir === DIRECTION.UP && lit) return [14 / 16, 0 / 16, 15 / 16, 1 / 16];
        if (dir === DIRECTION.DOWN || !lit) return [2 / 16, 0 / 16, 3 / 16, 1 / 16];
        return [3 / 16, 0 / 16, 4 / 16, 1 / 16];
      },
    },

    // Wood
    WOOD: {
      id: 3,
      spawnable: true,
      transparent: false,
      selflit: false,
      gravity: false,
      fluid: false,
      texture: (world, lightmap, lit, x, y, z, dir) => {
        if (dir === DIRECTION.UP || dir === DIRECTION.DOWN) return [5 / 16, 1 / 16, 6 / 16, 2 / 16];
        return [4 / 16, 1 / 16, 5 / 16, 2 / 16];
      },
    },

    // TNT
    TNT: {
      id: 4,
      spawnable: true,
      transparent: false,
      selflit: false,
      gravity: false,
      fluid: false,
      texture: (world, lightmap, lit, x, y, z, dir) => {
        if (dir === DIRECTION.UP || dir === DIRECTION.DOWN) return [10 / 16, 0 / 16, 11 / 16, 1 / 16];
        return [8 / 16, 0 / 16, 9 / 16, 1 / 16];
      },
    },

    // Bookcase
    BOOKCASE: {
      id: 5,
      spawnable: true,
      transparent: false,
      selflit: false,
      gravity: false,
      fluid: false,
      texture: (world, lightmap, lit, x, y, z, dir) => {
        if (dir === DIRECTION.FORWARD || dir === DIRECTION.BACK) return [3 / 16, 2 / 16, 4 / 16, 3 / 16];
        return [4 / 16, 0 / 16, 5 / 16, 1 / 16];
      },
    },

    // Lava
    LAVA: {
      id: 6,
      spawnable: false,
      transparent: true,
      selflit: true,
      gravity: true,
      fluid: true,
      texture: (world, lightmap, lit, x, y, z, dir) => [13 / 16, 14 / 16, 14 / 16, 15 / 16],
    },

    // Plank
    PLANK: {
      id: 7,
      spawnable: true,
      transparent: false,
      selflit: false,
      gravity: false,
      fluid: false,
      texture: (world, lightmap, lit, x, y, z, dir) => [4 / 16, 0 / 16, 5 / 16, 1 / 16],
    },

    // Cobblestone
    COBBLESTONE: {
      id: 8,
      spawnable: true,
      transparent: false,
      selflit: false,
      gravity: false,
      fluid: false,
      texture: (world, lightmap, lit, x, y, z, dir) => [0 / 16, 1 / 16, 1 / 16, 2 / 16],
    },

    // Concrete
    CONCRETE: {
      id: 9,
      spawnable: true,
      transparent: false,
      selflit: false,
      gravity: false,
      fluid: false,
      texture: (world, lightmap, lit, x, y, z, dir) => [1 / 16, 0 / 16, 2 / 16, 1 / 16],
    },

    // Brick
    BRICK: {
      id: 10,
      spawnable: true,
      transparent: false,
      selflit: false,
      gravity: false,
      fluid: false,
      texture: (world, lightmap, lit, x, y, z, dir) => [7 / 16, 0 / 16, 8 / 16, 1 / 16],
    },

    // Sand
    SAND: {
      id: 11,
      spawnable: true,
      transparent: false,
      selflit: false,
      gravity: true,
      fluid: false,
      texture: (world, lightmap, lit, x, y, z, dir) => [2 / 16, 1 / 16, 3 / 16, 2 / 16],
    },

    // Gravel
    GRAVEL: {
      id: 12,
      spawnable: true,
      transparent: false,
      selflit: false,
      gravity: true,
      fluid: false,
      texture: (world, lightmap, lit, x, y, z, dir) => [3 / 16, 1 / 16, 4 / 16, 2 / 16],
    },

    // Iron
    IRON: {
      id: 13,
      spawnable: true,
      transparent: false,
      selflit: false,
      gravity: false,
      fluid: false,
      texture: (world, lightmap, lit, x, y, z, dir) => [6 / 16, 1 / 16, 7 / 16, 2 / 16],
    },

    // Gold
    GOLD: {
      id: 14,
      spawnable: true,
      transparent: false,
      selflit: false,
      gravity: false,
      fluid: false,
      texture: (world, lightmap, lit, x, y, z, dir) => [7 / 16, 1 / 16, 8 / 16, 2 / 16],
    },

    // Diamond
    DIAMOND: {
      id: 15,
      spawnable: true,
      transparent: false,
      selflit: false,
      gravity: false,
      fluid: false,
      texture: (world, lightmap, lit, x, y, z, dir) => [8 / 16, 1 / 16, 9 / 16, 2 / 16],
    },

    // Obsidian
    OBSIDIAN: {
      id: 16,
      spawnable: true,
      transparent: false,
      selflit: false,
      gravity: false,
      fluid: false,
      texture: (world, lightmap, lit, x, y, z, dir) => [5 / 16, 2 / 16, 6 / 16, 3 / 16],
    },

    // Glass
    GLASS: {
      id: 17,
      spawnable: true,
      transparent: true,
      selflit: false,
      gravity: false,
      fluid: false,
      texture: (world, lightmap, lit, x, y, z, dir) => [1 / 16, 3 / 16, 2 / 16, 4 / 16],
    },

    // Sponge
    SPONGE: {
      id: 18,
      spawnable: true,
      transparent: false,
      selflit: false,
      gravity: false,
      fluid: false,
      texture: (world, lightmap, lit, x, y, z, dir) => [0 / 16, 3 / 16, 1 / 16, 4 / 16],
    },

    // Find Block by ID

    fromId: id => {
      for (const mat in BLK) if (typeof BLK[mat] === 'object' && BLK[mat].id === id) return BLK[mat];
      return null;
    },

    // Push Top Vertices

    pushTop: (vertices, x, y, z, bH, c, lm) => {
      pushQuad(
        vertices,
        [x, y, z + bH, c[0], c[1], lm, lm, lm, 1.0],
        [x + 1.0, y, z + bH, c[2], c[1], lm, lm, lm, 1.0],
        [x + 1.0, y + 1.0, z + bH, c[2], c[3], lm, lm, lm, 1.0],
        [x, y + 1.0, z + bH, c[0], c[3], lm, lm, lm, 1.0],
      );
    },

    // Push Front Vertices

    pushFront: (vertices, x, y, z, bH, c, lm) => {
      pushQuad(
        vertices,
        [x, y, z, c[0], c[3], lm, lm, lm, 1.0],
        [x + 1.0, y, z, c[2], c[3], lm, lm, lm, 1.0],
        [x + 1.0, y, z + bH, c[2], c[1], lm, lm, lm, 1.0],
        [x, y, z + bH, c[0], c[1], lm, lm, lm, 1.0],
      );
    },

    // Push Back Vertices

    pushBack: (vertices, x, y, z, bH, c, lm) => {
      pushQuad(
        vertices,
        [x, y, z + bH, c[2], c[1], lm, lm, lm, 1.0],
        [x, y + 1.0, z + bH, c[0], c[1], lm, lm, lm, 1.0],
        [x, y + 1.0, z, c[0], c[3], lm, lm, lm, 1.0],
        [x, y, z, c[2], c[3], lm, lm, lm, 1.0],
      );
    },

    // Push Bottom Vertices

    pushBottom: (vertices, x, y, z, c, lm) => {
      pushQuad(
        vertices,
        [x, y + 1.0, z, c[0], c[3], lm, lm, lm, 1.0],
        [x + 1.0, y + 1.0, z, c[2], c[3], lm, lm, lm, 1.0],
        [x + 1.0, y, z, c[2], c[1], lm, lm, lm, 1.0],
        [x, y, z, c[0], c[1], lm, lm, lm, 1.0],
      );
    },

    // Push Right Vertices

    pushRight: (vertices, x, y, z, bH, c, lm) => {
      pushQuad(
        vertices,
        [x + 1.0, y, z, c[0], c[3], lm, lm, lm, 1.0],
        [x + 1.0, y + 1.0, z, c[2], c[3], lm, lm, lm, 1.0],
        [x + 1.0, y + 1.0, z + bH, c[2], c[1], lm, lm, lm, 1.0],
        [x + 1.0, y, z + bH, c[0], c[1], lm, lm, lm, 1.0],
      );
    },

    // Push Left Vertices

    pushLeft: (vertices, x, y, z, bH, c, lm) => {
      pushQuad(
        vertices,
        [x, y, z + bH, c[2], c[1], lm, lm, lm, 1.0],
        [x, y + 1.0, z + bH, c[0], c[1], lm, lm, lm, 1.0],
        [x, y + 1.0, z, c[0], c[3], lm, lm, lm, 1.0],
        [x, y, z, c[2], c[3], lm, lm, lm, 1.0],
      );
    },

    // pushVertices( vertices, world, lightmap, x, y, z )
    //
    // Pushes the vertices necessary for rendering a
    // specific block into the array.

    pushVertices: (vertices, world, lightmap, x, y, z) => {
      const { blocks } = world;
      const blockLit = z >= lightmap[x][y];
      const block = blocks[x][y][z];
      const bH = block.fluid && (z === world.sz - 1 || !blocks[x][y][z + 1].fluid) ? 0.9 : 1.0;

      // Top
      if (z === world.sz - 1 || world.blocks[x][y][z + 1].transparent || block.fluid) {
        const c = block.texture(world, lightmap, blockLit, x, y, z, DIRECTION.UP);

        let lightMultiplier = z >= lightmap[x][y] ? 1.0 : 0.6;
        if (block.selflit) lightMultiplier = 1.0;

        BLK.pushTop(vertices, x, y, z, bH, c, lightMultiplier);
      }

      // Bottom
      if (z === 0 || world.blocks[x][y][z - 1].transparent) {
        const c = block.texture(world, lightmap, blockLit, x, y, z, DIRECTION.DOWN);

        const lightMultiplier = block.selflit ? 1.0 : 0.6;

        BLK.pushBottom(vertices, x, y, z, c, lightMultiplier);
      }

      // Front
      if (y === 0 || world.blocks[x][y - 1][z].transparent) {
        const c = block.texture(world, lightmap, blockLit, x, y, z, DIRECTION.FORWARD);

        let lightMultiplier = y === 0 || z >= lightmap[x][y - 1] ? 1.0 : 0.6;
        if (block.selflit) lightMultiplier = 1.0;

        // Push Shader Vertex Shaders
        BLK.pushFront(vertices, x, y, z, bH, c, lightMultiplier);
      }

      // Back
      if (y === world.sy - 1 || world.blocks[x][y + 1][z].transparent) {
        const c = block.texture(world, lightmap, blockLit, x, y, z, DIRECTION.BACK);

        const lightMultiplier = block.selflit ? 1.0 : 0.6;

        BLK.pushBack(vertices, x, y, z, bH, c, lightMultiplier);
      }

      // Left
      if (x === 0 || world.blocks[x - 1][y][z].transparent) {
        const c = block.texture(world, lightmap, blockLit, x, y, z, DIRECTION.LEFT);

        const lightMultiplier = block.selflit ? 1.0 : 0.6;

        BLK.pushLeft(vertices, x, y, z, bH, c, lightMultiplier);
      }

      // Right
      if (x === world.sx - 1 || world.blocks[x + 1][y][z].transparent) {
        const c = block.texture(world, lightmap, blockLit, x, y, z, DIRECTION.RIGHT);
        console.log(c);
        let lightMultiplier = x === world.sx - 1 || z >= lightmap[x + 1][y] ? 1.0 : 0.6;
        if (block.selflit) lightMultiplier = 1.0;

        BLK.pushRight(vertices, x, y, z, bH, c, lightMultiplier);
      }
    },

    // pushPickingVertices( vertices, x, y, z )
    //
    // Pushes vertices with the data needed for picking.

    pushPickingVertices: (vertices, x, y, z) => {
      const color = { r: x / 255, g: y / 255, b: z / 255 };

      // Top
      pushQuad(
        vertices,
        [x, y, z + 1, 0, 0, color.r, color.g, color.b, 1 / 255],
        [x + 1, y, z + 1, 1, 0, color.r, color.g, color.b, 1 / 255],
        [x + 1, y + 1, z + 1, 1, 1, color.r, color.g, color.b, 1 / 255],
        [x, y + 1, z + 1, 0, 0, color.r, color.g, color.b, 1 / 255],
      );

      // Bottom
      pushQuad(
        vertices,
        [x, y + 1, z, 0, 0, color.r, color.g, color.b, 2 / 255],
        [x + 1, y + 1, z, 1, 0, color.r, color.g, color.b, 2 / 255],
        [x + 1, y, z, 1, 1, color.r, color.g, color.b, 2 / 255],
        [x, y, z, 0, 0, color.r, color.g, color.b, 2 / 255],
      );

      // Front
      pushQuad(
        vertices,
        [x, y, z, 0, 0, color.r, color.g, color.b, 3 / 255],
        [x + 1, y, z, 1, 0, color.r, color.g, color.b, 3 / 255],
        [x + 1, y, z + 1, 1, 1, color.r, color.g, color.b, 3 / 255],
        [x, y, z + 1, 0, 0, color.r, color.g, color.b, 3 / 255],
      );

      // Back
      pushQuad(
        vertices,
        [x, y + 1, z + 1, 0, 0, color.r, color.g, color.b, 4 / 255],
        [x + 1, y + 1, z + 1, 1, 0, color.r, color.g, color.b, 4 / 255],
        [x + 1, y + 1, z, 1, 1, color.r, color.g, color.b, 4 / 255],
        [x, y + 1, z, 0, 0, color.r, color.g, color.b, 4 / 255],
      );

      // Left
      pushQuad(
        vertices,
        [x, y, z + 1, 0, 0, color.r, color.g, color.b, 5 / 255],
        [x, y + 1, z + 1, 1, 0, color.r, color.g, color.b, 5 / 255],
        [x, y + 1, z, 1, 1, color.r, color.g, color.b, 5 / 255],
        [x, y, z, 0, 0, color.r, color.g, color.b, 5 / 255],
      );

      // Right
      pushQuad(
        vertices,
        [x + 1, y, z, 0, 0, color.r, color.g, color.b, 6 / 255],
        [x + 1, y + 1, z, 1, 0, color.r, color.g, color.b, 6 / 255],
        [x + 1, y + 1, z + 1, 1, 1, color.r, color.g, color.b, 6 / 255],
        [x + 1, y, z + 1, 0, 0, color.r, color.g, color.b, 6 / 255],
      );
    },
  };

  // // Block types
  // const blockType = ["AIR", "DIRT", "BEDROCK"];

  // // Add Block Types
  // blockType.forEach((type) => {
  //   BLK[type] = require(`./types/${type}.jsx`).default;
  // });

  return BLK;
})();
