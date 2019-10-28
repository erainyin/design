// A $( document ).ready() block.
function reset_position() {
    var hbody = $(document).height(); //整体文档内容高度
    var wbody = $(document).width(); //整体文档内容高度
    var hview = $(window).height(); //可视区域高度
    var htext = $(".maintext").height(); //初始首屏文字块高度
    var toptext = $(".maintext").css('top'); //初始首屏文字距离顶部间距
    var hslide = hview * .75; //首屏图片高度调为首屏高度的75%

    var toptext = (hview - htext) / 2;
    var topslide = (hview - hslide) / 2;
    var leftslidemask = $(".screen1 .slide").width();
    var footerH = hview / 2;
    leftslidemask = (-leftslidemask) * 1.1;
    console.log("-------");
    console.log("可视高度" + hview);
    console.log("文档整体高度" + hbody);
    console.log("Maintext文字高度" + htext);
    console.log("Maintext文字top" + toptext);
    console.log("slide高度" + hslide);
    console.log("slidemask距离left" + leftslidemask);
    if (wbody < 768 || hslide < htext) {
        hslide = hview;
        topslide = 0;
        toptext = ((hview - htext) / 2) + 20;
        $(".screen1").height(hview); //设置screen1高度为首屏高度
        $(".screen1 .slide").height(hslide);
        $(".screen1 .slide").css("top", topslide); //设置首屏图片居中
        $(".screen1 .slide .mask").css("left", leftslidemask); //mask距离顶部高度
        $(".screen1 .maintext").css("top", toptext); //设置首屏文字块距离顶部间距，设置居中
        $("#footer").css("height", footerH); //重置footer高度
    } else {
        $(".screen1").height(hview); //设置screen1高度为首屏高度
        $(".screen1 .slide").height(hslide);
        $(".screen1 .slide").css("top", topslide); //设置首屏图片居中
        $(".screen1 .slide .mask").css("left", leftslidemask); //mask距离顶部高度
        $(".screen1 .maintext").css("top", toptext); //设置首屏文字块距离顶部间距，设置居中
        $("#footer").css("height", footerH); //重置footer高度

    }


}


$(window).resize(function () {
    reset_position(); // 屏幕调整尺寸后重置元素位置
});

$(document).ready(function () {

    console.log("ready!");

    //设置元素位置

    reset_position();

    // 设置导航

    $('.nav').click(function () { //导航跳转
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 300);
        return false;
    });
    $('.brand a').click(function () { //点击LOGO跳转到首屏
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 300);
        return false;
    });
    $('#moveto1scr').click(function () { //右下角按钮返回首屏
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 300);
        return false;
    });
    $('#moveto2scr').click(function () { //首屏文字前往第二屏
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 300);
        return false;
    });


    //首屏大字切换
    $('.screen1 .maintext .h6 a.showmore').click(function () {
        $('.screen1 .part1').hide();
        $('.screen1 .part2').fadeIn();
        $(this).hide();
        $('.screen1 .maintext .h6 a.showless').fadeIn();
        reset_position(); // 屏幕调整尺寸后重置元素位置

        return false;
    });
    $('.screen1 .maintext .h6 a.showless').click(function () {
        $('.screen1 .part2').hide();
        $('.screen1 .part1').fadeIn();
        $(this).hide();
        $('.screen1 .maintext .h6 a.showmore').fadeIn();
        reset_position(); // 屏幕调整尺寸后重置元素位置

        return false;
    });


    //作品分类导航

    function initworkcate() {
        $('#screen2 .worktype li').removeClass("hover");
        $('#screen2 .worklist .workitem').hide();
        $('#screen2 .worklist .selected').fadeIn();
        $('#cate-selected').addClass("hover");

    }
    initworkcate();


    // ajax加载其他列表
    var checkgetlist = 1;

    function getalllist() {
        // console.log("初始值" + checkgetlist);
        if (checkgetlist == 1) {

            htmlobj = $.ajax({
                url: "worklist.html?v=' + parseInt(Math.random()*1000000000)",
                async: false
            });
            $(".screen2 .worklist").html(htmlobj.responseText);
            checkgetlist = 2;
            // console.log("变成了" + checkgetlist);
        } else {
            // console.log("没再次加载");
            return false;
        }
    }

    $('#cate-selected').click(function () { //显示精选
        getalllist();
        initworkcate();
    });


    $("#cate-mobile").click(function () { //显示移动端作品
        getalllist();
        $('#screen2 .worktype li').removeClass("hover");
        $('#screen2 .worklist .workitem').hide();
        $('#screen2 .worklist .cate-mobile').fadeIn();
        $(this).addClass("hover");
    });


    $('#cate-web').click(function () { //显示网页作品
        getalllist();

        $('#screen2 .worktype li').removeClass("hover");
        $('#screen2 .worklist .workitem').hide();
        $('#screen2 .worklist .cate-web').fadeIn();
        $(this).addClass("hover");
    });

    $('#cate-vi').click(function () { //显示vi作品
        getalllist();

        $('#screen2 .worktype li').removeClass("hover");
        $('#screen2 .worklist .workitem').hide();
        $('#screen2 .worklist .cate-vi').fadeIn();
        $(this).addClass("hover");
    });

    $('#cate-print').click(function () { //显示印刷作品
        getalllist();

        $('#screen2 .worktype li').removeClass("hover");
        $('#screen2 .worklist .workitem').hide();
        $('#screen2 .worklist .cate-print').fadeIn();
        $(this).addClass("hover");
    });

    $('#cate-forfun').click(function () { //显示印刷作品
        getalllist();

        $('#screen2 .worktype li').removeClass("hover");
        $('#screen2 .worklist .workitem').hide();
        $('#screen2 .worklist .cate-forfun').fadeIn();
        $(this).addClass("hover");
    });


    // 设置跳转动画

    var controller = new ScrollMagic.Controller(); //初始化动画控制器



    //移动到 作品 部分的动效
    //移动到 作品 部分的动效
    //移动到 作品 部分的动效



    var T_Work = new TimelineMax().add([
        TweenMax.to("#title_work em span", 0.5, {
            css: {
                width: "100%"
            }
        }),
        TweenMax.to("#title_work em", 0.5, {
            css: {
                color: "#35c1a1"
            }
        }),
        TweenMax.to(".sitename", 1, {
            opacity: 0
        })
    ]);

    var scene = new ScrollMagic.Scene({
            triggerElement: "#trigger_work"
        })
        .setClassToggle("#nav_work", "nav_current")
        .setTween(T_Work)
        // .addIndicators({})
        .addTo(controller);



    //移动到 服务 部分的动效
    //移动到 服务 部分的动效
    //移动到 服务 部分的动效



    var T_Service = new TimelineMax().add([
        TweenMax.to("#screen3 .h4 em span", 0.5, {
            css: {
                width: "100%"
            }
        }),
        TweenMax.to("#screen3 .h4 em", 0.5, {
            css: {
                color: "#35c1a1"
            }
        }),
        TweenMax.to(".block_ui ", 0.5, {
            css: {
                opacity: "1",
            },
        }),
        TweenMax.to(".block_branding ", 0.5, {
            css: {
                opacity: "1",
            },
        })
    ]);

    var scene = new ScrollMagic.Scene({
            triggerElement: "#trigger_service"
        })
        .setClassToggle("#nav_service", "nav_current")
        .setTween(T_Service)
        // .addIndicators({})
        .addTo(controller);



    //移动到 服务 UI/Branding 部分的动效
    //移动到 服务 UI/Branding 部分的动效
    //移动到 服务 UI/Branding 部分的动效



    var T_Src4_UI = new TimelineMax().add([
        TweenMax.to(".screen4 .block_ui .block_bg", 0.3, {
            css: {
                opacity: "1",
            },
        })
    ]);
    var T_Src4_Branding = new TimelineMax().add([
        TweenMax.to(".screen4 .block_branding .block_bg ", 0.3, {
            css: {
                opacity: "1",
            },
        })
    ]);

    var scene = new ScrollMagic.Scene({
            triggerElement: ".block_ui",
            // duration:200
        })
        .setTween(T_Src4_UI)
        // .addIndicators({})
        .addTo(controller);

    var scene = new ScrollMagic.Scene({
            triggerElement: ".block_branding",
            // duration:200
        })
        .setTween(T_Src4_Branding)
        // .addIndicators({})
        .addTo(controller);



    //移动到 首屏 部分的动效
    //移动到 首屏 部分的动效
    //移动到 首屏 部分的动效



    var scene = new ScrollMagic.Scene({
            triggerElement: "#trigger_home",
        })
        .setClassToggle("#nav_home", "nav_current")
        .addTo(controller);


    var scene = new ScrollMagic.Scene({
            triggerElement: "#maintext .marker",
        })
        .setClassToggle(".totop #moveto1scr", "back")
        // .addIndicators({})
        .addTo(controller);



    //移动到 首屏 标题文字 部分的动效
    //移动到 首屏 标题文字 部分的动效
    //移动到 首屏 标题文字 部分的动效



    var scene = new ScrollMagic.Scene({
            triggerElement: "#maintext .h6",
            duration: 600
        })
        .setTween(".slide", {
            // top: "300px",
            opacity: "0"
        })
        // .setClassToggle("#nav_home", "nav_current")
        // .addIndicators({})
        .addTo(controller);



    //移动到 联系 部分的动效
    //移动到 联系 部分的动效
    //移动到 联系 部分的动效        .setClassToggle(".totop a","back")




    var scene = new ScrollMagic.Scene({
            triggerElement: "#trigger_contact"
        })
        .setClassToggle("#nav_contact", "nav_current")
        // .addIndicators({})
        .addTo(controller);



    // 服务介绍


    $('.screen4 .block_ui .details .back').click(function () {
        $('.screen4 .details').hide();
        $('.screen4 .details .block').hide();
        return false;
    });
    $('.screen4 .block_ui .list .uiux_subtitle_discovery').click(function () {
        $('.screen4 .details .details_discovery').show();
        $('.screen4 .details').fadeIn();
        return false;
    });
    $('.screen4 .block_ui .list .uiux_subtitle_uxdesign').click(function () {
        $('.screen4 .details .details_uxdesign').show();
        $('.screen4 .details').fadeIn();
        return false;
    });
    $('.screen4 .block_ui .list .uiux_subtitle_uidesign').click(function () {
        $('.screen4 .details .details_uidesign').show();
        $('.screen4 .details').fadeIn();
        return false;
    });
    $('.screen4 .block_ui .list .uiux_subtitle_production').click(function () {
        $('.screen4 .details .details_production').show();
        $('.screen4 .details').fadeIn();
        return false;
    });


});
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})