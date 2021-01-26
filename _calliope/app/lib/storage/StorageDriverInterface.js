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

// Emmpty Abstract Class to Override for Each Driver
class StorageDriverInterface {
  static instance = null;
  constructor() {
    if (this.instance) return this.instance;
    else {
      this.instance = this;
      return this.instance;
    }
  }
  // Initialization
  init(options) {
    throw "init(options) Not Implemented";
  }
  // Get Object from Storage
  getFile(folder, key) {
    throw "getFile(folder,key) Not Implemented";
  }
  // Get Object from Storage
  getFileUrl(folder, key) {
    throw "getFileUrl(folder,key) Not Implemented";
  }
  // Put Object into Storage
  putFile(folder, key, file) {
    throw "putFile(folder,key,file) Not Implemented";
  }
  // List Objects
  listFiles(folder) {
    throw "listFiles(folder) Not Implemented";
  }
  // List Folders
  listFolders() {
    throw "listFolders() Not Implemented";
  }
  // Create Folder
  createFolder() {
    throw "createFolder() Not Implemented";
  }
  // Delete Folder
  deleteFolder() {
    throw "deletFolder() Not Implemented";
  }
}

module.exports = StorageDriverInterface;
