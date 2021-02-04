// 加载gulp，并结构需要的方法
let {task,src,dest,watch,series,parallel} = require('gulp')
let load = require('gulp-load-plugins')()
let del = require('del')//删除文件

// 删除dist目录
task('delDist',async ()=>{
  await del('./dist')
})

// 处理html
task('html',async ()=>{
  src('./*.html')
  .pipe(dest('./dist'))
  .pipe(load.connect.reload())
})

// 处理css
task('style',async ()=>{
  src('./css/*.css')
  .pipe(dest('./dist/css'))
  .pipe(load.connect.reload())
})

// 处理js
task('script',async ()=>{
  src('./js/*.js')
  .pipe(dest('./dist/js'))
  .pipe(load.connect.reload())
})

// 处理img
task('image',async ()=>{
  src('./images/*.*')
  .pipe(dest('./dist/images'))
  .pipe(load.connect.reload())
})

// 启动一个服务，实现自动刷新
task('reload',async ()=>{
  load.connect.server({
    root: './dist',//设置根目录
    livereload: true//开启自动刷新
  })
})

// 监听文件变化
task('watch',async ()=>{
  watch('./*.html',series('html'))
  watch('./css/*.css',series('style'))
  watch('./js/*.js',series('script'))
  watch('./images/*.*',series('image'))
})

// 打包（开发环境）
task('dev',series('delDist','html','style','script','image'))

// 启动项目
task('start',series('dev','reload','watch'))

