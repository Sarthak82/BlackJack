let blackjackGame={
    'you':{'scoreSpan':'#your-blackjack-result', 'div':'#your-box', 'score':0},
    'dealer':{'scoreSpan':'#dealer-blackjack-result','div':'#dealer-box', 'score':0},
    'cards':['2','3','4','5','6','7','8','9','10','A','K','Q','J'],
    'cardMap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'A':[1,11],'K':10,'Q':10,'J':10},
    'wins':0,
    'losses':0,
    'draws':0,
    'isStand':false,
    'turnsOver':false,
};


const YOU=  blackjackGame['you']
const DEALER = blackjackGame['dealer']
const hitSound= new Audio('blackjack_assets/sounds/swish.m4a');
const winSound= new Audio('blackjack_assets/sounds/cash.mp3');
const lostSound= new Audio('blackjack_assets/sounds/aww.mp3');

document.querySelector('#blackjack-hit-btn').addEventListener('click',blackjackHit);
document.querySelector('#blackjack-deal-btn').addEventListener('click',blackjackDeal)    
document.querySelector('#blackjack-stand-btn').addEventListener('click',dealerLogic)    

function blackjackHit(){
    let card= randomCard();
    showCard(card,YOU)
    updateScore(card, YOU)
    showScore(YOU)
}

function randomCard(){
    let randomIndex=Math.floor(Math.random()*13)
    return blackjackGame['cards'][randomIndex]    
}


function showCard(card,activePlayer){
    if(activePlayer['score']<=21){
        let cardImage=document.createElement('img');
        cardImage.src=`blackjack_assets/images/${card}.png`
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}


function blackjackDeal(){
    let yourImages= document.querySelector('#your-box').querySelectorAll('img')
    let dealerImages= document.querySelector('#dealer-box').querySelectorAll('img')

    for(let i=0; i<yourImages.length; i++){
        yourImages[i].remove()
    }

    for(let i=0; i<dealerImages.length; i++){
        dealerImages[i].remove()
    }

    YOU['score']=0
    DEALER['score']=0

    document.querySelector('#your-blackjack-result').textContent=0
    document.querySelector('#dealer-blackjack-result').textContent=0

    document.querySelector('#your-blackjack-result').style='white' 
    document.querySelector('#dealer-blackjack-result').style='white'

    document.querySelector('#black-jack-result').textContent="Let's play"
    document.querySelector('#black-jack-result').style.color='black'
}


function updateScore(card,activePlayer){
    if(card==='A'){
        if((activePlayer['score']+blackjackGame['cardMap'][card][1])<=21){
            activePlayer['score']+=blackjackGame['cardMap'][card][1]

        }else{
            activePlayer['score']+=blackjackGame['cardMap'][card][0]
        }
    }else{
    activePlayer['score']+=blackjackGame['cardMap'][card]
    }
}


function showScore(activePlayer){

    if (activePlayer['score']>21){
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    }else{
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function dealerLogic(){
    let card=randomCard();
    showCard(card, DEALER);
    updateScore(card, DEALER);
    showScore(DEALER);

    if(DEALER['score']>15){
        let winner=computeWinner();
        showResult(winner);
    }
}


function computeWinner(){
    let winner;

    if(YOU['score']<=21){
        if(YOU['score']>DEALER['score'] || DEALER['score']>21){
            blackjackGame['wins']++
            winner=YOU
        }else if(YOU['score']<DEALER['score']){
            winner=DEALER
            blackjackGame['losses']++
        }else if(YOU['score']===DEALER['score']){
            winner='draw'
            blackjackGame['draws']++
        }
    }else if(YOU['score']>21 && DEALER['score']<=21){
        winner=DEALER
        blackjackGame['losses']++
    }else if(YOU['score']>21 && DEALER['score']>21){
        winner='draw'
        blackjackGame['draw']++
    }

    return(winner)
}


function showResult(winner){
    let message, messageColor

    if(winner===YOU){
        document.querySelector('#wins').textContent=blackjackGame['wins']
        message='You won!'
        messageColor='green'
        winSound.play()
    }else if(winner===DEALER){
        document.querySelector('#losses').textContent=blackjackGame['losses']
        message='You lost!'
        messageColor='red'
        lostSound.play()
    }else{
        document.querySelector('#draws').textContent=blackjackGame['draws']
        message='You drew!'
        messageColor='black'
    }

    document.querySelector('#black-jack-result').textContent=message
    document.querySelector('#black-jack-result').style.color=messageColor
}
