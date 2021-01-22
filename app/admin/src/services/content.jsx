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
    await fetch(config.save, {
      method: "POST",
      body: JSON.stringify({ content, post }),
    })
  ).json();
}

export async function exportZip() {
  return await fetch(config.export).then(async (res) => {
    let blob = await res.blob();
    Swal.fire("Generated!", "", "success");
    let result = await Swal.fire({
      title: "Download Zip",
      showCancelButton: true,
    });
    if (result.isConfirmed) {
      FileSaver.saveAs(blob, "Archive.zip");
    }
  });
}

