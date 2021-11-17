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

import { Vector, set, lerp } from "../../engine/utils/math/vector";
import { Direction } from "../../engine/utils/enums";

export default {
  init: function (from, to, length) {
    console.log("loading - move");
    this.from = new Vector(...from);
    this.to = new Vector(...to);
    this.facing = Direction.fromOffset([Math.round(to.x - from.x), Math.round(to.y - from.y)]);
    this.length = length;
  },
  tick: function (time) {
    if (!this.loaded) return;
    // Set facing
    if (this.facing && this.facing != this.sprite.facing) this.sprite.setFacing(this.facing);
    // Transition & Move
    let endTime = this.startTime + this.length;
    let frac = (time - this.startTime) / this.length;
    if (time >= endTime) {
      set(this.to, this.sprite.pos);
      frac = 1;
    } else lerp(this.from, this.to, frac, this.sprite.pos);
    // Get next frame
    let newFrame = Math.floor(frac * 4);
    if (newFrame != this.sprite.animFrame) this.sprite.setFrame(newFrame);
    // Determine height
    let hx = this.sprite.pos.x + this.sprite.hotspotOffset.x;
    let hy = this.sprite.pos.y + this.sprite.hotspotOffset.y;
    this.sprite.pos.z = this.sprite.zone.getHeight(hx, hy);

    return time >= endTime;
  },
};
