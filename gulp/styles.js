(function () {
    "use strict";

    const gulp = require("gulp");
    const $ = require('gulp-load-plugins')({
        pattern: ['gulp-*']
    });

    /**
     * 编译自定义的所有less文件到.serve文件夹中
     */
    gulp.task("styles", function(){
        return gulp.src([
            "src/less/**/*.less",
            "src/modules/**/*.less",
            "src/directives/**/*.less",            
        ], {base: "src"})
        .pipe($.plumber())
        .pipe($.less())
        .pipe(gulp.dest(".serve/styles"));
    });
})();