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

export default {
  id: 1,
  spawnable: false,
  transparent: false,
  texture: function (world, lightmap, lit, x, y, z, dir) {
    return [1 / 16, 1 / 16, 2 / 16, 2 / 16];
  },
};
