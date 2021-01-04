const ENV = require('./env');
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
        active: true
      }
    ]
  };
})();
