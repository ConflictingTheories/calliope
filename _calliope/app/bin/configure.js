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
const path = require("path");
const glob = require("glob");
const Env = require("../config/env");
const { getPages, getPosts } = require("../lib/generator");

const publicFiles = path.join(__dirname + `/../config/public`);
const pluginFiles = path.join(__dirname + `/../config/plugins`);
const componentFiles = path.join(__dirname + `/../config/components`);
const moduleFiles = path.join(__dirname + `/../config/modules/admin/modules`);
const websitemoduleFiles = path.join(
  __dirname + `/../config/modules/website/modules`
);

module.exports = (() => {
  async function configureWebsite() {
    const theme = Env.CALLIOPE_THEME || "default";
    const themeFiles = path.join(__dirname + `/../config/themes/${theme}`);

    console.log("Website :: Transfering:\n\n", themeFiles);

    // Frontend Website Config
    const webConfig = {
      posts: "/content/posts.json",
      pages: "/content/pages.json",
      save: "/content/save",
      export: "/content/export",
      offline: true,
    };
    fs.writeFileSync(
      path.join(__dirname + `/../client/website/src/config/runtime.json`),
      JSON.stringify(webConfig)
    );

    // Transfer Public Directory Files
    glob(publicFiles + "/**/*.*", async function (err, files) {
      if (err) {
        console.log(
          "cannot read the Public folder, something goes wrong with glob",
          err
        );
      }
      // Copy Files
      await Promise.all(
        files.map(async (file) => {
          let filename = file.split(`/config/public/`)[1];
          let filenamePath = filename.split(/[\/]/);
          let filepath = filenamePath.pop();
          console.log("Website :: Transfering -- ", filepath);
          await fs.promises.mkdir(
            path.join(
              __dirname + `/../client/website/public/${filenamePath.join("/")}`
            ),
            {
              recursive: true,
            }
          );
          const readFile = fs.createReadStream(file);
          const outFile = fs.createWriteStream(
            path.join(__dirname + `/../client/website/public/${filename}`)
          );
          readFile.pipe(outFile);
        })
      );

      // Generate Static Public HTML

      const nonJSPages = await getPages();
      const formattedPages = nonJSPages
        .map((x) => {
          let link = x.split("/storage/pages/")[1];
          return `<li><a target="main" href=/content/pages/${link}>${link}</a></li>`;
        })
        .join("");

      const nonJSPosts = await getPosts();
      const formattedPosts = nonJSPosts
        .map((x) => {
          let link = x.split("/storage/posts/")[1];
          return `<li><a target="main" href=/content/${link}>${link}</a></li>`;
        })
        .join("");

      const indexHtml = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          <meta
            name="description"
            content="%REACT_APP_SITE_TITLE% - powered by Calliope"
          />
          <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
          <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
          <title>%REACT_APP_SITE_TITLE%</title>
        </head>
        <body>
          <noscript>  
            <header>
              <h2>%REACT_APP_SITE_TITLE%</h2>
              <hr/>
              <strong>This site works best with JavaScript turned On.</strong>
            </header>
            <iframe src="/content/posts/${
              nonJSPosts.length > 0
                ? nonJSPosts[0]?.split("/storage/posts/")[1]
                : ""
            }" style="color: white;background: #34c3ff;" width="100%" height="60%" name="main"></iframe>
            <hr/>
            <details><summary>Pages</summary><ul>${formattedPages}</ul></details>
            <br/>
            <details><summary>Posts</summary><ul>${formattedPosts}</ul></details>
          </noscript>
          <!-- Site Entry Point Loads on this Div -->
          <div id="root"></div>
        </body>
      </html>
      `;

      // PWA Manifest Configuration
      const manifest = {
        short_name: Env.SHORT_NAME,
        name: Env.SITE_NAME,
        icons: [
          {
            src: "favicon.ico",
            sizes: "64x64 32x32 24x24 16x16",
            type: "image/x-icon",
          },
          {
            src: "logo192.png",
            type: "image/png",
            sizes: "192x192",
          },
          {
            src: "logo512.png",
            type: "image/png",
            sizes: "512x512",
          },
        ],
        start_url: ".",
        display: "standalone",
        theme_color: Env.THEME_DARK ? "#777" : "#333",
        background_color: Env.THEME_DARK ? "#000" : "#fff",
      };
      fs.writeFileSync(
        path.join(__dirname + `/../client/website/public/manifest.json`),
        JSON.stringify(manifest)
      );
      // Write Index File for Website (Admin still needs JS)
      fs.writeFileSync(
        path.join(__dirname + `/../client/website/public/index.html`),
        indexHtml
      );
    });

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
            __dirname + `/../client/website/src/theme/${filenamePath.join("/")}`
          ),
          {
            recursive: true,
          }
        );
        const readFile = fs.createReadStream(file);
        const outFile = fs.createWriteStream(
          path.join(__dirname + `/../client/website/src/theme/${filename}`)
        );
        readFile.pipe(outFile);
      });
    });

    // Transfer Plugin Files
    glob(pluginFiles + "/**/*.*", function (err, files) {
      if (err) {
        console.log(
          "cannot read the Plugins folder, something goes wrong with glob",
          err
        );
      }
      // Copy Files
      files.forEach(async (file) => {
        let filename = file.split(`/config/plugins/`)[1];
        let filenamePath = filename.split(/[\/]/);
        let filepath = filenamePath.pop();
        console.log("Website :: Transfering -- ", filepath);
        await fs.promises.mkdir(
          path.join(
            __dirname +
              `/../client/website/src/plugins/${filenamePath.join("/")}`
          ),
          {
            recursive: true,
          }
        );
        const readFile = fs.createReadStream(file);
        const outFile = fs.createWriteStream(
          path.join(__dirname + `/../client/website/src/plugins/${filename}`)
        );
        readFile.pipe(outFile);
      });
    });

    // Transfer Components Files
    glob(componentFiles + "/**/*.*", function (err, files) {
      if (err) {
        console.log(
          "cannot read the Components folder, something goes wrong with glob",
          err
        );
      }
      // Copy Files
      files.forEach(async (file) => {
        let filename = file.split(`/config/components/`)[1];
        let filenamePath = filename.split(/[\/]/);
        let filepath = filenamePath.pop();
        console.log("Website :: Transfering -- ", filepath);
        await fs.promises.mkdir(
          path.join(
            __dirname +
              `/../client/website/src/components/${filenamePath.join("/")}`
          ),
          {
            recursive: true,
          }
        );
        const readFile = fs.createReadStream(file);
        const outFile = fs.createWriteStream(
          path.join(__dirname + `/../client/website/src/components/${filename}`)
        );
        readFile.pipe(outFile);
      });
    });

    // Transfer Modules Files
    glob(websitemoduleFiles + "/**/*.*", function (err, files) {
      if (err) {
        console.log(
          "cannot read the Components folder, something goes wrong with glob",
          err
        );
      }
      // Copy Files
      files.forEach(async (file) => {
        let filename = file.split(`/config/modules/website/modules/`)[1];
        let filenamePath = filename.split(/[\/]/);
        let filepath = filenamePath.pop();
        console.log("Admin :: Transfering -- ", filepath);
        await fs.promises.mkdir(
          path.join(
            __dirname +
              `/../client/website/src/modules/${filenamePath.join("/")}`
          ),
          {
            recursive: true,
          }
        );
        const readFile = fs.createReadStream(file);
        const outFile = fs.createWriteStream(
          path.join(__dirname + `/../client/website/src/modules/${filename}`)
        );
        readFile.pipe(outFile);
      });
    });
  }

  function configureAdmin() {
    const theme = Env.ADMIN_THEME || "default";
    const themeFiles = path.join(__dirname + `/../config/themes/${theme}`);

    console.log("Admin Site :: Transfering:\n\n", themeFiles);
    // Frontend Website Config
    const webConfig = {
      posts: "/content/posts.json",
      pages: "/content/pages.json",
      save: "/content/save",
      export: "/content/export",
      offline: true,
    };
    fs.writeFileSync(
      path.join(__dirname + `/../client/admin/src/config/runtime.json`),
      JSON.stringify(webConfig)
    );

    // Transfer Admin Public Directory Files
    glob(publicFiles + "/**/*.*", function (err, files) {
      if (err) {
        console.log(
          "cannot read the Public folder, something goes wrong with glob",
          err
        );
      }
      // Copy Files
      files.forEach(async (file) => {
        let filename = file.split(`/config/public/`)[1];
        let filenamePath = filename.split(/[\/]/);
        let filepath = filenamePath.pop();
        console.log("Admin :: Transfering -- ", filepath);
        await fs.promises.mkdir(
          path.join(
            __dirname + `/../client/admin/public/${filenamePath.join("/")}`
          ),
          {
            recursive: true,
          }
        );
        const readFile = fs.createReadStream(file);
        const outFile = fs.createWriteStream(
          path.join(__dirname + `/../client/admin/public/${filename}`)
        );
        readFile.pipe(outFile);

        // PWA Admin Manifest Configuration
        const manifest = {
          short_name: `${Env.SHORT_NAME} Admin`,
          name: `${Env.SITE_NAME} Administrator Panel`,
          icons: [
            {
              src: "favicon.ico",
              sizes: "64x64 32x32 24x24 16x16",
              type: "image/x-icon",
            },
            {
              src: "logo192.png",
              type: "image/png",
              sizes: "192x192",
            },
            {
              src: "logo512.png",
              type: "image/png",
              sizes: "512x512",
            },
          ],
          start_url: ".",
          display: "standalone",
          theme_color: Env.THEME_DARK ? "#777" : "#333",
          background_color: Env.THEME_DARK ? "#000" : "#fff",
        };
        fs.writeFileSync(
          path.join(__dirname + `/../client/admin/public/manifest.json`),
          JSON.stringify(manifest)
        );
      });
    });

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
            __dirname + `/../client/admin/src/theme/${filenamePath.join("/")}`
          ),
          {
            recursive: true,
          }
        );
        const readFile = fs.createReadStream(file);
        const outFile = fs.createWriteStream(
          path.join(__dirname + `/../client/admin/src/theme/${filename}`)
        );
        readFile.pipe(outFile);
      });
    });

    // Transfer Plugin Files
    glob(pluginFiles + "/**/*.*", function (err, files) {
      if (err) {
        console.log(
          "cannot read the Plugins folder, something goes wrong with glob",
          err
        );
      }
      // Copy Files
      files.forEach(async (file) => {
        let filename = file.split(`/config/plugins/`)[1];
        let filenamePath = filename.split(/[\/]/);
        let filepath = filenamePath.pop();
        console.log("Admin :: Transfering -- ", filepath);
        await fs.promises.mkdir(
          path.join(
            __dirname + `/../client/admin/src/plugins/${filenamePath.join("/")}`
          ),
          {
            recursive: true,
          }
        );
        const readFile = fs.createReadStream(file);
        const outFile = fs.createWriteStream(
          path.join(__dirname + `/../client/admin/src/plugins/${filename}`)
        );
        readFile.pipe(outFile);
      });
    });

    // Transfer Components Files
    glob(componentFiles + "/**/*.*", function (err, files) {
      if (err) {
        console.log(
          "cannot read the Components folder, something goes wrong with glob",
          err
        );
      }
      // Copy Files
      files.forEach(async (file) => {
        let filename = file.split(`/config/components/`)[1];
        let filenamePath = filename.split(/[\/]/);
        let filepath = filenamePath.pop();
        console.log("Admin :: Transfering -- ", filepath);
        await fs.promises.mkdir(
          path.join(
            __dirname +
              `/../client/admin/src/components/${filenamePath.join("/")}`
          ),
          {
            recursive: true,
          }
        );
        const readFile = fs.createReadStream(file);
        const outFile = fs.createWriteStream(
          path.join(__dirname + `/../client/admin/src/components/${filename}`)
        );
        readFile.pipe(outFile);
      });
    });
    // Transfer Modules Files
    glob(moduleFiles + "/**/*.*", function (err, files) {
      if (err) {
        console.log(
          "cannot read the Components folder, something goes wrong with glob",
          err
        );
      }
      // Copy Files
      files.forEach(async (file) => {
        let filename = file.split(`/config/modules/admin/modules/`)[1];
        let filenamePath = filename.split(/[\/]/);
        let filepath = filenamePath.pop();
        console.log("Admin :: Transfering -- ", filepath);
        await fs.promises.mkdir(
          path.join(
            __dirname + `/../client/admin/src/modules/${filenamePath.join("/")}`
          ),
          {
            recursive: true,
          }
        );
        const readFile = fs.createReadStream(file);
        const outFile = fs.createWriteStream(
          path.join(__dirname + `/../client/admin/src/modules/${filename}`)
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
