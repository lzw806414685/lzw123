const gulp = require("gulp");
const htmlmin = require("gulp-htmlmin");
//处理html
gulp.task("copy-html",function(){
    return gulp.src(["*.html","!data.html"])
    .pipe(
        htmlmin({
            removeEmptyAttributes:true,
            collapseWhitespace:true,
        })
    )
    .pipe(gulp.dest("dist/"))
    .pipe(connect.reload());
});

//处理图片
gulp.task("images",function(){
    return gulp.src("*{jpg,png}")
    .pipe(gulp.dest("dist/images"))
    .pipe(connect.reload())
});

//处理js代码，凡是用第三方框架js，不要压缩
gulp.task("scripts",function(){
    return gulp.src(["*.js","!gulpfile.js"])
    .pipe(gulp.dest("dist/js"))
    .pipe(connect.reload())
});


//处理数据
gulp.task("data",function(){
    return gulp.src(["*.json","!package.json"])
    .pipe(gulp.dest("dist/data"))
    .pipe(connect.reload())
});

//处理css
const scss = require("gulp-sass");
const rename = require("gulp-rename");
const minifyCSS = require("gulp-minify-css");
//处理css，如果要压缩css代码，一个scss一个任务
gulp.task("index-scss",function(){
    return gulp.src("stylesheet/index.scss")
    .pipe(scss())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCSS())
    .pipe(rename("index.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})

gulp.task("goodslist-scss",function(){
    return gulp.src("stylesheet/goodslist.scss")
    .pipe(scss())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCSS())
    .pipe(rename("goodslist.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})

gulp.task("banner-scss",function(){
    return gulp.src("stylesheet/banner.scss")
    .pipe(scss())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCSS())
    .pipe(rename("banner.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})

gulp.task("nav-bottom-scss",function(){
    return gulp.src("stylesheet/nav-bottom.scss")
    .pipe(scss())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCSS())
    .pipe(rename("nav-bottom.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})

gulp.task("detail-scss",function(){
    return gulp.src("stylesheet/detail.scss")
    .pipe(scss())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCSS())
    .pipe(rename("detail.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})

gulp.task("shoppingcar-scss",function(){
    return gulp.src("stylesheet/shoppingcar.scss")
    .pipe(scss())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCSS())
    .pipe(rename("shoppingcar.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})

//处理php
gulp.task("copy-php",function(){
    return gulp.src(["*.php"])
    .pipe(gulp.dest("dist/php"))
    .pipe(connect.reload());
});




//建立build任务
gulp.task("build",["copy-html","images","scripts","index-scss","banner-scss","nav-bottom-scss","data","copy-php","goodslist-scss","detail-scss","shoppingcar-scss"],function(){
    console.log("项目建立成功");
})


//建立服务器  添加监听
gulp.task("watch",function(){
    gulp.watch("*.html",["copy-html"]);
    gulp.watch("*.{jpg,png}",["images"]);
    gulp.watch(["*.js","!gulpfile.js"],["scripts"]);
    gulp.watch(["*.json","!package.json"],["data"]);
    gulp.watch("stylesheet/index.scss",["index-scss"]);
    gulp.watch("stylesheet/goodslist.scss",["goodslist-scss"]);
    gulp.watch("stylesheet/banner.scss",["banner-scss"]);
    gulp.watch("stylesheet/nav-bottom.scss",["nav-bottom-scss"]);
    gulp.watch("*.php",["copy-php"]);
    gulp.watch("stylesheet/detail.scss",["detail-scss"]);
    gulp.watch("stylesheet/shoppingcar.scss",["shoppingcar-scss"]);
})

const connect = require("gulp-connect");
gulp.task("server",function(){
    connect.server({
        root:"dist",
        port:8888,
        livereload:true,
    });
});

gulp.task("default",["watch","server"]);