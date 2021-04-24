const {
  playerHead,
  playerBody,
  playerLeftArm,
  playerRightArm,
  playerLeftLeg,
  playerRightLeg,
} = require("./vertices");

// Render Model
export function loadModel(renderer) {
  loadPlayerHeadModel(renderer);
  loadPlayerBodyModel(renderer);
}

// loadPlayerHeadModel()
//
// Loads the player head model into a vertex buffer for rendering.
export function loadPlayerHeadModel(renderer) {
  var gl = renderer.gl;
  // Player head
  var buffer = (renderer.playerHead = gl.createBuffer());
  buffer.vertices = playerHead.length / 9;
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(playerHead), gl.DYNAMIC_DRAW);
}

// loadPlayerBodyModel()
//
// Loads the player body model into a vertex buffer for rendering.
export function loadPlayerBodyModel(renderer) {
  var gl = renderer.gl;

  // Body
  var buffer = (renderer.playerBody = gl.createBuffer());
  buffer.vertices = playerBody.length / 9;
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(playerBody), gl.DYNAMIC_DRAW);

  // Left Art
  var buffer = (renderer.playerLeftArm = gl.createBuffer());
  buffer.vertices = playerLeftArm.length / 9;
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(playerLeftArm),
    gl.DYNAMIC_DRAW
  );

  // Right Arm
  var buffer = (renderer.playerRightArm = gl.createBuffer());
  buffer.vertices = playerRightArm.length / 9;
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(playerRightArm),
    gl.DYNAMIC_DRAW
  );

  // Left Leg
  var buffer = (renderer.playerLeftLeg = gl.createBuffer());
  buffer.vertices = playerLeftLeg.length / 9;
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(playerLeftLeg),
    gl.DYNAMIC_DRAW
  );

  // Right Leg
  var buffer = (renderer.playerRightLeg = gl.createBuffer());
  buffer.vertices = playerRightLeg.length / 9;
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(playerRightLeg),
    gl.DYNAMIC_DRAW
  );
}
