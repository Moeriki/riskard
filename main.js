(function() {
    'use strict';

    // init game data

    RK.Game.Players.load();

    // init views

    $('.start .choose-players').append(
        _.range(2, 7).map(function(nr) {
            return '<li>' + nr + '</li>';
        })
    );

}());
