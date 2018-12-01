"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PlayZone = /** @class */ (function () {
    // init with an array for played cards and div to hold them
    function PlayZone(div) {
        this.zoneArray = [];
        this.div = div;
    }
    // add card to zone, direction it was played from and side of card to show
    PlayZone.prototype.addToZone = function (card, direction, face) {
        if (face === void 0) { face = "front"; }
        this.zoneArray.push(card);
        // set div values for card
        var cardView = document.createElement('div');
        cardView.classList.add('card');
        var cardType = card.getCardType();
        cardView.id = cardType;
        cardView.style.width = "25px";
        // if the front face should show, get image with card type
        if (face === "front") {
            cardView.innerHTML = "<img src='./images/" + cardType + ".png' width='150px'>";
        }
        // else show back of card
        else {
            cardView.innerHTML = "<img src='./images/back-vert.jpg' width='150px'>";
        }
        this.div.appendChild(cardView);
        // check direction it should come from 
        if (direction == "top") {
            // make card go down 
            cardView.classList.add('card-top');
        }
        else {
            // fade from bottom
            cardView.classList.add('card-bottom');
        }
        // animate from deck direction and blend
        window.setTimeout(function () {
            cardView.classList.remove('card-top');
            cardView.classList.remove('card-bottom');
        }, 50);
    };
    PlayZone.prototype.addWarCards = function (cards, direction) {
        var _this = this;
        cards.forEach(function (elem) {
            _this.addToZone(elem, direction, "back");
        });
    };
    PlayZone.prototype.discardFromZone = function (direction) {
        console.log('gothere');
        var warCards = this.div.getElementsByClassName('card');
        if (direction == "top") {
            for (var i = 0; i < warCards.length; i++) {
                warCards[i].classList.add('card-top');
            }
        }
        else {
            for (var i = 0; i < warCards.length; i++) {
                warCards[i].classList.add('card-bottom');
            }
        }
        var returnZone = this.zoneArray;
        this.zoneArray = [];
        return returnZone;
    };
    PlayZone.prototype.discardHTMLFromZone = function () {
        var warCards = document.getElementsByClassName('card');
        var parentOfCards = warCards[0].parentElement;
        while (parentOfCards.firstChild) {
            parentOfCards.removeChild(parentOfCards.firstChild);
        }
    };
    return PlayZone;
}());
exports.default = PlayZone;
//# sourceMappingURL=PlayZone.js.map