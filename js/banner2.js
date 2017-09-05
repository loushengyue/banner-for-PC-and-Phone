$(function () {
    $('.banner .list .item').eq(0).clone().appendTo($('.banner .list'));
    var banner = $('.banner');
    var _src = banner.find('.list .item img').attr('src');
    var image = new Image();
    var list = banner.find('.list');
    var item = banner.find('.list .item');
    var len = item.length;
    var pages = banner.find('.page .item');
    var leftBtn = banner.find('.prev');
    var rightBtn = banner.find('.next');

    var h = 0, w = 0, index = 0, speed = 500, delay = 1500, interval = false, dir = 'left', isClick = true;
    image.src = _src;

    onloaded (image.src, function (img) {
        initSize ();
        leftBtnEvent ();
        rightBtnEvent ();
        autoPlay ();
        bannerHoverEvent ();
        pagesEvent ();
    });
    function onloaded (src, callback) {
        var img = new Image();
        img.src = src;
        if (img.complete) {
            callback.call(img);
            return;
        }
        img.onload = function () {
            callback.call(img);
        }
    }

    function pagesEvent () {
        pages.click(function () {
            if (isClick) {
                isClick = false;
                index = $(this).index();
                run ();
            }
        })
    }
    function bannerHoverEvent () {
        banner.hover(function () {
            if (interval) {
                window.clearInterval(interval);
            }
        }, function () {
            autoPlay ();
        })
    }
    function autoPlay () {
        if (interval) {
            window.clearInterval(interval);
        }
        interval = setInterval(function () {
            if (dir == 'left') {
                turnLeft ();
            } else if (dir == 'right') {
                turnRight ();
            }
        }, speed + delay);
    }
    function rightBtnEvent () {
        rightBtn.click(function () {
            if (isClick) {
                isClick = false;
                turnLeft ();
            }
        })
    }
    function leftBtnEvent () {
        leftBtn.click(function () {
            if (isClick) {
                isClick = false;
                turnRight ();
            }
        });
    }
    function turnRight () {
        if (index == 0) {
            index = len - 1;
            list.css('left', -w * index + 'px');
        }
        index--;
        run ();
    }
    function turnLeft () {
        if (index == len - 1) {
            index = 0;
            list.css('left', '0px');
        }
        index++;
        run ();
    }
    function run () {
        list.animate({left: -w * index + 'px'}, speed, function () {
            pages.removeClass('current');
            if (index == len - 1) {
                pages.eq(0).addClass('current');
            }
            pages.eq(index).addClass('current');
            isClick = true;
        });
    }
    function initSize () {
        w = banner.width();
        h = Math.floor(banner.width() / image.width * image.height);
        banner.css('height', h + 'px');
        list.css('height', h + 'px');
        item.css('height', h + 'px');
        item.css('width', w + 'px');
        list.css('width', w * len + 'px');
    }
});