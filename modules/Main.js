"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Deck_js_1 = require("./Deck.js");
var PlayZone_js_1 = require("./PlayZone.js");
var playerDeck = new Deck_js_1.default();
// shuffle deck , split deck
playerDeck.shuffle();
var opponentDeck = new Deck_js_1.default(playerDeck.split());
// let opponentDeck = new Deck ();
// View of Deck, view of warzone (play zone where you play dealt cards), and discard zone
var deckPlayerView = document.getElementById('deck-player');
var deckOpponentView = document.getElementById('deck-opponent');
var playerWarView = document.getElementById('warzone-player');
var oppWarView = document.getElementById('warzone-opponent');
var playerDiscard = document.getElementById('discard-player');
var oppDiscard = document.getElementById('discard-opponent');
// init playzones/warzones
var playerWarZone = new PlayZone_js_1.default(playerWarView);
var oppWarZone = new PlayZone_js_1.default(oppWarView);
// get reset button and game over and instruction sections
var resetButton = document.getElementById('reset-button');
var gameOverView = document.getElementById('game-over');
var instructionsView = document.getElementById("instructions");
instructionsView.style.visibility = "visible";
var state = "play";
// styles
deckPlayerView.style.width = "200px";
deckPlayerView.style.height = "130px";
deckOpponentView.style.width = "200px";
deckOpponentView.style.height = "130px";
// if instructions visible, then hide when click deck
function checkInstructions() {
    console.log(instructionsView.style.visibility);
    if (instructionsView.style.visibility == "visible") {
        instructionsView.style.visibility = "hidden";
    }
}
function winCards(winner, discard, direction) {
    // add cards to my discard pile
    var wonCards = playerWarZone.discardFromZone(direction);
    winner.addToDiscard(wonCards);
    wonCards = oppWarZone.discardFromZone(direction);
    winner.addToDiscard(wonCards);
    // animate stacking onto pile
    window.setTimeout(function () {
        var stackView = document.createElement("img");
        stackView.setAttribute("src", "./images/back-stack.png");
        discard.appendChild(stackView);
        checkIfGameOver();
        playerWarZone.discardHTMLFromZone();
        oppWarZone.discardHTMLFromZone();
        if (state !== "gameOver") {
            state = "play";
        }
    }, 1000);
}
// test player card vs opponent card in round 
function roundOfWar(myCard, oppCard) {
    // if my card value is higher I win
    if (myCard.getCardValue() > oppCard.getCardValue()) {
        // add cards to my discard pile
        winCards(playerDeck, playerDiscard, "bottom");
    }
    // opponent wins add to their discard
    else if (myCard.getCardValue() < oppCard.getCardValue()) {
        winCards(opponentDeck, oppDiscard, "top");
    }
    // equal values 
    else {
        // war
        state = "war";
    }
}
function emptyDiscardView() {
    while (playerDiscard.firstChild) {
        playerDiscard.removeChild(playerDiscard.firstChild);
    }
    while (oppDiscard.firstChild) {
        oppDiscard.removeChild(oppDiscard.firstChild);
    }
}
function resetDeckView() {
    // fill card div
    if (deckOpponentView.style.backgroundImage === "none") {
        deckOpponentView.style.backgroundImage = "url('images/back.png')";
    }
    if (deckPlayerView.style.backgroundImage === "none") {
        deckPlayerView.style.backgroundImage = "url('images/back.png')";
    }
}
// reset game
function reset() {
    // clear discards
    // show back of card for deck
    emptyDiscardView();
    resetDeckView();
    document.getElementById("display-game-over").innerHTML = "Game Over";
    gameOverView.style.visibility = "hidden";
    instructionsView.style.visibility = "visible";
    playerDeck.resetDeck();
    // shuffle deck , split deck
    playerDeck.shuffle();
    opponentDeck.resetDeck(playerDeck.split());
    state = "play";
}
resetButton.onclick = function (event) {
    reset();
};
// gameOver screen
function gameOver(winner) {
    window.setTimeout(function () {
        // display div with winner name and buttons to reset
        var WinnerDisplay = document.createElement('div');
        WinnerDisplay.id = "winner-string";
        WinnerDisplay.textContent = winner + " Won!";
        gameOverView.style.visibility = "visible";
        document.getElementById("display-game-over").appendChild(WinnerDisplay);
    }, 1000);
}
function returnDiscards() {
    playerDeck.returnDiscardToDeck();
    // empty discard div
    opponentDeck.returnDiscardToDeck();
    emptyDiscardView();
    // fill card div
    resetDeckView();
}
function checkIfGameOver() {
    console.log(playerDeck.isEmpty());
    console.log(playerDeck.discardEmpty());
    console.log(opponentDeck.isEmpty());
    console.log(opponentDeck.discardEmpty());
    // if discard is empty for player with no deck, then other person wins
    var returnValue = false;
    if (state !== "war") {
        if (playerDeck.isEmpty()) {
            // if empty opponent wins
            if (playerDeck.discardEmpty()) {
                // input of winner string
                state = "gameOver";
                gameOver("Opponent");
                return true;
            }
            else {
                returnValue = false;
            }
        }
        if (opponentDeck.isEmpty()) {
            if (opponentDeck.discardEmpty()) {
                // input of winner string
                state = "gameOver";
                gameOver("Player");
                return true;
            }
            else {
                returnValue = false;
            }
        }
    }
    return returnValue;
}
deckPlayerView.onclick = function (event) {
    // if instructions visible, hide them
    checkInstructions();
    // if animating game, wait
    if (state !== "animating" && state !== "gameOver") {
        // if state is war - next click adds 4 cards to warzone
        if (state === "war") {
            state = "play";
            // check how many cards left in each deck
            var playerLeftInDeck = playerDeck.checkDeckAmount();
            var oppLeftInDeck = opponentDeck.checkDeckAmount();
            // if players have enough, draw 4 cards
            if (playerLeftInDeck > 4 && oppLeftInDeck > 4) {
                playerWarZone.addWarCards(playerDeck.deal(4), "bottom");
                oppWarZone.addWarCards(opponentDeck.deal(4), "top");
            }
            // if decks are not empty, draw remaining - 1 amount of cards
            else if (!playerDeck.isEmpty() && !opponentDeck.isEmpty()) {
                var minLeft = Math.min(playerLeftInDeck, oppLeftInDeck);
                playerWarZone.addWarCards(playerDeck.deal(minLeft - 1), "bottom");
                oppWarZone.addWarCards(opponentDeck.deal(minLeft - 1), "top");
            }
            // if discards are not empty, shuffle them back in
            else if (!playerDeck.discardEmpty() || !opponentDeck.discardEmpty()) {
                console.log("returning discard with war");
                returnDiscards();
                state = "war";
            }
            // if one deck is empty, randomly pick who wins the cards 
            // only happens if last draw from deck initiates war
            else {
                console.log("using random number generator");
                var randomNum = Math.random() >= .5;
                // if true then player wins
                if (randomNum) {
                    winCards(playerDeck, playerDiscard, "bottom");
                }
                // else opponent wins
                else {
                    winCards(opponentDeck, oppDiscard, "top");
                }
            }
        } // if players have cards in their deck, continue
        else if (!playerDeck.isEmpty() && !opponentDeck.isEmpty() && state === "play") {
            state = "animating";
            // play war 
            var myCard_1 = playerDeck.deal()[0];
            var oppCard_1 = opponentDeck.deal()[0];
            // deal one card from each deck into the warzone
            oppWarZone.addToZone(oppCard_1, "top");
            playerWarZone.addToZone(myCard_1, "bottom");
            // wait a few seconds 
            // calculate who has higher value
            // put into winners discard pile 
            window.setTimeout(function () {
                roundOfWar(myCard_1, oppCard_1);
                // checkIfGameOver();
            }, 2000);
        }
        else {
            // check if game over, if not then need to return discards 
            var gameEnd = checkIfGameOver();
            if (!gameEnd) {
                returnDiscards();
            }
        }
    }
    if (playerDeck.isEmpty()) {
        // game over
        deckPlayerView.style.backgroundImage = "none";
    }
    if (opponentDeck.isEmpty()) {
        deckOpponentView.style.backgroundImage = "none";
    }
    // check if game over
};
//# sourceMappingURL=Main.js.map