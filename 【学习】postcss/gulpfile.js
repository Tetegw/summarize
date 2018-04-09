// 大漠postcss文章 https://www.w3cplus.com/blog/tags/517.html?page=1
var gulp = require('gulp')
var postcss = require('gulp-postcss')
var autoprefixer = require('autoprefixer')  // 处理浏览器私有前缀
var precss = require('precss')              // 像Sass的函数
var atImport = require('postcss-import')    // 将import引入的合成一个
var cssnano = require('cssnano')            // 优化，压缩等
var modules =  require('postcss-modules')

gulp.task('css', function () {
  var processors = [
    atImport,
    autoprefixer({"browsers": ["> 1%","last 2 versions"]}),   
    // 指定浏览器版本 https://www.cnblogs.com/tinyphp/p/4738571.html
    precss,
    cssnano,
    modules({"generateScopedName": '[name]_[local]_[hash:base64:5]'}) // https://github.com/css-modules/postcss-modules
];
  return gulp.src('./src/index.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('./dist'))
})

// css module 可以将类名等转换成hash值，从而避免样式冲突。