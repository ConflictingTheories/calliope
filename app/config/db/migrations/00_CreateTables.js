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

const { DataTypes } = require("sequelize");

module.exports = (() => {
  // Models
  const Permission = require("../../../models/Permission");
  const Role = require("../../../models/Role");
  const Session = require("../../../models/Session");
  const User = require("../../../models/User");

  const migrations = [
    Session,
    User,
    Role,
    Permission
  ];

  return {
    up: () => {
      return migrations.reduce(async (_, x) => {
        let result = await x.sync();
        return result;
      }, null);
    },
    down: () => {
      return migrations.reverse().reduce(async (_, x) => {
        let result = await x.drop({ cascade: true });
        return result;
      }, null);
    },
  };
})();
