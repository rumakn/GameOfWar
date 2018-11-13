import Deck from './Deck.js'
import Hand from './Hand.js'


    
    Deck.shuffle();
    
    // View of Deck, view of Card
    
    let deckView :HTMLElement = document.getElementById('deck');
    let handView : HTMLElement = document.getElementById('hand');
    // init myHand
    let myHand = new Hand(handView);

    deckView.style.width = "300px";
    deckView.style.height = "200px";
    
    
    deckView.onclick= (event) => {
        if(!Deck.isEmpty()){
            myHand.addToHand(Deck.deal());
            if(Deck.isEmpty()){
                deckView.textContent = "No more cards";
                deckView.style.backgroundImage = "none";
            }

            
        }
        
    }
