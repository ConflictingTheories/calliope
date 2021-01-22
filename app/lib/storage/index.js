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

const Env = require("../../config/env");
const S3Driver = require("./S3Driver");
const FileDriver = require("./FileDriver");

console.log(Env.STORAGE_TYPE, Env.STORAGE_ROOT);

// Singletone Class
class Storage {
  static instance = null;
  static version = null;

  constructor() {
    if (this.instance) return this.instance;
    else {
      // New handler
      this.version = Env.STORAGE_TYPE;
      let storageDriver = null;
      switch (Env.STORAGE_TYPE) {
        case "s3":
          storageDriver = new S3Driver();
          storageDriver.init({
            region: Env.S3_REGION,
          });
          this.instance = storageDriver;
          break;
        case "file":
          storageDriver = new FileDriver();
          storageDriver.init();
          this.instance = storageDriver;
          break;
        default:
          this.instance = null;
          break;
      }
      return this.instance;
    }
  }
}

module.exports = new Storage();
