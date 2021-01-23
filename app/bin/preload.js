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

const fs = require("fs");
const Env = require("../config/env");
const path = require("path");
const glob = require("glob");
const { getPages, getPosts } = require("../lib/generator");

module.exports = (async () => {
  // Make Directory for Site Content
  await fs.promises.mkdir(
    path.join(__dirname + `/../client/website/build/content`),
    {
      recursive: true,
    }
  );
  // COPY Posts
  let posts = await getPosts();
  let postJson = [];
  posts.forEach(function (file) {
    let filename = file
      .split("/posts/")[1]
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
        path.join(__dirname + `/../client/website/build/content/posts/`),
        {
          recursive: true,
        }
      );
      // Copy into Build Dir
      fs.writeFileSync(
        path.join(
          __dirname + `/../client/website/build/content/posts/${filename}`
        ),
        data
      );
    });
  });

  // COPY Pages
  let pages = await getPages();
  console.log(pages);
  let pageJson = [];
  pages.forEach(function (file) {
    let filename = file
      .split("/pages/")[1]
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
        path.join(__dirname + `/../client/website/build/content/pages/`),
        {
          recursive: true,
        }
      );
      fs.writeFileSync(
        path.join(
          __dirname + `/../client/website/build/content/pages/${filename}`
        ),
        data
      );
    });
  });

  // COPY Media
  const mediaFiles = path.join(Env.CONTENT_ROOT, "/media");
  console.log("Transfering:\n\n", mediaFiles);
  // Transfer Media Files
  glob(mediaFiles + "/**/*.*", function (err, files) {
    if (err) {
      console.log(
        "cannot read the Pages folder, something goes wrong with glob",
        err
      );
    }
    // Copy Files
    files.forEach(async (file) => {
      console.log(file);
      let filename = file.split(`/media/`)[1];
      let filenamePath = filename.split(/[\/]/);
      let filepath = filenamePath.pop();
      console.log("transfering -- ", filepath);
      await fs.promises.mkdir(
        path.join(
          __dirname +
            `/../client/website/build/content/media/${filenamePath.join("/")}`
        ),
        {
          recursive: true,
        }
      );
      const readFile = fs.createReadStream(file);
      const outFile = fs.createWriteStream(
        path.join(
          __dirname + `/../client/website/build/content/media/${filename}`
        )
      );
      readFile.pipe(outFile);
    });
  });

  // For Service Worker
  fs.writeFileSync(
    path.join(__dirname, "/../client/website/src/content/posts.json"),
    JSON.stringify(postJson.reverse())
  );
  fs.writeFileSync(
    path.join(__dirname, "/../client/website/src/content/pages.json"),
    JSON.stringify(pageJson.reverse())
  );
})();
