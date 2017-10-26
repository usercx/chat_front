(function () {
    "use strict";
    const gulp = require("gulp");
    const $ = require('gulp-load-plugins')({
        pattern: ['gulp-*']
      });

    /**
     * 将自己写的所有html注入到templatCache中
     */
    gulp.task("partial", function () {
        return gulp.src([
            "src/**/*.html",
            "!src/assets/**.*.html"
        ])
        .pipe($.htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe($.angularTemplatecache('templateCacheHtml.js', {
            module: 'cliApp'
          }))
          .pipe(gulp.dest(".serve/partial"));
    });
})();
