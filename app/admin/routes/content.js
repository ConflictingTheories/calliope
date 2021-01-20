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
const fs = require("fs");
var express = require("express");
const path = require("path");
const Env = require("../../config/env");
var router = express.Router({
  mergeParams: true,
});

module.exports = (() => {
  // Return Posts
  router.get("/posts.json", async (_, res) => {
    // Setup Response
    let status = {
      status: 404,
      msg: "Error - No Posts Found!",
    };
    // Return List of Site Posts
    const { getPosts } = require("../../lib/generator");
    const posts = await getPosts();
    const files = posts.map((post) => post.split("../content/")[1]);
    if (files) res.status(200).json(files);
    // Return
    else res.status(404).json(status);
  });

  // Return Pages
  router.get("/pages.json", async (_, res) => {
    // Setup Response
    let status = {
      status: 404,
      msg: "Error - No Posts Found!",
    };
    // Return List of Site Posts
    const { getPages } = require("../../lib/generator");
    const pages = await getPages();
    const files = pages.map((page) => page.split("../content/")[1]);
    if (files) res.status(200).json(files);
    // Return
    else res.status(404).json(status);
  });

  // Save
  router.post("/save", async (req, res) => {
    try {
      let body = JSON.parse(req.body);
      let { post, content } = body;
      if (post && content) {
        fs.writeFileSync(
          path.join(__dirname, Env.CONTENT_ROOT, "/", post),
          content
        );
      }
      res.status(200).json({ msg: "saved", err: null });
    } catch (e) {
      console.error(e);
      res.status(200).json({ msg: "error", err: true });
    }
  });

  console.log("SERVING", path.join(__dirname, Env.CONTENT_ROOT));
  router.use(
    "*",
    express.static(path.join(__dirname, Env.CONTENT_ROOT), {
      index: false,
      extensions: ["md"],
    })
  );

  return router;
})();
