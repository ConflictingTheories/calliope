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

import { Vector } from "../../../engine/utils/math/vector";
import Resources from "../../../engine/utils/resources";

export default {
  src: Resources.artResourceUrl("elementals.gif"),
  sheetSize: [64, 128],
  tileSize: [16, 18],
  // Frame Locations
  frames: {
    up: [
      [0, 0],
      [16, 0],
      [32, 0],
      [48, 0],
    ],
    right: [
      [0, 18],
      [16, 18],
      [32, 18],
      [16, 18],
    ],
    down: [
      [0, 36],
      [16, 36],
      [32, 36],
      [16, 36],
    ],
    left: [
      [48, 0],
      [48, 18],
      [48, 36],
      [48, 18],
    ],
  },
  // offsets
  drawOffset: new Vector(0, 1, 0.2),
  hotspotOffset: new Vector(0.5, 0.5, 0),
};
