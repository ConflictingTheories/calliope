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

var express = require("express");
const path = require("path");
var router = express.Router({
  mergeParams: true,
});
var Env = require("../../config/env");

module.exports = (() => {
  router.get("/posts.json", async (_, res) => {
    // Setup Response
    let status = {
      status: 404,
      msg: "Error - No Posts Found!",
    };
    // Return List of Site Posts
    const { getPosts } = require("../../lib/generator");
    const posts = await getPosts();
    const files = posts.map((post) => post.split("/posts/")[1]);
    console.log(files);
    if (files) res.status(200).json(files);
    // Return
    else res.status(404).json(status);
  });

  router.get("/pages.json", async (_, res) => {
    // Setup Response
    let status = {
      status: 404,
      msg: "Error - No Posts Found!",
    };
    // Return List of Site Posts
    const { getPages } = require("../../lib/generator");
    const pages = await getPages();
    const files = pages.map((page) => page.split("/pages/")[1]);
    if (files) res.status(200).json(files);
    // Return
    else res.status(404).json(status);
  });

  router.post("/save", async (_, res) => {
    // Setup Response
    let status = {
      status: 404,
      msg: "Error - No Posts Found!",
    };
    // Return List of Site Posts
    const { getPosts } = require("../../lib/generator");
    const posts = await getPosts();
    const files = posts.map((post) => post.split("/posts/")[1]);
    console.log(files);
    if (files) res.status(200).json(files);
    // Return
    else res.status(404).json(status);
  });

  console.log("SERVING", Env.CONTENT_ROOT);
  router.use(
    "*",
    express.static(Env.CONTENT_ROOT, { index: false, extensions: ["md"] })
  );

  return router;
})();
