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

const Env = require("../../config/env");
const records = require("../../config/dns");
const axios = require("axios");

module.exports = (() => {
  // Defaults
  const defaultOptions = {
    user: Env.DNS_USERNAME,
    apikey: Env.DNS_APIKEY,
    clientIp: Env.DNS_IP,
  };

  function merge(a, b) {
    let output = Object.assign(Object.assign({}, a), b);
    return output;
  }

  // Set Host Command with Options Passed in
  async function setHost(options) {
    // Params
    var queryParams = {
      apiuser: options.user,
      apikey: options.apikey,
      username: options.user,
      Command: "namecheap.domains.dns.setHosts",
      ClientIp: options.clientIp,
      SLD: options.sld,
      TLD: options.tld,
      HostName1: options.host,
      RecordType1: options.type,
      Address1: options.value,
      TTL1: options.ttl,
    };

    // Stringify
    let query = Object.keys(queryParams).map(
      (x) => "" + x + "=" + queryParams[x]
    );

    // Fetch
    try {
      let response = await axios.get("https://api.namecheap.com/xml.response?" + query.join("&"));
      return response;
    } catch (e) {
      console.error(e);
    }
  }

  function setRecords() {
    try {
      records.map(async (x) => {
        console.log("Setting DNS Record :: ", x);
        let options = merge(defaultOptions, x);
        await setHost(options);
      });
    } catch (e) {
      console.error(e);
    }
  }

  const _that = {
    setRecords,
    setHost,
  };

  return _that;
})();
