"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RankValues;
(function (RankValues) {
    RankValues[RankValues["Two"] = 0] = "Two";
    RankValues[RankValues["Three"] = 1] = "Three";
    RankValues[RankValues["Four"] = 2] = "Four";
    RankValues[RankValues["Five"] = 3] = "Five";
    RankValues[RankValues["Six"] = 4] = "Six";
    RankValues[RankValues["Seven"] = 5] = "Seven";
    RankValues[RankValues["Eight"] = 6] = "Eight";
    RankValues[RankValues["Nine"] = 7] = "Nine";
    RankValues[RankValues["Ten"] = 8] = "Ten";
    RankValues[RankValues["Jack"] = 9] = "Jack";
    RankValues[RankValues["Queen"] = 10] = "Queen";
    RankValues[RankValues["King"] = 11] = "King";
    RankValues[RankValues["Ace"] = 12] = "Ace";
})(RankValues || (RankValues = {}));
var Card = /** @class */ (function () {
    function Card(suit, rank) {
        this.suit = suit;
        this.rank = rank;
    }
    Card.prototype.getCardType = function () {
        return this.rank + "of" + this.suit;
    };
    Card.prototype.getCardValue = function () {
        return RankValues[this.rank];
    };
    return Card;
}());
exports.default = Card;
//# sourceMappingURL=Card.js.map