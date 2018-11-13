"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Hand = /** @class */ (function () {
    function Hand(div) {
        this.handArray = [];
        this.div = div;
    }
    Hand.prototype.addToHand = function (card) {
        this.handArray.push(card);
        var cardView = document.createElement('div');
        var cardType = card.getCardType();
        cardView.id = cardType;
        cardView.innerHTML = "<img src='./images/" + cardType + ".png' width='150px'>";
        this.div.appendChild(cardView);
    };
    return Hand;
}());
exports.default = Hand;
//# sourceMappingURL=Hand.js.map