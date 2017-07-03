const gulp = require('gulp');
const sass = require('gulp-sass');
const browserify = require('gulp-browserify');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();

const config = {
  source: './src/',
  dist: './public'
}

const paths = {
  html: '**/*.html',
  assets: '/assets/',
  sass: 'scss/**/*.scss',
  mainSass: 'scss/main.scss',
  js: 'js/**/*.js',
  mainJS: 'js/app.js'
}

const sources = {
  html: config.source + paths.html,
  assets: config.source + paths.assets,
  sass: paths.assets + paths.sass,
  rootSass: config.source + paths.assets + paths.mainSass,
  js: config.source + paths.js,
  rootJS: config.source + paths.assets + paths.mainJS
}

gulp.task('html', ()=>{
  gulp.src(sources.html).pipe(gulp.dest(config.dist));
});

gulp.task('sass', ()=>{
  gulp.src(sources.rootSass)
      .pipe(sass({
        outputStyle: 'compressed'
      }).on('error', sass.logError))
      .pipe(gulp.dest(config.dist + paths.assets + 'css'));
});

gulp.task('js', ()=>{
  gulp.src(sources.rootJS)
      .pipe(browserify())
      .pipe(rename('bundle.js'))
      .pipe(gulp.dest(config.dist + paths.assets + 'js'));
});

//crear tareas que se ejecutan al detectar cambio
gulp.task('sass-watch', ['sass'], (done)=>{
  browserSync.reload();
  done();
});

gulp.task('js-watch', ['js'], (done)=>{
  browserSync.reload();
  done();
});

gulp.task('html-watch', ['html'], (done)=>{
  browserSync.reload();
  done();
});

//watch de todo el directorio src y ejecuta todas las tareas
gulp.task('serve', ()=>{
  browserSync.init({
    server: {
      baseDir: config.build
    }
  });
  gulp.watch(sources.html, ['html-watch']);
  gulp.watch(sources.sass, ['sass-watch']);
  gulp.watch(sources.js, ['js-watch']);
});