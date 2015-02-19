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

    $("#back").click(function() {
        RK.Game.start();
    })

    $('.start').on('click', '.choose-players', function(e) {
        var numberOfPlayers = parseInt($(e.target).html(), 10);
        RK.Game.play(numberOfPlayers);
    });

    $('.play').on('click', '.player-card', function(e) {
        var playerNumber = $(e.target).closest('.player-card').index() + 1;
        RK.Game.openMissionCard(playerNumber);
    });

}());
