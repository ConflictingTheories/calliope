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

export default class World {
  constructor() {
    this.zoneDict = {};
    this.zoneList = [];
    this.afterTickActions = new ActionQueue();
  }

  runAfterTick(a) {
    this.afterTickActions.add(a);
  }

  // Sort zones for correct render order
  sortZones() {
    this.zoneList.sort(function (a, b) {
      return a.bounds[1] - b.bounds[1];
    });
  }

  loadZone(zoneId) {
    if (this.zoneDict[zoneId]) return this.zoneDict[zoneId];

    let z = new Zone(zoneId);
    this.zoneDict[zoneId] = z;
    this.zoneList.push(z);

    // Sort for correct render order
    z.runWhenLoaded(this.sortZones.bind(this));
    return z;
  }

  removeZone(zoneId) {
    this.actorList.erase(this.zoneDict[zoneId]);
    delete this.zoneDict[zoneId];
  }

  tick(time) {
    for (let z in this.zoneDict) this.zoneDict[z].tick(time);

    this.afterTickActions.run(time);
  }

  draw(engine) {
    for (let z in this.zoneDict) this.zoneDict[z].draw(engine);
  }

  zoneContaining(x, y) {
    for (let z in this.zoneDict) {
      let zone = this.zoneDict[z];
      if (zone.loaded && zone.isInZone(x, y)) return zone;
    }
    return null;
  }
}
