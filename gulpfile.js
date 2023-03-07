'use strict';
// npm i gulp --save-dev
const { src, dest, parallel, series, watch } = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const rigger = require('gulp-rigger');
const imageminPic = require('gulp-imagemin');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const stripCssComments = require('gulp-strip-css-comments');
const cleancss = require('gulp-clean-css');
const strip = require('gulp-strip-comments');
const newer = require('gulp-newer');
const del = require('del');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const browserSync = require('browser-sync').create();

function styles() {
  return src(['app/scss/libs.scss', 'app/scss/main.scss'])
    .pipe(
      plumber({
        errorHandler: notify.onError(function (err) {
          return {
            title: 'Styles',
            message: err.message,
          };
        }),
      })
    )
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('libs.css'))
    .pipe(rename('libs.min.css'))
    .pipe(
      autoprefixer({
        overrideBrowserlist: ['last 10 versions'],
        grid: true,
      })
    )
    .pipe(stripCssComments())
    .pipe(
      cleancss({
        level: { 2: { specialComments: 0 } },
        //			format: 'beautify'
        format: 'keep-breaks',
      })
    ) // Opt., comment out when debugging
    .pipe(sourcemaps.write(''))
    .pipe(dest('app/css/'));
  //  .pipe(browserSync.stream());
}

function browsersync() {
  browserSync.init({
    server: { baseDir: 'app/' },
    notify: false,
    online: false,
  });
}

function scripts() {
  return src([
    'app/libs/plugins/jquery.min.js',
    //	'app/libs/plugins/page-scroll-to-id-master/js/minified/jquery.malihu.PageScroll2id.min.js',
    //	'app/libs/plugins/magnific-popup/jquery.magnific-popup.min.js',
    //	'app/libs/plugins/slick/slick.min.js',
    //node-modules/swiper/swiper-bundle.js,
    'app/libs/common.js',
  ])
    .pipe(strip())
    .pipe(rigger())
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js/'))
    .pipe(browserSync.stream());
}

function images() {
  return src('app/img/**/*').pipe(newer('dest/img/')).pipe(imageminPic()).pipe(dest('dest/img/'));
}

function cleanimg() {
  return del('dist/img/');
}

function cleandest() {
  return del('dest/**/*', { force: true });
}

function startwatch() {
  watch('app/scss/*.scss', styles);
  watch('app/img/**/*.*').on('change', browserSync.reload);
  watch('app/**/*.html').on('change', browserSync.reload);
  watch('app/**/*.php').on('change', browserSync.reload);
  watch('app/css/*.css').on('change', browserSync.reload);
  //  watch('app/js/*.js').on('change', browserSync.reload);
  watch(['app/**/*.js', '!app/**/*.min.js'], scripts);
}

function buildcopy() {
  return src(['app/css/**/*.min.css', 'app/js/**/*.min.js', 'app/*.html', 'app/*.php', 'app/**/ht.access'], { base: 'app' }).pipe(dest('dest'));
}

exports.browsersync = browsersync;
exports.scripts = scripts;
exports.styles = styles;
exports.images = images;
exports.cleanimg = cleanimg;
exports.cleandest = cleandest;

exports.build = series(cleandest, styles, scripts, images, buildcopy);

exports.default = parallel(styles, scripts, browsersync, startwatch);
