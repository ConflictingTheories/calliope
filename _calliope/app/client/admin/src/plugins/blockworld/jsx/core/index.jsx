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
import { Renderer as Render } from "./engine/renderer";
// Bitworld Engine Components
const { World, Renderer, Physics, Player } = BitWorldEngine;
let loop,
  render,
  world,
  physics,
  player = null;

// Splash Screen
export default function Bitworld({ networkString }) {
  const canvasRef = useRef();
  const selectorRef = useRef();

  console.log("--INITIATLIZATION");

  useEffect(() => {
    world = new World(16, 16, 32);
    world.createFlatWorld(6);
    // Renderer
    render = new Render(canvasRef);
    render.setWorld(world, 8);
    render.setPerspective(60, 0.01, 200);
    // Create physics simulator
    physics = new Physics();
    physics.setWorld(world);
    // Create new local player
    player = new Player();
    player.setWorld(world);
    // player.setInputCanvas(canvasRef);
    // player.setMaterialSelector(selectorRef);
  }, [networkString]);

  let frameCount = 0;

  // Render Game Loop
  useEffect(
    function mainLoop() {
      // Simulate physics
      physics?.simulate();
      // Update local player
      player?.update();
      // Draw world
      render?.buildChunks(1);
      render?.setCamera(player.getEyePos().toArray(), player.angles);
      render?.draw();
      // Loop
      loop = requestAnimationFrame(mainLoop);
      frameCount++;
      // Cleanup
      return () => {
        cancelAnimationFrame(loop);
      };
    },
    [frameCount]
  );

  return (
    <div onContextMenu={() => false} className="bitworld">
      <canvas className="renderSurface" ref={canvasRef} />
      <table className="materialSelector" ref={selectorRef}>
        <tr></tr>
      </table>
    </div>
  );
}
