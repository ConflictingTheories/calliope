import { create, translate, rotate } from '../engine/utils/matrix4';
import { cube, modelMerge } from '../engine/utils/elements';
import { Vector } from '../engine/utils/vector';
import World from "../engine/world";
import Physics from "../engine/physics";
import Player from "../engine/player";
import BLOCK from "../engine/blocks";
// Shaders
import fs from '../shaders/fs';
import vs from '../shaders/vs';

// Scene Object
const scene = {
  // Shaders
  shaders: {
    fs: fs(),
    vs: vs(),
  },
  // Model Vertices / Indices / Etc...
  model: modelMerge(new Array(5).fill(0).map((_, i) => cube(new Vector(i*2, i*2, i*3)))),
};

// Instance
const impl = {};

// Init Scene
scene.init = engine => {

  // game Engine & Timing
  impl.engine = engine;
  impl.squareRotation = 0;
  impl.from = null;

  // Load Game Textures
  scene.loadTextures(engine);
  
  // Build World
  let world = new World(16,16,16);
  world.createFlatWorld(6);
  
  // Connect Physics Engine
  impl.physics = new Physics(world);
  
  // Add player to world
  impl.player = new Player(world, scene);

  // Set World in Scene
  scene.setWorld(world, 8);

};

// Build Chunks from World
scene.buildChunks = (count) => {
  let {gl} = impl.engine;
  let {chunks,world} = impl;

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
  world.setScene(impl);
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
scene.loadTextures = engine =>{
  const { gl, programInfo, buffers } = engine;

  // Load Images
  impl.texTerrain = engine.loadTexture("media/terrain.png")
  impl.texPlayer = engine.loadTexture("media/player.png")
  
  // Create 1px white texture for pure vertex color operations (e.g. picking)
  var white = new Uint8Array([255, 255, 255, 255]);
  impl.texWhite = engine.blankTexture(white);

}

// Render Loop
scene.render = (engine, now) => { 
  // Simulate Physics for Game
  impl.physics.simulate();
  // Update Player Position
  impl.player.update();
  // Build
  scene.buildChunks(impl.chunks.length);
  // engine.setCamera(impl.player.getEyePos().toArray(), impl.player.angles);
  // Draw
  scene.draw(engine);
  // Frame speed
  const deltaTime = impl.from === null ? 0 : now - impl.from;
  impl.from = now;
  // Update for next frame
  impl.squareRotation += deltaTime * 0.001;
};

// Draw Scene
scene.draw = (engine) =>{
  const { gl, programInfo, buffers } = engine;

  // Clear Sceen
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clearDepth(1.0);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Model Matrix
  const modelViewMatrix = create();
  
  // Shade & Project
  gl.useProgram(programInfo.program);
  gl.uniformMatrix4fv(programInfo.uniformLocations.projectionMatrix, false, engine.projectionMatrix);
  gl.uniformMatrix4fv(programInfo.uniformLocations.modelViewMatrix, false, modelViewMatrix);

    // Draw level chunks
    var chunks = impl.chunks;

    gl.bindTexture(gl.TEXTURE_2D, impl.texTerrain);
    if (chunks != null) {
      for (var i = 0; i < chunks.length; i++) {
        if (chunks[i].buffer != null) engine.drawBuffer(chunks[i].buffer);
      }
    }


  // Move & Rotate Model
  translate(modelViewMatrix, modelViewMatrix, [-0.0, 0.0, -20.0]);
  rotate(modelViewMatrix, modelViewMatrix, -impl.squareRotation, [0, 0, 1]);
  rotate(modelViewMatrix, modelViewMatrix, -impl.squareRotation, [0, 1, 0]);
  rotate(modelViewMatrix, modelViewMatrix, -impl.squareRotation, [1, 0, 0]);

  // Vertices
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
  gl.vertexAttribPointer(programInfo.attribLocations.vertexPosition, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);

  // Colours
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
  gl.vertexAttribPointer(programInfo.attribLocations.vertexColor, 4, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(programInfo.attribLocations.vertexColor);

  // Texture
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.textureCoord);
  gl.vertexAttribPointer(programInfo.attribLocations.textureCoord, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(programInfo.attribLocations.textureCoord);

  // Indices
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.index);

  // Shade & Project
  gl.useProgram(programInfo.program);
  gl.uniformMatrix4fv(programInfo.uniformLocations.projectionMatrix, false, engine.projectionMatrix);
  gl.uniformMatrix4fv(programInfo.uniformLocations.modelViewMatrix, false, modelViewMatrix);

  // Draw using Triangles
  gl.drawElements(gl.TRIANGLES, scene.model.indices.length, gl.UNSIGNED_SHORT, 0);

}
export default scene;
