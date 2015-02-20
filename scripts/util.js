(function() {
    'use strict';

    // consts

    var DEFAULT_PPI = 96;

    // private variables

    var ppi, currentPage;

    // calculate PPI

    (function tryToFindPPI() {
        var inch = document.createElement('div');
        inch.style.width = '1in';
        document.body.appendChild(inch);

        ppi = inch.getBoundingClientRect().width || DEFAULT_PPI;

        inch.remove();
    }());

    // util functions

    RK.Util = {

        dpToPx: function(dp) {
            return dp * ppi / 160;
        },

        scrollToPage: function(nr, doJump) {
            var $page, offsetLeft;

            $page = $('.pages > *').eq(nr - 1);
            offsetLeft = $page.offset().left;

            if (doJump) {
                $('body').scrollLeft(offsetLeft);
            } else {
                $('body').animate({ scrollLeft: offsetLeft });
            }

            currentPage = nr;
        }

    };

    // go to current page

    currentPage = 1;
    _.delay(function() {
        RK.Util.scrollToPage(currentPage, true);
    }, 500);

    $(window).on('resize', _.throttle(function() {
        RK.Util.scrollToPage(currentPage, true);
    }, 50));

}());
