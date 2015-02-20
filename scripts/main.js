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

    $('.play').on('click', '.player-card:not(.open)', function(e) {
        var playerNumber = $(e.target).closest('.player-card').index() + 1;
        RK.Game.openMissionCard(playerNumber);
    });

    $('.play').on('click', '.overlay, .face.back', RK.Game.closeMissionCard);

    $('.header').on('click', '.leftAction', function() {
        RK.Game.start();
    });

    $('.header').on('click', '#end_session', function() {
        RK.Game.end();
    });
}());
