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
const { getPages, getPosts } = require("../config/content");

module.exports = (async () => {
  // Make Directory for Site Content
  await fs.promises.mkdir(path.join(__dirname + `/../build/content`), {
    recursive: true,
  });
  // COPY Posts
  let posts = await getPosts();
  let postJson = [];
  posts.forEach(function (file) {
    let filename = file
      .split("../site/posts/")[1]
      .split(/[\/\s]+/)
      .join("-");
    postJson.push(filename);
    fs.readFile(file, "utf8", async function (err, data) {
      // Read each file
      if (err) {
        console.log(
          "cannot read the file, something goes wrong with the file",
          err
        );
      }
      await fs.promises.mkdir(
        path.join(__dirname + `/../build/content/posts/`),
        {
          recursive: true,
        }
      );
      // Copy into Build Dir
      fs.writeFileSync(
        path.join(__dirname + `/../build/content/posts/${filename}`),
        data
      );
    });
  });

  // COPY Pages
  let pages = await getPages();
  let pageJson = [];
  pages.forEach(function (file) {
    let filename = file
      .split("../site/pages/")[1]
      .split(/[\/\s]+/)
      .join("-");
    pageJson.push(filename);
    fs.readFile(file, "utf8", async function (err, data) {
      // Read each file
      if (err) {
        console.log(
          "cannot read the file, something goes wrong with the file",
          err
        );
      }
      // Copy into Build Dir
      await fs.promises.mkdir(
        path.join(__dirname + `/../build/content/pages/`),
        {
          recursive: true,
        }
      );
      fs.writeFileSync(
        path.join(__dirname + `/../build/content/pages/${filename}`),
        data
      );
    });
  });

  // Write JSON Manifests
  fs.writeFileSync(
    path.join(__dirname, "../build/content/posts.json"),
    JSON.stringify(postJson)
  );
  fs.writeFileSync(
    path.join(__dirname, "../build/content/pages.json"),
    JSON.stringify(pageJson)
  );
})();
