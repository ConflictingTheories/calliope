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
import FileSaver from "file-saver";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

export async function pages() {
  return await (await fetch(config.pages)).json();
}

export async function posts() {
  return await (await fetch(config.posts)).json();
}

export async function save(post, content) {
  return await (
    await fetch({
      url: config.save,
      method: "POST",
      body: JSON.stringify({ content, post }),
    })
  ).json();
}

export async function exportZip() {
  // do nothing (Admin only)
}
