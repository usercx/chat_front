(function () {
    "use strict";

    const gulp = require("gulp");
    const $ = require('gulp-load-plugins')({
        pattern: ['gulp-*']
    });

    /**
     * 直接引入脚本
     */
    gulp.task("scripts", function(){
        return gulp.src([
            "src/**/*.js",
            "!src/assets/**.*.js"
        ])
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe(gulp.dest(".serve/scripts"));
    });

    /**
     * 将脚本转化为es5的代码之后再进行引入
     */
    gulp.task("scripts:es5", function(){
        return gulp.src([
            "src/**/*.js",
            "!src/assets/**.*.js"
        ])
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.babel({
            "presets": ['env'],
            plugins: ['transform-remove-strict-mode']   // 为了移除babel自动转码后在每个文件的首部自动添加use strict
          }))
        .pipe(gulp.dest(".serve/scripts"));
    });
})();