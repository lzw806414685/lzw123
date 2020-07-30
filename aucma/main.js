console.log("加载成功");

//配置路径

require.config({
   paths:{
    jquery:"jquery-1.11.3",
    'jquery-cookie':"jquery.cookie",
    data:"data",
    slide:"slide",
    slidebottom:"slide-nav-bottom"
   },
   shim:{
    //设置依赖关系
    "jquery-cookie":["jquery"],
    //某一个模块，不遵从AMD
    parabola:{
        exports:"_",
    },
},
})


//调用模块
require(["data","slide","slidebottom"],function(data,slide,slidebottom){
    data.download();
    slide.banner();
    slidebottom.banner();
    data.goodnum()
})