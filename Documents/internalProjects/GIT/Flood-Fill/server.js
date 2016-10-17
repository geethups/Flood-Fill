#!/bin/env node

'use strict';

var controller = require('./build/src/server/controllers/controller'),
    express = require('express'),
    fs = require('fs'),
    bodyParser = require('body-parser'),
    bunyan = require('bunyan'),
    path = require('path'),
    logger;

var floodfillApp = function () {
    var self = this;

    self.populateCache = function () {
        if (typeof self.zcache === "undefined") {
            self.zcache = {
                'index.html': ''
            };
        }
        //  Local cache for static content.
        self.zcache['index.html'] = fs.readFileSync('./src/client/index.html');
    };

    self.cache_get = function (key) {
        return self.zcache[key];
    };

    self.createRoutes = function () {
        self.routes = {};
        self.routes['/'] = function (req, res) {
            res.setHeader('Content-Type', 'text/html');
            res.send(self.cache_get('index.html'));
        };
    };

    self.initializeServer = function () {
        self.createRoutes();
        self.app = express();
        self.app.use(bodyParser.json());
        self.app.use(bodyParser.urlencoded({
            extended: true
        }));
        self.serverInstance = null;
        self.app.use('/client', express.static(__dirname + '/src/client'));
        for (var r in self.routes) {
            self.app.get(r, self.routes[r]);
        }

        var PREFIX = '/flood/v1';
        self.app.post(PREFIX + '/login', controller._login);
        self.app.post(PREFIX + '/save/data', controller._save);
        self.app.post(PREFIX + '/update/data', controller._update);
        self.app.get(PREFIX + '/get/data', controller._get);
        self.app.post(PREFIX + '/add/like', controller._addLike);
        self.app.delete(PREFIX + '/remove/data', controller._remove);
        self.app.get(PREFIX + '/get/tech', controller._get);
        self.app.post(PREFIX + '/add/user', controller._addUser);
        self.app.post(PREFIX + '/send/mail', controller._sendEmail);
    };

    self.initRoutes = function () {
        var router = new Router();
        router.apply(self.app);
    }

    self.setupVariables = function () {
        self.ipaddress = process.env.OPENSHIFT_NODEJS_IP;
        self.port = process.env.OPENSHIFT_NODEJS_PORT || 8081;

        if (typeof self.ipaddress === "undefined") {
            console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
            self.ipaddress = "127.0.0.1";
        } else {
            console.log('OPENSHIFT_NODEJS_IP using ', self.ipaddress);
        }
    };

    self.start = function (done) {
        self.app.listen(self.port, self.ipaddress, function () {
            console.log('Node server started on %s:%d ...', self.ipaddress, self.port);
        });
    }

    self.close = function () {
        console.log('Shutting down APP server...');
        logger.info('Shutting down');
        self.serverInstance.close();
    }

    self.initialize = function () {
        self.setupVariables();
        self.populateCache();
        self.initializeServer();
    }
}

var zapp = new floodfillApp();
zapp.initialize();
zapp.start();
