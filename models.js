(function() {
    'use strict';

    var Player = function(name) {
        this.id = _.uniqueId();
        this.name = name;
        this.card = null;
    };

    var Card = function(title, img) {
        this.id = _.uniqueId();
        this.title = title;
        this.img = img;
    };

    RK.Player = Player;
    RK.Card = Card;
}());
