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
import useWebGL from "@nvd/use-webgl/dist";
import BitWorldEngine from "./engine";

// Bitworld Engine Components
const { World, Renderer, Physics, Player } = BitWorldEngine;

// Splash Screen
export default function Bitworld({ networkString }) {
  let selectorRef = useRef();

  let loop,
    render,
    world,
    physics,
    player = null;

  const [canvas, resizeCanvas] = useWebGL({
    width: 800,
    height: 800,
    onInit: (gl, canvas) => {
      // Create World
      world = new World(16, 16, 16);
      world.createFlatWorld(6);
      // Atttach Renderer to Canvas
      render = new Renderer(gl, canvas);
      render.setWorld(world, 8);
      render.setPerspective(60, 0.01, 200);
      // Create physics simulator
      physics = new Physics();
      physics.setWorld(world);
      // Create new local player
      player = new Player();
      player.setWorld(world);
      // player.setInputCanvas(canvas);
      // player.setMaterialSelector(selectorRef);

      // Game Loop
      (function mainLoop() {
        // Simulate physics
        physics.simulate();
        // Update local player
        player.update();
        // Draw world
        render.buildChunks(1);
        render.setCamera(player.getEyePos().toArray(), player.angles);
        render.draw();
        // 
        loop = requestAnimationFrame(mainLoop);
      })();
    },
  });

  return (
    <div onContextMenu={() => false} className="bitworld">
      {canvas}
      {/* <canvas className="renderSurface" ref={canvasRef} /> */}
      <table className="materialSelector" ref={selectorRef}>
        <tr></tr>
      </table>
    </div>
  );
}
