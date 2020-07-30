define(["jquery"],function($){
    function banner(){
        $(function(){
            var aBtns = $(".play").find("ol li");
            var oUl = $(".play").find("ul");
            var t = null;
            var now = 0;

            //点击按钮进行切片
            aBtns.click(function(){
                now = $(this).index();
                tab();
            })
            

            //鼠标进入停止，移出播放
            $(".play").mouseenter(function(){
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
            },2000)

            function tab(){
                aBtns.removeClass("active").eq(now).addClass("active");
                if(now == aBtns.size()){
                    aBtns.eq(0).addClass("active");
                }

                oUl.animate({top:now*-599},500,function(){
                    if(now == aBtns.length){
                        now = 0;
                        oUl.css("top",0)
                    }
                })
            }
        })
    }

    return {
        banner:banner
    }
})