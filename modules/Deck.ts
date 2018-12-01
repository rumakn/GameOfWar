import Card from './Card.js'
// all ranks and suits
// let ranks = ["Two" , "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King", "Ace"];
// let suits = ["Clubs", "Diamonds", "Hearts","Spades"];

let ranks = ["Two" , "Three", "Four"];
let suits = ["Clubs", "Diamonds"];

interface Deck {
    deckArray: Array <Card>;
    discardArray : Array <Card>;
}
class DeckOfCards implements Deck{
    deckArray: Array <Card>
    discardArray : Array <Card>
    // init with array of cards or empty array
    constructor(initArray : Array <Card> = []){
        this.deckArray = initArray;
        this.discardArray = [];
        // if empty array then create new deck with all possible cards
        if(this.deckArray.length === 0){
            for(let iSuit = 0 ; iSuit < suits.length; iSuit++){
                for(let iRank = 0 ; iRank < ranks.length; iRank++){
    
                    this.deckArray.push(new Card(suits[iSuit], ranks[iRank]));
    
                }
            }
    
        }
        
    }
    // shuffle the cards
    shuffle(){
        // randomly shuffle the deck using Fisher-Yates shuffle
        for(let i = 0 ; i < this.deckArray.length; i++){
            let j = Math.floor(Math.random() * this.deckArray.length);
            if(i !== j){
                let swap: Card = this.deckArray[i];
                this.deckArray[i] = this.deckArray[j];
                this.deckArray[j] = swap;
            }
        }
    }
    // split the deck in half return other half
    split(): Array<Card>{
        let half = this.deckArray.length / 2;
        return this.deckArray.splice(0,half);
    }
    // check if deck is empty
    isEmpty():boolean {
        
        return (this.deckArray.length>0)? false : true;

    }
    // deal one card
    deal(amount: number = 1): Card[] {
        // remove the top card from the deck
        
        return this.deckArray.splice(0,amount);
       
    }
    // add array of cards to discard pile
    addToDiscard(cards: Array<Card>) {
        for(let i = 0; i < cards.length; i++){
            this.discardArray.push(cards[i]);
        }
        

    }
    // return discard pile to deck and shuffle
    returnDiscardToDeck() {
        this.deckArray = [...this.deckArray, ...this.discardArray];
        this.shuffle();
        this.discardArray = [];
        console.log(this.deckArray);
    }

    discardEmpty():boolean{
        return (this.discardArray.length>0) ? false : true;
    }

    checkDeckAmount():number{
        return this.deckArray.length;
    }
    getDeck(): Array<Card>{
        return this.deckArray;
    }
    getDiscard(): Array<Card>{
        return this.discardArray;
    }
}

export default DeckOfCards;