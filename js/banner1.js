;(function (win, $) {
    var banner = function (obj) {
        this.banner = $(obj);
        this.banner.find('.list .item').eq(0).clone().appendTo(this.banner.find('.list'));

        this.list = this.banner.find('.list');
        this.item = this.banner.find('.list .item');
        this.pages = this.banner.find('.page a');
        this.prev = this.banner.find('.prev');
        this.next = this.banner.find('.next');

        this.w = this.banner.width();
        this.len = this.item.length;
        this.index = 0;
        this.interval = false;
        this.dir = 'right';
        this.speed = 500;
        this.delay = 1500;
        this.isClick = true;

        this.initPositon ();
        this.setLeftEvent ();
        this.setRightEvent ();
        this.autoPlay ();
        this.setHoverEvent ();
        this.setPagesEvent ();
    };
    banner.prototype = {
        setPagesEvent : function () {
            var _this = this;
            _this.pages.click(function (i) {
                _this.index = $(this).index();
                if (_this.isClick) {
                    _this.isClick = false;
                    _this.run ();
                }
            })
        },
        setHoverEvent : function () {
            var _this = this;
            _this.banner.hover(function () {
                if (_this.interval) {
                    win.clearInterval(_this.interval)
                }
            }, function () {
                _this.autoPlay ();
            })
        },
        autoPlay : function () {
            var _this = this;
            if (_this.interval) {
                win.clearInterval(_this.interval)
            }
            _this.interval = setInterval(function () {
                if (_this.dir == 'left') {
                    _this.turnLeft ();
                } else if (_this.dir == 'right') {
                    _this.turnRight ();
                }
            }, _this.speed + _this.delay);
        },
        run : function () {
            var _this = this;
            _this.list.animate({'left': -_this.w * _this.index + 'px'}, _this.speed, function () {
                _this.pages.removeClass('current');
                if (_this.index == 0 || _this.index == _this.len - 1) {
                    _this.pages.eq(0).addClass('current');
                } else {
                    _this.pages.eq(_this.index).addClass('current');
                }
                _this.isClick = true;
            });
        },
        turnRight : function () {
            if (this.index == this.len - 1) {
                this.index = 0;
                this.list.css('left', '0px');
            }
            this.index++;
            this.run ();
        },
        turnLeft : function () {
            if (this.index == 0) {
                this.index = this.len - 1;
                this.list.css('left', -this.w * this.index + 'px');
            }
            this.index--;
            this.run ();
        },
        setRightEvent : function () {
            var _this = this;
            _this.next.click(function () {
                if (_this.isClick) {
                    _this.isClick = false;
                    _this.turnRight ();
                }
            });
        },
        setLeftEvent : function () {
            var _this = this;
            this.prev.click(function () {
                if (_this.isClick) {
                    _this.isClick = false;
                    _this.turnLeft ();
                }
            });
        },
        initPositon : function () {
            this.list.css('width', this.w * this.len + 'px');
            this.item.css('width', this.w + 'px');
        }
    };
    banner.init = function (obj) {
        var _this = this;
        for (var i = 0, l = obj.length; i < l; i++) {
            new _this(obj[i]);
        }
        //new this(obj);
    };
    win['myBanner'] = banner;
})(window, jQuery);