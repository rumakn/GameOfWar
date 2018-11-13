enum RankValues {Two, Three, Four, Five, Six, Seven, Eight, Nine, Ten, Jack, Queen, King, Ace}

interface Cards {
    suit: string;
    rank: string;
}

class Card implements Cards{
    suit: string;
    rank: string;
    constructor(suit: string, rank: string){
        this.suit = suit;
        this.rank = rank;
    }
    getCardType () : string {
        return this.rank + "of" + this.suit;
    }
    getCardValue () : number {
        return RankValues[this.rank];
    }
}

export default Card;