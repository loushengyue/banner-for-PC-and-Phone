;(function (win, $) {
    var banner = function (obj) {
        this.banner = $(obj);
        this.banner.find('.list .item').eq(0).clone().appendTo(this.banner.find('.list'));
        var _this = this;
        var _src = this.banner.find('.list .item img').attr('src');
        this.image = new Image();
        this.list = this.banner.find('.list');
        this.item = this.banner.find('.list .item');
        this.len = this.item.length;
        this.pages = this.banner.find('.page .item');
        this.leftBtn = this.banner.find('.prev');
        this.rightBtn = this.banner.find('.next');
        this.image.src = _src;
        var _config = this.banner.attr('data-config');
        _config = JSON.parse(_config);
        this.config = {
            h : 0,
            w : 0,
            index : 0,
            speed : 500,
            delay : 1500,
            interval : false,
            dir : 'left',
            isClick : true,
            isAutoPlay : 'true'
        };
        $.extend(this.config, _config);
        this.image.onload = function () {
            _this.initSize ();
            _this.leftBtnEvent ();
            _this.rightBtnEvent ();
            if (_this.config.isAutoPlay == 'true') {
                _this.autoPlay ();
            }
            _this.bannerHoverEvent ();
            _this.pagesEvent ();
        };
    };
    banner.prototype = {
        pagesEvent : function () {
            var _this = this;
            _this.pages.click(function () {
                if (_this.config.isClick) {
                    _this.config.isClick = false;
                    _this.config.index = $(this).index();
                    _this.run ();
                }
            })
        },
        bannerHoverEvent : function () {
            var _this = this;
            _this.banner.hover(function () {
                if (_this.config.interval) {
                    win.clearInterval(_this.config.interval);
                }
            }, function () {
                if (_this.config.isAutoPlay == 'true') {
                    _this.autoPlay ();
                }
            })
        },
        autoPlay : function () {
            var _this = this;
            if (_this.config.interval) {
                win.clearInterval(_this.config.interval);
            }
            _this.config.interval = setInterval(function () {
                if (_this.config.dir == 'left') {
                    _this.turnLeft ();
                } else if (_this.config.dir == 'right') {
                    _this.turnRight ();
                }
            }, Number(_this.config.speed) + Number(_this.config.delay));
        },
        rightBtnEvent : function () {
            var _this = this;
            _this.rightBtn.click(function () {
                if (_this.config.isClick) {
                    _this.config.isClick = false;
                    _this.turnLeft ();
                }
            })
        },
        leftBtnEvent : function () {
            var _this = this;
            _this.leftBtn.click(function () {
                if (_this.config.isClick) {
                    _this.config.isClick = false;
                    _this.turnRight ();
                }
            });
        },
        turnRight : function () {
            if (this.config.index == 0) {
                this.config.index = this.len - 1;
                this.list.css('left', -this.config.w * this.config.index + 'px');
            }
            this.config.index = this.config.index - 1;
            this.run ();
        },
        turnLeft : function () {
            if (this.config.index == this.len - 1) {
                this.config.index = 0;
                this.list.css('left', '0px');
            }
            this.config.index = this.config.index + 1;
            this.run ();
        },
        run : function () {
            var _this = this;
            _this.list.animate({left: -_this.config.w * _this.config.index + 'px'}, Number(_this.config.speed), function () {
                _this.pages.removeClass('current');
                if (_this.config.index == _this.len - 1) {
                    _this.pages.eq(0).addClass('current');
                }
                _this.pages.eq(_this.config.index).addClass('current');
                _this.config.isClick = true;
            });
        },
        initSize : function () {
            this.config.w = this.banner.width();
            this.config.h = Math.floor(this.banner.width() / this.image.width * this.image.height);
            this.banner.css('height', this.config.h + 'px');
            this.item.css('width', this.config.w + 'px');
            this.list.css('width', this.config.w * this.len + 'px');
        }
    };
    banner.init = function (obj) {
        var _this = this;
        for (var i = 0, len = obj.length; i < len; i++) {
            new _this(obj[i]);
        }
    };
    win['myBanner'] = banner;
})(window, jQuery);