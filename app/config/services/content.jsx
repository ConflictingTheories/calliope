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
  let postData = new FormData();
  postData.append("content", content);
  postData.append("post", post);

  return await fetch(config.save, {
    method: "POST",
    mode: "cors",
    redirect: "follow",
    body: postData,
    headers: new Headers({
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    }),
  });
}
