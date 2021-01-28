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

module.exports = (() => {
  // THIRD-PARTY LIBRARIES
  const express = require("express");
  const bodyparser = require("body-parser");
  const cookieparser = require("cookie-parser");
  const session = require("express-session");
  const FileUpload = require("express-fileupload");
  const path = require("path");
  const cors = require("cors");
  const app = express();
  const server = require("http").Server(app);

  // CONFIGURATION
  const Env = require("../config/env");
  const Error = require("../lib/common/Error");
  const DB = require("../lib/database");
  const Storage = require("../lib/storage");

  // INDEX MODULES
  const index = require("../routes/admin/index");
  const content = require("../routes/admin/content");
  // SERVER
  server.listen(Env.ADMIN_PORT, () => {
    console.log(
      `${Env.SHORT_NAME} :: Your New Website is Now Live @ http://localhost:${Env.ADMIN_PORT}`
    );
    console.log("Using Storage Driver :: ", Storage.version);
    // Request Handling
    app.use(session(Env.SESSION_CONF));
    app.use(cookieparser());
    app.use(cors());
    app.use(FileUpload());
    app.use(express.json());
    app.use(bodyparser.text());
    app.use(
      bodyparser.urlencoded({
        limit: "10mb",
        extended: false,
      })
    );
    // API
    app.use("/api/:ver", (req, res) => {
      try {
        let apiVer = req.params.ver;
        switch (apiVer) {
          case "v1":
            apiRouter = require("../routes/admin/" + apiVer + "/index.js");
            apiRouter(req, res);
            break;
          default:
            throw "Invalid API Version";
        }
      } catch (e) {
        console.log(e);
        Error.setError("Error", 400, e);
        Error.sendError(res);
      }
    });
    app.use("/content", content);
    app.use(
      "/static",
      express.static(__dirname + "/../client/admin/build/static")
    );
    app.use("/", index);
    // Database Sync
    DB.sync();
  });

  // ERROR
  process.on("uncaughtException", function (e) {
    console.log("ERROR: " + e);
    if (e.errno === "EADDRINUSE") {
      // Read in New Port if unavailable
      console.log("Error ---> Port in Use: Please select another port: ");
      const readline = require("readline");
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      rl.question(
        "PORT IN USE: Please select a different port (3000+)? ",
        (answer) => {
          // TODO: Log the answer in a database
          rl.close();
          let port = answer;
          server.listen(port);
        }
      );
    }
  });

  return server;
})();
