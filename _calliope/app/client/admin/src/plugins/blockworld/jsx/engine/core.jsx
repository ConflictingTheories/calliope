import { create, rotate, translate, perspective, isPowerOf2 } from './utils/matrix4';

export default class WebGL {
  constructor(canvas, width, height) {
    this.canvas = canvas;
    this.width = width;
    this.height = height;
  }

  // Initialize a Scene object
  init(scene) {
    const gl = this.canvas.getContext('webgl');
    if (!gl) {
      throw new Error('WebGL : unable to initialize');
    }
    this.gl = gl;
    this.scene = scene;
    // Build Shader Program & Buffers From Scene
    this.buildShaders(scene.shaders);
    this.buildBuffers(scene.model);
    // Initialize
    scene.init(this);
    this.initProjection(gl);
    // Render
    this.render = this.render.bind(this);
    this.requestId = requestAnimationFrame(this.render);
  }

  // Load and Compile Shader Source
  loadShader (gl, type, source){
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const log = gl.getShaderInfoLog(shader);
      gl.deleteShader(shader);
      throw new Error(`An error occurred compiling the shaders: ${log}`);
    }
    return shader;
  };
  
  // Initialize Shader Program
  initShaderProgram = (gl, vsSource, fsSource) => {
    const vertexShader = this.loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = this.loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
  
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      throw new Error(`WebGL unable to initialize the shader program: ${gl.getProgramInfoLog(shaderProgram)}`);
    }
    return shaderProgram;
  };

  // Set FOV and Perspective
  initProjection(gl) {
    const fieldOfView = (45 * Math.PI) / 180; // in radians
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100.0;
    this.projectionMatrix = perspective(fieldOfView, aspect, zNear, zFar);
  }

  // Set Camera Pos & Angle
  setCamera(pos, ang) {
    var gl = this.gl;
    this.camPos = pos;

    this.viewMatrix = create();
    rotate(this.viewMatrix,this.viewMatrix, -ang[0] - Math.PI / 2, [1, 0, 0] );
    rotate(this.viewMatrix,this.viewMatrix, ang[1], [0, 0, 1]);
    rotate(this.viewMatrix,this.viewMatrix, -ang[2], [0, 1, 0]);
    translate(this.viewMatrix, this.viewMatrix, [-pos[0], -pos[1], -pos[2]], );

    gl.uniformMatrix4fv(this.programInfo.uniformLocations.projectionMatrix, false, this.viewMatrix);
  }

  // Render Frame
  render(now) {
    this.scene.render(this, now);
    requestAnimationFrame(this.render);
  }

  // Build Shader Program and Load Locations
  buildShaders(shaders) {
    const { gl } = this;
    const shaderProgram = this.initShaderProgram(gl, shaders.vs, shaders.fs);
    this.programInfo = {
      program: shaderProgram,
      attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
        vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor'),
        textureCoord: gl.getAttribLocation(shaderProgram, 'aTexCoord'),
      },
      uniformLocations: {
        projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
        modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
        uSampler: gl.getUniformLocation(shaderProgram, 'uSampler'),
      },
    };
  }

  // Build Buffers for Rendering Vertices / Indices
  buildBuffers({ positions, colors, indices, textureCoordinates }) {
    const { gl } = this;
    // Vertex Buffer
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    // Colour Buffer
    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    // Texture Buffer
    const textureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);    
    // Indices
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
    // Return
    this.buffers = {
      position: vertexBuffer,
      color: colorBuffer,
      texture: textureCoordBuffer,
      index: indexBuffer,
    };
  }
  // Draw Buffer
  drawBuffer (buffer) {
    var gl = this.gl;
  
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  
    gl.vertexAttribPointer(this.aPos, 3, gl.FLOAT, false, 9 * 4, 0);
    gl.vertexAttribPointer(this.aColor, 4, gl.FLOAT, false, 9 * 4, 5 * 4);
    gl.vertexAttribPointer(this.aTexCoord, 2, gl.FLOAT, false, 9 * 4, 3 * 4);
  
    gl.drawArrays(gl.TRIANGLES, 0, buffer.vertices);
  };
  
  // Load Texture from File
  loadTexture( url) {
    let {gl} = this;
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
  
    // Because images have to be downloaded over the internet
    // they might take a moment until they are ready.
    // Until then put a single pixel in the texture so we can
    // use it immediately. When the image has finished downloading
    // we'll update the texture with the contents of the image.
    const level = 0;
    const internalFormat = gl.RGBA;
    const width = 1;
    const height = 1;
    const border = 0;
    const srcFormat = gl.RGBA;
    const srcType = gl.UNSIGNED_BYTE;
    const pixel = new Uint8Array([0, 0, 255, 255]);  // opaque blue
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                  width, height, border, srcFormat, srcType,
                  pixel);
  
    const image = new Image();
    image.onload = function() {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                    srcFormat, srcType, image);
  
      // WebGL1 has different requirements for power of 2 images
      // vs non power of 2 images so check if the image is a
      // power of 2 in both dimensions.
      if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
         gl.generateMipmap(gl.TEXTURE_2D);
      } else {
         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      }
    };
    image.src = url;
  
    return texture;
  }
  
  // Load Texture from File
  blankTexture(color) {
    let {gl} = this;
    const texture = gl.createTexture();
     // Create 1px white texture for pure vertex color operations (e.g. picking)
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    var white = new Uint8Array(color);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      1,
      1,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      white
    );
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.uniform1i(this.uSampler, 0);
    
    return texture;
  }

  // Clear Render Loop
  close() {
    cancelAnimationFrame(this.requestId);
  }
}
