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

/*                                            *\
** ------------------------------------------ **
** !!! NOTE: -- NO NEED TO EDIT THIS FILE !!! **
** ------------------------------------------ **
\*                                            */
const fs = require("fs");
const path = require("path");
const glob = require("glob");
const Env = require("../config/env");

module.exports = (() => {
  const theme = Env.CALLIOPE_THEME || "default";
  const themeFiles = path.join(__dirname + `/../config/themes/${theme}`);
  const themePath = path.join(__dirname + `/../src/theme`);
  console.log("Transfering:\n\n", themeFiles);
  // Transfer Theme Files
  glob(themeFiles + "/**/*.*", function (err, files) {
    if (err) {
      console.log(
        "cannot read the Pages folder, something goes wrong with glob",
        err
      );
    }
    // Copy Files
    files.forEach((file) => {
      console.log(file);
      let filename = file.split(`/config/themes/${theme}/`)[1];
      fs.readFile(file, "utf8", async function (err, data) {
        // Read each file
        if (err) {
          console.log(
            "cannot read the file, something goes wrong with the file",
            err
          );
        }
        // Make sure Folders are present
        await fs.promises.mkdir(themePath, {
          recursive: true,
        });
        // Copy into Build Dir
        fs.writeFileSync(
          path.join(__dirname + `/../src/theme/${filename}`),
          data
        );
      });
    });
  });


  // Setup Font Files


})();
