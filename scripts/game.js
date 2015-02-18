(function() {
    'use strict';

    // private functions

    function defaultPlayerName(nr) {
        return 'Player ' + nr;
    }

    // Game

    RK.Game = {

        start: function() {
            RK.Util.scrollToPage(1);
        },

        play: function() {
            //RK.Game.

            RK.Util.scrollToPage(2);
        },

        end: function() {
            RK.Util.scrollToPage(3);
        }

    };

    RK.Game.Players = {

        list: null,

        load: function() {
            // Load player names from local storage
            var players = window.localStorage && window.localStorage.getItem('players');

            if (players && players.length) {
                players = JSON.parse(players);
                console.info('loaded %i players from localstorage', players.length);
            } else {
                players = _.range(1, 7).map(defaultPlayerName);
            }

            return (this.list = players.map(RK.Player.factory));
        },

        save: function() {
            if (!window.localStorage) {
                console.warn('cannot save players list without localstorage');
                return;
            }
            if (!this.list || !this.list.length) {
                console.error('cannot save empty players list');
                return;
            }

            window.localStorage.setItem('players', JSON.stringify(_.pluck(this.list, 'name')));
        }

    };

}());
