//必须遵从AMD规范
define(["jquery","jquery-cookie"],function($){
    function download(){
        $.ajax({
            url:"../data/data.json",
            success:function(arr){
                $(`<img src="${arr[10].img}" alt="">`)
                .appendTo(".nav .logo");
                $(`<img src="${arr[11].img}" alt="">`)
                .appendTo(".phonenumber");
                $(`<img src="${arr[0].img}" alt="">`)
                .appendTo(".goods-list ul .tp0")
                $(`<img src="${arr[1].img}" alt="">`)
                .appendTo(".goods-list ul .tp1")
                $(`<img src="${arr[2].img}" alt="">`)
                .appendTo(".goods-list ul .tp2")
                $(`<img src="${arr[3].img}" alt="">`)
                .appendTo(".goods-list ul .tp3")
                $(`<img src="${arr[4].img}" alt="">`)
                .appendTo(".goods-list ul .tp4")
                $(`<img src="${arr[5].img}" alt="">`)
                .appendTo(".goods-list ul .tp5")
                $(`<img src="${arr[6].img}" alt="">`)
                .appendTo(".goods-list ul .tp6")
                $(`<img src="${arr[7].img}" alt="">`)
                .appendTo(".goods-list ul .tp7")
                $(`<img src="${arr[8].img}" alt="">`)
                .appendTo(".goods-list ul .tp8")
                $(`<img src="${arr[9].img}" alt="">`)
                .appendTo(".goods-list ul .tp9")
                for(var i = 12;i<16;i++){
                $(`<li><img src="${arr[i].img}" alt=""></li>`)
                .appendTo(".sp-wrap")
                }
            }
        })
    }


    function goodnum(){
        var cookieStr = $.cookie("goodslist");
        var sum = 0;
        if (cookieStr) {
            var cookieArr = JSON.parse(cookieStr);
            for (var i = 0; i < cookieArr.length; i++) {
                sum += cookieArr[i].num;
            }
            $(".shopping-car span").html(sum);
        }else{
            $(".shopping-car span").html(sum);
        }
    }
    return {
        download:download,
        goodnum:goodnum
    }
})