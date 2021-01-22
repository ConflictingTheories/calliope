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
  const { saltHashPassword, randomFrom } = require("../../../lib/common/Crypto");
  const Stakeholder = require("../../../models/Stakeholder");
  const Role = require("../../../models/Role");
  const Permission = require("../../../models/Permission");
  const EP = require("../../../lib/etherpad");
  const DB = require("../../../lib/database");
  // Seed Users Table with Admin Account
  return {
    seed: async () => {
      try {
        await DB.sync();

        // Permission
        const adminPermission = await Permission.create({
          name: "ADMINISTRATOR",
          tag: "ADMIN",
        });

        // Role
        const adminRole = await Role.create({
          name: "Administrator",
          tag: "Admin",
        });
        console.log(adminRole);
        await adminRole.addPermission(adminPermission);
        // User
        const name = "Administrator";
        const username = "admin@kderbyma.com";
        const saltedPass = saltHashPassword("password");
        const ep = await EP.createAuthor(name);
        const admin = await Stakeholder.create({
          username: username,
          passwordHash: saltedPass.passwordHash,
          salt: saltedPass.salt,
          name: name,
          ep_authorid: ep.authorID,
        });
        console.log(admin);
        await admin.addRole(adminRole);
      } catch (err) {
        console.error(err);
      }
    },
  };
})();
