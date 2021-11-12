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

export default class Texture {
  constructor(src, engine) {
    this.gl = engine.gl;
    this.src = src;
    this.glTexture = engine.gl.createTexture();
    this.image = new Image();
    this.image.onload = this.onImageLoaded.bind(this);
    this.image.src = src;
    this.loaded = false;
    this.onLoadActions = new ActionQueue();
  }

  runWhenLoaded(a) {
    if (this.loaded) a();
    else this.onLoadActions.add(a);
  }

  onImageLoaded(gl) {
    console.log("loaded image '" + this.src + "'");
    gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      this.image
    );
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.bindTexture(gl.TEXTURE_2D, null);

    this.loaded = true;
    this.onLoadActions.run();
  }

  bind(gl) {
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
    gl.uniform1i(shaderProgram.samplerUniform, 0);
  }
}
