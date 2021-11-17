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
  // Character art from http://opengameart.org/content/twelve-16x18-rpg-character-sprites-including-npcs-and-elementals
  src: Resources.artResourceUrl("elementals.gif"),
  sheetSize: [64, 128],
  tileSize: [16, 18],
  // Frame Positions
  frames: {
    up: [
      [0, 54],
      [16, 54],
      [32, 54],
      [48, 54],
    ],
    right: [
      [0, 72],
      [16, 72],
      [32, 72],
      [16, 72],
    ],
    down: [
      [0, 90],
      [16, 90],
      [32, 90],
      [16, 90],
    ],
    left: [
      [48, 54],
      [48, 72],
      [48, 90],
      [48, 72],
    ],
  },
  // Offsets
  drawOffset: new Vector(0, 1, 0.2),
  hotspotOffset: new Vector(0.5, 0.5, 0),
};
