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

// Static Site Generator
class Generator {
  static instance;
  constructor() {
    if (this.instance) return this.instance;
    else {
      // TODO -- Add Actual Logic
      this.instance = (this)
      return this.instance;
    }
  }
}

module.exports = new Generator();
