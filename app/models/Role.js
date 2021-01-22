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
const User = require("./User");

module.exports = (() => {
  // Declaration
  class Role extends Model {}
  Role.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      tag: { type: DataTypes.STRING, unique: true },
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    { sequelize: DB, modelName: "role" }
  );

  // Role
  Role.belongsToMany(User, {
    through: "user_role",
  });
  User.belongsToMany(Role, {
    through: "user_role",
  });

  return Role;
})();
