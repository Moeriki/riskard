(function() {
    'use strict';

    // private variables

    var localCardStore = [
        {
            type: 'conquer',
            continents: ['North America', 'Australia'],
            img: 'north-america-australia.png'
        },
        {
            type: 'conquer',
            continents: ['North America', 'Africa'],
            img: 'north-america-africa.png'
        },
        {
            type: 'conquer',
            continents: ['Europe', 'South America', '3TH'],
            img: 'europe-south-america-3th.png'
        },
        {
            type: 'conquer',
            continents: ['Asia', 'Africa'],
            img: 'asia-africa.png'
        },
        {
            type: 'conquer',
            continents: ['Asia', 'South-America'],
            img: 'asia-south-america'
        },
        {
            type: 'conquer',
            continents: ['Europe', 'Australia', '3TH'],
            img: 'europe-australie-3th.png'
        }
    ];

    // private functions

    function resetCard(card) {
        card.taken = false;
    }

    RK.CardStore = {

        getRandom: function() {
            var freeCards, card;

            freeCards = _.reject(localCardStore, 'taken');
            if (freeCards.length === 0) {
                console.error("no cards left");
                return null;
            }

            card = freeCards[_.random(freeCards.length - 1)];

            card.taken = true;

            return card;
        },

        reset: function() {
            _.each(localCardStore, resetCard);
        }

    };
}());
