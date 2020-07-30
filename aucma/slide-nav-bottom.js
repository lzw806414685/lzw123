define(["jquery"],function($){
    console.log("nav-bottom");
    function banner(){
        $(function(){
            // var aBtns = $(".play").find("ol li");
            var oUl = $(".box").find("ul");
            var t = null;
            var now = 0;
            var oBtn = $("button");

            //点击按钮进行切片
            // aBtns.click(function(){
            //     now = $(this).index();
            //     tab();
            // })
            oBtn.eq(0).click(function(){
                if(now == 5){
                    now = 0;
                    oUl.css("left",0)
                }
                now++;
                tab();
            })
            oBtn.eq(1).click(function(){
                if(now == 0){
                    now = 5;
                    oUl.css("left",-1270)
                }
                now--;
                tab();
            })

            // 鼠标进入停止，移出播放
            $(".box").mouseenter(function(){
                clearInterval(t);
            }).mouseleave(function(){
                t = setInterval(function(){
                now++;
                tab();
            },2000)
            })

            //自动播放

            t = setInterval(function(){
                now++;
                tab();
            },1000)

            function tab(){
                // aBtns.removeClass("active").eq(now).addClass("active");
                // if(now == aBtns.size()){
                //     aBtns.eq(0).addClass("active");
                // }

                oUl.animate({left:now*-254},500,function(){
                    if(now == 5){
                        now = 0;
                        oUl.css("left",0)
                    }
                    
                })
            }
        })
    }

    return {
        banner:banner
    }
})