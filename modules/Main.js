"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Deck_js_1 = require("./Deck.js");
var Hand_js_1 = require("./Hand.js");
Deck_js_1.default.shuffle();
// View of Deck, view of Card
var deckView = document.getElementById('deck');
var handView = document.getElementById('hand');
// init myHand
var myHand = new Hand_js_1.default(handView);
deckView.style.width = "300px";
deckView.style.height = "200px";
deckView.onclick = function (event) {
    if (!Deck_js_1.default.isEmpty()) {
        myHand.addToHand(Deck_js_1.default.deal());
        if (Deck_js_1.default.isEmpty()) {
            deckView.textContent = "No more cards";
            deckView.style.backgroundImage = "none";
        }
    }
};
//# sourceMappingURL=Main.js.map