'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var cfgManager = require('../src/server/utils/configManager');
var appCfg = cfgManager.getConfig('app');

var APP_SERVER_PORT = appCfg.server.port;

var Globals = function Globals() {
    _classCallCheck(this, Globals);

    this.logDir = appCfg.logDir;

    this.loggerStreams = [{
        type: 'rotating-file',
        level: 'error',
        path: this.logDir + '/error/app_server.log',
        period: '1d',
        count: 5
    }, {
        type: 'rotating-file',
        level: 'info',
        path: this.logDir + '/info/app_server.log',
        period: '1d',
        count: 5
    }];

    this.appServerPort = APP_SERVER_PORT;
};

module.exports = {
    globals: new Globals(),
    Globals: Globals
};
//# sourceMappingURL=globals.js.map
