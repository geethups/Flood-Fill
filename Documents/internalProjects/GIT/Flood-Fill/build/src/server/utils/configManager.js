'use strict';

var configManager = require('node-config-manager');

var options = {
    configDir: 'config',
    env: process.env.NODE_ENV === 'local' ? 'local' : 'production',
    //    env: process.env.NODE_ENV === undefined ? 'local' : process.env.NODE_ENV,
    camelCase: true
};

configManager.init(options);
configManager.addConfig('app');
configManager.addConfig('dbSchema');
module.exports = configManager;
//# sourceMappingURL=configManager.js.map
