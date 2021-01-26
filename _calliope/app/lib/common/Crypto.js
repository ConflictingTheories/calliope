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

const crypto = require("crypto");

module.exports = (() => {
  const _that = {
    // Sha512
    sha512: (password, salt) => {
      const hash = crypto.createHmac("sha512", salt);
      hash.update(password);
      const value = hash.digest("hex");
      return {
        salt: salt,
        passwordHash: value,
      };
    },
    // Random Value
    genRandomHex: (length) => {
      return crypto
        .randomBytes(~~(length / 2) + 1)
        .toString("hex")
        .slice(0, length);
    },
    // Password Hash
    saltHashPassword: (pass) => {
      const salt = _that.genRandomHex(16);
      const passwordData = _that.sha512(pass, salt);
      return passwordData;
    },
    // From Array Randomly
    randomFrom: (arr) => {
      const { length } = arr;
      const index =
        parseInt(crypto.randomBytes(4).toString("hex"), 16) % length;
      return arr[index];
    },
    // Generate Random Sequence for Slicing
    slice: (length, fn) => {
      return fn(crypto.randomBytes(length));
    },
    // UUID Generator
    uuid: () => {
      // TODO
      return "xxxx-xxxx-xxxx-xxxx".replace(/x/g, () => _that.genRandomHex(1));
    },
  };
  return _that;
})();
