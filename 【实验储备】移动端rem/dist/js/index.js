var sun = {
    carousel: undefined,
    listNav:undefined,
    listJing:undefined,
    listmenu:undefined,
    listNavmodal:undefined,
    choose:undefined,
    listGuige:undefined,
    closeguige:undefined,
    backgroundclose:undefined,
    listfooter:undefined,
    cartMain:undefined,
    cartModal:undefined,
    getDom: function() {
        this.carousel = $('#carousel');
        this.listNav = $('#list-nav');
        this.listJing = $('#list-jing');
        this.listmenu = $('#listmenu');
        this.listNavmodal = $('#list-navmodal');
        this.choose = $('#choose');
        this.listGuige = $('#list-guige');
        this.closeguige = $('#closeguige');
        this.backgroundclose = $('#background');
        this.listfooter = $('#listfooter');
        this.cartMain = $('#cartMain');
        this.cartModal = $('#cart-modal');
    },
    bannersider: function() {
        var bannerTimer = null;
        var bannerWrap = $('.imgwrap', this.carousel);
        var bannerLi = $('li', bannerWrap);
        var bannerol = $('ol', this.carousel);
        var carousel = this.carousel;
        var windowWidth = $('body').width();
        var startX = 0;
        var startT = 0;

        for (var i = 0; i < bannerLi.length; i++) {
            var olli = $('<li></li>');
            bannerol.append(olli);
        }
        var bannerolLi = $('li', bannerol);
        bannerolLi.eq(0).addClass('active');
        var banleft = bannerLi.length - 1;
        var bancenter = 0;
        var banright = 1;

        trans(false, false, false, -1, 0, 1);

        function gonext() {
            banleft = bancenter;
            bancenter = banright;
            banright++;
            bannerolLi.removeClass('active');
            bannerolLi.eq(bancenter).addClass('active');

            if (banright > bannerLi.length - 1) {
                banright = 0;
            }
            trans(true, true, false, -1, 0, 1);
        }

        function goprev() {
            banright = bancenter;
            bancenter = banleft;
            banleft--;

            bannerolLi.removeClass('active');
            bannerolLi.eq(bancenter).addClass('active');

            if (banleft < 0) {
                banleft = bannerLi.length - 1;
            }
            trans(false, true, true, -1, 0, 1);

        }

        bannerTimer = setInterval(gonext, 2000);

        carousel.on('touchstart', function(e) {
            trans(false, false, false);
            clearInterval(bannerTimer);
            startX = e.touches[0].clientX;
            startT = e.timeStamp;
            //console.log(startT);
            return false;

        });
        carousel.on('touchmove', function(e) {

            var moveX = e.touches[0].clientX;
            var dX = moveX - startX;

            bannerLi.eq(banleft).css('transform', "translateX(" + (-windowWidth + dX) + "px)");
            bannerLi.eq(bancenter).css('transform', "translateX(" + dX + "px)");
            bannerLi.eq(banright).css('transform', "translateX(" + (windowWidth + dX) + "px)");
            return false;
        });

        carousel.on('touchend', function(e) {

            var endX = e.changedTouches[0].clientX;
            endT = e.timeStamp;
            var dT = endT - startT;
            var dX = endX - startX;
            if (dX < (-windowWidth / 3) || (dT < 300 && dX < -30)) {
                gonext();
            } else if (dX > windowWidth / 3 || (dT < 300 && dX > 30)) {
                goprev();
            } else {
                trans(true, true, true, -1, 0, 1);
            }
            bannerTimer = setInterval(gonext, 2000);
            return false;
        });

        function trans(a, b, c, d, e, f) {
            var a1 = "none";
            var b1 = "none";
            var c1 = "none";
            if (a === true) {
                a1 = "transform 0.5s";
            }
            if (b === true) {
                b1 = "transform 0.5s";
            }
            if (c === true) {
                c1 = "transform 0.5s";
            }
            d *= windowWidth;
            e *= windowWidth;
            f *= windowWidth;

            bannerLi.eq(banleft).css('transition', a1);
            bannerLi.eq(bancenter).css('transition', b1);
            bannerLi.eq(banright).css('transition', c1);

            bannerLi.eq(banleft).css('transform', "translateX(" + d + "px)");
            bannerLi.eq(bancenter).css('transform', "translateX(" + e + "px)");
            bannerLi.eq(banright).css('transform', "translateX(" + f + "px)");
        }
    },
    listNavTab : function(){
        var listUl = $('.listnav-ul',this.listNav);
        var listLi = $('.li',listUl);
        var pro = $('.pro',this.listJing);
        var _this = this;
        var tabTitle = $('ul.tab-title',this.listGuige)
        var tabTitleLi = $('li .pin');
        var tabTitlecon = $('li .tab-content');
        var conLi = $('li',tabTitlecon);
        var reset = $('.reset',this.listfooter);
        var sure = $('.sure',this.listfooter);
        listLi.each(function(index, el) {
            $(el).on('click', function(event) {
                event.preventDefault();
                $(this).addClass('active').siblings().removeClass('active');
                pro.eq(index).addClass("active").siblings('.pro').removeClass('active');
            });
        });
        this.choose.on('click', function(event) {
            event.preventDefault();
            _this.listGuige.show();
            _this.backgroundclose.on('touchmove', function(event) {
                event.preventDefault();
            });

        });
        this.closeguige.on('click', function(event) {
            event.preventDefault();
             _this.listGuige.hide();
        });
        this.backgroundclose.on('click', function(event) {
            event.preventDefault();
             _this.listGuige.hide();
        });
        tabTitleLi.on('click', function(event) {
            event.preventDefault();
            $(this).siblings('.tab-content').addClass('active');
            $(this).children('.drop').find('span').css('transform', 'rotate(180deg)');
            $(this).parent().siblings('li').children('.pin').find('.drop span').css('transform', 'rotate(0deg)');
            $(this).parent().siblings('li').children('.tab-content').removeClass("active");
        });
        conLi.on('click', function(event) {
            event.preventDefault();
            $(this).addClass('active').siblings().removeClass('active');
        });
        reset.on('click', function(event) {
            event.preventDefault();
            tabTitlecon.each(function(index, el) {
                $(el).children('li').removeClass('active').eq(0).addClass('active');
            });
        });
        sure.on('click', function(event) {
            event.preventDefault();
             _this.listGuige.hide();
        });
    },
    listmenuTog: function () {
        var _this = this;
        _this.listmenu.on('click', function(event) {
            event.preventDefault();
            _this.listNavmodal.toggle();
        });
    },
    cartRemove: function () {
        var li = $('li',this.cartMain);
        var remove = $('.remove',li);
        var cancel = $('.cancel',this.cartModal);
        var sure = $('.sure',this.cartModal);
        var _this = this;
        remove.on('click', function(event) {
            event.preventDefault();
            _this.cartModal.show();
            _this.cartModal.on('touchmove', function(event) {
                event.preventDefault();
            });
        });
        cancel.on('click', function(event) {
            event.preventDefault();
             _this.cartModal.hide();
        });
        sure.on('click', function(event) {
            event.preventDefault();
             _this.cartModal.hide();
        });
    }
}

sun.getDom();
sun.bannersider();
sun.listNavTab();
sun.listmenuTog();
sun.cartRemove();
