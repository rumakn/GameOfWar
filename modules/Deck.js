"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Card_js_1 = require("./Card.js");
// all ranks and suits
// let ranks = ["Two" , "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King", "Ace"];
// let suits = ["Clubs", "Diamonds", "Hearts","Spades"];
var ranks = ["Two", "Three", "Four"];
var suits = ["Clubs", "Diamonds"];
var DeckOfCards = /** @class */ (function () {
    // init with array of cards or empty array
    function DeckOfCards(initArray) {
        if (initArray === void 0) { initArray = []; }
        this.resetDeck(initArray);
    }
    // shuffle the cards
    DeckOfCards.prototype.shuffle = function () {
        // randomly shuffle the deck using Fisher-Yates shuffle
        for (var i = 0; i < this.deckArray.length; i++) {
            var j = Math.floor(Math.random() * this.deckArray.length);
            if (i !== j) {
                var swap = this.deckArray[i];
                this.deckArray[i] = this.deckArray[j];
                this.deckArray[j] = swap;
            }
        }
    };
    // split the deck in half return other half
    DeckOfCards.prototype.split = function () {
        var half = this.deckArray.length / 2;
        return this.deckArray.splice(0, half);
    };
    // check if deck is empty
    DeckOfCards.prototype.isEmpty = function () {
        return (this.deckArray.length > 0) ? false : true;
    };
    // deal one card
    DeckOfCards.prototype.deal = function (amount) {
        // remove the top card from the deck
        if (amount === void 0) { amount = 1; }
        return this.deckArray.splice(0, amount);
    };
    // add array of cards to discard pile
    DeckOfCards.prototype.addToDiscard = function (cards) {
        for (var i = 0; i < cards.length; i++) {
            this.discardArray.push(cards[i]);
        }
    };
    // return discard pile to deck and shuffle
    DeckOfCards.prototype.returnDiscardToDeck = function () {
        this.deckArray = this.deckArray.concat(this.discardArray);
        this.shuffle();
        this.discardArray = [];
        console.log(this.deckArray);
    };
    DeckOfCards.prototype.discardEmpty = function () {
        return (this.discardArray.length > 0) ? false : true;
    };
    DeckOfCards.prototype.checkDeckAmount = function () {
        return this.deckArray.length;
    };
    DeckOfCards.prototype.getDeck = function () {
        return this.deckArray;
    };
    DeckOfCards.prototype.getDiscard = function () {
        return this.discardArray;
    };
    DeckOfCards.prototype.resetDeck = function (inputDeck) {
        if (inputDeck === void 0) { inputDeck = []; }
        this.deckArray = inputDeck;
        this.discardArray = [];
        // if empty array then create new deck with all possible cards
        if (this.deckArray.length === 0) {
            for (var iSuit = 0; iSuit < suits.length; iSuit++) {
                for (var iRank = 0; iRank < ranks.length; iRank++) {
                    this.deckArray.push(new Card_js_1.default(suits[iSuit], ranks[iRank]));
                }
            }
        }
    };
    return DeckOfCards;
}());
exports.default = DeckOfCards;
//# sourceMappingURL=Deck.js.map