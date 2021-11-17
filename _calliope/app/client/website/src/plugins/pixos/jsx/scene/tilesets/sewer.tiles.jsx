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

// Tile Types Supported (Labels for Easy Use)
export default {
  FLOOR: [0, 0, 0],
  LAVA: [1, 14, -1.5],
  EMPTY: [0, 20, 2],
  // Stairs
  N_STAIR: [0, 13, -1, 100, 102, -1, 104, 102, -1, 51, 50, -1],
  N_STAIRWALL: [0, 8, 0, 102, 101, 0, 15],
  S_STAIR: [0, 13, -1, 100, 102, -1, 104, 102, -1, 53, 50, -1],
  S_STAIRWALL: [0, 4, 0, 106, 100, 0, 15],
  L_STAIR: [0, 15, -1, 102, 102, -1, 106, 102, -1, 52, 50, -1],
  L_STAIRWALL: [0, 2, 0, 104, 101, 0, 15],
  R_STAIR: [0, 15, -1, 102, 102, -1, 106, 102, -1, 50, 50, -1],
  R_STAIRWALL: [0, 6, 0, 100, 101, 0, 15],
  // Walls
  N_WALL: [102, 100, 2, 0, 28, 2],
  S_WALL: [106, 100, 2, 0, 24, 2],
  L_WALL: [104, 100, 2, 0, 22, 2],
  R_WALL: [100, 100, 2, 0, 26, 2],
  // Corner Blend Empty
  NLW_CORNER: [0, 31, 2],
  NRW_CORNER: [0, 30, 2],
  SLW_CORNER: [0, 32, 2],
  SRW_CORNER: [0, 29, 2],
  // Columns (Wall Corners)
  NLW_COLUMN: [102, 100, 2, 104, 100, 2, 0, 21, 2],
  NRW_COLUMN: [100, 100, 2, 102, 100, 2, 0, 27, 2],
  SLW_COLUMN: [104, 100, 2, 106, 100, 2, 0, 23, 2],
  SRW_COLUMN: [100, 100, 2, 106, 100, 2, 0, 25, 2],
  // Columns over Lava
  NRW_LAVA_COLUMN: [100, 100, 2, 100, 101, 0, 102, 100, 2, 102, 101, 0, 0, 27, 2],
  NLW_LAVA_COLUMN: [102, 100, 2, 104, 100, 2, 0, 21, 2, 104, 101, 0, 102, 101, 0],
  SLW_LAVA_COLUMN: [104, 100, 2, 106, 100, 2, 0, 23, 2, 104, 101, 0, 106, 101, 0],
  SRW_LAVA_COLUMN: [100, 100, 2, 100, 101, 0, 106, 100, 2, 106, 101, 0, 0, 25, 2],
  // Pits
  NW_NPIT: [0, 8, 0, 102, 101, 0],
  LW_LPIT: [0, 2, 0, 104, 101, 0],
  RW_RPIT: [0, 6, 0, 100, 101, 0],
  SW_SPIT: [0, 4, 0, 106, 101, 0],
  C_WALKWAY: [0, 16, -1],
  V_WALKWAY: [0, 13, -1, 100, 102, -1, 104, 102, -1],
  H_WALKWAY: [0, 15, -1, 102, 102, -1, 106, 102, -1],
};
