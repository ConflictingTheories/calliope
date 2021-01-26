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
  const adminPath = path.join(__dirname + "/../client/admin/build");
  const webPath = path.join(__dirname + "/../client/website/build");
  const demoPathAdmin = path.join(__dirname + "/../../output/admin");
  const demoPathWeb = path.join(__dirname + "/../../output/site");
  const demoPath = path.join(__dirname + "/../../output");

  // Copy files to demo dir
  shell.rm("-rf", demoPath);
  shell.mkdir("-p", demoPathWeb);
  shell.cp("-R", webPath + "/*", demoPathWeb);
  shell.mkdir("-p", demoPathAdmin);
  shell.cp("-R", adminPath + "/*", demoPathAdmin);
})();
