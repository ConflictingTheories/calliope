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

// List of DNS Records (Using Namecheap as Backend - Enable and Set in Environment) to Configure on Load

// TODO - Fetch SITE_IP Dynamically using lookup for DNS (Not possible if ClientIP must be the same as the location)
// 
//

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
