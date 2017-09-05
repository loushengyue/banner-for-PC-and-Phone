$(function () {
    $('.banner .list .item').eq(0).clone().appendTo($('.banner .list'));
    var banner = $('.banner');
    var bannerObj = document.getElementById('banner');
    var _src = banner.find('.list .item img').attr('src');
    var image = new Image();
    var list = banner.find('.list');
    var item = banner.find('.list .item');
    var len = item.length;
    var pages = banner.find('.page .item');

    var h = 0, w = 0, index = 0, speed = 500, delay = 1500, interval = false, dir = 'left', isClick = true,oldX = 0, newX = 0;
    image.src = _src;

    onloaded (image.src, function (img) {
        initSize ();
        autoPlay ();
        bannerTouch ();
        bannerTouchMove ();
        pagesMobileEvent ();
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

    function bannerTouch () {
        bannerObj.addEventListener('touchstart', function (event) {
            if (event.targetTouches.length == 1) {
                event.preventDefault();
                var touch = event.targetTouches[0];
                oldX = touch.screenX;
                stopPlay ()
            }
        }, false);
        bannerObj.addEventListener('touchend', function () {
            resetAutoPlay ();
        }, false);
    }
    function bannerTouchMove () {
        bannerObj.addEventListener('touchmove', function(event) {
            if (event.targetTouches.length == 1) {
                event.preventDefault();
                var touch = event.targetTouches[0];
                newX = touch.screenX;
                if (newX - oldX > 30) {
                    if (isClick) {
                        isClick = false;
                        oldX = newX;
                        turnRight ();
                    }
                } else if (oldX - newX > 30) {
                    if (isClick) {
                        isClick = false;
                        oldX = newX;
                        turnLeft ();
                    }
                }
            }
        }, false);
    }
    function stopPlay () {
        if (interval) {
            window.clearInterval(interval);
        }
    }
    function resetAutoPlay () {
        setTimeout(function () {
            autoPlay ();
        }, speed + delay);
    }
    function pagesMobileEvent () {
        pages.each(function(i){
            $(this).get(0).addEventListener('touchstart', function (event) {
                if (event.targetTouches.length == 1) {
                    event.preventDefault();
                    if (isClick) {
                        isClick = false;
                        index = $(this).index();
                        run ();
                    }
                }
            }, false)
        })
    }
    function autoPlay () {
        stopPlay ();
        interval = setInterval(function () {
            if (dir == 'left') {
                turnLeft ();
            } else if (dir == 'right') {
                turnRight ();
            }
        }, speed + delay);
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