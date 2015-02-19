(function() {
    'use strict';

    // init game data

    RK.Game.Players.load();

    // init views

    var choosePlayersTemplate = Handlebars.compile($('#players-count').html());
    $('.start .yield').append(
        choosePlayersTemplate({ playerNumbers: _.range(2, 7) })
    );

    // register events

    $('.start').on('click', '.choose-players', function(e) {
        var numberOfPlayers = parseInt($(e.target).html(), 10);
        RK.Game.play(numberOfPlayers);
    });

    $(".leftAction").click(function() {
        RK.Game.start();
    });

    $("#end_session").click(function() {
        RK.Game.end();
    });
    

}());
