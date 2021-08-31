const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("postcss-csso");
const rename = require("gulp-rename");
const htmlmin = require("gulp-htmlmin");
const terser = require("gulp-terser");
const squoosh = require("gulp-libsquoosh");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const del = require("del");
const sync = require("browser-sync").create();

// Styles

const styles = () => {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

// HTML

const html = () => {
  return gulp.src("source/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"));
}

// Scripts

const scripts = () => {
  return gulp.src("source/js/main-menu.js")
    .pipe(terser())
    .pipe(rename("main-menu.min.js"))
    .pipe(gulp.dest("build/js"))
    .pipe(sync.stream());
}

exports.scripts = scripts;

const scriptNoindex = () => {
  return gulp.src("source/js/main-menu-noindex.js")
    .pipe(terser())
    .pipe(rename("main-menu-noindex.min.js"))
    .pipe(gulp.dest("build/js"))
    .pipe(sync.stream());
}

exports.scriptNoindex = scriptNoindex;

// Images

const optimizeImages = () => {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(squoosh())
    .pipe(gulp.dest("build/img"))
}

exports.optimizeImages = optimizeImages;

const copyImages = () => {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(gulp.dest("build/img"))
}

exports.copyImages = copyImages;

// WebP

const createWebp = () => {
  return gulp.src("source/img/**/*.{jpg,png}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/img"))
}

exports.createWebp = createWebp;

// Sprite

const sprite = () => {
  return gulp.src("source/img/icon_*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite-icon.svg"))
    .pipe(gulp.dest("build/img"));
}

exports.sprite = sprite;

// Copy

const copy = (done) => {
  gulp.src([
    "source/fonts/*.{woff2,woff}",
    "source/*.ico",
    "source/img/**/*.svg",
    "!source/img/icon_*.svg",
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"))
  done();
}

exports.copy = copy;

// Clean

const clean = () => {
  return del("build");
};

exports.clean = clean;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: "build"
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Reload

const reload = (done) => {
  sync.reload();
  done();
}

exports.reload = reload;

// Watcher

const watcher = () => {
  gulp.watch("source/less/**/*.less", gulp.series(styles));
  gulp.watch("source/js/main-menu.js", gulp.series(scripts));
  gulp.watch("source/js/main-menu-noindex.js", gulp.series(scriptNoindex));
  gulp.watch("source/*.html", gulp.series(html, reload));
}

exports.watcher = watcher;

// Build

const build = gulp.series(
  clean,
  copy,
  optimizeImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    scriptNoindex,
    sprite,
    createWebp
  ),
);

exports.build = build;

// Default


exports.default = gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    scriptNoindex,
    sprite,
    createWebp
  ),
  gulp.series(
    server,
    watcher
  ));
