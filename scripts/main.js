(function() {
    'use strict';

    // private functions

    function cardNumberFromElement(el) {
        return $(el).closest('.player-card').index('.player-card') + 1;
    }

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

    $('.play').on('mousedown', '.player-card:not(.open)', function(e) {
        RK.Game.pressMissionCard(cardNumberFromElement(e.target), e);
    });

    $('.play').on('click', '.player-card:not(.open)', function(e) {
        RK.Game.openMissionCard(cardNumberFromElement(e.target));
    });

    $('.play').on('click', '.overlay, .face.back', RK.Game.closeMissionCard);

    $('.header').on('click', '.leftAction', function() {
        RK.Game.start();
    });

    $('.header').on('click', '#end_session', function() {
        RK.Game.end();
    });
}());
