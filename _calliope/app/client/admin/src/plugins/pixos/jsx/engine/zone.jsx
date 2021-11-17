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
import { Direction } from "./utils/enums";
import Resources from "./utils/resources";
import ActionQueue from "./queue";
import { SpriteLoader, TilesetLoader } from "./utils/loaders";

export default class Zone {
  constructor(zoneId, world) {
    this.id = zoneId;
    this.world = world;
    this.data = {};
    this.spriteDict = {};
    this.spriteList = [];
    this.engine = world.engine;
    this.onLoadActions = new ActionQueue();
    this.spriteLoader = new SpriteLoader(world.engine);
    this.tsLoader = new TilesetLoader(world.engine);
    // bind
    this.onTilesetDefinitionLoaded = this.onTilesetDefinitionLoaded.bind(this);
    this.onTilesetOrSpriteLoaded = this.onTilesetOrSpriteLoaded.bind(this);
    this.loadSprite = this.loadSprite.bind(this);
  }

  // Load Map Resource from URL
  async loadRemote() {
    const fileResponse = await fetch(Resources.zoneRequestUrl(this.id));
    if (fileResponse.ok) {
      try {
        // Extract and Read in Information
        let data = await fileResponse.json();
        this.bounds = data.bounds;
        this.size = [data.bounds[2] - data.bounds[0], data.bounds[3] - data.bounds[1]];
        this.cells = data.cells;
        // Load tileset and create level geometry & trigger updates
        this.tileset = await this.tsLoader.load(data.tileset);
        this.tileset.runWhenDefinitionLoaded(this.onTilesetDefinitionLoaded.bind(this));
        this.tileset.runWhenLoaded(this.onTilesetOrSpriteLoaded.bind(this));
        // Load sprites from tileset
        await Promise.all(data.sprites.map(this.loadSprite));
        // Notify the zone sprites when the new sprite has loaded
        this.spriteList.forEach((sprite) => sprite.runWhenLoaded(this.onTilesetOrSpriteLoaded.bind(this)));
      } catch (e) {
        console.error("Error parsing zone " + this.id);
        console.error(e);
      }
    }
  }

  // Load Tileset Directly (precompiled)
  async load() {
    try {
      // Extract and Read in Information
      let data = require("../scene/maps/" + this.id + ".map.jsx")["default"];
      this.bounds = data.bounds;
      this.size = [data.bounds[2] - data.bounds[0], data.bounds[3] - data.bounds[1]];
      this.cells = data.cells;
      // Load tileset and create level geometry & trigger updates
      this.tileset = await this.tsLoader.load(data.tileset);
      this.tileset.runWhenDefinitionLoaded(this.onTilesetDefinitionLoaded.bind(this));
      this.tileset.runWhenLoaded(this.onTilesetOrSpriteLoaded.bind(this));
      // Load sprites from tileset
      await Promise.all(data.sprites.map(this.loadSprite));
      // Notify the zone sprites when the new sprite has loaded
      this.spriteList.forEach((sprite) => sprite.runWhenLoaded(this.onTilesetOrSpriteLoaded.bind(this)));
    } catch (e) {
      console.error("Error parsing zone " + this.id);
      console.error(e);
    }
  }

  // Actions to run when the map has loaded
  runWhenLoaded(action) {
    if (this.loaded) action();
    else this.onLoadActions.add(action);
  }

  // When tileset loads
  onTilesetDefinitionLoaded() {
    this.vertexPosBuf = [];
    this.vertexTexBuf = [];
    this.walkability = [];
    // Determine Walkability and Load Vertices
    for (let j = 0, k = 0; j < this.size[1]; j++) {
      let vertices = [];
      let vertexTexCoords = [];
      // Loop over Tiles
      for (let i = 0; i < this.size[0]; i++, k++) {
        let cell = this.cells[k];
        this.walkability[k] = Direction.All;
        let n = Math.floor(cell.length / 3);
        // Calc Walk, Vertex positions and Textures for each cell
        for (let l = 0; l < n; l++) {
          let tilePos = [this.bounds[0] + i, this.bounds[1] + j, cell[3 * l + 2]];
          this.walkability[k] &= this.tileset.getWalkability(cell[3 * l]);
          vertices = vertices.concat(this.tileset.getTileVertices(cell[3 * l], tilePos));
          vertexTexCoords = vertexTexCoords.concat(this.tileset.getTileTexCoords(cell[3 * l], cell[3 * l + 1]));
        }
        // Custom walkability
        if (cell.length == 3 * n + 1) this.walkability[k] = cell[3 * n];
      }
      this.vertexPosBuf[j] = this.engine.createBuffer(vertices, this.engine.gl.STATIC_DRAW, 3);
      this.vertexTexBuf[j] = this.engine.createBuffer(vertexTexCoords, this.engine.gl.STATIC_DRAW, 2);
    }
  }

  // run after each tileset / sprite is loaded
  onTilesetOrSpriteLoaded() {
    if (this.loaded || !this.tileset.loaded || !this.spriteList.every((sprite) => sprite.loaded)) return;
    console.log("Initialized zone '" + this.id + "'");
    this.loaded = true;
    this.onLoadActions.run();
  }

  // Load Sprite
  async loadSprite(data) {
    data.zone = this;
    let newSprite = await this.spriteLoader.load(data.type, (sprite) => sprite.onLoad(data));
    this.spriteDict[data.id] = newSprite;
    this.spriteList.push(newSprite);
  }

  // Add an existing sprite to the zone
  addSprite(sprite) {
    sprite.zone = this;
    this.spriteDict[sprite.id] = sprite;
    this.spriteList.push(sprite);
  }

  // Remove an sprite from the zone
  removeSprite(id) {
    this.spriteList = this.spriteList.filter((sprite) => sprite.id !== id);
    delete this.spriteDict[id];
  }

  // Calculate the height of a point in the zone
  getHeight(x, y) {
    if (!this.isInZone(x, y)) {
      console.error("Requesting height for [" + x + ", " + y + "] outside zone bounds");
      return 0;
    }

    let i = Math.floor(x);
    let j = Math.floor(y);
    let dp = [x - i, y - j];

    // Calculate point inside a triangle
    let getUV = (t, p) => {
      // Vectors relative to first vertex
      let u = [t[1][0] - t[0][0], t[1][1] - t[0][1]];
      let v = [t[2][0] - t[0][0], t[2][1] - t[0][1]];

      // Calculate basis transformation
      let d = 1 / (u[0] * v[1] - u[1] * v[0]);
      let T = [d * v[1], -d * v[0], -d * u[1], d * u[0]];

      // Return new coords
      u = (p[0] - t[0][0]) * T[0] + (p[1] - t[0][1]) * T[1];
      v = (p[0] - t[0][0]) * T[2] + (p[1] - t[0][1]) * T[3];
      return [u, v];
    };

    // Check if any of the tiles defines a custom walk polygon
    let cell = this.cells[(j - this.bounds[1]) * this.size[0] + i - this.bounds[0]];
    let n = Math.floor(cell.length / 3);
    for (let l = 0; l < n; l++) {
      let poly = this.tileset.getTileWalkPoly(cell[3 * l]);
      if (!poly) continue;

      // Loop over triangles
      for (let p = 0; p < poly.length; p++) {
        let uv = getUV(poly[p], dp);
        let w = uv[0] + uv[1];
        if (w <= 1) return cell[3 * l + 2] + (1 - w) * poly[p][0][2] + uv[0] * poly[p][1][2] + uv[1] * poly[p][2][2];
      }
    }

    // Use the height of the first tile in the cell
    return cell[2];
  }

  // Draw Row of Zone
  drawRow(row) {
    this.engine.bindBuffer(this.vertexPosBuf[row], this.engine.shaderProgram.vertexPositionAttribute);
    this.engine.bindBuffer(this.vertexTexBuf[row], this.engine.shaderProgram.textureCoordAttribute);
    this.tileset.texture.attach();
    this.engine.shaderProgram.setMatrixUniforms();
    this.engine.gl.drawArrays(this.engine.gl.TRIANGLES, 0, this.vertexPosBuf[row].numItems);
  }

  // Draw Frame
  draw() {
    if (!this.loaded) return;
    // Organize by Depth
    this.spriteList.sort((a, b) => a.pos.y - b.pos.y);
    this.engine.mvPushMatrix();
    this.engine.setCamera();
    // Draw Terrain
    let k = 0;
    for (let j = 0; j < this.size[1]; j++) {
      this.drawRow(j);
      while (k < this.spriteList.length && this.spriteList[k].pos.y - this.bounds[1] <= j) {
        this.spriteList[k++].draw(this.engine);
      }
    }
    // draw each Sprite
    while (k < this.spriteList.length) {
      this.spriteList[k++].draw(this.engine);
    }
    this.engine.mvPopMatrix();
  }

  // Update
  tick(time) {
    if (!this.loaded) return;
    this.spriteList.forEach((sprite) => sprite.tickOuter(time));
  }

  // Check for zone inclusion
  isInZone(x, y) {
    return x >= this.bounds[0] && y >= this.bounds[1] && x < this.bounds[2] && y < this.bounds[3];
  }

  // Cell Walkable
  isWalkable(x, y, direction) {
    if (!this.isInZone(x, y)) return null;
    return (this.walkability[(y - this.bounds[1]) * this.size[0] + x - this.bounds[0]] & direction) != 0;
  }
}
