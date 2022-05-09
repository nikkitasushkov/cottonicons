const gulp = require('gulp');
const iconfont = require('gulp-iconfont');
const iconfontCss = require('gulp-iconfont-css');
const svgo = require('gulp-svgo');
const del = require('del');
const { series, src } = require('gulp');
const runTimestamp = Math.round(Date.now()/1000);

// config
const config = require('./scripts/config');

function cleanDist(cb) {
  del([config.dist.root], cb);
  cb();
}

function cleanTmp(cb) {
  del([config.tmp.root], cb);
  cb();
}

// The `build` function is exported so it is public and can be run with the `gulp` command.
// It can also be used within the `series()` composition.
function optimizeSvg(cb) {
  return src(config.src.icons)
    .pipe(svgo())
    .pipe(gulp.dest(config.tmp.root))
    .pipe(gulp.dest(config.dist.icons));
}


function webfont(cb) {
  return src([config.tmp.icons])
    .pipe(iconfontCss({
      fontName: config.export.fontName,
      // path: 'app/assets/css/templates/_icons.scss',
      targetPath: './css/cotton.css',
      fontPath: './fonts/'
    }))
    .pipe(iconfont({
      fontName: 'cottonicons'
     }))
    .pipe(gulp.dest('dist/webfont/'));
};

// exports.build = build;
exports.default = series(
  cleanDist,
  cleanTmp,
  optimizeSvg,
  webfont,
  cleanTmp
);
