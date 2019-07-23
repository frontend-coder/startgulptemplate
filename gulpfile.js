// npm i gulp --save-dev
const gulp              = require('gulp');
// npm i --save-dev gulp-sass gulp-concat gulp-uglify gulp-clean-css gulp-rename gulp-autoprefixer gulp-sourcemaps gulp-plumber gulp-filesize gulp-notify
// npm i --save-dev gulp-util
const sass                  = require('gulp-sass');
const concat                = require('gulp-concat');
const uglify                = require('gulp-uglify');
const cleancss              = require('gulp-clean-css');
const rename                = require('gulp-rename');
const autoprefixer          = require('gulp-autoprefixer');
const sourcemaps        = require('gulp-sourcemaps');
const plumber           = require('gulp-plumber');
const filesize          = require('gulp-filesize');
const notify                = require('gulp-notify');
const gulpUtil          = require('gulp-util');
//const growl          = require('gulp-notify-growl');

// npm i --save-dev browser-sync
const browserSync           = require('browser-sync').create();


gulp.task('styles', () => {
  var sassFiles = [
  'app/scss/libs.scss',
  'app/scss/main.scss'
  ];
  return gulp.src(sassFiles)
  .pipe(plumber({
   errorHandler: notify.onError({
    message: function(error) {
      return error.message;
    }})
 }))
  .pipe(sourcemaps.init())
  .pipe(sass({ outputStyle: 'expanded' }))
.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade:true}))
.pipe(concat('libs.css'))
.pipe(rename('libs.min.css'))
//.pipe(cleancss( {level: { 2: { specialComments: 0 } } })) // Opt., comment out when debugging
.pipe(filesize()).on('error', gulpUtil.log)
.pipe(sourcemaps.write(''))
.pipe(notify("Create file: <%= file.relative %>!"))
.pipe(gulp.dest('app/css'));
});

gulp.task('scripts', done => {
  var jsFiles = [
  'app/libs/plagins/jquery/jquery.min.js',
//'app/libs/plagins/nicescroll/jquery.nicescroll.min.js',
//'app/libs/plagins/jquery.PageScroll2id/jquery.PageScroll2id.min.js',
'app/libs/plagins/magnific-popup/jquery.magnific-popup.min.js',
// 'app/libs/plagins/owlcarousel/owl.carousel.min.js',
'app/libs/plagins/slick/slick.min.js',
'app/libs/common.js'
// Always at the end
];
return gulp.src(jsFiles)
.pipe(concat('scripts.min.js'))
//	.pipe(uglify()) // Mifify js (opt.)
.pipe(notify("Create file: <%= file.relative %>!"))
.pipe(gulp.dest('app/js'))
.pipe(filesize()).on('error', gulpUtil.log);
done();
});

gulp.task('serve', done => {
  browserSync.init({
    server: {
      baseDir: './app'
    },
    notify: false,
    open:true,
        // open: false,
        // online: false, // Work Offline Without Internet Connection
        // tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
      });
  browserSync.watch('app', browserSync.reload);
  done();
});

gulp.task('code', done => {
	return gulp.src(['app/*.html', 'app/*php']);
  done();
});

gulp.task('picture', done => {
  return gulp.src(['app/img/*.{jpg,png,svg,ico}']);
  done();
});


gulp.task('watch', done => {
  gulp.watch("app/scss/**/*.scss", gulp.series('styles'));
  gulp.watch("app/libs/**/*.js", gulp.series('scripts'));
  gulp.watch("app/*.html", gulp.series('code'));
  gulp.watch("app/img/**/*.*", gulp.series('picture'));
  done();
});

gulp.task('default', gulp.parallel(['styles','scripts', 'watch', 'serve']));


