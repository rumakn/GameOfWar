"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Card_js_1 = require("./Card.js");
var ranks = ["Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King", "Ace"];
var suits = ["Clubs", "Diamonds", "Hearts", "Spades"];
var DeckOfCards = /** @class */ (function () {
    function DeckOfCards(initArray) {
        if (initArray === void 0) { initArray = []; }
        this.deckArray = initArray;
        if (this.deckArray.length === 0) {
            for (var iSuit = 0; iSuit < suits.length; iSuit++) {
                for (var iRank = 0; iRank < ranks.length; iRank++) {
                    this.deckArray.push(new Card_js_1.default(suits[iSuit], ranks[iRank]));
                }
            }
        }
    }
    DeckOfCards.prototype.shuffle = function () {
        // randomly shuffle the deck
        for (var i = 0; i < 52; i++) {
            var j = Math.floor(Math.random() * 52);
            if (i !== j) {
                var swap = this.deckArray[i];
                this.deckArray[i] = this.deckArray[j];
                this.deckArray[j] = swap;
            }
        }
    };
    DeckOfCards.prototype.isEmpty = function () {
        console.log("here");
        if (this.deckArray.length > 0) {
            return false;
        }
        else {
            return true;
        }
    };
    DeckOfCards.prototype.deal = function () {
        // remove the top card from the deck
        return this.deckArray.shift();
    };
    return DeckOfCards;
}());
exports.default = new DeckOfCards;
//# sourceMappingURL=Deck.js.map