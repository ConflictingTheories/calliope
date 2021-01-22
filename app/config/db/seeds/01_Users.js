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

module.exports = (() => {
  const {
    saltHashPassword,
    randomFrom,
    genRandomHex,
  } = require("../../../lib/common/Crypto");
  const Stakeholder = require("../../../models/Stakeholder");
  const seeds = require("../json/seeds.json");
  const EP = require("../../../lib/etherpad");
  const DB = require("../../../lib/database");
  // Seed Users Table with Random Users
  return {
    seed: async () => {
      try {
        let count = 4;
        while (--count) {
          await DB.sync();
          const name = [
            randomFrom(seeds.firstNames),
            randomFrom(seeds.lastNames),
          ].join(" ");
          const username =
            name.split(" ").join(".").toLowerCase() +
            genRandomHex(2) +
            "@example.com";
          const saltedPass = saltHashPassword("password");
          const ep = await EP.createAuthor(name);
          const doe = await Stakeholder.create({
            username: username,
            passwordHash: saltedPass.passwordHash,
            salt: saltedPass.salt,
            name: name,
            ep_authorid: ep.authorID,
          });
        }
      } catch (err) {
        console.error(err);
      }
    },
  };
})();
