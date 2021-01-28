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

// Third-party Libraries
const express = require("express");
const router = express.Router({ mergeParams: true });

// Feature Flags
const FF = require("../../../config/featureFlags");

// Export Route
module.exports = (() => {
  // API Routes (V1)
  if (FF.ENABLE_AUTH) router.use("/auth", require("./auth"));
  if (FF.ENABLE_CONTENT) router.use("/content", require("./content"));

  return router;
})();
