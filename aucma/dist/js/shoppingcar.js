//必须遵从AMD规范
define(["jquery","jquery-cookie"],function($){
    function download(){
        $.ajax({
            url:"../data/goodsdata.json",
            success:function(arr){
                var cookieStr = $.cookie("goodslist");
                if(!cookieStr){
                    $(".total-r").html("0");
                }else{
                    var cookieArr = JSON.parse(cookieStr);
                    var newArr = [];
                    for(var i = 0;i<arr.length;i++){
                        for(var j = 0;j<cookieArr.length;j++){
                            if (arr[i].id == cookieArr[j].id) {
                                arr[i].num = cookieArr[j].num;
                                newArr.push(arr[i]);
                                break;
                              }
                        }
                    }
                    var str = ``;
                    var zj = 0;
                    
                    for(var i = 0;i<newArr.length;i++){
                        var x = newArr[i].num*newArr[i].price;
                        zj+=x;
                        str+=` <ul id="${newArr[i].id}">
                        <div class="good-check">
                            <input type="checkbox" class="checkbox" name="" id="">
                        </div>
                        <li class="good-name">
                            <img src="${newArr[i].img}" alt="">
                            <span class="name">${newArr[i].title}</span>
                        </li>
                        <li class="good-num">
                            <button class="b-left">-</button>
                            <span>${newArr[i].num}</span>
                            <button>+</button>
                        </li>
                        <li class="good-priceone">${newArr[i].price}</li>
                        <li class="good-price">${x}</li>
                        <li class="good-delete"><button>X</button></li>
                    </ul>`
                    }
                    // for(var i = 0;i<newArr.length;i++){
                    //     num+=newArr[i].num;
                    // }
                    $(".good").html(str);
                    if(cookieStr){
                        $(".total-r").html(zj);
                    }else{
                        
                    }
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

    function btn_onclick(){
        $(".good").on("click", ".good-num button", function () {
            var id = $(this).closest("ul").attr("id");
            console.log(id);
            //找到cookie中的商品
            var cookieArr = JSON.parse($.cookie("goodslist"));
            var res = cookieArr.find((item) => item.id == id);
            if (this.innerHTML == "+") {
              res.num++;
            } else {
              res.num == 1 ? alert("数量为1，不能减少") : res.num--;
            }
            $(this).siblings("span").html(res.num);
      
            $.cookie("goodslist", JSON.stringify(cookieArr), {
              expires: 7,
            });
      
            download();
            goodnum();
        });
    }


    function clearcar(){
        $(".good").on("click", ".good-delete", function () {
            var id = $(this).closest("ul").remove().attr("id");
            //在cookie中删除这个数据
            var cookieArr = JSON.parse($.cookie("goodslist"));
            cookieArr = cookieArr.filter((item) => item.id != id);
      
            cookieArr.length
              ? $.cookie("goodslist", JSON.stringify(cookieArr), { expires: 7 })
              : $.cookie("goodslist", null);
              goodnum();
              download();
          });
    }

    function allCheck(){
        $(".alcheck").on("click",function(){
            var arr = document.getElementsByClassName(".checkbox");
            for(var i = 0;i<arr.length;i++){
                arr[i].checked = true;
            }

        })
    }

    
    return {
        download:download,
        btn_onclick:btn_onclick,
        goodnum:goodnum,
        clearcar:clearcar,
        allCheck:allCheck,
    }
})