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

import { DIRECTION } from "../enums";
export default {
  id: 2,
  spawnable: true,
  transparent: false,
  selflit: false,
  gravity: false,
  fluid: false,
  texture: (world, lightmap, lit, x, y, z, dir) => {
    if (dir == DIRECTION.UP && lit) return [14 / 16, 0 / 16, 15 / 16, 1 / 16];
    else if (dir == DIRECTION.DOWN || !lit)
      return [2 / 16, 0 / 16, 3 / 16, 1 / 16];
    else return [3 / 16, 0 / 16, 4 / 16, 1 / 16];
  },
};
