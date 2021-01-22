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

var glob = require("glob");

// Posts (Markdown Files)
const getPosts = () =>
  new Promise((resolve, reject) => {
    glob(__dirname+"/../../../content/posts/**/*.md", function (err, files) {
      if (err) {
        console.log(
          "cannot read the Posts folder, something goes wrong with glob",
          err
        );
        reject(err);
      }
      resolve(files);
    });
  });

// Pages (Markdown Files)
const getPages = () =>
  new Promise((resolve, reject) => {
    glob(__dirname+"/../../../content/pages/**/*.md", function (err, files) {
      if (err) {
        console.log(
          "cannot read the Pages folder, something goes wrong with glob",
          err
        );
        reject(err);
      }
      resolve(files);
    });
  });

module.exports = {
  getPages,
  getPosts,
};
