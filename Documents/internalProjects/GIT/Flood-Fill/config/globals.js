'use strict';
let cfgManager = require('../src/server/utils/configManager');
let appCfg = cfgManager.getConfig('app');

let APP_SERVER_PORT = appCfg.server.port;

class Globals {
    constructor() {
        this.logDir = appCfg.logDir;

        this.loggerStreams = [
            {
                type: 'rotating-file',
                level: 'error',
                path: `${this.logDir}/error/app_server.log`,
                period: '1d',
                count: 5
            },
            {
                type: 'rotating-file',
                level: 'info',
                path: `${this.logDir}/info/app_server.log`,
                period: '1d',
                count: 5
      }
    ];

        this.appServerPort = APP_SERVER_PORT;
    }
}

module.exports = {
    globals: new Globals(),
    Globals: Globals
};
