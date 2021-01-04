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

const Env = require("./env");

module.exports = [
  {
    sld: "kderbyma",
    tld: "com",
    host: "www",
    type: "A",
    value: Env.SITE_IP,
    ttl: "100",
  },
];
