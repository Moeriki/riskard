(function() {
    'use strict';

    // private functions

    function defaultPlayerName(nr) {
        return 'Player ' + nr;
    }

    // Game

    RK.Game = {

        start: function() {
            // reset data
            RK.Game.Players.number = -1;
            _.invoke(RK.Game.Players.list, 'forgetCard');
            RK.CardStore.reset();

            RK.Util.scrollToPage(1);
        },

        play: function(numberOfPlayers) {
            RK.Game.Players.count = numberOfPlayers;

            _(RK.Game.Players.list)
                .initial(numberOfPlayers)
                .each(function(player) {
                    player.card = RK.CardStore.getRandom();
                });

            //TODO render play

            RK.Util.scrollToPage(2);
        },

        end: function() {
            RK.Util.scrollToPage(3);
        }

    };

    RK.Game.Players = {

        number: -1,

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
