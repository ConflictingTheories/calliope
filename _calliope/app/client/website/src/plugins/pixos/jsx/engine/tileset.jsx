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

import ActionQueue from "./queue";
export default class Tileset {
  constructor(engine) {
    this.engine = engine;
    this.src = null;
    this.sheetSize = [0, 0];
    this.tileSize = 0;
    this.tiles = {};
    this.loaded = false;
    this.onLoadActions = new ActionQueue();
    this.onDefinitionLoadActions = new ActionQueue();
    this.onTextureLoaded = this.onTextureLoaded.bind(this);
  }

  runWhenLoaded(action) {
    if (this.loaded) action();
    else this.onLoadActions.add(action);
  }

  // Actions to run after the tileset definition has loaded,
  // but before the texture is ready
  runWhenDefinitionLoaded(action) {
    if (this.definitionLoaded) action();
    else this.onDefinitionLoadActions.add(action);
  }

  // Received tileset definition JSON
  onJsonLoaded(data) {
    // Merge tileset definition into this object
    Object.keys(data).map((k) => {
      this[k] = data[k];
    });
    // Definition actions must always run before loaded actions
    this.definitionLoaded = true;
    this.onDefinitionLoadActions.run();
    // load texture
    this.texture = this.engine.loadTexture(this.src);
    this.texture.runWhenLoaded(this.onTextureLoaded);
    // set background colour
    if (this.bgColor)
      this.engine.gl.clearColor(this.bgColor[0] / 255, this.bgColor[1] / 255, this.bgColor[2] / 255, 1.0);
  }

  // run when loaded
  onTextureLoaded() {
    console.log("Initialized tileset '" + this.name + "'");
    this.loaded = true;
    this.onLoadActions.run();
  }

  // Get vertices for tile
  getTileVertices(id, offset) {
    return this.tileGeometry[id].vertices
      .map((poly) => poly.map((vertex) => [vertex[0] + offset[0], vertex[1] + offset[1], vertex[2] + offset[2]]))
      .flat(3);
  }

  // get texture coordinates
  getTileTexCoords(id, texId) {
    let tileOffset = this.tiles[texId];
    let size = [this.tileSize / this.sheetSize[0], this.tileSize / this.sheetSize[1]];
    return this.tileGeometry[id].tiles.map((poly) => poly.map((vertex) => [(vertex[0] + tileOffset[0]) * size[0], (vertex[1] + tileOffset[1]) * size[1]])).flat(3);
  }

  // determine walkability
  getWalkability(tileId) {
    return this.tileGeometry[tileId].type;
  }

  // get poly for walk
  getTileWalkPoly(tileId) {
    return this.tileGeometry[tileId].w;
  }
}
