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

const AWS = require("aws-sdk");
// File Access Interface
const FileAccessInterface = require("./StorageDriverInterface");
// S3 File Driver
class S3Driver extends FileAccessInterface {
  // S3 Region
  region = null;

  // Initialize
  init(options) {
    const { region } = options;
    this.region = region;
    // Configuration
    AWS.config.update({ region: this.region });
    // S3 Instance
    const S3Instance = new AWS.S3({ apiVersion: "2006-03-01" });
    // Set Instance
    this.instance = S3Instance;
  }

  // Get Object and return Data (uses Axios)
  getFile(folder, key) {
    var params = { Bucket: folder, Key: key };
    this.instance.getObject("getObject", params, function (err, data) {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log(url);
        resolve(data);
      }
    });
  }

  // Get Object URL to access object
  getFileUrl(folder, key) {
    return new Promise((resolve, reject) => {
      var params = { Bucket: folder, Key: key };
      this.instance.getSignedUrl("getObject", params, function (err, url) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          console.log(url);
          resolve(url);
        }
      });
    });
  }

  // Put Object into Storage
  putFile(folder, key, file) {
    return new Promise((resolve, reject) => {
      // S3 Configs
      var uploadParams = { Bucket: folder, Key: key, Body: file.data };
      // call S3 to retrieve upload file to specified bucket
      this.instance.upload(uploadParams, function (err, data) {
        if (err) {
          console.log("Error", err);
          reject(err);
        }
        if (data) {
          console.log("Upload Success", data.Location);
          resolve(data.Location);
        }
      });
    });
  }

  // Put Object into Storage
  deleteFile(folder, key) {
    return new Promise((resolve, reject) => {
      // S3 Configs
      var uploadParams = { Bucket: folder, Key: key };
      // call S3 to retrieve upload file to specified bucket
      this.instance.deleteObject(uploadParams, function (err, data) {
        if (err) {
          console.log("Error", err);
          reject(err);
        }
        if (data) {
          console.log("Delete Success", true);
          resolve(data);
        }
      });
    });
  }

  // List Objects
  listFiles(folder) {
    return new Promise((resolve, reject) => {
      // Create the parameters for calling listObjects
      var bucketParams = {
        Bucket: folder,
      };
      // Call S3 to obtain a list of the objects in the bucket
      this.instance.listObjects(bucketParams, function (err, data) {
        if (err) {
          console.log("Error", err);
          reject(err);
        } else {
          console.log("Success", data);
          resolve(data);
        }
      });
    });
  }

  // List Folders
  listFolders() {
    return new Promise((resolve, reject) => {
      s3.listBuckets(function (err, data) {
        if (err) {
          console.log("Error", err);
          reject(err);
        } else {
          console.log("Success", data.Buckets);
          resolve(data.Buckets);
        }
      });
    });
  }

  // Create Folder (Bucket)
  createFolder(name) {
    return new Promise((resolve, reject) => {
      const params = { Bucket: name };
      s3.createBucket(params, function (err, data) {
        if (err) {
          console.log("Error", err);
          reject(err);
        } else {
          console.log("Success", data.Location);
          resolve(data.Location);
        }
      });
    });
  }

  // Delete Folder (Bucket)
  deleteFolder(name) {
    return new Promise((resolve, reject) => {
      // Create params for S3.deleteBucket
      var bucketParams = {
        Bucket: name,
      };
      // Call S3 to delete the bucket
      s3.deleteBucket(bucketParams, function (err, data) {
        if (err) {
          console.log("Error", err);
          reject(err);
        } else {
          console.log("Success", data);
          resolve(true);
        }
      });
    });
  }
}

module.exports = S3Driver;
