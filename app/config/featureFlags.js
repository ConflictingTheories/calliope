const ENV = require('./env');
module.exports = (() => {
  return {
    ENABLE_AUTH: parseInt(ENV.ENABLE_AUTH),
    ENABLE_CONTENT: parseInt(ENV.ENABLE_CONTENT),
  };
})();
