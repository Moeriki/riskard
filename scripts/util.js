(function() {
    'use strict';

    var ppi = 96;
    $(function() {
        var $body, $inch;

        $body = $('body');
        $inch = $('<div style="width:1in"></div>');

        $body.append($inch);
        ppi = $inch.width() || ppi;

        $inch.remove();
    });

    RK.Util = {

        dpToPx: function(dp) {
            return dp * ppi / 160;
        },

        scrollToPage: function(nr) {
            var $page, offsetLeft;

            $page = $('.pages > *').eq(nr - 1);
            offsetLeft = $page.offset().left;

            $('body').animate({ scrollLeft: offsetLeft });
        }

    };

}());
