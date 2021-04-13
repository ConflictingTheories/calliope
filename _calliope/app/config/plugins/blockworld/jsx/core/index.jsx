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

  let player,
    render,
    physics,
    world = null;

  // Initialize the World
  useEffect(() => {
    if (!player || !render || !physics || !world) {
      let init = initializeWorld(canvasRef, selectorRef, networkString);
      player = init.player;
      render = init.render;
      physics = init.physics;
      world = init.world;
    }
  }, [canvasRef, selectorRef, networkString]);

  // Render Game Loop
  useEffect(() => {
    let frameCount = 0;
    let loop = mainLoop(player, render, physics, frameCount);
    return () => {
      cancelAnimationFrame(loop);
    };
  }, []);

  return (
    <div className="bitworld">
      <canvas
        className="renderSurface"
        ref={canvasRef}
        onKeyDown={player ? player.playerKeyDownHandler : null}
        onKeyUp={player ? player.playerKeyUpHandler : null}
        onMouseMove={player ? player.playerMouseMoveHandler : null}
        onMouseUp={player ? player.playerMouseUpHandler : null}
        onMouseDown={player ? player.playerMouseDownHandler : null}
      />
      <table className="materialSelector" ref={selectorRef}>
        <tr></tr>
      </table>
    </div>
  );
}

function mainLoop(player, render, physics, frameCount) {
  // Simulate physics
  if (physics) physics.simulate();
  // Update local player
  if (player) player.update();
  // Draw world
  if (render) {
    render.buildChunks(1);
    render.setCamera(player.getEyePos().toArray(), player.angles);
    render.draw();
  }
  // Loop
  frameCount++;
  return requestAnimationFrame(() =>
    mainLoop(player, render, physics, frameCount)
  );
}

// Initialize the World
function initializeWorld(canvasRef, selectorRef, networkString) {
  console.log("--INITIATLIZATION");
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
  return {
    player,
    render,
    physics,
    world,
  };
}
