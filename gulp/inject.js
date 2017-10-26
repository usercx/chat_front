(function () {
    "use strict";
    const gulp = require("gulp");
    const $ = require('gulp-load-plugins')({
        pattern: ['gulp-*']
    });
    const series = require('stream-series');
    const wiredep = require("wiredep").stream;
    /**
     * 将bower_componenets中的js与css和自己编写的js与less注入到index.html中并保存至.serve目录下
     */
    gulp.task("inject", ['scripts', 'styles', 'partial'], function () {
        // templateCache文件
        let partialFile = gulp.src(".serve/partial/*.js", { base: ".serve" });
        let partialOption = {
            starttag: '<!-- inject:partials -->',
            addRootSlash: false
        };
        // 所有的js文件
        let jsFile = gulp.src([
            ".serve/**/*.js",
            "!.serve/partial/*.js"
        ]).pipe($.angularFilesort());
        let fileOption = {
            addRootSlash: false
        };

        // 所有的css文件, 按照固定的顺序注入
        let commonCssFile = gulp.src([
            ".serve/styles/less/*.css",
        ]);
        let allCssFile = gulp.src([
            ".serve/styles/**/*.css",
            "!.serve/styles/less/*.css"
        ]);
        return gulp.src("src/index.html")
            .pipe($.inject(partialFile, partialOption))
            .pipe($.inject(jsFile, fileOption))
            .pipe($.inject(series(commonCssFile, allCssFile), fileOption))
            .pipe(wiredep({
                ignorePath: /..\//
            }))
            .pipe(gulp.dest(".serve"));
    });
})();
