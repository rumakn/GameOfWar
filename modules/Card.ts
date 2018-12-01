// values for different ranks
enum RankValues {Two, Three, Four, Five, Six, Seven, Eight, Nine, Ten, Jack, Queen, King, Ace}

interface Cards {
    suit: string;
    rank: string;
}

class Card implements Cards{
    suit: string;
    rank: string;
    // init with suit and rank of card
    constructor(suit: string, rank: string){
        this.suit = suit;
        this.rank = rank;
    }
    // return string Rank of Suit
    getCardType () : string {
        return this.rank + "of" + this.suit;
    }
    // return numerical value of card
    getCardValue () : number {
        return RankValues[this.rank];
    }
}

export default Card;