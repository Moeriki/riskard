(function() {
    'use strict';

    RK.Util = {

        scrollToPage: function(nr) {
            var $page, offsetLeft;

            $page = $('.pages > *').eq(nr - 1);
            offsetLeft = $page.offset().left;

            $('body').animate({ scrollLeft: offsetLeft });
        }

    };

}());
