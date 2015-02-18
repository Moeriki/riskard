(function() {
    'use strict';

    // init game data

    RK.Game.Players.load();

    // init views

    var choosePlayersTemplate = Handlebars.compile($('#players-count').html());
    $('.start .container').append(choosePlayersTemplate({
        playerNumbers: _.range(2, 7)
    }));

}());
