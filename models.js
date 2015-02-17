(function() {
    'use strict';

    var Player = function(name) {
        this.name = name;
        this.card = null;
    };

    Player.factory = function(name) {
        return new Player(name);
    };

    var Card = function(title, img) {
        this.title = title;
        this.img = img;
    };

    RK.Player = Player;
    RK.Card = Card;
}());
