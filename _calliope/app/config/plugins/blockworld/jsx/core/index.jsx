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
import BitWorldEngine from "./engine";

// Bitworld Engine Components
const { World, Renderer, Physics, Player } = BitWorldEngine;

// Splash Screen
export default function Bitworld({ networkString }) {
  const canvasRef = useRef();
  const selectorRef = useRef();

  useEffect(() => {
    // Initialize Blockword
    let loop = initializeWorld(canvasRef, selectorRef, networkString);
    // Cleanup when done
    return () => {
      cancelAnimationFrame(loop);
    };
  }, [canvasRef, selectorRef, networkString]);
  
  return (
    <div className="bitworld">
      <canvas className="renderSurface" ref={canvasRef} />
      <table className="materialSelector" ref={selectorRef}>
        <tr></tr>
      </table>
    </div>
  );
}

// Initialize the World
function initializeWorld(canvasRef, selectorRef, networkString) {
  // Build World
  var world = new World(16, 16, 16);
  if (networkString && networkString !== "") {
    try {
      world.createFromString(networkString);
    } catch (e) {
      world.createFlatWorld(6);
      console.error(e);
    }
  } else {
    world.createFlatWorld(6);
  }
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
  return mainLoop(physics, player, render);
}

// Run the Main Game Loop on the World
function mainLoop(physics, player, render) {
  // Render loop
  return requestAnimationFrame(() => {
    // Simulate physics
    physics.simulate();
    // Update local player
    player.update();
    // Build a chunk
    render.buildChunks(1);
    // Draw world
    render.setCamera(player.getEyePos().toArray(), player.angles);
    render.draw();
  });
}
