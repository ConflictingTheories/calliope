var glob = require("glob");

// Posts (Markdown Files)
const getPosts = () =>
  new Promise((resolve, reject) => {
    glob(__dirname+"/../../../site/posts/**/*.md", function (err, files) {
      if (err) {
        console.log(
          "cannot read the Posts folder, something goes wrong with glob",
          err
        );
        reject(err);
      }
      resolve(files);
    });
  });

// Pages (Markdown Files)
const getPages = () =>
  new Promise((resolve, reject) => {
    glob(__dirname+"/../../../site/pages/**/*.md", function (err, files) {
      if (err) {
        console.log(
          "cannot read the Pages folder, something goes wrong with glob",
          err
        );
        reject(err);
      }
      resolve(files);
    });
  });

module.exports = {
  getPages,
  getPosts,
};
