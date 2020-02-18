const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const babel = require('gulp-babel');
const minifyCSS = require('gulp-uglifycss');
const minifyJS = require("gulp-uglify");
const rename = require('gulp-rename');
const concat = require('gulp-concat');

// compile scss into css
/*function scssCode() {
    return gulp.src('assets/scss/*.scss')
        .pipe(sass())
        .pipe(minifyCSS())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('build/css'))
        .pipe(browserSync.stream());
};*/

// compile css
function cssCode() {
    return gulp.src('assets/css/*.css')
        .pipe(concat('main.css'))
        .pipe(minifyCSS())
        .pipe(rename({ 
            basename: "main", 
            suffix: '.min',
            extname: ".css"
        }))
        .pipe(gulp.dest('build/css'))
        .pipe(browserSync.stream());
};

// compile js
function jsCode() {
    return gulp.src('assets/js/*.js')
        .pipe(concat('main.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(rename({
            basename: "main",
            suffix: '.min'
        }))
        .pipe(minifyJS())
        .pipe(gulp.dest('./build/js/'))
        .pipe(browserSync.stream());
};

// Browser auto refresh  
function start() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    // gulp.watch('assets/scss/*.scss', cssCode);
    gulp.watch('assets/css/*.css', cssCode);
    gulp.watch('assets/js/*.js', jsCode);
    gulp.watch('./*.html').on('change', browserSync.reload);
};

exports.cssCode = cssCode;
exports.jsCode = jsCode;
exports.start = start;