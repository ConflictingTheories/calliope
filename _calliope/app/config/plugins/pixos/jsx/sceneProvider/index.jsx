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

// Shaders
import fs from "../shaders/fs";
import vs from "../shaders/vs";

// Pixos
import World from "../engine/world";

// Instance
const impl = {};

// Scene Object
const scene = {
  // Shaders
  shaders: {
    fs: fs(),
    vs: vs(),
  },
};

// Init Scene
scene.init = (engine) => {
  // game Engine & Timing
  impl.engine = engine;
  impl.squareRotation = 0;
  impl.from = null;

  // Init Game Engine Components
  let world = (impl.world = new World());
  world.loadZone("dungeon-top");
  world.loadZone("dungeon-bottom");
  world.zoneList.each(function (z) {
    z.runWhenLoaded(LoadScreen.onZoneLoaded);
  });
};

// Load Scene Textures
scene.loadTextures = (engine) => {
  let { gl } = engine;
  // Create 1px white texture for pure vertex color operations (e.g. picking)
  let white = new Uint8Array([255, 255, 255, 255]);
  impl.texWhite = engine.blankTexture(white, gl.TEXTURE0);

  // Load Image Textures
  impl.texTerrain = engine.loadTexture("media/terrain.png");
  impl.texPlayer = engine.loadTexture("media/player.png");
};

// Render Loop
scene.render = (engine, now) => {
  // Draw Frame
  impl.world.tick(now);
  impl.world.draw();
  scene.draw(engine);

  // Update for next frame
  const deltaTime = impl.from === null ? 0 : now - impl.from;
  impl.from = now;
  impl.squareRotation += deltaTime * 0.001;
};

// Draw Scene
scene.draw = (engine) => {
  const { gl, programInfo } = engine;
  engine.clearScreen();
  engine.initPerspective(gl);
  impl.world.draw(engine);
};

// Keyboard handler for Scene
scene.onKeyEvent = (key, down) => {
  console.log("-----", key);
};

// Mouse Handler for Scene
scene.onMouseEvent = (x, y, type, rmb, e) => {
  console.log("mouse");
};

export default scene;
