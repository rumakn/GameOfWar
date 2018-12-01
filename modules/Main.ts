import Deck from './Deck.js'
import PlayZone from './PlayZone.js'
import Card from "./Card.js"
    let playerDeck = new Deck();
    
    // shuffle deck , split deck
     playerDeck.shuffle();
     let opponentDeck = new Deck (playerDeck.split());
    // let opponentDeck = new Deck ();
    // View of Deck, view of warzone (play zone where you play dealt cards), and discard zone
    let deckPlayerView :HTMLElement = document.getElementById('deck-player');
    let deckOpponentView :HTMLElement = document.getElementById('deck-opponent');
    let playerWarView : HTMLElement = document.getElementById('warzone-player');
    let oppWarView : HTMLElement = document.getElementById('warzone-opponent');
    let playerDiscard : HTMLElement = document.getElementById('discard-player');
    let oppDiscard : HTMLElement = document.getElementById('discard-opponent');
    // init playzones/warzones
    let playerWarZone :PlayZone = new PlayZone(playerWarView);
    let oppWarZone: PlayZone = new PlayZone(oppWarView);

    // get reset button and game over div
    let resetButton : HTMLElement = document.getElementById('reset-button');
    let gameOverView : HTMLElement = document.getElementById('game-over');

    let state :string = "play";
    // styles
    deckPlayerView.style.width = "200px";
    deckPlayerView.style.height = "120px";
    deckOpponentView.style.width = "200px";
    deckOpponentView.style.height = "120px";

    function winCards(winner:Deck, discard:HTMLElement,  direction: string){
        // add cards to my discard pile
        let wonCards: Array<Card> = playerWarZone.discardFromZone(direction);
        
        winner.addToDiscard(wonCards);
        wonCards = oppWarZone.discardFromZone(direction);
        
        winner.addToDiscard(wonCards);
        // animate stacking onto pile
        window.setTimeout( function() {
            let stackView: HTMLElement = document.createElement("img");
            stackView.setAttribute("src", "./images/back-stack.png");
            discard.appendChild(stackView);
            checkIfGameOver();
            playerWarZone.discardHTMLFromZone();
            oppWarZone.discardHTMLFromZone();
            if(state !== "gameOver"){
                state = "play";
            }
        }, 1000);
        
    }
   
   

    // test player card vs opponent card in round 
    function roundOfWar(myCard: Card, oppCard: Card){

            // if my card value is higher I win
            if(myCard.getCardValue() > oppCard.getCardValue()){
                // add cards to my discard pile
                winCards(playerDeck, playerDiscard, "bottom");

            }
            // opponent wins add to their discard
            else if(myCard.getCardValue() < oppCard.getCardValue()){

                winCards(opponentDeck, oppDiscard, "top");

            }
            // equal values 
            else{
                // war
                state = "war"
            }
            
            
    }
    function emptyDiscardView(){
        while(playerDiscard.firstChild){
            playerDiscard.removeChild(playerDiscard.firstChild);
        }
        while(oppDiscard.firstChild){
            oppDiscard.removeChild(oppDiscard.firstChild);
        }
    }
    function resetDeckView(){
        // fill card div
        if(deckOpponentView.style.backgroundImage === "none"){
            deckOpponentView.style.backgroundImage = "url('images/back.jpg')";
        }
        if(deckPlayerView.style.backgroundImage === "none"){
            deckPlayerView.style.backgroundImage = "url('images/back.jpg')";
        }
    }
    // reset game
    function reset(){
        // clear discards
        // show back of card for deck
        emptyDiscardView();
        resetDeckView();
        document.getElementById("display-game-over").innerHTML = "Game Over";
        gameOverView.style.visibility = "hidden";
        playerDeck.resetDeck();
    
        // shuffle deck , split deck
        playerDeck.shuffle();
        opponentDeck.resetDeck(playerDeck.split());
        state="play";
        
    }

    resetButton.onclick= (event) => {
        reset();
    }

    // gameOver screen
    function gameOver(winner: string){
        window.setTimeout( function() {
            
        
        // display div with winner name and buttons to reset
        let WinnerDisplay: HTMLElement = document.createElement('div');
        WinnerDisplay.id = "winner-string";
        WinnerDisplay.textContent = winner + " Won!";
        gameOverView.style.visibility = "visible";
        document.getElementById("display-game-over").appendChild(WinnerDisplay);
        }, 1000);
    }

    function returnDiscards(){
        playerDeck.returnDiscardToDeck();
        // empty discard div
        
        opponentDeck.returnDiscardToDeck();
        
        emptyDiscardView();
        // fill card div
        resetDeckView();
    }

    function checkIfGameOver(): boolean{
        console.log(playerDeck.isEmpty());
        console.log(playerDeck.discardEmpty());
        console.log(opponentDeck.isEmpty());
        console.log(opponentDeck.discardEmpty());
        // if discard is empty for player with no deck, then other person wins
        let returnValue:boolean = false;
        if(state !== "war"){
            if(playerDeck.isEmpty()){
                // if empty opponent wins
                if(playerDeck.discardEmpty()){
                    // input of winner string
                    state = "gameOver";
                    gameOver("Opponent");
                    return true;
                }
                else{
                    returnValue = false;
                }
            }
            if(opponentDeck.isEmpty()){
                if(opponentDeck.discardEmpty()){
                    // input of winner string
                    state = "gameOver";
                    gameOver("Player");
                    return true;
                }
                else{
                    returnValue = false;
                }
            } 
       
        }
            
        
        return returnValue;
    }
    deckPlayerView.onclick= (event) => {
        // display all states; 

        console.log("here");
        console.log("opp Deck");
        console.log(opponentDeck.getDeck());
        console.log("opp discards");
        console.log(opponentDeck.getDiscard());
        console.log("play Deck");
        console.log(playerDeck.getDeck());
        console.log("play discards");
        console.log(playerDeck.getDiscard());
        console.log("state");
        let stateTemp = state;
        console.log(stateTemp);
        // if animating game, wait
        if(state !== "animating" && state !== "gameOver"){

            // if state is war - next click adds 4 cards to warzone
            if(state === "war"){
                state = "play";
                // check how many cards left in each deck
                let playerLeftInDeck = playerDeck.checkDeckAmount();
                let oppLeftInDeck = opponentDeck.checkDeckAmount();
                // if players have enough, draw 4 cards
                if(playerLeftInDeck > 4 && oppLeftInDeck > 4){
                    playerWarZone.addWarCards(playerDeck.deal(4), "bottom");
                    oppWarZone.addWarCards(opponentDeck.deal(4), "top");
                }
                // if decks are not empty, draw remaining - 1 amount of cards
                else if (!playerDeck.isEmpty() && !opponentDeck.isEmpty()){
                    let minLeft = Math.min(playerLeftInDeck, oppLeftInDeck);
                    playerWarZone.addWarCards(playerDeck.deal(minLeft - 1), "bottom");
                    oppWarZone.addWarCards(opponentDeck.deal(minLeft - 1), "top");
                }
                // if discards are not empty, shuffle them back in
                else if(!playerDeck.discardEmpty() || !opponentDeck.discardEmpty()){
                    console.log("returning discard with war");
                    returnDiscards();
                    state = "war";
                }
                // if one deck is empty, randomly pick who wins the cards 
                // only happens if last draw from deck initiates war
                else{
                    console.log("using random number generator");
                    let randomNum = Math.random() >= .5;
                    // if true then player wins
                    if(randomNum){
                        winCards(playerDeck, playerDiscard, "bottom");
                    }
                    // else opponent wins
                    else{
                        winCards(opponentDeck, oppDiscard, "top");
                    }
                    
                }
                
                
            }// if players have cards in their deck, continue
            else if(!playerDeck.isEmpty() && !opponentDeck.isEmpty() && state ==="play"){
                state = "animating";
                // play war 
                let myCard : Card = playerDeck.deal()[0];
                let oppCard : Card = opponentDeck.deal()[0]; 
                
                // deal one card from each deck into the warzone
                oppWarZone.addToZone(oppCard,"top");
                playerWarZone.addToZone(myCard,"bottom");
                

                
                // wait a few seconds 
                // calculate who has higher value
                // put into winners discard pile 
                window.setTimeout( function() {
                    roundOfWar(myCard, oppCard);
                    
                    // checkIfGameOver();
                }, 2000);
                

                
            }
            else{
                // check if game over, if not then need to return discards 
                let gameEnd = checkIfGameOver();
                if (!gameEnd){

                        returnDiscards();
                }
            }
            
        } 
        
        if(playerDeck.isEmpty()){
            // game over
            deckPlayerView.style.backgroundImage = "none";
             
        } 
        if(opponentDeck.isEmpty()){
            deckOpponentView.style.backgroundImage = "none";
        }
        // check if game over
        
        
        
        
        
        
        
    }
