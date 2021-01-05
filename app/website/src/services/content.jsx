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

import * as config from "../config/runtime.json";

export async function pages() {
  return await (await fetch(config.pages)).json();
}

export async function posts() {
  return await (await fetch(config.posts)).json();
}

export async function save(post, content) {
  return await (
    await fetch({ url: config.save, method: "POST", body: JSON.stringify({content, post}) })
  ).json();
}