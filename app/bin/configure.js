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
    files.forEach(async (file) => {
      let filename = file.split(`/config/themes/${theme}/`)[1];
      let filenamePath = filename.split(/[\/]/);
      let filepath = filenamePath.pop();
      console.log("transfering -- ", filepath);
      await fs.promises.mkdir(
        path.join(
          __dirname + `/../src/theme/${filenamePath.join("/")}`
        ),
        {
          recursive: true,
        }
      );
      const readFile = fs.createReadStream(file);
      const outFile = fs.createWriteStream(
        path.join(__dirname + `/../src/theme/${filename}`)
      );
      readFile.pipe(outFile);
    });
  });


  // Setup Font Files (TODO)

})();
