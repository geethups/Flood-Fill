'use strict';

var Q = require('q'),
    crypto = require('crypto'),
    nodemailer = require('nodemailer'),
    cfgManager = require('../utils/configManager'),
    mysql = require('mysql'),
    appCfg = cfgManager.getConfig('app'),
    dbSchema = cfgManager.getConfig('dbSchema'),
    queryConstructor = require('../utils/queryConstructor'),
    getQueryString = queryConstructor.getQueryString,
    getSelectQueryString = queryConstructor.getSelectQueryString,
    getSelectLoginQueryString = queryConstructor.getSelectLoginQueryString,
    getSelectQuesQueryString = queryConstructor.getSelectQuesQueryString,
    getDeleteQueryString = queryConstructor.getDeleteQueryString,
    getTable = queryConstructor.getTable;

var connection;

connection = mysql.createConnection({
    host: appCfg.database.host,
    port: appCfg.database.port,
    user: appCfg.database.user,
    password: appCfg.database.password,
    database: appCfg.database.database
});

var _loginHandler = function _loginHandler(req, res, next) {
    if (req.body) {
        var query = getSelectLoginQueryString('UserTable', req.body);
        _queryExecution(query).then(function (response) {
            if (response.resData.length > 0) {
                require('crypto').randomBytes(48, function (ex, buf) {
                    var token = buf.toString('hex');
                    res.header('access_token', token);
                    res.send(response);
                });
            } else {
                res.send({
                    status: 'nok'
                });
            }
        }).catch(function (error) {
            res.send(error);
        });
    } else {
        res.send('No request body');
    }
};

function getInsertQuery(tableFile, data, dbOp) {
    var query,
        deferred = Q.defer();
    getTable(tableFile).then(function (table) {
        query = getQueryString(table, data, dbOp);
        deferred.resolve(query);
    }).catch(function (error) {
        deferred.reject(error);
    });
    return deferred.promise;
}

var _queryExecution = function _queryExecution(query) {
    var deferred = Q.defer(),
        errRes,
        jsonData;
    connection.query(query, function (err, resData) {
        if (err) {
            errRes = {
                status: 'nok',
                message: err
            };
            deferred.reject(errRes);
        } else {
            jsonData = {
                status: 'ok',
                message: 'success',
                resData: resData
            };
            deferred.resolve(jsonData);
        }
    });
    return deferred.promise;
};

var _saveDataHandler = function _saveDataHandler(req, res, next) {
    if (req.body) {
        var query,
            tableType,
            data = req.body;
        tableType = req.query.tableType;
        getInsertQuery(tableType, data, 'INSERT').then(function (query) {
            return query;
        }).then(function (query) {
            _queryExecution(query).then(function (resData) {
                res.send(resData);
            }).catch(function (error) {
                res.send(error);
            });
        });
    }
};

var _getDataHandler = function _getDataHandler(req, res, next) {
    if (req.query) {
        var query, tableType;
        tableType = req.query.tableType;
        getTable(tableType).then(function (table) {
            if (req.query.ques) {
                query = getSelectQuesQueryString(table, req.query.ques);
            } else {
                query = getSelectQuesQueryString(table, 'all');
            }
            return query;
        }).then(function (query) {
            _queryExecution(query).then(function (resData) {
                res.send(resData);
            }).catch(function (error) {
                res.send(error);
            });
        });
    }
};

var _updateHandler = function _updateHandler(req, res, next) {
    if (req.body) {
        var query,
            tableType,
            data = req.body;
        tableType = req.query.tableType;
        getInsertQuery(tableType, data, 'UPDATE').then(function (query) {
            return query;
        }).then(function (query) {
            _queryExecution(query).then(function (resData) {
                res.send(resData);
            }).catch(function (error) {
                res.send(error);
            });
        });
    }
};

var _addLikeHandler = function _addLikeHandler(req, res, next) {
    if (req.body) {
        var query,
            data = req.body;
        query = getSelectQueryString(dbSchema.LikeInfo.tableName, data.queryArr);
        _queryExecution(query).then(function (response) {
            if (response.resData.length > 0) {
                res.send({
                    status: 'nok'
                });
            } else {
                getInsertQuery('like', data.dataObj, 'INSERT').then(function (query) {
                    return query;
                }).then(function (query) {
                    _queryExecution(query).then(function (response) {
                        res.send({
                            status: 'ok'
                        });
                    }).catch(function (error) {
                        res.send(error);
                    });
                });
            }
        }).catch(function (error) {
            res.send(error);
        });
    }
};

var _removeHandler = function _removeHandler(req, res, next) {
    var query,
        tableType = req.query.tableType,
        data = req.query.data;
    getTable(tableType).then(function (table) {
        return table;
    }).then(function (table) {
        query = getDeleteQueryString(table, data);
        _queryExecution(query).then(function (response) {
            if (response && response.resData && response.resData.affectedRows > 0) {
                res.send({
                    status: 'ok'
                });
            } else {
                res.send({
                    status: 'nok'
                });
            }
        }).catch(function (error) {
            res.send(error);
        });
    }).catch(function (error) {
        log.error('Remove error', error);
        res.send(error);
    });
};

var _sendEmailHandler = function (req, res, next) {
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: appCfg.mail.authMail,
            pass: appCfg.mail.authPass
        }
    });
    var htmlContent = '<div style="width: 450px;border: 1px solid #507AAA;height: 250px;text-align: center;' +
        'font-family: sans-serif;">' +
        '<div style="width: 450px;height: 35px;background: #507AAA;color: white;padding-top: 14px;font-size: 18px;">Flood Fill</div>' +
        '<div><h3 style="color:#167016;">greeting ' + req.body.user + '</h3><h2 style="color:#507AAA;">Welcome to Flood Fill</h2><br/>' +
        '<p style="font-size:16px;">FloodFill help you to share your thoughts among your colleagues.</p></div></div>';
    var mailOptions = {
        from: appCfg.mail.authMail,
        to: appCfg.mail.mailId + ',' + req.body.toAddr,
        subject: 'FloodFill',
        html: htmlContent
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.send({
                status: 'nok'
            });
        } else {
            console.log('Message sent: ' + info.response);
            res.send({
                status: 'ok',
                data: info.response
            });
        };
    });
};

var controller = {
    _login: _loginHandler,
    _save: _saveDataHandler,
    _update: _updateHandler,
    _get: _getDataHandler,
    _addLike: _addLikeHandler,
    _remove: _removeHandler,
    _addUser: _saveDataHandler,
    _sendEmail: _sendEmailHandler
};

module.exports = controller;
//# sourceMappingURL=controller.js.map
