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

import axios from "axios";

export async function pages() {
  return await (await fetch(config.pages)).json();
}

export async function posts() {
  return await (await fetch(config.posts)).json();
}

export async function save(post, content) {
  return (
    await fetch(config.save, {
      body: JSON.stringify({ content, post }),
      method: "POST",
      credentials: true,
      mode: "cors",
      header: {
        "Content-Type": "application/json",
      },
    })
  ).data;
}
