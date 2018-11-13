import Card from './Card.js'

interface Hands {
    handArray: Array <Card>;
    div: HTMLElement;
}
class Hand implements Hands{
    handArray : Array <Card>
    div: HTMLElement;
    constructor(div: HTMLElement){
        this.handArray = [];
        this.div = div;
    }
    addToHand(card: Card) {
        this.handArray.push(card);
        let cardView : HTMLElement = document.createElement('div');
        
        let cardType = card.getCardType();
        cardView.id = cardType;
        cardView.innerHTML = "<img src='./images/" + cardType + ".png' width='150px'>";
        this.div.appendChild(cardView);
    }
}

export default Hand