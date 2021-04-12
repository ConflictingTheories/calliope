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

import React, { useRef, useEffect } from "react";

import { World } from "./world";
import { Player } from "./player";
import { Renderer } from "./render";
import { Physics } from "./physics";

// Splash Screen
export default function Bitworld({ networkString }) {
  // Initialize Canvas for Theme
  const casvasRef = useRef();
  const selectorRef = useRef();
  // Pass Handlers
  useEffect(() => {
    initializeWorld(casvasRef, selectorRef);
  });

  return (
    <div className="bitworld">
      <canvas class="renderSurface" ref={canvasRef} />
      <table class="materialSelector" ref={selectorRef}>
        <tr></tr>
      </table>
    </div>
  );
}

// Initialize the World
function initializeWorld(canvasRef, selectorRef) {
  // Build World
  var world = new World(16, 16, 16);
  world.createFlatWorld(6);

  // Renderer
  var render = new Renderer(canvasRef);
  render.setWorld(world, 8);
  render.setPerspective(60, 0.01, 200);

  // Create physics simulator
  var physics = new Physics();
  physics.setWorld(world);

  // Create new local player
  var player = new Player();
  player.setWorld(world);
  player.setInputCanvas(canvasRef);
  player.setMaterialSelector(selectorRef);

  // Run Game Loop
  mainLoop(physics, player, render);
}

// Run the Main Game Loop on the World
function mainLoop(physics, player, render) {
  // Render loop
  setInterval(function () {
    var time = new Date().getTime() / 1000.0;

    // Simulate physics
    physics.simulate();

    // Update local player
    player.update();

    // Build a chunk
    render.buildChunks(1);

    // Draw world
    render.setCamera(player.getEyePos().toArray(), player.angles);
    render.draw();

    while (new Date().getTime() / 1000 - time < 0.016);
  }, 1);
}
