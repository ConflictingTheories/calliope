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

export default class Tileset {
  constructor() {
    this.src = null;
    this.sheetSize = [0, 0];
    this.tileSize = 0;
    this.tiles = {};
    this.loaded = false;
    this.onLoadActions = new ActionQueue();
    this.onDefinitionLoadActions = new ActionQueue();
  }

  runWhenLoaded(a) {
    if (this.loaded) a();
    else this.onLoadActions.add(a);
  }

  // Actions to run after the tileset definition has loaded,
  // but before the texture is ready
  runWhenDefinitionLoaded(a) {
    if (this.definitionLoaded) a();
    else this.onDefinitionLoadActions.add(a);
  }

  // Received tileset definition JSON
  onJsonLoaded(data) {
    // Merge tileset definition into this object
    Object.merge(this, data);

    // Definition actions must always run before loaded actions
    this.definitionLoaded = true;
    this.onDefinitionLoadActions.run();

    this.texture = renderer.loadTexture(this.src);
    this.texture.runWhenLoaded(this.onTextureLoaded.bind(this));

    if (this.bgColor)
      gl.clearColor(
        this.bgColor[0] / 255,
        this.bgColor[1] / 255,
        this.bgColor[2] / 255,
        1.0
      );
  }

  onTextureLoaded() {
    this.loaded = true;
    debug.log("Initialized tileset '" + this.name + "'");

    this.onLoadActions.run();
  }

  getTileVertices(id, offset) {
    return this.tileGeometry[id].v
      .map(function (poly) {
        return poly.map(function (v) {
          return [v[0] + offset[0], v[1] + offset[1], v[2] + offset[2]];
        });
      })
      .flatten();
  }

  getWalkability(tileId) {
    return this.tileGeometry[tileId].d;
  }

  getTileWalkPoly(tileId) {
    return this.tileGeometry[tileId].w;
  }

  getTileTexCoords(id, texId) {
    var o = this.tiles[texId];
    var s = [
      this.tileSize / this.sheetSize[0],
      this.tileSize / this.sheetSize[1],
    ];
    return this.tileGeometry[id].t
      .map(function (poly) {
        return poly.map(function (v) {
          return [(v[0] + o[0]) * s[0], (v[1] + o[1]) * s[1]];
        });
      })
      .flatten();
  }
}


