import { create, translate, rotate } from '../engine/utils/matrix4';
import { cube, modelMerge } from '../engine/utils/elements';
import { Vector } from '../engine/utils/vector';
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

  impl.engine = engine;
  impl.squareRotation = 0;
  impl.from = null;

  scene.loadTextures(engine);
  
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

// Render Scene
scene.render = (engine, now) => {
  const { gl, programInfo, buffers } = engine;
  
  // Clear Sceen
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clearDepth(1.0);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Model Matrix
  const modelViewMatrix = create();

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

  // Indices
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.index);

  // Shade & Project
  gl.useProgram(programInfo.program);
  gl.uniformMatrix4fv(programInfo.uniformLocations.projectionMatrix, false, engine.projectionMatrix);
  gl.uniformMatrix4fv(programInfo.uniformLocations.modelViewMatrix, false, modelViewMatrix);

  // Draw using Triangles
  gl.drawElements(gl.TRIANGLES, scene.model.indices.length, gl.UNSIGNED_SHORT, 0);

  // Frame speed
  const deltaTime = impl.from === null ? 0 : now - impl.from;
  impl.from = now;

  // Update for next frame
  impl.squareRotation += deltaTime * 0.001;
};

export default scene;
