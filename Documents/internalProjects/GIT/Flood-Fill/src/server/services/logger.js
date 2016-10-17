'use strict';
var bunyan = require('bunyan'),
    globals = require('../../../config/globals').globals;
var logger = bunyan.createLogger({
    level: 'debug',
    name: __filename,
    streams: globals.loggerStreams
});
module.exports = logger;
