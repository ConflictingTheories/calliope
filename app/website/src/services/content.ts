/*                                            *\
** ------------------------------------------ **
**         Calliope - Site Generator   	      **
** ------------------------------------------ **
**  Copyright (c) 2020 - Kyle Derby MacInnis  **
**                                            **
** Any unauthorized distribution or transfer  **
**    of this work is strictly prohibited.    **
**                                            **
**           All Rights Reserved.             **
** ------------------------------------------ **
\*                                            */

import * as config from "../config/runtime.json";

export async function pages() {
  return await (await fetch(config.pages)).json();
}

export async function posts() {
  return await (await fetch(config.posts)).json();
}
