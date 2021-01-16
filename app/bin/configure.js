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
const Plugins = require("../config/featureFlags")["PLUGINS"];

const pluginFiles = path.join(__dirname + `/../config/plugins`);
const componentFiles = path.join(__dirname + `/../config/components`);
const helperFiles = path.join(__dirname + `/../config/helpers`);
const serviceFiles = path.join(__dirname + `/../config/services`);
const moduleFiles = path.join(__dirname + `/../config/modules/admin/modules`);
const websitemoduleFiles = path.join(
  __dirname + `/../config/modules/website/modules`
);

module.exports = (() => {
  function configureWebsite() {
    const theme = Env.CALLIOPE_THEME || "default";
    const themeFiles = path.join(__dirname + `/../config/themes/${theme}`);
    const themePath = path.join(__dirname + `/../website/src/theme`);
    const pluginPath = path.join(__dirname + `/../website/src/plugins`);

    console.log("Website :: Transfering:\n\n", themeFiles);

    // Frontend Website Config
    const webConfig = {
      posts: "/content/posts.json",
      pages: "/content/pages.json",
      save: "/content/save",
      offline: true,
    };
    fs.writeFileSync(
      path.join(__dirname + `/../website/src/config/runtime.json`),
      JSON.stringify(webConfig)
    );

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
      path.join(__dirname + `/../website/public/manifest.json`),
      JSON.stringify(manifest)
    );

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
            __dirname + `/../website/src/plugins/${filenamePath.join("/")}`
          ),
          {
            recursive: true,
          }
        );
        const readFile = fs.createReadStream(file);
        const outFile = fs.createWriteStream(
          path.join(__dirname + `/../website/src/plugins/${filename}`)
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
            __dirname + `/../website/src/components/${filenamePath.join("/")}`
          ),
          {
            recursive: true,
          }
        );
        const readFile = fs.createReadStream(file);
        const outFile = fs.createWriteStream(
          path.join(__dirname + `/../website/src/components/${filename}`)
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
            __dirname + `/../website/src/modules/${filenamePath.join("/")}`
          ),
          {
            recursive: true,
          }
        );
        const readFile = fs.createReadStream(file);
        const outFile = fs.createWriteStream(
          path.join(__dirname + `/../website/src/modules/${filename}`)
        );
        readFile.pipe(outFile);
      });
    });

    // Setup Font Files (TODO)
  }

  function configureAdmin() {
    const theme = Env.ADMIN_THEME || "default";
    const themeFiles = path.join(__dirname + `/../config/themes/${theme}`);
    const themePath = path.join(__dirname + `/../admin/src/theme`);
    const pluginPath = path.join(__dirname + `/../admin/src/plugins`);
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
            __dirname + `/../admin/src/plugins/${filenamePath.join("/")}`
          ),
          {
            recursive: true,
          }
        );
        const readFile = fs.createReadStream(file);
        const outFile = fs.createWriteStream(
          path.join(__dirname + `/../admin/src/plugins/${filename}`)
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
            __dirname + `/../admin/src/components/${filenamePath.join("/")}`
          ),
          {
            recursive: true,
          }
        );
        const readFile = fs.createReadStream(file);
        const outFile = fs.createWriteStream(
          path.join(__dirname + `/../admin/src/components/${filename}`)
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
            __dirname + `/../admin/src/modules/${filenamePath.join("/")}`
          ),
          {
            recursive: true,
          }
        );
        const readFile = fs.createReadStream(file);
        const outFile = fs.createWriteStream(
          path.join(__dirname + `/../admin/src/modules/${filename}`)
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
