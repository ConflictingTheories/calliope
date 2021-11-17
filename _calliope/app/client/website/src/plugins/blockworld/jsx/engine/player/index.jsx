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

import { Vector, lineRectCollide, rectRectCollide } from "../utils/vector";
import BLOCK from "../blocks";
import { MOUSE } from "../utils/enums";

export default class Player {
  constructor(world, scene) {
    this.scene = scene;
    this.world = world;
    this.world.localPlayer = this;
    this.pos = world.spawnPoint;
    this.velocity = new Vector(0, 0, 0);
    this.angles = [0, Math.PI, 0];
    this.falling = false;
    this.keys = {};
    this.buildMaterial = BLOCK.DIRT;
    this.eventHandlers = {};
  }

  // Returns the position of the eyes of the player for rendering.
  getEyePos() {
    return this.pos.add(new Vector(0.0, 0.0, 1.7));
  }

  // Updates this local player (gravity, movement)
  update() {
    const { pos, velocity } = this;
    const bPos = new Vector(
      Math.floor(pos.x),
      Math.floor(pos.y),
      Math.floor(pos.z)
    );

    if (this.lastUpdate != null) {
      const delta = (new Date().getTime() - this.lastUpdate) / 1000;

      // View
      if (this.dragging) {
        this.angles[0] += (this.targetPitch - this.angles[0]) * 30 * delta;
        this.angles[1] += (this.targetYaw - this.angles[1]) * 30 * delta;
        if (this.angles[0] < -Math.PI / 2) this.angles[0] = -Math.PI / 2;
        if (this.angles[0] > Math.PI / 2) this.angles[0] = Math.PI / 2;
      }

      // Gravity
      if (this.falling) velocity.z += -0.5;

      // Jumping
      if (this.keys[" "] && !this.falling) velocity.z = 8;

      // Walking
      let walkVelocity = new Vector(0, 0, 0);
      if (!this.falling) {
        if (this.keys.w) {
          walkVelocity.x += Math.cos(Math.PI / 2 - this.angles[1]);
          walkVelocity.y += Math.sin(Math.PI / 2 - this.angles[1]);
        }
        if (this.keys.s) {
          walkVelocity.x += Math.cos(Math.PI + Math.PI / 2 - this.angles[1]);
          walkVelocity.y += Math.sin(Math.PI + Math.PI / 2 - this.angles[1]);
        }
        if (this.keys.a) {
          walkVelocity.x += Math.cos(
            Math.PI / 2 + Math.PI / 2 - this.angles[1]
          );
          walkVelocity.y += Math.sin(
            Math.PI / 2 + Math.PI / 2 - this.angles[1]
          );
        }
        if (this.keys.d) {
          walkVelocity.x += Math.cos(
            -Math.PI / 2 + Math.PI / 2 - this.angles[1]
          );
          walkVelocity.y += Math.sin(
            -Math.PI / 2 + Math.PI / 2 - this.angles[1]
          );
        }
      }
      if (walkVelocity.length() > 0) {
        walkVelocity = walkVelocity.normal();
        velocity.x = walkVelocity.x * 4;
        velocity.y = walkVelocity.y * 4;
      } else {
        velocity.x /= this.falling ? 1.01 : 1.5;
        velocity.y /= this.falling ? 1.01 : 1.5;
      }

      // Resolve collision
      this.pos = this.resolveCollision(pos, bPos, velocity.mul(delta));
    }

    this.lastUpdate = new Date().getTime();
  }

  // Perform Action on Block
  doBlockAction(x, y, destroy) {
    var bPos = new Vector(
      Math.floor(this.pos.x),
      Math.floor(this.pos.y),
      Math.floor(this.pos.z)
    );
    var block = this.scene.pickAt(
      new Vector(bPos.x - 4, bPos.y - 4, bPos.z - 4),
      new Vector(bPos.x + 4, bPos.y + 4, bPos.z + 4),
      x,
      y
    );

    if (block != false) {
      var obj = this.world;

      if (destroy) obj.setBlock(block.x, block.y, block.z, BLOCK.AIR);
      else
        obj.setBlock(
          block.x + block.n.x,
          block.y + block.n.y,
          block.z + block.n.z,
          this.buildMaterial
        );
    }
  }

  // Mouse Event handler for Player
  onMouseEvent(x, y, type, rmb) {
    if (type == MOUSE.DOWN) {
      this.dragStart = { x: x, y: y };
      this.mouseDown = true;
      this.yawStart = this.targetYaw = this.angles[1];
      this.pitchStart = this.targetPitch = this.angles[0];
    } else if (type == MOUSE.UP) {
      if (Math.abs(this.dragStart.x - x) + Math.abs(this.dragStart.y - y) < 4)
        this.doBlockAction(x, y, !rmb);

      this.dragging = false;
      this.mouseDown = false;
    } else if (type == MOUSE.MOVE && this.mouseDown) {
      this.dragging = true;
      this.targetPitch = this.pitchStart - (y - this.dragStart.y) / 200;
      this.targetYaw = this.yawStart + (x - this.dragStart.x) / 200;
    }
  }

  // key Event Handler for Player
  onKeyEvent(key, down) {
    this.keys[key] = down;
    if (!down && key == "t" && this.eventHandlers["openChat"])
      this.eventHandlers.openChat();
  }

  // Resolves collisions between the player and blocks on XY level for the next movement step.
  resolveCollision(pos, bPos, velocity) {
    const { world } = this;
    const playerRect = {
      x: pos.x + velocity.x,
      y: pos.y + velocity.y,
      size: 0.25,
    };

    // Collect XY collision sides
    let collisionCandidates = [];
    for (let x = bPos.x - 1; x <= bPos.x + 1; x++) {
      for (let y = bPos.y - 1; y <= bPos.y + 1; y++) {
        for (let { z } = bPos; z <= bPos.z + 1; z++) {
          if (world.getBlock(x, y, z) != BLOCK.AIR) {
            if (world.getBlock(x - 1, y, z) == BLOCK.AIR)
              collisionCandidates.push({ x, dir: -1, y1: y, y2: y + 1 });
            if (world.getBlock(x + 1, y, z) == BLOCK.AIR)
              collisionCandidates.push({ x: x + 1, dir: 1, y1: y, y2: y + 1 });
            if (world.getBlock(x, y - 1, z) == BLOCK.AIR)
              collisionCandidates.push({ y, dir: -1, x1: x, x2: x + 1 });
            if (world.getBlock(x, y + 1, z) == BLOCK.AIR)
              collisionCandidates.push({ y: y + 1, dir: 1, x1: x, x2: x + 1 });
          }
        }
      }
    }

    // Solve XY collisions
    for (const i in collisionCandidates) {
      const side = collisionCandidates[i];
      if (lineRectCollide(side, playerRect)) {
        if (side.x != null && velocity.x * side.dir < 0) {
          pos.x = side.x + (playerRect.size / 2) * (velocity.x > 0 ? -1 : 1);
          velocity.x = 0;
        } else if (side.y != null && velocity.y * side.dir < 0) {
          pos.y = side.y + (playerRect.size / 2) * (velocity.y > 0 ? -1 : 1);
          velocity.y = 0;
        }
      }
    }

    const playerFace = {
      x1: pos.x + velocity.x - 0.125,
      y1: pos.y + velocity.y - 0.125,
      x2: pos.x + velocity.x + 0.125,
      y2: pos.y + velocity.y + 0.125,
    };
    const newBZLower = Math.floor(pos.z + velocity.z);
    const newBZUpper = Math.floor(pos.z + 1.7 + velocity.z * 1.1);

    // Collect Z collision sides
    collisionCandidates = [];
    for (let x = bPos.x - 1; x <= bPos.x + 1; x++) {
      for (let y = bPos.y - 1; y <= bPos.y + 1; y++) {
        if (world.getBlock(x, y, newBZLower) != BLOCK.AIR)
          collisionCandidates.push({
            z: newBZLower + 1,
            dir: 1,
            x1: x,
            y1: y,
            x2: x + 1,
            y2: y + 1,
          });
        if (world.getBlock(x, y, newBZUpper) != BLOCK.AIR)
          collisionCandidates.push({
            z: newBZUpper,
            dir: -1,
            x1: x,
            y1: y,
            x2: x + 1,
            y2: y + 1,
          });
      }
    }

    // Solve Z collisions
    this.falling = true;
    for (const i in collisionCandidates) {
      const face = collisionCandidates[i];
      if (rectRectCollide(face, playerFace) && velocity.z * face.dir < 0) {
        if (velocity.z < 0) {
          this.falling = false;
          pos.z = face.z;
          velocity.z = 0;
          this.velocity.z = 0;
        } else {
          pos.z = face.z - 1.8;
          velocity.z = 0;
          this.velocity.z = 0;
        }

        break;
      }
    }

    // Return solution
    return pos.add(velocity);
  }
}
