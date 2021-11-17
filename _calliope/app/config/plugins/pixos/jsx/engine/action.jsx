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
export default class Action {
  constructor(type, sprite) {
    this.type = type;
    this.sprite = sprite;
    this.time = new Date().getTime();
    this.id = sprite.id + "-" + type + "-" + this.time;
  }
  // configure action
  configure(type, sprite, id, time, args) {
    this.sprite = sprite;
    this.id = id;
    this.type = type;
    this.startTime = time;
    this.creationArgs = args;
  }
  // initialize on load
  onLoad(args) {
    this.init.apply(this, args);
    this.loaded = true;
  }
  // serialize
  serialize() {
    return {
      id: this.id,
      time: this.startTime,
      zone: this.sprite.zone.id,
      sprite: this.sprite.id,
      type: this.type,
      args: this.creationArgs,
    };
  }
}
