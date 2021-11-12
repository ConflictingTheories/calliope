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

import {
  create,
  rotate,
  translate,
  perspective,
  isPowerOf2,
  set,
} from "./utils/matrix4";

import vec3 from "./utils/vector";
import Texture from "./texture.jsx";

export default class GLEngine {
  constructor(canvas, width, height) {
    this.canvas = canvas;
    this.width = width;
    this.height = height;
    this.modelViewMatrixStack = [];
    (this.cameraAngle = 45),
      (this.cameraPosition = vec3.create()),
      // Storage for negated camera position
      (this.cameraOffset = vec3.create());
  }

  // Initialize a Scene object
  init(scene) {
    const gl = this.canvas.getContext("webgl");
    if (!gl) {
      throw new Error("WebGL : unable to initialize");
    }
    this.gl = gl;
    this.scene = scene;

    // Configure GL
    gl.clearColor(0, 0, 0, 1.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.depthFunc(gl.LEQUAL);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // Initialize Shader
    this.initShaderProgram(gl, scene.shaders);

    // Initialize Project Matrix
    this.initProjection(gl);

    // Dummy Model Matrix
    // this.modelMatrix = create();
    // gl.uniformMatrix4fv(this.programInfo.uniformLocations.uModelMat, false, this.modelMatrix);

    // Initialize Scene
    scene.init(this);

    // Render
    this.render = this.render.bind(this);
    this.requestId = requestAnimationFrame(this.render);
  }

  // Load and Compile Shader Source
  loadShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const log = gl.getShaderInfoLog(shader);
      gl.deleteShader(shader);
      throw new Error(`An error occurred compiling the shaders: ${log}`);
    }
    return shader;
  }

  // Initialize Shader Program
  initShaderProgram = (gl, { vs: vsSource, fs: fsSource }) => {
    const vertexShader = this.loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = this.loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    // Could Link
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      throw new Error(
        `WebGL unable to initialize the shader program: ${gl.getProgramInfoLog(
          shaderProgram
        )}`
      );
    }

    // Use Shader
    gl.useProgram(shaderProgram);

    this.programInfo = {
      program: shaderProgram,
      attribLocations: {
        aPos: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
        aTexCoord: gl.getAttribLocation(shaderProgram, "aTextureCoord"),
      },
      uniformLocations: {
        uProjMat: gl.getUniformLocation(shaderProgram, "uPMatrix"),
        uModelMat: gl.getUniformLocation(shaderProgram, "uMVMatrix"),
        uSampler: gl.getUniformLocation(shaderProgram, "uSampler"),
      },
    };

    shaderProgram.setMatrixUniforms = function () {
      gl.uniformMatrix4fv(this.pMatrixUniform, false, pMatrix);
      gl.uniformMatrix4fv(this.mvMatrixUniform, false, mvMatrix);
    };

    gl.enableVertexAttribArray(this.programInfo.attribLocations.aPos);
    gl.enableVertexAttribArray(this.programInfo.attribLocations.aColor);
    gl.enableVertexAttribArray(this.programInfo.attribLocations.aTexCoord);

    return shaderProgram;
  };

  // Set FOV and Perspective
  initProjection(gl) {
    const fieldOfView = (60 * Math.PI) / 180; // in radians
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100.0;
    this.uProjMat = perspective(fieldOfView, aspect, zNear, zFar);
    gl.uniformMatrix4fv(
      this.programInfo.uniformLocations.uProjMat,
      false,
      this.uProjMat
    );
    this.uProjMat[5] *= -1; // flip
  }

  mvPushMatrix() {
    let copy = create();
    set(this.uViewMat, copy);
    this.modelViewMatrixStack.push(copy);
  }

  mvPopMatrix() {
    if (mvMatrixStack.length == 0) {
      throw "Invalid popMatrix!";
    }
    mvMatrix = mvMatrixStack.pop();
  }

  setCamera() {
    translate(mvMatrix, [0.0, 0.0, -15.0]);
    rotate(mvMatrix, degToRad(this.cameraAngle), [1, 0, 0]);

    vec3.negate(this.cameraPosition, this.cameraOffset);
    translate(mvMatrix, this.cameraOffset);
  }

  // Clear Screen with Color (RGBA)
  clearScreen() {
    const { gl } = this;
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  }

  // Render Frame
  render(now) {
    this.scene.render(this, now);
    requestAnimationFrame(this.render);
  }

  createBuffer(contents, type, itemSize) {
    let { gl } = this;
    let buf = gl.createBuffer();
    buf.itemSize = itemSize;
    buf.numItems = contents.length / itemSize;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(contents), type);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    return buf;
  }

  updateBuffer(buffer, contents) {
    let { gl } = this;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, new Float32Array(contents));
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
  }

  bindBuffer(buffer, attribute) {
    let { gl } = this;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.vertexAttribPointer(attribute, buffer.itemSize, gl.FLOAT, false, 0, 0);
  }

  loadTexture(src) {
    if (this.textures[src]) return this.textures[src];
    this.textures[src] = new Texture;
    this.textures[src].initialize(src);
    return this.textures[src];
  }

  bindTexture(texture) {
    let { gl } = this;
    texture.bind(gl);
  }

  // Clear Render Loop
  close() {
    cancelAnimationFrame(this.requestId);
  }

  degToRad(degrees) {
    return (degrees * Math.PI) / 180;
  }
}
