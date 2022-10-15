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

// File Access Interface
const fs = require("fs");
const path = require("path");
// General Interface
const StorageDriverInterface = require("./StorageDriverInterface");
// Local File Driver
class FileDriver extends StorageDriverInterface {
  // Initialization
  init() {}
  // Get Object from Storage
  getFile(folder, key) {
    return new Promise((resolve, reject) => {
      fs.readFile(path.join(this.rootDir, folder, key), (err, data) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
  // Get Object from Storage
  getFileUrl(folder, key) {
    return new Promise((resolve, _) => {
      resolve(
        `${process.env.ADMIN_PORT}${process.env.STORAGE_ROOT}/${folder}/${key}`
      );
    });
  }
  // Put Object into Storage
  putFile(folder, key, file) {
    // Move File to Storage Folder
    file.mv(path.join(__dirname, `../../storage/${folder}/${key}`), function (
      err
    ) {
      if (err) return res.status(500).send(err);

      res.send("File uploaded!");
    });
  }
  // List Objects
  listFiles(folder) {
    return new Promise((resolve, reject) => {
      fs.readdir(
        path.join(__dirname, `../../storage/${folder}`),
        (err, files) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            console.log(files);
            resolve(files);
          }
        }
      );
    });
  }
  // List Folders
  listFolders() {
    return new Promise((resolve, reject) => {
      fs.readdir(path.join(__dirname, `../../storage`), (err, files) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          console.log(files);
          resolve(files);
        }
      });
    });
  }
  // Create Folder
  createFolder(name) {
    return new Promise((resolve, reject) => {
      fs.mkdir(path.join(__dirname, `../../storage/${name}`), (err) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          console.log(files);
          resolve(`process.env.STORAGE_ROOT/${name}`);
        }
      });
    });
  }
  // Delete Folder
  deleteFolder() {
    return new Promise((resolve, reject) => {
      fs.rmdir(path.join(__dirname, `../../storage/${name}`), (err) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  }
}

module.exports = FileDriver;
