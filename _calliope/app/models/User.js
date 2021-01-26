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

module.exports = (() => {
  // Declaration
  class User extends Model {}
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      username: { type: DataTypes.STRING, unique: true },
      passwordHash: DataTypes.STRING,
      salt: DataTypes.STRING,
      name: DataTypes.STRING,
      avatar: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    { sequelize: DB, modelName: "user" }
  );

  // Relationships
  return User;
})();
