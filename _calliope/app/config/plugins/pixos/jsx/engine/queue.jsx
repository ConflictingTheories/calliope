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

export default class ActionQueue {
  constructor() {
    this.actions = [];
  }

  add(a) {
    this.actions.push(a);
  }

  run() {
    let args = arguments;
    this.actions = this.actions.filter(function (a) {
      return a(args);
    });
  }
}
