var gulp = require('gulp');
var jade = require('gulp-jade');
var less = require('gulp-less');
var csso = require('gulp-csso');
var data = require('gulp-data');
var svgmin = require('gulp-svgmin');
var imagemin = require('gulp-imagemin');
var autoprefixer = require('gulp-autoprefixer');

var paths = {
  svgs: 'src/images/**/*.svg',
  pngs: 'src/images/**/*.png',
  templates: 'src/templates/**/*.jade',
  styles: 'src/styles/**/*.less'
};

gulp.task('templates', () => {
    return gulp.src(paths.templates)
        .pipe(data(function(file) {
            return require('./src/data.json');
        }))
        .pipe(jade()) // pip to jade plugin
        .pipe(gulp.dest('dist/')); // tell gulp our output folder
});

gulp.task('styles', () => {
    return gulp.src(paths.styles)
        .pipe(less())
        .pipe(autoprefixer())
        // .pipe(csso())
        .pipe(gulp.dest('dist/'))
})

gulp.task('svgs', () => {
    return gulp.src(paths.svgs)
        .pipe(svgmin())
        .pipe(gulp.dest('dist/images/'))
})

gulp.task('pngs', () => {
    return gulp.src(paths.pngs)
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images/'))
})

gulp.task('images', ['svgs', 'pngs'])

gulp.task('watch', function() {
    gulp.watch(paths.svgs, ['svgs']);
    gulp.watch(paths.pngs, ['pngs']);
    gulp.watch(paths.templates, ['templates']);
    gulp.watch(paths.styles, ['styles']);
    gulp.watch('src/data.json', ['templates']);
});

gulp.task('default', ['watch', 'templates', 'styles', 'images']);
