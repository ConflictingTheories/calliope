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

export default class Actor {
  constructor() {
    this.templateLoaded = false;
    this.drawOffset = vec3.create();
    this.hotspotOffset = vec3.create();
    this.animFrame = 0;
    this.pos = vec3.create();
    this.facing = Direction.RIGHT;
    this.activityDict = {};
    this.activityList = [];
    this.onLoadActions = new ActionQueue();
  }

  runWhenLoaded(a) {
    if (this.loaded) a();
    else this.onLoadActions.add(a);
  }

  onLoad(instanceData) {
    if (this.loaded) return;

    if (!this.src || !this.sheetSize || !this.tileSize || !this.frames) {
      console.error("Invalid actor definition");
      return;
    }

    this.zone = instanceData.zone;
    if (instanceData.id) this.id = instanceData.id;
    if (instanceData.pos) vec3.set(instanceData.pos, this.pos);
    if (instanceData.facing) this.facing = instanceData.facing;

    this.texture = renderer.loadTexture(this.src);
    this.texture.runWhenLoaded(this.onTilesetOrTextureLoaded.bind(this));
    this.vertexTexBuf = renderer.createBuffer(
      this.getTexCoords(),
      gl.DYNAMIC_DRAW,
      2
    );

    this.zone.tileset.runWhenDefinitionLoaded(
      this.onTilesetDefinitionLoaded.bind(this)
    );
  }

  onTilesetDefinitionLoaded() {
    let s = this.zone.tileset.tileSize;
    let ts = [this.tileSize[0] / s, this.tileSize[1] / s];
    let v = [
      [0, 0, 0],
      [ts[0], 0, 0],
      [ts[0], 0, ts[1]],
      [0, 0, ts[1]],
    ];
    let poly = [
      [v[2], v[3], v[0]],
      [v[2], v[0], v[1]],
    ].flatten();
    this.vertexPosBuf = renderer.createBuffer(poly, gl.STATIC_DRAW, 3);

    this.zone.tileset.runWhenLoaded(this.onTilesetOrTextureLoaded.bind(this));
  }

  onTilesetOrTextureLoaded() {
    if (this.loaded || !this.zone.tileset.loaded || !this.texture.loaded)
      return;

    this.init(); // Hook for actor implementations
    this.loaded = true;
    console.log(
      "Initialized actor '" + this.id + "' in zone '" + this.zone.id + "'"
    );

    this.onLoadActions.run();
  }

  getTexCoords(i) {
    let t =
      this.frames[Direction.actorSequence(this.facing)][this.animFrame % 4];
    let ss = this.sheetSize;
    let ts = this.tileSize;
    let bl = [(t[0] + ts[0]) / ss[0], t[1] / ss[1]];
    let tr = [t[0] / ss[0], (t[1] + ts[1]) / ss[1]];
    let v = [bl, [tr[0], bl[1]], tr, [bl[0], tr[1]]];
    let poly = [
      [v[0], v[1], v[2]],
      [v[0], v[2], v[3]],
    ];
    return poly.flatten();
  }

  draw(engine) {
    if (!this.loaded) return;

    engine.mvPushMatrix();
    translate(mvMatrix, this.pos);

    // Undo rotation so that character plane is normal to LOS
    translate(mvMatrix, this.drawOffset);
    rotate(mvMatrix, engine.degToRad(renderer.cameraAngle), [1, 0, 0]);
    engine.bindBuffer(
      this.vertexPosBuf,
      shaderProgram.vertexPositionAttribute
    );
    engine.bindBuffer(this.vertexTexBuf, shaderProgram.textureCoordAttribute);
    engine.bindTexture(this.texture);
    shaderProgram.setMatrixUniforms();

    // Actors always render on top of everything behind them
    gl.depthFunc(gl.ALWAYS);
    gl.drawArrays(gl.TRIANGLES, 0, this.vertexPosBuf.numItems);
    gl.depthFunc(gl.LESS);

    engine.mvPopMatrix();
  }

  setFrame(frame) {
    this.animFrame = frame;
    renderer.updateBuffer(this.vertexTexBuf, this.getTexCoords());
  }

  setFacing(facing) {
    this.facing = facing;
    this.setFrame(this.animFrame);
  }

  addActivity(a) {
    if (this.activityDict[a.id]) this.removeActivity(a.id);

    this.activityDict[a.id] = a;
    this.activityList.push(a);
  }

  removeActivity(id) {
    this.activityList.erase(this.activityDict[id]);
    delete this.activityDict[id];
  }

  tickOuter(time) {
    if (!this.loaded) return;

    // Sort activities by increasing startTime, then by id
    this.activityList.sort(function (a, b) {
      let dt = a.startTime - b.startTime;
      if (!dt) return dt;
      return a.id > b.id ? 1 : -1;
    });

    let toRemove = [];
    this.activityList.each(function (a) {
      if (!a.loaded || a.startTime > time) return;

      // Activity returns true when it is complete
      if (a.tick(time)) toRemove.push(a);
    });

    toRemove.each(
      function (a) {
        this.removeActivity(a.id);
      }.bind(this)
    );

    if (this.tick) this.tick(time);
  }

  // Hook for actor implementations
  init() {}
}

// directions
const Direction = {
  None: 0,
  Right: 1,
  Up: 2,
  Left: 4,
  Down: 8,
  All: 15,

  fromOffset(dp) {
    if (dp[0] > 0) return Direction.Right;
    if (dp[0] < 0) return Direction.Left;
    if (dp[1] > 0) return Direction.Down;
    if (dp[1] < 0) return Direction.Up;
    return 0;
  },

  toOffset(dir) {
    switch (dir) {
      case Direction.Right:
        return [1, 0];
      case Direction.Up:
        return [0, -1];
      case Direction.Left:
        return [-1, 0];
      case Direction.Down:
        return [0, 1];
    }
    return [0, 0];
  },

  reverse(dir) {
    switch (dir) {
      case Direction.Right:
        return Direction.Left;
      case Direction.Up:
        return Direction.Down;
      case Direction.Left:
        return Direction.Right;
      case Direction.Down:
        return Direction.Up;
    }
    return Direction.None;
  },

  actorSequence(dir) {
    switch (dir) {
      case Direction.Right:
        return "right";
      case Direction.Up:
        return "up";
      case Direction.Left:
        return "left";
      case Direction.Down:
        return "down";
    }
    return "down";
  },
};
