//必须遵从AMD规范
define(["jquery","jquery-cookie"],function($){
    function download(){
        $.ajax({
            url:"../data/goodsdata.json",
            success:function(arr){
                for(var i = 0;i<arr.length;i++){
                    $(`<li>
                    <img src="${arr[i].img}" alt="">
                    <span>${arr[i].title}</span>
                    <p>￥${arr[i].price}</p>
                    <a class = "btn" id = "${arr[i].id}" href="http://localhost:8888/detail.html">查看详情</a>
                    </li>`)
                .appendTo(".goods");
                }
            }
        })
    }

    function btn_click(){
        $(".goodsBox-wrap .goods").on("click",".btn",function(){
            var id = this.id;
            var arr = [{id:id}];
            $.cookie("goods",JSON.stringify(arr),{expires:7});




            // //1先判断是否是第一次添加
            // var first = $.cookie("goods")==null?true:false;
            // if(first){
            //     var arr = [{id:id,num:1}];
            //     $.cookie("goods",JSON.stringify(arr),{expires:7});
            // }else{
            //     //2判断之前是否添加过
            //     var cookieArr = JSON.parse($.cookie("goods"));
            //     var findIndex  = cookieArr.findIndex(item=>item.id == id);
            //     if(findIndex == -1){
            //         var obj = {id:id,num:1};
            //         cookieArr.push(obj);
            //     }else{
            //         cookieArr[findIndex].num++;
            //     }
            //     //存回去
            //     $.cookie("goods",JSON.stringify(cookieArr),{expires:7});
            // }
            // sc_num();
            // sc_msg();
            // ballMove(this);
        });
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
        btn_click:btn_click,
        goodnum:goodnum
    }
})