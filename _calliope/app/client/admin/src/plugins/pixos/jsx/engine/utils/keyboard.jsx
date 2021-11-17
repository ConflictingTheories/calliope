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

export default class Keyboard {
  constructor() {
    // Instance
    if (!Keyboard._instance) {
      this.activeKeys = [];
      this.shift = false;
      Keyboard._instance = this;
    }
    return Keyboard._instance;
  }

  onKeyDown(e) {
    let c = String.fromCharCode(e.keyCode).toLowerCase();
    if (Keyboard._instance.activeKeys.indexOf(c) < 0) Keyboard._instance.activeKeys.push(c);
    Keyboard._instance.shift = e.shiftKey;
  }

  onKeyUp(e) {
    let c = String.fromCharCode(e.keyCode).toLowerCase();
    let index = Keyboard._instance.activeKeys.indexOf(c);
    Keyboard._instance.activeKeys.splice(index, 1);
  }

  // Return the last pressed key in keys
  lastPressed(keys) {
    let lower = keys.toLowerCase();
    let max = null;
    let maxI = -1;
    for (let i = 0; i < keys.length; i++) {
      let k = lower[i];
      let index = Keyboard._instance.activeKeys.indexOf(k);
      if (index > maxI) {
        max = k;
        maxI = index;
      }
    }
    return max;
  }
}
