import Card from './Card.js'

let ranks = ["Two" , "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King", "Ace"];
let suits = ["Clubs", "Diamonds", "Hearts","Spades"];

interface Deck {
    deckArray: Array <Card>;
}
class DeckOfCards implements Deck{
    deckArray: Array <Card>;
    constructor(initArray : Array <Card> = []){
        this.deckArray = initArray;
        if(this.deckArray.length === 0){
            for(let iSuit = 0 ; iSuit < suits.length; iSuit++){
                for(let iRank = 0 ; iRank < ranks.length; iRank++){
    
                    this.deckArray.push(new Card(suits[iSuit], ranks[iRank]));
    
                }
            }
    
        }
        
    }
    shuffle(){
        // randomly shuffle the deck
        for(let i = 0 ; i < 52; i++){
            let j = Math.floor(Math.random() * 52);
            if(i !== j){
                let swap: Card = this.deckArray[i];
                this.deckArray[i] = this.deckArray[j];
                this.deckArray[j] = swap;
            }
        }
    }
    isEmpty():boolean {
        console.log("here");
        if(this.deckArray.length>0){
            return false;
        }
        else{
            return true;
        }
    }
    deal(): Card {
        // remove the top card from the deck
        return this.deckArray.shift();
       
    }
}

export default new DeckOfCards;