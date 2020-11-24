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
  function configureWebsite() {
    const theme = Env.CALLIOPE_THEME || "default";
    const themeFiles = path.join(__dirname + `/../config/themes/${theme}`);
    const themePath = path.join(__dirname + `/../website/src/theme`);
    console.log("Website :: Transfering:\n\n", themeFiles);
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
        console.log("Website :: Transfering -- ", filepath);
        await fs.promises.mkdir(
          path.join(
            __dirname + `/../website/src/theme/${filenamePath.join("/")}`
          ),
          {
            recursive: true,
          }
        );
        const readFile = fs.createReadStream(file);
        const outFile = fs.createWriteStream(
          path.join(__dirname + `/../website/src/theme/${filename}`)
        );
        readFile.pipe(outFile);
      });
    });

    // Setup Font Files (TODO)
  }

  function configureAdmin() {
    const theme = Env.CALLIOPE_THEME || "default";
    const themeFiles = path.join(__dirname + `/../config/themes/${theme}`);
    const themePath = path.join(__dirname + `/../admin/src/theme`);
    console.log("Admin Site :: Transfering:\n\n", themeFiles);
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
        console.log("Admin :: Transfering -- ", filepath);
        await fs.promises.mkdir(
          path.join(
            __dirname + `/../admin/src/theme/${filenamePath.join("/")}`
          ),
          {
            recursive: true,
          }
        );
        const readFile = fs.createReadStream(file);
        const outFile = fs.createWriteStream(
          path.join(__dirname + `/../admin/src/theme/${filename}`)
        );
        readFile.pipe(outFile);
      });
    });

    // Setup Font Files (TODO)
  }

  // Configure Apps
  configureAdmin();
  configureWebsite();
})();
