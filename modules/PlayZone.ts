import Card from './Card.js'

interface PlayZones {
    zoneArray: Array <Card>;
    div: HTMLElement;
}
class PlayZone implements PlayZones{
    zoneArray : Array <Card>
    div: HTMLElement;
    // init with an array for played cards and div to hold them
    constructor(div: HTMLElement){
        this.zoneArray = [];
        this.div = div;
    }
    // add card to zone, direction it was played from and side of card to show
    addToZone(card: Card, direction: string, face: string = "front") {
        this.zoneArray.push(card);
        // set div values for card
            let cardView : HTMLElement = document.createElement('div');
            cardView.classList.add('card'); 
            let cardType :string = card.getCardType();
            cardView.id = cardType;
            cardView.style.width = "25px";
        // if the front face should show, get image with card type
        if(face === "front"){
            cardView.innerHTML = "<img src='./images/" + cardType + ".png' width='150px'>";
        }
        // else show back of card
        else{
            
            cardView.innerHTML = "<img src='./images/back-vert.jpg' width='150px'>";
        }
        this.div.appendChild(cardView);

        // check direction it should come from 
        if(direction == "top"){
            // make card go down 
            
                cardView.classList.add('card-top');
        
        }
        else{
            // fade from bottom
            cardView.classList.add('card-bottom');
        }
        // animate from deck direction and blend
        window.setTimeout( function() {
            cardView.classList.remove('card-top');
            cardView.classList.remove('card-bottom');
        }, 50);
    }

    addWarCards(cards : Array<Card>, direction: string){
        cards.forEach((elem) =>{
            this.addToZone(elem, direction, "back");

        })
    }

    discardFromZone(direction: string): Array<Card>{
        console.log('gothere');
        let warCards = this.div.getElementsByClassName('card');
        if(direction == "top"){
            for(let i = 0; i < warCards.length; i++){
                warCards[i].classList.add('card-top');
            }
            
        }
        else{
            for(let i = 0; i < warCards.length; i++){
                warCards[i].classList.add('card-bottom');
            }
        }
        let returnZone :Array<Card>= this.zoneArray;
        
            this.zoneArray = [];
            
        
        
        return returnZone;
    }
    discardHTMLFromZone(){
        let warCards = document.getElementsByClassName('card');
        let parentOfCards = warCards[0].parentElement;
                while(parentOfCards.firstChild){
                    parentOfCards.removeChild(parentOfCards.firstChild);
                }
    }
}



export default PlayZone