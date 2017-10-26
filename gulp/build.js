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

    gulp.task("del:dist", function(){
        return del("dist/");
    });
    /**
     * 启动服务
     */
    gulp.task("build", function () {
        // let htmlFilter = $.filter(function(file){
        //     console.log(file.path);
        //     return file.path.endsWith(".html");
        // }, {restore: true});
        let htmlFilter = $.filter(file => file.path.endsWith(".html"), {restore: true});
        return runSequence(['del:serve', "del:dist"], ['inject', 'assets', 'fonts'], ["assets:build", "fonts:build"], function(){
            return gulp.src(".serve/*.html")
                .pipe($.useref({searchPath: [".serve", "./"]}))
                .pipe($.if("**/vendor.js", $.babel({"presets": ["env"], plugins: ['transform-remove-strict-mode']})))// 转化es6代码到es5代码
                .pipe($.if("**/vendor.js", $.ngAnnotate()))// 将所有的东西全部依赖注入
                .pipe($.if("*.js", $.uglify()))
                .pipe($.if("*.css", $.replace('/bower_components/bootstrap/fonts/', '/fonts/')))
                .pipe($.if("*.css", $.replace('/bower_components/font-awesome/fonts/', '/fonts/')))
                .pipe($.if("*.css", $.cleanCss()))
                .pipe($.if("*.js", $.rev()))
                .pipe($.if("*.css", $.rev()))
                .pipe(htmlFilter)
                .pipe($.htmlmin({
                    collapseWhitespace: true,
                    removeComments: true
                }))
                .pipe(htmlFilter.restore)
                .pipe($.revReplace())
                .pipe(gulp.dest("dist/"));
        });
    });
    gulp.task("assets:build", function(){
        return gulp.src(".serve/assets/**/*.*", {base: ".serve"})
                .pipe(gulp.dest("dist/"));
    });
    gulp.task("fonts:build", function(){
        return gulp.src(".serve/fonts/**/*.*", {base: ".serve"})
        .pipe(gulp.dest("dist/"));
    });
})();