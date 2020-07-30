console.log("加载成功");

//配置路径

require.config({
   paths:{
    jquery:"jquery-1.11.3",
    'jquery-cookie':"jquery.cookie",
    shoppingcar:"shoppingcar"
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


// //调用模块
require(["shoppingcar"],function(shoppingcar){
    shoppingcar.download();
    shoppingcar.btn_onclick();
    shoppingcar.goodnum();
    shoppingcar.clearcar();
    shoppingcar.allCheck();
})