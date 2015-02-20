(function() {
    'use strict';

    // consts

    var PRESSURE = 5;

    // private variables

    var playerCardsTemplate = Handlebars.compile($('#player-cards').html());

    var $container, $overlay, containerRect, flipper;

    // private functions

    function defaultPlayerName(nr) {
        return 'Player ' + nr;
    }

    function absolutePositionCard(cardNumber) {
        if (flipper) {
            if (flipper.cardNumber !== cardNumber) {
                throw new Error('already flipping other card');
            }
            return;
        }

        containerRect = $container[0].getBoundingClientRect();// TODO recalculate on resize

        flipper = {};

        flipper.cardNumber = cardNumber;
        flipper.$card = $container.children().eq(cardNumber - 1);
        flipper.cardRect = flipper.$card[0].getBoundingClientRect();
        flipper.$holder = $('<li class="spaceholder"></li>');

        flipper.$card.before(flipper.$holder);

        flipper.$card.data({
            left: flipper.cardRect.left - containerRect.left,
            top: flipper.cardRect.top - containerRect.top,
        });

        flipper.$card.css({
            position: 'absolute',
            zIndex: 15,
            left: flipper.cardRect.left - containerRect.left,
            top: flipper.cardRect.top - containerRect.top,
            margin: 0,
        });
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

            $container = $('.play .player-cards');
            containerRect = $container[0].getBoundingClientRect();// TODO recalculate on resize
            $overlay = $('.play .overlay');

            RK.Util.scrollToPage(2);
        },

        end: function() {
            // TODO render end

            RK.Util.scrollToPage(3);
        },

        pressMissionCard: function(playerNumber, e) {
            var pressure = PRESSURE;

            absolutePositionCard(playerNumber);
            if (!flipper) {
                return;
            }

            if (e.offsetY > flipper.$card.height() / 2) {
                pressure *= -1;
            }

            flipper.$card.animate({
                transform: 'rotateX(' + pressure + 'deg)'
            }, { duration: 50 });
        },

        openMissionCard: function(playerNumber) {
            absolutePositionCard(playerNumber);
            if (!flipper) {
                return;
            }

            $overlay.css({
                display: 'block',
                left: -containerRect.left,
                top: -containerRect.top,
            }).addClass('show');

            flipper.$card.stop().addClass('open').animate({
                top: (window.innerHeight - flipper.$card.height()) / 2 - containerRect.top,
                left: (window.innerWidth - flipper.$card.width()) / 2 - containerRect.left,
                transform: 'rotateY(180deg) scale(2)'
            });
        },

        closeMissionCard: function() {
            if (!flipper) {
                return;
            }

            flipper.$card.stop().removeClass('open').animate({
                left: flipper.$card.data('left'),
                top: flipper.$card.data('top'),
                transform: 'rotateY(0) scale(1)'
            }, function() {
                flipper.$holder.remove();

                flipper.$card.removeAttr('style');

                flipper = null;
            });

            $overlay.removeClass('show');
            _.delay(function() {
                $overlay.css('display', '');
            }, 500);
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
