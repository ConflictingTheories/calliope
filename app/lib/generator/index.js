/*                                            *\
** ------------------------------------------ **
**         Calliope - Site Generator   	      **
** ------------------------------------------ **
**  Copyright (c) 2020 - Kyle Derby MacInnis  **
**                                            **
** Any unauthorized distribution or transfer  **
**    of this work is strictly prohibited.    **
**                                            **
**           All Rights Reserved.             **
** ------------------------------------------ **
\*                                            */

const Sequelize = require("../../config/db/migrations/node_modules/sequelize");
console.log(process.env.DB_TYPE, process.env.DB_PORT);
// Static Site Generator
class Generator {
  static instance = null;
  constructor() {
    if (this.instance) return this.instance;
    else {
      // TODO -- Add Actual Logic
      this.instance = (this)
      return this.instance;
    }
  }
}

module.exports = new Database();
