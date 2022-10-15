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

const ENV = require("./env");
module.exports = (() => {
  return {
    // Feature Flags / Routes
    ENABLE_AUTH: parseInt(ENV.ENABLE_AUTH),
    ENABLE_CONTENT: parseInt(ENV.ENABLE_CONTENT),
    ENABLE_DNS: parseInt(ENV.ENABLE_DNS),

    // Plugins Register / Enable & Disable *Enabled is true by default*
    PLUGINS: [
      {
        name: "ipfs-stream",
        active: true,
      },
      {
        name: "mermaid",
        active: true,
      },
      {
        name: "blockworld",
        active: true,
      },
    ],
  };
})();
