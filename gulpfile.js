/**
 * Created by Blazers on 2016/1/26.
 *
 * 用于打包依赖项JS脚本  React组件脚本 以及CSS样式文件
 */

var gulp        = require('gulp'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    sass        = require('gulp-sass'),
    cssmin      = require('gulp-minify-css'),
    source      = require('vinyl-source-stream'),
    browserify  = require('browserify'),
    watchify    = require('watchify'),      // 检测Browserify依赖更新
    babelify    = require('babelify'),      // 转换browserfiy 6 => js
    babel       = require('gulp-babel'),    // 直接转换es6 => js
    chalk       = require('chalk'),
    del         = require('del');


var dependencies = [
    'alt',
    'react',
    'react-dom',
    'underscore'
];

/*
* - Gulp 打包Bower依赖项目JS脚本并压缩
* */
gulp.task('bower_js', function() {
    // 依赖项 这项不需要Watch
    return gulp.src([
            'bower_components/jquery/dist/jquery.js',           // jQuery
            'bower_components/tether/dist/js/tether.js',
            'bower_components/bootstrap/dist/js/bootstrap.js',  // Bootstrap
            'bower_components/toastr/toastr.js',                // Toastr
            'bower_components/highlight/build/highlight.pack.js'
        ])
        .pipe(concat('bower_bundle.js'))
        .pipe(uglify().on('error', function(err) {console.log(chalk.red(err))}))
        .pipe(gulp.dest('public/js'));
});

/*
 * - Gulp 打包Bower依赖项目CSS并压缩
 * */
gulp.task('bower_css', function() {
    // 依赖项CSS
    return gulp.src([
            'bower_components/tether/dist/css/tether.css',
            'bower_components/bootstrap/dist/css/bootstrap.css',
            'bower_components/toastr/toastr.css',
            'bower_components/animate.css/animate.css',
            'bower_components/highlight/src/styles/monokai-sublime.css'
        ])
        .pipe(concat('bower_bundle.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('public/css'));
});

/**
 * 将app下的es6文件通过 browserify(基于依赖项聚合) => babelify(转义ES6到ES5) => vinly(转化为Gulp Stream) => 生成
 * */
gulp.task('app_browserify', function() {
    // 利用 watchify 监听文件修改
    var bundler = watchify(browserify('./app/app.js', watchify.args));
    bundler.transform(babelify, {presets: ["es2015", "react"]}); // 转换 (支持jsx语法) es6 react(jsx) => es5  https://www.npmjs.com/package/babelify
    bundler.on('update', rebundle);
    return rebundle();

    function rebundle() {
        console.log(chalk.blue('---------- Start Browserify the components files'));
        var start = new Date();
        return bundler
            .bundle()
            .on('error', function(err) {console.log(chalk.red(err.toString()));})
            .on('end', function() {console.log(chalk.blue('---------- Finished rebundling in', (Date.now() - start) + 'ms.'))})
            .pipe(source('bundle.js'))  // 将browserify bundle 转换为gulp流
            .pipe(gulp.dest('public/js'))
    }
});

/**
 * 将单独测试用 es6 文件合并至 bundle 中
 * */
gulp.task('app_single_file' , function() {
    return gulp.src('./app/test/*.js')
        .pipe(babel())
        .pipe(concat('bundle.test.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/js'));
});

gulp.task('app_sass', function() {
    return gulp.src('./app/stylesheets/main.sass')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest('public/css'))
});

/**
 * Gulp 打包 依赖文件与项目文件
 * */
gulp.task('bower',['bower_js', 'bower_css']);
gulp.task('app', ['app_single_file', 'app_browserify', 'app_sass']);
gulp.task('clean', function(){
    // 清理旧文件
});


/**
 * Gulp Watch 检测更改后自动重新构建
 * */
gulp.task('watch', function() {
    gulp.watch('./app/test/*.js', ['app_single_file']);
    gulp.watch('./app/stylesheets/*.sass', ['app_sass']);
    console.log(chalk.yellow('Watching test javascript int folder "app/test/"'));
});

//gulp.task('build', ['bower', 'app']);

gulp.task('default', ['bower', 'app', 'watch']);