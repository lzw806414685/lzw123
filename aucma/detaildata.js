//必须遵从AMD规范
define(["parabola","jquery","jquery-cookie"],function(parabola,$){
    function download(){
        $.ajax({
            url:"../data/goodsdata.json",
            success:function(arr){
                var cookieStr = $.cookie("goods");
                var cookieArr = JSON.parse(cookieStr);
                var i = cookieArr[0].id;

              $(`<img src="${arr[i].img}" alt="">`)
              .appendTo(".gd-left")
              $(`<img src="${arr[i].img}" alt="">`)
              .appendTo(".box");

              var str = `<span class="name">${arr[i].title}</span>
              <div class="price">
                  <div class="p-top">
                      <h1>&nbsp&nbsp&nbsp商城价格</h1>
                      <span>&nbsp&nbsp&nbsp￥&nbsp${arr[i].price}</span>
                  </div>
                  <div class="p-bottom">&nbsp&nbsp&nbsp支持建行信用卡分期</div>
              </div>
              <div class="distribution">
                  <span>配送至</span>
                  <select name="" id="selProvince">
                      <option value="">----请选择----</option>
                      <option value="">山东</option>
                  </select>
                  <select name="" id="selCity">
                      <option value="">----请选择----</option>
                      <option value="">烟台</option>
                  </select>
                  <select name="" id="selCountry">
                      <option value="">----请选择----</option>
                      <option value="">蓬莱市</option>
                  </select>
              </div>
              <div class="buy">
                  <button class="buy-l"><a href="http://localhost:8888/shoppingcar.html">立即购买</a></button>
                  <button class="buy-r" id="${i}">加入购物车</button>
              </div>`;
              $(".gd-right").html(str);
            
            }
        })
    }

    function btn_click(){
        $(".gd-wrap .gd-right").on("click",".buy-r",function(){
            var id = this.id;
            //1先判断是否是第一次添加
            var first = $.cookie("goodslist")==null?true:false;
            if(first){
                var arr = [{id:id,num:1}];
                console.log(arr);
                $.cookie("goodslist",JSON.stringify(arr),{expires:7});
            }else{
                //2判断之前是否添加过
                var cookieArr = JSON.parse($.cookie("goodslist"));
                var findIndex  = cookieArr.findIndex(item=>item.id == id);
                if(findIndex == -1){
                    var obj = {id:id,num:1};
                    cookieArr.push(obj);
                }else{
                    cookieArr[findIndex].num++;
                }
                //存回去
                $.cookie("goodslist",JSON.stringify(cookieArr),{expires:7});
                goodnum();
            }
            ballMove(this);
        })
    }

    function fdj(){
        // console.log(1);
        $(".gd-left").mouseenter(function(){
            $(".gd-left .fdj").attr("style","display:block");
            $(".box").attr("style","display:block");
        }).mouseleave(function(){
            $(".gd-left .fdj").attr("style","display:none");
            $(".box").attr("style","display:none");
        }).mousemove(function(ev){
            var l = ev.clientX - $(".gd-left").offset().left-100;
            var t = ev.clientY - $(".gd-left").offset().top-100;
            if(l<0){
                l=0;
            }
            if(l>$(".gd-left").width()-200){
                l=$(".gd-left").width()-200
            }
            if(t<0){
                t=0
            }
            if(t>$(".gd-left").height()-200){
                t=$(".gd-left").height()-200
            }

            $(".fdj").css({
                left:l,
                top:t
            })

            $(".box img").css({
                left:-2*l,
                top:-2*t
            })
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

    function ballMove(oBtn) {
        $("#ball")
          .show()
          .css({
            left: $(oBtn).offset().left,
            top: $(oBtn).offset().top,
          });
    
        var X = $(".shopping-car").offset().left - $(oBtn).offset().left;
        var Y = $(".shopping-car").offset().top - $(oBtn).offset().top;
    
        var bool = new Parabola({
          el: "#ball",
          offset: [X, Y],
          duration: 800,
          curvature: 0.001,
          callback: function () {
            $("#ball").hide();
          },
        });
        bool.start();
      }
    return {
        download:download,
        fdj:fdj,
        btn_click:btn_click,
        goodnum:goodnum
    }
})