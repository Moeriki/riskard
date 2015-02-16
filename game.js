(function() {
    'use strict';

    // init game data

    //TODO load player names from local storage

    var players = _.range(1, 7).map(function(nr) { return 'Player ' + nr; })

    // init views

    $('.start .choose-players').append(
        _.range(2, 7).map(function(nr) {
            return '<li>' + nr + '</li>';
        })
    );

}());
