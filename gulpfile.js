"use strict";
// npm i gulp --save-dev
const { src, dest, parallel, series, watch  } = require('gulp');

const concat                                  = require('gulp-concat');
let uglify                                    = require('gulp-uglify-es').default;
const rigger                                  = require('gulp-rigger');

const sass                                    = require('gulp-sass');
const autoprefixer                            = require('gulp-autoprefixer');
const sourcemaps                              = require('gulp-sourcemaps');
const rename                                  = require('gulp-rename');


const stripCssComments                        = require('gulp-strip-css-comments');
const cleancss                                = require('gulp-clean-css');
const strip                                   = require('gulp-strip-comments');
const imagemin                                = require('gulp-imagemin');
const newer                                   = require('gulp-newer');
const del                                     = require('del');
const plumber                                 = require('gulp-plumber');
const notify                                  = require('gulp-notify');

const ftp                                     = require('gulp-ftp');
const vinyFTP                                 = require('vinyl-ftp');
const gulpUtil                                = require('gulp-util');

const browserSync                             = require('browser-sync').create();

function styles() {
	return src([
		'app/scss/libs.scss',
		'app/scss/main.scss'
	])
		.pipe(plumber({
		errorHandler: notify.onError(function(err){
 			return {
 				title: 'Styles',
 				message:err.message
 			}
 			})
 	}))
		.pipe(sourcemaps.init())
		  .pipe(sass().on('error', sass.logError))
		.pipe(concat('libs.css'))
		.pipe(rename('libs.min.css'))
		.pipe(autoprefixer({
			overrideBrowserlist: ['last 10 versions'],
			grid: true
		}))
		.pipe(stripCssComments())
		.pipe(cleancss(({
			level: { 2: { specialComments: 0 } },
//			format: 'beautify'
			format: 'keep-breaks'
		}))) // Opt., comment out when debugging
		.pipe(sourcemaps.write(''))
		.pipe(dest('app/css/'))
}

function browsersync() {
	browserSync.init({
		server: { baseDir: 'app/' },
		notify: false,
		online: false
	})
}

function scripts() {
	return src([
		'app/libs/plagins/jquery.min.js',
		'app/libs/plagins/page-scroll-to-id-master/js/minified/jquery.malihu.PageScroll2id.min.js',
		'app/libs/plagins/magnific-popup/jquery.magnific-popup.min.js',
		'app/libs/plagins/slick/slick.min.js',
		'app/libs/common.js'
	])
		.pipe(strip())
		.pipe(rigger())
		.pipe(concat('scripts.min.js'))
		.pipe(uglify())
		.pipe(dest('app/js/'))
		.pipe(browserSync.stream())
}

function images() {
	return src('app/img/**/*')
		.pipe(newer('dist/img/'))
		.pipe(imagemin())
		.pipe(dest('dist/img/'))
}

function cleanimg() {
	return del('dist/img/')
}

function cleandest() {
  return del('dest/**/*', { force : true })
}

function startwatch() {
	watch('app/scss/*.scss', styles);
	watch('app/img/**/*.*').on('change', browserSync.reload);
	watch('app/**/*.html').on('change', browserSync.reload);
	watch('app/**/*.php').on('change', browserSync.reload);
	watch('app/css/*.css').on('change', browserSync.reload);
	watch(['app/**/*.js', '!app/**/*.min.js'], scripts);
 }

function buildcopy() {
	return src(['app/css/**/*.min.css',
		'app/js/**/*.min.js',
		'app/**/*.html',
		'app/**/*.php',
		'app/**/ht.access'], {base:'app'})
.pipe(dest('dest'))
}

exports.browsersync = browsersync;
exports.scripts = scripts;
exports.styles = styles;
exports.images = images;
exports.cleanimg = cleanimg;
exports.cleandest = cleandest;

exports.build = series(cleandest, styles, scripts, images, buildcopy);

exports.default = parallel(styles, scripts, browsersync, startwatch)

// FTP: ftp://vh146.timeweb.ru
// Логин: cc63120
// Пароль: j7X4Y36Od5Zm
// http://cw25156.tmweb.ru/

function ftp() {
let conn = vinyFTP.create( {
	host:     'vh210.timeweb.ru',
	user:     'cw25156',
	password: '2qzRb2Wo2zjm',
	parallel: 10,
	log:      gulpUtil.log
	} );

	let globs = [
	'dist/**'
	];

 // using base = '.' will transfer everything to /public_html correctly
 // turn off buffering in gulp.src for best performance

    return gulp.src( globs, { base: './dist/', buffer: false } )
   .pipe( conn.newerOrDifferentSize( '/public_html' ) )// only upload newer files
   .pipe( conn.dest( '/public_html' ) );
  };

exports.ftp = ftp;
