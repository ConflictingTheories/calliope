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

module.exports = (() => {
  // Defaults
  const defaultOptions = {
    user: Env.DNS_USERNAME,
    apikey: Env.DNS_APIKEY,
    clientIp: Env.DNS_IP,
  };

  function merge(a, b) {
    let output = Object.clone(a);
    Object.keys(b).foreach((x) => (output[x] = b[x]));
    return output;
  }

  // Set Host Command with Options Passed in
  async function setHost(options) {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    // Params
    var queryParams = {
      apiuser: options.user,
      apikey: options.key,
      username: options.user,
      Command: "namecheap.domains.dns.setHosts",
      ClientIp: options.ipAddress,
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
      let response = await fetch(
        "https://api.namecheap.com/xml.response?" + query.join("&"),
        requestOptions
      );
      return response.text();
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
