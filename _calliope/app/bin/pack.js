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
require("dotenv").config();

const shell = require("shelljs");
const path = require("path");

module.exports = (() => {
  const outPath = path.join(__dirname + "/../calliope-ssg-win32-x64");
  const winPath = path.join(__dirname + "/../..");

  // Copy env to app dir
  shell.cp(winPath + "/.env", outPath + "/.env");
})();
