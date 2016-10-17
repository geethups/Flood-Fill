'use strict';

var gulp = require('gulp-help')(require('gulp')),
    less = require('gulp-less'),
    babel = require('gulp-babel'),
    path = require('path'),
    del = require('del'),
    sourcemaps = require('gulp-sourcemaps');

var settings = {
    environment: process.env.NODE_ENV || 'local',
};

var paths = {
    es6: ['./src/server/**/*.js'],
    es5: 'build/src/server',
    globalConfig: ['./config/*.js'],
    config: ['./config/**/*'],
    configDest: 'build/config',
    configSourceRoot: path.join(__dirname, 'config'),
    sourceRoot: path.join(__dirname, 'es6')
};

gulp.task('cleanBuild', function (cb) {
    del(['build']);
    cb();
});

gulp.task('copyConfig', ['cleanBuild'], function () {
    var stream = gulp.src(paths.config)
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('.', {
            sourceRoot: paths.configSourceRoot
        }))
        .pipe(gulp.dest(paths.configDest));
    return stream;
});

gulp.task('babelifyConfig', ['copyConfig'], function () {
    var stream = gulp.src(paths.globalConfig)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(sourcemaps.write('.', {
            sourceRoot: paths.configSourceRoot
        }))
        .pipe(gulp.dest(paths.configDest));
    return stream;
});

gulp.task('babelifyLib', ['babelifyConfig'], function () {
    var stream = gulp.src(paths.es6)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(sourcemaps.write('.', {
            sourceRoot: paths.sourceRoot
        }))
        .pipe(gulp.dest(paths.es5));
    return stream;
});

gulp.task('less', 'Creates CSS files', function () {
    return gulp.src('src/client/assets/less/**/*.less')
        .pipe(less())
        .pipe(gulp.dest('src/client/assets/css/'));
});

gulp.task('start_admin', 'Starts the admin tool server', ['less', 'babelifyLib'],
    function () {
        var Server = require('./server');
        var globals = require('./build/config/globals').globals;
    });

gulp.task('default', ['start_admin']);
