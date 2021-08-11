const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cleanCss = require("gulp-clean-css");
const rename = require("gulp-rename");

gulp.task("scss-compile", () => {
  return gulp
    .src("./src/assets/scss/main.scss")
    .pipe(sass())
    .pipe(cleanCss())
    .pipe(rename("styles.min.css"))
    .pipe(gulp.dest("./dist/assets/css/"));
});

// файлы сборки которые не сильно меняются
gulp.task("assets", () => {
  return gulp
    .src(["./src/assets/*.html", "./src/assets/img"])
    .pipe(gulp.dest("./dist/assets/"));
});

// scss watcher ну проще было бы sass --watch scss css файлы ну так тоже неплохо
gulp.task("scss-watch", () => {
  return gulp.watch(
    "./src/assets/scss/**/*.scss",
    gulp.series("scss-compile", "assets")
  );
});
