'use strict';
var cfgManager = require('node-config-manager'),
    log = require('../services/logger'),
    Q = require('q');

const dbSchema = cfgManager.getConfig('dbSchema');

function mysqlRealEscapeString(str) {
    return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
        switch (char) {
            case '\0':
                return '\\0';
            case '\x08':
                return '\\b';
            case '\x09':
                return '\\t';
            case '\x1a':
                return '\\z';
            case '\n':
                return '\\n';
            case '\r':
                return '\\r';
            case '\"':
            case '\'':
            case '\\':
            case '%':
                return '\\' + char;
            default:
        }
    });
}

function getColumns(obj) {
    var field = '(';
    for (var i = 0; i < obj.length; i++) {
        field = field + obj[i];
        if (i !== obj.length - 1) {
            field = field + ',';
        } else {
            field = field + ')';
        }
    }
    return field;
}

function getValues(obj) {
    try {
        function returnValue(k) {
            return '\'' + mysqlRealEscapeString(obj[k]) + '\'';
        }
        const valueList = Object.keys(obj).map(returnValue);
        const value = '(' + valueList.join(',') + ')';
        return value;
    } catch (err) {
        log.error('Caught exception: ' + err);
    }
}

function getColumnsForTable(table) {
    var columns;
    switch (table) {
        case 'QuestionsTable':
            columns = dbSchema.QuestionsInfo.columns;
            break;
        case 'AnswerTable':
            columns = dbSchema.AnswerInfo.columns;
            break;
        case 'LikeTable':
            columns = dbSchema.LikeInfo.columns;
            break;
        case 'UserTable':
            columns = dbSchema.UserInfo.columns;
            break;
        default:
            columns = '';
            break;

    }
    return columns;
}

function setConstructor(dataArr) {
    var setStr = '';
    for (var key in dataArr) {
        var dataVal = (typeof (dataArr[key].updateVal) == 'string') ? '\'' + mysqlRealEscapeString(dataArr[key].updateVal) + '\'' : dataArr[key].updateVal;
        setStr = setStr + dataArr[key].updateField + '=' + dataVal + ',';
    }
    setStr = setStr.slice(0, -1);
    return setStr;
}

function getQueryString(table, data, DBoperation) {
    var query;
    try {
        if (DBoperation === 'INSERT') {
            const column = getColumns(getColumnsForTable(table));
            const values = getValues(data);
            query = 'INSERT INTO ' + table + column + ' VALUES ' + values + ';';
        } else if (DBoperation === 'UPDATE') {
            if (data && data.updateObj) {
                var setStr = setConstructor(data.updateObj);
            }
            const keyField = data.keyField;
            const keyVal = getValues({
                'keyVal': data.keyVal
            });
            query = 'UPDATE ' + table + ' SET ' + setStr + ' WHERE ' + keyField + '=' + keyVal + ';';
        }
        if (!query) {
            throw new Error('Query Constructor failed.');
        }
    } catch (exception) {
        log.error('Caught exception: ' + exception);
    }
    return query;
}

function getSelectQuesQueryString(table, quesDesc) {
    var query;
    if (quesDesc === 'all') {
        query = 'SELECT * FROM ' + table + ';';
    } else {
        const value = '\'' + mysqlRealEscapeString(quesDesc) + '\'';
        query = 'SELECT * FROM ' + table + ' where questionDesc = ' + value + ';';
    }
    return query;
}

function getSelectLoginQueryString(table, loginData) {
    var query;
    query = 'SELECT * FROM ' + table + ' where userName = ' + '\'' + mysqlRealEscapeString(loginData.username) + '\'' +
        ' and password=' + '\'' + mysqlRealEscapeString(loginData.password) + '\'' + ';';
    return query;
}

function constructSelectCond(dataArr) {
    var setStr = '';
    for (var key in dataArr) {
        var keyVal = dataArr[key];
        var dataVal = (typeof (keyVal.val) == 'string') ? '\'' + mysqlRealEscapeString(keyVal.val) + '\'' : keyVal.val;
        setStr = setStr + keyVal.col + '=' + dataVal + '&&';
    }
    setStr = setStr.slice(0, -1);
    setStr = setStr.slice(0, -1);
    return setStr;
}

function getSelectQueryString(table, dataArr) {
    var query, setStr;
    if (dataArr) {
        setStr = constructSelectCond(dataArr);
    }
    query = 'SELECT * FROM ' + table + ' where ' + setStr + ';';
    return query;
}

function getDeleteQueryString(table, data) {
    var query,
        column = JSON.parse(data).col,
        value = '\'' + mysqlRealEscapeString(JSON.parse(data).val) + '\'';
    query = 'DELETE FROM ' + table + ' WHERE ' + column + ' = ' + value + ';';
    return query;
}

function getTable(tableFile) {
    var table,
        deferred = Q.defer();
    switch (tableFile) {
        case 'ques':
            table = dbSchema.QuestionsInfo.tableName;
            break;
        case 'ans':
            table = dbSchema.AnswerInfo.tableName;
            break;
        case 'like':
            table = dbSchema.LikeInfo.tableName;
            break;
        case 'tech':
            table = dbSchema.TechInfo.tableName;
            break;
        case 'user':
            table = dbSchema.UserInfo.tableName;
            break;
        default:
            table = '';
            break;
    }
    if (table) {
        deferred.resolve(table);
    } else {
        deferred.reject(table);
    }
    return deferred.promise;
}

var queryConstructor = {
    getQueryString: getQueryString,
    getSelectQueryString: getSelectQueryString,
    getSelectLoginQueryString: getSelectLoginQueryString,
    getSelectQuesQueryString: getSelectQuesQueryString,
    getDeleteQueryString: getDeleteQueryString,
    getTable: getTable
};

module.exports = queryConstructor;
