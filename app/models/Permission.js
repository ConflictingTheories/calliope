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
const { Model, DataTypes } = require("sequelize");
const DB = require("../lib/database");
// Models
const Role = require("./Role");

// Pass in DB Handler Instance
module.exports = (() => {
  // Declaration
  class Permission extends Model {}
  Permission.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      tag: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    { sequelize: DB, modelName: "permission" }
  );

  // Relationships

  Permission.belongsToMany(Role, {
    through: "role_permission",
  });
  Role.belongsToMany(Permission, {
    through: "role_permission",
  });

  return Permission;
})();
