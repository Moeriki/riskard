(function() {
    'use strict';

    // private variables

    var playerCardsTemplate = Handlebars.compile($('#player-cards').html());

    var $openCardPlaceHolder = null;

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
            var players = _.take(RK.Game.Players.all, numberOfPlayers);

            RK.Game.Players.playing = players;

            _.each(players, function(player) {
                player.card = RK.CardStore.getRandom();
            });

            $('.play .yield').empty().append(
                playerCardsTemplate({ players: players })
            );

            RK.Util.scrollToPage(2);
        },

        end: function() {
            // TODO render end

            RK.Util.scrollToPage(3);
        },

        openMissionCard: function(playerNumber) {
            var $card, rect, $cardContainer, cardContainerRect;

            $cardContainer = $('.play .player-cards');
            $card = $('.play .player-card').eq(playerNumber - 1);
            cardContainerRect = $cardContainer[0].getBoundingClientRect();
            rect = $card[0].getBoundingClientRect();

            // close other card
            if ($openCardPlaceHolder) {
                $openCardPlaceHolder.remove();
                // $openCardPlaceHolder = null;
            }

            $card.siblings('.open')
                .removeClass('open')
                .removeAttr('style');

            //TODO position element absolutely centered
            // $openCardPlaceHolder = $('<li class="spaceholder"></li>');
            // $card.before($openCardPlaceHolder);

            // $card.css({
            //     position: 'absolute',
            //     left: rect.left - cardContainerRect.left,
            //     top: rect.top - cardContainerRect.top,
            //     margin: 0,
            // });

            $card.addClass('open');
        },

    };

    RK.Game.Players = {

        all: null,

        playing: null,

        load: function() {
            // Load player names from local storage
            var players = window.localStorage && window.localStorage.getItem('players');

            if (players && players.length) {
                players = JSON.parse(players);
                console.info('loaded %i players from localstorage', players.length);
            } else {
                players = _.range(1, 7).map(defaultPlayerName);
            }

            RK.Game.Players.all = players.map(RK.Player.factory);

            return RK.Game.Players.all;
        },

        save: function() {
            var allPlayers = RK.Game.Players.all;

            if (!window.localStorage) {
                console.warn('cannot save players list without localstorage');
                return;
            }
            if (!allPlayers || !allPlayers.length) {
                console.error('cannot save empty players list');
                return;
            }

            window.localStorage.setItem('players', JSON.stringify(_.pluck(allPlayers, 'name')));
        }

    };

}());
