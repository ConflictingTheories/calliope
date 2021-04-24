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

import { mat4, aniangle } from "gl-matrix";
import { Vector } from "../helpers";
import { BLOCK } from "../blocks";

import { loadModel as loadPlayerModel } from "../models/player";

// ==========================================
// Renderer
//
// This class contains the code that takes care of visualising the
// elements in the specified world.
// ==========================================

// Shaders
var vertexSource =
  "uniform mat4 uProjMatrix;" +
  "uniform mat4 uViewMatrix;" +
  "uniform mat4 uModelMatrix;" +
  "attribute vec3 aPos;" +
  "attribute vec4 aColor;" +
  "attribute vec2 aTexCoord;" +
  "varying vec4 vColor;" +
  "varying vec2 vTexCoord;" +
  "void main() {" +
  "	gl_Position = uProjMatrix * uViewMatrix * ( uModelMatrix * vec4( aPos, 1.0 ) );" +
  "	vColor = aColor;" +
  "	vTexCoord = aTexCoord;" +
  "}";

var fragmentSource =
  "precision highp float;" +
  "uniform sampler2D uSampler;" +
  "varying vec4 vColor;" +
  "varying vec2 vTexCoord;" +
  "void main() {" +
  "	vec4 color = texture2D( uSampler, vec2( vTexCoord.s, vTexCoord.t ) ) * vec4( vColor.rgb, 1.0 );" +
  "	if ( color.a < 0.1 ) discard;" +
  "	gl_FragColor = vec4( color.rgb, vColor.a );" +
  "}";

// Constructor( id )
//
// Creates a new renderer with the specified canvas as target.
//
// id - Identifier of the HTML canvas element to render to.

export class Renderer {
  constructor(gl, canvas) {
    // var canvas = (this.canvas = ref.current);
    this.gl = gl;
    this.canvas = canvas;
    
    canvas.renderer = this;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    // // Initialise WebGL
    // try {
    //   // Context
    //   // var gl = (this.gl = canvas.getContext("experimental-webgl"));
    // } catch (e) {
    //   throw "Your browser doesn't support WebGL!";
    // }

    // Textures
    this.textCanvas = null;
    this.texTerrain = gl.createTexture();
    this.texPlayer = gl.createTexture();
    this.texWhite = gl.createTexture();

    // Create projection and view matrices
    this.projMatrix = mat4.create();
    this.uViewMat = mat4.create();
    this.modelMatrix = mat4.create();

    gl.viewportWidth = canvas.width;
    gl.viewportHeight = canvas.height;

    gl.clearColor(0.62, 0.81, 1.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // Load shaders
    this.loadShaders();

    // Load player model
    loadPlayerModel(this);

    // Create dummy model matrix
    mat4.identity(this.modelMatrix);
    gl.uniformMatrix4fv(this.uModelMat, false, this.modelMatrix);

    // Create 1px white texture for pure vertex color operations (e.g. picking)
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.texWhite);
    var white = new Uint8Array([255, 255, 255, 255]);
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

    // Load player texture
    this.texPlayer.image = new Image();
    this.texPlayer.image.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, this.texPlayer);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        this.texPlayer.image
      );
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    };
    this.texPlayer.image.src = "media/player.png";

    // Load terrain texture
    this.texTerrain.image = new Image();
    this.texTerrain.image.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, this.texTerrain);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        this.texTerrain.image
      );
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    };
    this.texTerrain.image.src = "media/terrain.png";

    // // Create canvas used to draw name tags
    // this.textCanvas = document.createElement("canvas");
    // this.textCanvas.width = 256;
    // this.textCanvas.height = 64;
    // this.textCanvas.style.display = "none";
    // var ctx = this.textContext = this.textCanvas.getContext("2d");
    // ctx.textAlign = "left";
    // ctx.textBaseline = "middle";
    // ctx.font = "24px Minecraftia";
    // document.getElementsByTagName("body")[0].appendChild(this.textCanvas);
  }

  // draw()
  //
  // Render one frame of the world to the canvas.
  draw() {
    var gl = this.gl;

    // Initialise view
    this.updateViewport();
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Draw level chunks
    var chunks = this.chunks;

    gl.bindTexture(gl.TEXTURE_2D, this.texTerrain);

    if (chunks != null) {
      for (var i = 0; i < chunks.length; i++) {
        if (chunks[i].buffer != null) this.drawBuffer(chunks[i].buffer);
      }
    }

    // Draw players
    var players = this.world.players;

    gl.enable(gl.BLEND);

    for (var p in players) {
      var player = players[p];

      if (player.moving || Math.abs(player.aniframe) > 0.1) {
        player.aniframe += 0.15;
        if (player.aniframe > Math.PI) player.aniframe = -Math.PI;
        aniangle = (Math.PI / 2) * Math.sin(player.aniframe);
        if (!player.moving && Math.abs(aniangle) < 0.1) player.aniframe = 0;
      } else aniangle = 0;

      // Draw head
      var pitch = player.pitch;
      if (pitch < -0.32) pitch = -0.32;
      if (pitch > 0.32) pitch = 0.32;

      mat4.identity(this.modelMatrix);
      mat4.translate(this.modelMatrix, this.modelMatrix, [
        player.x,
        player.y,
        player.z + 1.7,
      ]);
      mat4.rotateZ(this.modelMatrix, Math.PI - player.yaw);
      mat4.rotateX(this.modelMatrix, -pitch);
      gl.uniformMatrix4fv(this.uModelMat, false, this.modelMatrix);

      gl.bindTexture(gl.TEXTURE_2D, this.texPlayer);
      this.drawBuffer(this.playerHead);

      // Draw body
      mat4.identity(this.modelMatrix);
      mat4.translate(this.modelMatrix, this.modelMatrix, [
        player.x,
        player.y,
        player.z + 0.01,
      ]);
      mat4.rotateZ(this.modelMatrix, Math.PI - player.yaw);
      gl.uniformMatrix4fv(this.uModelMat, false, this.modelMatrix);
      this.drawBuffer(this.playerBody);

      mat4.translate(this.modelMatrix, this.modelMatrix, [0, 0, 1.4]);
      mat4.rotateX(this.modelMatrix, 0.75 * aniangle);
      gl.uniformMatrix4fv(this.uModelMat, false, this.modelMatrix);
      this.drawBuffer(this.playerLeftArm);

      mat4.rotateX(this.modelMatrix, -1.5 * aniangle);
      gl.uniformMatrix4fv(this.uModelMat, false, this.modelMatrix);
      this.drawBuffer(this.playerRightArm);
      mat4.rotateX(this.modelMatrix, 0.75 * aniangle);

      mat4.translate(this.modelMatrix, this.modelMatrix, [0, 0, -0.67]);

      mat4.rotateX(this.modelMatrix, 0.5 * aniangle);
      gl.uniformMatrix4fv(this.uModelMat, false, this.modelMatrix);
      this.drawBuffer(this.playerRightLeg);

      mat4.rotateX(this.modelMatrix, -aniangle);
      gl.uniformMatrix4fv(this.uModelMat, false, this.modelMatrix);
      this.drawBuffer(this.playerLeftLeg);

      // Draw player name
      // if (!player.nametag) {
      //   player.nametag = this.buildPlayerName(player.nick);
      // }

      // Calculate angle so that the nametag always faces the local player
      var ang =
        -Math.PI / 2 +
        Math.atan2(this.camPos[1] - player.y, this.camPos[0] - player.x);

      mat4.identity(this.modelMatrix);
      mat4.translate(this.modelMatrix, this.modelMatrix, [
        player.x,
        player.y,
        player.z + 2.05,
      ]);
      mat4.rotateZ(this.modelMatrix, ang);
      mat4.scale(this.modelMatrix, [0.005, 1, 0.005]);
      gl.uniformMatrix4fv(this.uModelMat, false, this.modelMatrix);

      gl.bindTexture(gl.TEXTURE_2D, player.nametag.texture);
      this.drawBuffer(player.nametag.model);
    }

    gl.disable(gl.BLEND);

    mat4.identity(this.modelMatrix);
    gl.uniformMatrix4fv(this.uModelMat, false, this.modelMatrix);
  }

  // buildPlayerName( nickname )
  //
  // Returns the texture and vertex buffer for drawing the name
  // tag of the specified player.
  buildPlayerName(nickname) {
    var gl = this.gl;
    var canvas = this.textCanvas;
    var ctx = this.textContext;

    nickname = nickname
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/, '"');

    var w = ctx.measureText(nickname).width + 16;
    var h = 45;

    // Draw text box
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, w, 45);

    ctx.fillStyle = "#fff";
    ctx.fillText(nickname, 10, 20);

    // Create texture
    var tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    // Create model
    var vertices = [
      -w / 2,
      0,
      h,
      w / 256,
      0,
      1,
      1,
      1,
      0.7,
      w / 2,
      0,
      h,
      0,
      0,
      1,
      1,
      1,
      0.7,
      w / 2,
      0,
      0,
      0,
      h / 64,
      1,
      1,
      1,
      0.7,
      w / 2,
      0,
      0,
      0,
      h / 64,
      1,
      1,
      1,
      0.7,
      -w / 2,
      0,
      0,
      w / 256,
      h / 64,
      1,
      1,
      1,
      0.7,
      -w / 2,
      0,
      h,
      w / 256,
      0,
      1,
      1,
      1,
      0.7,
    ];

    var buffer = gl.createBuffer();
    buffer.vertices = vertices.length / 9;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    return {
      texture: tex,
      model: buffer,
    };
  }

  // pickAt( min, max, mx, myy )
  //
  // Returns the block at mouse position mx and my.
  // The blocks that can be reached lie between min and max.
  //
  // Each side is rendered with the X, Y and Z position of the
  // block in the RGB color values and the normal of the side is
  // stored in the color alpha value. In that way, all information
  // can be retrieved by simply reading the pixel the mouse is over.
  //
  // WARNING: This implies that the level can never be larger than
  // 254x254x254 blocks! (Value 255 is used for sky.)
  pickAt(min, max, mx, my) {
    var gl = this.gl;
    var world = this.world;

    // Create framebuffer for picking render
    var fbo = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);

    var bt = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, bt);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      512,
      512,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      null
    );

    var renderbuffer = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, renderbuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, 512, 512);

    gl.framebufferTexture2D(
      gl.FRAMEBUFFER,
      gl.COLOR_ATTACHMENT0,
      gl.TEXTURE_2D,
      bt,
      0
    );
    gl.framebufferRenderbuffer(
      gl.FRAMEBUFFER,
      gl.DEPTH_ATTACHMENT,
      gl.RENDERBUFFER,
      renderbuffer
    );

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
    gl.bindTexture(gl.TEXTURE_2D, this.texWhite);

    gl.viewport(0, 0, 512, 512);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    this.drawBuffer(buffer);

    // Read pixel
    var pixel = new Uint8Array(4);
    gl.readPixels(
      (mx / gl.viewportWidth) * 512,
      (1 - my / gl.viewportHeight) * 512,
      1,
      1,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      pixel
    );

    // Reset states
    gl.bindTexture(gl.TEXTURE_2D, this.texTerrain);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.clearColor(0.62, 0.81, 1.0, 1.0);

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
        n: normal,
      };
    } else {
      return false;
    }
  }

  // updateViewport()
  //
  // Check if the viewport is still the same size and update
  // the render configuration if required.
  updateViewport() {
    var gl = this.gl;
    var canvas = this.canvas;

    if (
      canvas.clientWidth != gl.viewportWidth ||
      canvas.clientHeight != gl.viewportHeight
    ) {
      gl.viewportWidth = canvas.clientWidth;
      gl.viewportHeight = canvas.clientHeight;

      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;

      // Update perspective projection based on new w/h ratio
      this.setPerspective(this.fov, this.min, this.max);
    }
  }

  // loadShaders()
  //
  // Takes care of loading the shaders.
  loadShaders() {
    var gl = this.gl;

    // Create shader program
    var program = (this.program = gl.createProgram());

    // Compile vertex shader
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexSource);
    gl.compileShader(vertexShader);
    gl.attachShader(program, vertexShader);

    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS))
      throw (
        "Could not compile vertex shader!\n" + gl.getShaderInfoLog(vertexShader)
      );

    // Compile fragment shader
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentSource);
    gl.compileShader(fragmentShader);
    gl.attachShader(program, fragmentShader);

    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS))
      throw (
        "Could not compile fragment shader!\n" +
        gl.getShaderInfoLog(fragmentShader)
      );

    // Finish program
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS))
      throw "Could not link the shader program!";

    gl.useProgram(program);

    // Store variable locations
    this.uProjMat = gl.getUniformLocation(program, "uProjMatrix");
    this.uViewMat = gl.getUniformLocation(program, "uViewMatrix");
    this.uModelMat = gl.getUniformLocation(program, "uModelMatrix");
    this.uSampler = gl.getUniformLocation(program, "uSampler");
    this.aPos = gl.getAttribLocation(program, "aPos");
    this.aColor = gl.getAttribLocation(program, "aColor");
    this.aTexCoord = gl.getAttribLocation(program, "aTexCoord");

    // Enable input
    gl.enableVertexAttribArray(this.aPos);
    gl.enableVertexAttribArray(this.aColor);
    gl.enableVertexAttribArray(this.aTexCoord);
  }

  // setWorld( world, chunkSize )
  //
  // Makes the renderer start tracking a new world and set up the chunk structure.
  //
  // world - The world object to operate on.
  // chunkSize - X, Y and Z dimensions of each chunk, doesn't have to fit exactly inside the world.
  setWorld(world, chunkSize) {
    this.world = world;
    world.renderer = this;
    this.chunkSize = chunkSize;

    // Create chunk list
    var chunks = (this.chunks = []);
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
  }

  // onBlockChanged( x, y, z )
  //
  // Callback from world to inform the renderer of a changed block
  onBlockChanged(x, y, z) {
    var chunks = this.chunks;

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
  }

  buildChunks(count) {
    var gl = this.gl;
    var chunks = this.chunks;
    var world = this.world;

    for (var i = 0; i < chunks.length; i++) {
      var chunk = chunks[i];

      if (chunk.dirty) {
        var vertices = [];

        // Create map of lowest blocks that are still lit
        var lightmap = {};
        for (var x = chunk.start[0] - 1; x < chunk.end[0] + 1; x++) {
          lightmap[x] = {};

          for (var y = chunk.start[1] - 1; y < chunk.end[1] + 1; y++) {
            for (var z = world.sz - 1; z >= 0; z--) {
              lightmap[x][y] = z;
              if (!world.getBlock(x, y, z).transparent) break;
            }
          }
        }

        // Add vertices for blocks
        for (var x = chunk.start[0]; x < chunk.end[0]; x++) {
          for (var y = chunk.start[1]; y < chunk.end[1]; y++) {
            for (var z = chunk.start[2]; z < chunk.end[2]; z++) {
              if (world.blocks[x][y][z] == BLOCK.AIR) continue;
              BLOCK.pushVertices(vertices, world, lightmap, x, y, z);
            }
          }
        }

        // Create WebGL buffer
        if (chunk.buffer) gl.deleteBuffer(chunk.buffer);

        var buffer = (chunk.buffer = gl.createBuffer());
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
  }

  // setPerspective( fov, min, max )
  //
  // Sets the properties of the perspective projection.
  setPerspective(fov, min, max) {
    var gl = this.gl;

    this.fov = fov;
    this.min = min;
    this.max = max;

    mat4.perspective(
      this.projMatrix,
      fov,
      gl.viewportWidth / gl.viewportHeight,
      min,
      max
    );
    gl.uniformMatrix4fv(this.uProjMat, false, this.projMatrix);
  }

  // setCamera( pos, ang )
  //
  // Moves the camera to the specified orientation.
  //
  // pos - Position in world coordinates.
  // ang - Pitch, yaw and roll.
  setCamera(pos, ang) {
    var gl = this.gl;

    this.camPos = pos;

    mat4.identity(this.uViewMat);

    mat4.rotate(
      this.uViewMat,
      -ang[0] - Math.PI / 2,
      [1, 0, 0],
      this.uViewMat
    );
    mat4.rotate(this.uViewMat, ang[1], [0, 0, 1], this.uViewMat);
    mat4.rotate(this.uViewMat, -ang[2], [0, 1, 0], this.uViewMat);

    mat4.translate(
      this.uViewMat,
      [-pos[0], -pos[1], -pos[2]],
      this.uViewMat
    );

    gl.uniformMatrix4fv(this.uViewMat, false, this.uViewMat);
  }

  drawBuffer(buffer) {
    var gl = this.gl;

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

    gl.vertexAttribPointer(this.aPos, 3, gl.FLOAT, false, 9 * 4, 0);
    gl.vertexAttribPointer(this.aColor, 4, gl.FLOAT, false, 9 * 4, 5 * 4);
    gl.vertexAttribPointer(this.aTexCoord, 2, gl.FLOAT, false, 9 * 4, 3 * 4);

    gl.drawArrays(gl.TRIANGLES, 0, buffer.vertices);
  }
}

// buildChunks( count )
//
// Build up to <count> dirty chunks.

export function pushQuad(v, p1, p2, p3, p4) {
  v.push(p1[0], p1[1], p1[2], p1[3], p1[4], p1[5], p1[6], p1[7], p1[8]);
  v.push(p2[0], p2[1], p2[2], p2[3], p2[4], p2[5], p2[6], p2[7], p2[8]);
  v.push(p3[0], p3[1], p3[2], p3[3], p3[4], p3[5], p3[6], p3[7], p3[8]);

  v.push(p3[0], p3[1], p3[2], p3[3], p3[4], p3[5], p3[6], p3[7], p3[8]);
  v.push(p4[0], p4[1], p4[2], p4[3], p4[4], p4[5], p4[6], p4[7], p4[8]);
  v.push(p1[0], p1[1], p1[2], p1[3], p1[4], p1[5], p1[6], p1[7], p1[8]);
}
