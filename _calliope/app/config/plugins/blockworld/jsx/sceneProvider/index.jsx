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

import { create, translate, rotate } from '../engine/utils/matrix4';
import { cube, modelMerge } from '../engine/utils/elements';
import { Vector } from '../engine/utils/vector';

// Shaders
import fs from '../shaders/fs';
import vs from '../shaders/vs';

// Blockworld 
import World from "../engine/world";
import Physics from "../engine/physics";
import Player from "../engine/player";
import BLOCK from "../engine/blocks";

// Instance
const impl = {};

// Scene Object
const scene = {
  // Shaders
  shaders: {
    fs: fs(),
    vs: vs(),
  },
  // Model Vertices / Indices / Etc... (OLD Method..... - For Static Model/Scenes)
  model: modelMerge(new Array(5).fill(0).map((_, i) => cube(new Vector(i * 2, i * 2, i * 3)))),
};

// Init Scene
scene.init = engine => {
  // game Engine & Timing
  impl.engine = engine;
  impl.squareRotation = 0;
  impl.from = null;

  // Init Game Engine Components
  let world = impl.world = new World(16, 16, 16);
  world.createFlatWorld(6);
  // Physics
  impl.physics = new Physics(world);
  // Player & Controls
  impl.player = new Player(world, scene);

  // Create Flat World in Scene
  scene.loadTextures(engine);
  scene.setWorld(world, 8);
};

// Build Chunks from World
scene.buildChunks = (count) => {
  let { gl } = impl.engine;
  let { chunks, world } = impl;

  for (let i = 0; i < chunks.length; i++) {
    let chunk = chunks[i];

    if (chunk.dirty) {
      let vertices = [];

      // Create map of lowest blocks that are still lit
      let lightmap = {};
      for (let x = chunk.start[0] - 1; x < chunk.end[0] + 1; x++) {
        lightmap[x] = {};

        for (let y = chunk.start[1] - 1; y < chunk.end[1] + 1; y++) {
          for (let z = world.sz - 1; z >= 0; z--) {
            lightmap[x][y] = z;
            if (!world.getBlock(x, y, z).transparent) break;
          }
        }
      }

      // Add vertices for blocks
      for (let x = chunk.start[0]; x < chunk.end[0]; x++) {
        for (let y = chunk.start[1]; y < chunk.end[1]; y++) {
          for (let z = chunk.start[2]; z < chunk.end[2]; z++) {
            if (world.blocks[x][y][z] == BLOCK.AIR) continue;
            BLOCK.pushVertices(vertices, world, lightmap, x, y, z);
          }
        }
      }

      // Create WebGL buffer
      if (chunk.buffer) gl.deleteBuffer(chunk.buffer);
      let buffer = (chunk.buffer = gl.createBuffer());
      buffer.vertices = vertices.length / 9;
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(vertices),
        gl.STATIC_DRAW
      );

      chunk.dirty = false;
      count--;
    }

    if (count == 0) break;
  }
};

// Update World on Blockchange
scene.onBlockChanged = (x, y, z) => {
  var chunks = impl.chunks;

  for (var i = 0; i < chunks.length; i++) {
    // Neighbouring chunks are updated as well if the block is on a chunk border
    // Also, all chunks below the block are updated because of lighting
    if (
      x >= chunks[i].start[0] &&
      x < chunks[i].end[0] &&
      y >= chunks[i].start[1] &&
      y < chunks[i].end[1] &&
      z >= chunks[i].start[2] &&
      z < chunks[i].end[2]
    )
      chunks[i].dirty = true;
    else if (
      x >= chunks[i].start[0] &&
      x < chunks[i].end[0] &&
      y >= chunks[i].start[1] &&
      y < chunks[i].end[1] &&
      (z >= chunks[i].end[2] || z == chunks[i].start[2] - 1)
    )
      chunks[i].dirty = true;
    else if (
      x >= chunks[i].start[0] &&
      x < chunks[i].end[0] &&
      z >= chunks[i].start[2] &&
      z < chunks[i].end[2] &&
      (y == chunks[i].end[1] || y == chunks[i].start[1] - 1)
    )
      chunks[i].dirty = true;
    else if (
      y >= chunks[i].start[1] &&
      y < chunks[i].end[1] &&
      z >= chunks[i].start[2] &&
      z < chunks[i].end[2] &&
      (x == chunks[i].end[0] || x == chunks[i].start[0] - 1)
    )
      chunks[i].dirty = true;
  }
};

// Attach World and Build Chunks
scene.setWorld = (world, chunkSize) => {
  impl.world = world;
  world.setScene(scene);
  impl.chunkSize = chunkSize;
  // Create chunk list
  var chunks = (impl.chunks = []);
  for (var x = 0; x < world.sx; x += chunkSize) {
    for (var y = 0; y < world.sy; y += chunkSize) {
      for (var z = 0; z < world.sz; z += chunkSize) {
        chunks.push({
          start: [x, y, z],
          end: [
            Math.min(world.sx, x + chunkSize),
            Math.min(world.sy, y + chunkSize),
            Math.min(world.sz, z + chunkSize),
          ],
          dirty: true,
        });
      }
    }
  }
};

// Load Scene Textures
scene.loadTextures = engine => {
  let { gl } = engine;
  // Create 1px white texture for pure vertex color operations (e.g. picking)
  var white = new Uint8Array([255, 255, 255, 255]);
  impl.texWhite = engine.blankTexture(white, gl.TEXTURE0);

  // Load Image Textures
  impl.texTerrain = engine.loadTexture("media/terrain.png")
  impl.texPlayer = engine.loadTexture("media/player.png")

}

// Render Loop
scene.render = (engine, now) => {

  // Simulate Physics for Game
  impl.physics.simulate();

  // Update Player Position
  impl.player.update();

  // Build
  scene.buildChunks(1);
  engine.setCamera(impl.player.getEyePos().toArray(), impl.player.angles);

  // Draw Frame
  scene.draw(engine);

  // Update for next frame
  const deltaTime = impl.from === null ? 0 : now - impl.from;
  impl.from = now;
  impl.squareRotation += deltaTime * 0.001;
};

// Pick Block in Scene
scene.pickAt = (min, max, mx, my) => {
  let { engine, world } = impl;
  let { gl } = engine;

  // Create framebuffer for picking render
  var fbo = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);

  var bt = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, bt);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 512, 512, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

  var renderbuffer = gl.createRenderbuffer();
  gl.bindRenderbuffer(gl.RENDERBUFFER, renderbuffer);
  gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, 512, 512);

  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, bt, 0);
  gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderbuffer);

  // Build buffer with block pick candidates
  var vertices = [];

  for (var x = min.x; x <= max.x; x++) {
    for (var y = min.y; y <= max.y; y++) {
      for (var z = min.z; z <= max.z; z++) {
        if (world.getBlock(x, y, z) != BLOCK.AIR)
          BLOCK.pushPickingVertices(vertices, x, y, z);
      }
    }
  }

  var buffer = gl.createBuffer();
  buffer.vertices = vertices.length / 9;
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STREAM_DRAW);

  // Draw buffer
  gl.bindTexture(gl.TEXTURE_2D, impl.texWhite);

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  engine.drawBuffer(buffer);

  // Read pixel
  var pixel = new Uint8Array(4);
  gl.readPixels(mx / gl.viewportWidth * gl.viewportWidth, (1 - my / gl.viewportHeight) * gl.viewportWidth, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixel);

  // Reset states
  gl.bindTexture(gl.TEXTURE_2D, impl.texTerrain);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);

  // Clean up
  gl.deleteBuffer(buffer);
  gl.deleteRenderbuffer(renderbuffer);
  gl.deleteTexture(bt);
  gl.deleteFramebuffer(fbo);

  // Build result
  if (pixel[0] != 255) {
    var normal;
    if (pixel[3] == 1) normal = new Vector(0, 0, 1);
    else if (pixel[3] == 2) normal = new Vector(0, 0, -1);
    else if (pixel[3] == 3) normal = new Vector(0, -1, 0);
    else if (pixel[3] == 4) normal = new Vector(0, 1, 0);
    else if (pixel[3] == 5) normal = new Vector(-1, 0, 0);
    else if (pixel[3] == 6) normal = new Vector(1, 0, 0);

    return {
      x: pixel[0],
      y: pixel[1],
      z: pixel[2],
      n: normal
    }
  } else {
    return false;
  }
}

// Draw Scene
scene.draw = (engine) => {
  const { gl, programInfo } = engine;
  engine.clearScreen();
  // Draw Terrain chunks (NOT WORKING for Texture)
  var chunks = impl.chunks;
  gl.bindTexture(gl.TEXTURE_2D, impl.texTerrain);
  if (chunks != null) {
    for (var i = 0; i < chunks.length; i++) {
      if (chunks[i].buffer != null) engine.drawBuffer(chunks[i].buffer);
    }
  }
  // Update Model
  const uModelMat = create();
  gl.uniformMatrix4fv(programInfo.attribLocations.uModelMat, false, uModelMat);

}

// Keyboard handler for Scene
scene.onKeyEvent = (key, down) => {
  console.log("-----",key);
  impl.player.onKeyEvent(key, down)
}

// Mouse Handler for Scene
scene.onMouseEvent = (x, y, type, rmb, e) => {
  console.log()
  impl.player.onMouseEvent(x, y, type, rmb);
}

export default scene;
