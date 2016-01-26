/**
 * Created by Blazers on 2016/1/26.
 *
 * 用于打包依赖项JS脚本  React组件脚本 以及CSS样式文件
 */

var gulp        = require('gulp'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    cssmin      = require('gulp-minify-css'),
    source      = require('vinyl-source-stream'),
    browserify  = require('browserify'),
    babelify    = require('babelify'),      // 转换browserfiy 6 => js
    babel       = require('gulp-babel'),    // 直接转换es6 => js
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
        'bower_components/jquery/dist/js/jquery.js',        // jQuery
        'bower_components/bootstrap/dist/js/bootstrap.js',  // Bootstrap
        'bower_components/toastr/toastr.js'                 // Toastr
    ])
        .pipe(concat('bower_bundle.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/js'));
});

/*
 * - Gulp 打包Bower依赖项目CSS并压缩
 * */
gulp.task('bower_css', function() {
    // 依赖项CSS
    return gulp.src([
            'bower_components/bootstrap/dist/css/bootstrap.css',
            'bower_components/toastr/toastr.css'                // 可选Less
        ])
        .pipe(concat('bower_bundle.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('public/css'));
});

/**
 * 将app下的es6文件通过 browserify(基于依赖项聚合) => babelify(转义ES6到ES5) => vinly(转化为Gulp Stream) => 生成
 * */
gulp.task('app_browserify', function() {
    return browserify('./app/app.js')
        //.require(dependencies)
        //.external(dependencies)
        // 转换 (支持jsx语法) es6 => es5  https://www.npmjs.com/package/babelify
        .transform(babelify, {presets: ["es2015", "react"]})
        .bundle()
        .pipe(source('bundle.js'))  // 将browserify bundle 转换为gulp流
        .pipe(gulp.dest('public/js'))
});

/**
 * 将单独测试用 es6 文件合并至 bundle 中
 * */
gulp.task('app_single_file',['app_browserify'] , function() {
    return gulp.src('./app/test/*.js')
        .pipe(babel())
        .pipe(concat('bundle.test.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/js'));
});

/**
 * Gulp 打包 依赖文件与项目文件
 * */
gulp.task('bower',['bower_js', 'bower_css']);
gulp.task('app', ['app_single_file', 'app_browserify']);
gulp.task('clean', function(){
    // 清理旧文件
});

//gulp.task('build', ['bower', 'app']);

gulp.task('default', ['bower', 'app']);