(function () {
    "use strict";

    const gulp = require("gulp");
    const $ = require('gulp-load-plugins')({
        pattern: ['gulp-*']
    });
    const browserSync = require('browser-sync').create();
    const browserSyncSpa = require('browser-sync-spa');
    const runSequence = require("run-sequence");
    const del = require("del");

    gulp.task("del:serve", function(){
        return del(".serve/");
    });

    /**
     * 启动服务
     */
    gulp.task("serve", function () {
        let assetsTimer = null, fontsTimer = null, htmlTimer = null, jsTimer = null, lessTimer = null;
        return runSequence('del:serve', ['inject', 'assets', 'fonts'], function(){
            browserSync.use(browserSyncSpa({
                selector: '[ng-app]'// Only needed for angular apps
            }));
            browserSync.init({
                server: {
                    baseDir: ['.serve', "./"]
                },
                port: 3005,
                open: false
            });
            $.watch("src/assets/**/*.*", function(){
                clearTimeout(assetsTimer);
                assetsTimer = setTimeout(function(){
                    return runSequence("assets");
                }, 2000);
            });
            $.watch("src/fonts/**/*.*", function(){
                clearTimeout(fontsTimer);
                fontsTimer = setTimeout(function(){
                    return runSequence("fonts");
                }, 2000);
            });
            $.watch(["src/**/*.html", "!src/assets/**/*.html"], function(){
                // you can add browserSync.reload to refresh your pages in runSequence callback
                clearTimeout(htmlTimer);
                htmlTimer = setTimeout(function(){
                    return runSequence("partial");
                }, 2000);
            });
            $.watch(["src/**/*.less", "!src/assets/**/*.less"], function(){
                clearTimeout(lessTimer);
                lessTimer = setTimeout(function(){
                    return runSequence("inject");
                }, 2000);
            });
            $.watch(["src/**/*.js", "!src/assets/**/*.js"], function(){
                clearTimeout(jsTimer);
                jsTimer = setTimeout(function(){
                    return runSequence("inject");
                }, 2000);
            });
        });
    });

    /**
     * 将所有assets的静态文件存放到.serve目录下
     */
    gulp.task("assets", function () {
        return gulp.src("src/assets/**/*.*", { base: "src" })
            .pipe(gulp.dest(".serve/"));
    });

    /**
     * 将字体文件存放到静态文件目录.serve下
     */
    gulp.task("fonts", function () {
        return gulp.src("src/fonts/**/*.*", { base: "src" })
            .pipe(gulp.dest(".serve/"));
    });
})();