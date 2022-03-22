// 1.获取li 的index
//2.更换背景图片
//3.更换播放器的图片文本
//4.更换播放按钮及title为暂停
//5.图片旋转
//6.个歌曲播放

//准备工作收集数据
var index = 0; //li的初始索引
// var banner = document.getElementById('.banner');
// var li = banner.children[0].children();
// var li = ul.querySelector('li') //获取所有的li
var li = $(".banner ul li");
for (var i = 0; i < li.length; i++) {
    li[i].index = i;
}
var imgAll = this.document.getElementById('imgAll')
var img = $(".music .m_img img"); //获取播放器的img
var text = $(".music .m_text"); //获取播放器m_text属性
var prev = $(".music .m_btn .m_prev");
var play = $(".music .m_btn .m_play");
var next = $(".music .m_btn .m_next");
var mp3 = $(".music .m_mp3");
var audio = document.getElementsByName('audio');
var flag = false; //歌曲是否播放的标记 true播放false 暂停
var close = true; //播放器是否显示true显示false 隐藏
li.click(function() {
        index = this.index;
        // console.log(index);
        show();
    })
    //封装函数，方便上一首下一首调用
function show() {
    //更换背景图片  +1是因为索引从0开始图片名称从1开始
    change_bg(index);
    //更换播放器图片及文字
    change_img_text(index);
    //更换播放器按钮及title为暂停
    change_btn_title();
    // 图片旋转
    img_rotate(index);
    //播放歌曲
    play_mp3(index);


}
//更换背景
function change_bg(idx) {
    $("body").css({
        "background": "url(imgs/" + (idx + 1) + ".PNG) no-repeat",
        "background-size": "cover"
    })
}
//更换播放器的背景图片和文字
function change_img_text(idx) {
    img.attr("src", "imgs/" + (idx + 1) + ".png");
    text.html(li.eq(idx).attr('title'));
}

function change_btn_title() {
    play.removeClass("m_play");
    play.addClass('m_pause');
    play.attr('title', '暂停');

}
//图片旋转
function img_rotate(idx) {
    //移除所有的图片旋转样式
    li.removeClass('abc');
    //给当前点击的li添加图片旋转样式
    li.eq(idx).addClass('abc');
}
//播放歌曲
function play_mp3(idx) {
    //获取选中li的src属性
    // var a = li.eq(idx - 1).attr('datasrc');
    // console.log(a);
    mp3.attr("src", li.eq(idx).attr('datasrc'));
    mp3.get(0).play(); //歌曲播放
    //设置歌曲是否播放的标记
    flag = true;
}
//暂停或者播放歌曲


play.click(function() {

        //如果歌曲正在播放
        //1.暂停歌曲
        //2.停止图片旋转
        //3.暂停按钮变为播放
        //4.title更换为播放
        for (var i = 0; i < li.length; i++) {
            if (text.text == li[i].title) {
                index = li[i].index;
            }
        }
        console.log(index);
        if (flag) {
            mp3.get(0).pause();
            li.eq(index).removeClass('abc'); //移除图片旋转
            play.removeClass("m_pause").addClass("m_play").attr("title", "播放");
            flag = false;
        } else {
            //如果歌曲暂停
            //1.播放歌曲
            //2.图片旋转
            //3.播放按钮变为暂停
            //4.title更换为暂停
            mp3.get(0).play(); //1.播放歌曲
            li.eq(index).addClass('abc'); //2.图片旋转
            play.removeClass("m_play").addClass("m_pause").attr("title", "暂停");
            flag = true;
            change_bg(index + 1); //第一次进入页面直接点击播放按钮时的背景处理
        }
    })
    //上一首
prev.click(function() {
        index--;
        if (0 > index) {
            index = li.length - 1;
        }
        show();
    })
    //下一首
next.click(function() {
        index++;
        if (index > li.length - 1) {
            index = 0;
        }
        show();
    })
    //播放器的隐藏与显示
$(".close").click(function() {
    //如果显示则隐藏 添加样式
    if (close) {
        $(this).addClass('m_open');
        //添加向左移动样式并设置1秒完成
        $(".music").animate({ "left": "-520px" }, 1000);
        close = false;
    } else {
        //如果隐藏则显示 移除样式
        $(this).removeClass('m_open');
        $(".music").animate({ "left": "0px" }, 1000);
        close = true;
    }
})