const variables = {
    turnState: 'player',
    currentOpponent: 'slave',
    cards: document.querySelectorAll('.card'),
    moved: undefined,
    opponentMoved: undefined,
    turnBtn: document.querySelector('.turn-button'),
    activeCards: 5,
    playerPoints: 0,
    enemyPoints: 0,
    scoreBoard: document.querySelector('.points'),
    alert: document.querySelector('.alert'),
    cardDeck: document.querySelector('.card-deck'),
    allOpponentCards: Array.from(document.querySelectorAll('.card-opponent-container')),
    roundsPlayed: 0,
    playAgainButton: document.querySelector('.play-again'),
}

const loadEventListeners = () => {

    Array.from(variables.cards).forEach(card => {
        card.addEventListener('click', UI.move)
    });

    variables.turnBtn.addEventListener('click', nextTurn);


}

function randomNumber(){
    while(true){
        number = Math.floor((Math.random() * variables.activeCards) + 1);

        // Check if the card is no longer in play, if it isn't look for another one
        if(variables.allOpponentCards[number - 1] === null){
            continue;
        } else{
            return number;
        }
    }
}

function rotateAfterCheck(name) {
    variables.allOpponentCards;
    variables.opponentMoved.children[1].innerHTML = 
    `<img data-name="${name}" class='card citizen' src="imgs/cards/${name}.jpg" alt="">`;

    variables.opponentMoved.children[0].style.transform = 'rotateY(-180deg)';
    variables.opponentMoved.children[1].style.transform = 'rotateY(0)';

    variables.moved.children[0].style.transform = 'rotateY(0)';
    variables.moved.children[1].style.transform = 'rotateY(180deg)';
}

function checkWinsAsEmperor(){
     // DRAW
     if(variables.opponentMoved.id === 'not-important' && variables.moved.id === 'citizen'){
        variables.alert.innerHTML = "IT'S A DRAW!"
        variables.turnBtn.textContent = 'Next turn';
    }

    // PLAYER WINS
    if(variables.opponentMoved.id === 'important' && variables.moved.id === 'citizen' || 
        variables.opponentMoved.id === 'not-important' && variables.moved.id === 'emperor'){
        variables.alert.innerHTML = 'YOU WIN'
        variables.playerPoints += 1;
        variables.scoreBoard.children[0].innerHTML = `YOU: ${variables.playerPoints}`
        variables.turnBtn.textContent = 'Next round'
        variables.roundsPlayed += 1;
    }

    // OPPONENT WINS
    if(variables.opponentMoved.id === 'important' && variables.moved.id === 'emperor'){
        variables.alert.innerHTML = 'YOU LOSE'
        variables.enemyPoints += 3;
        variables.scoreBoard.children[2].innerHTML = `OPPONENT: ${variables.enemyPoints}`
        variables.turnBtn.textContent = 'Next round'
        variables.roundsPlayed += 1;
    }
}

// Now player plays as a slave, so moved.id = emperor refers to the slave card
function checkWinsAsSlave(){

         // DRAW
         if(variables.opponentMoved.id === 'not-important' && variables.moved.id === 'citizen'){
            variables.alert.innerHTML = "IT'S A DRAW!"
            variables.turnBtn.textContent = 'Next turn';
        }
    
        // PLAYER WINS
        if(variables.opponentMoved.id === 'important' && variables.moved.id === 'emperor'){
            variables.alert.innerHTML = 'YOU WIN'
            variables.playerPoints += 3;
            variables.scoreBoard.children[0].innerHTML = `YOU: ${variables.playerPoints}`
            variables.turnBtn.textContent = 'Next round'
            variables.roundsPlayed += 1;
        }
    
        // OPPONENT WINS
        if(variables.opponentMoved.id === 'important' && variables.moved.id === 'citizen' ||
            variables.opponentMoved.id === 'not-important' && variables.moved.id === 'emperor'){
            variables.alert.innerHTML = 'YOU LOSE'
            variables.enemyPoints += 1;
            variables.scoreBoard.children[2].innerHTML = `OPPONENT: ${variables.enemyPoints}`
            variables.turnBtn.textContent = 'Next round'
            variables.roundsPlayed += 1;
        }
}

function nextTurn() {
    if(variables.turnBtn.textContent === 'CHECK'){
        let audio = new Audio('sounds/zawa.wav');
        audio.play();
        if(variables.opponentMoved.id === 'important'){
            rotateAfterCheck(variables.currentOpponent);
        } else if(variables.opponentMoved.id === 'not-important'){
            rotateAfterCheck("citizen");
        }

        if(variables.roundsPlayed < 3){
            checkWinsAsEmperor();
        } else{
            checkWinsAsSlave();
        }

        // Game end after 6 rounds, show a box with the summary of the game and ask user what to do next
        if(variables.roundsPlayed === 6){
            variables.turnBtn.textContent = 'GAME ENDED';
            setTimeout(() => {
                document.querySelector('.summary-container').style.display = 'block';

                // Player wins
                if(variables.playerPoints > variables.enemyPoints){
                    document.querySelector('.summary-container').innerHTML = 
                    `<div class='summary-box'>
                        <h2 class="summary-title">YOU WIN!</h2>
                        <p class="summary-score">${variables.playerPoints} - ${variables.enemyPoints}</p>
                        <div class="summary-buttons">
                            <div class='button play-again'>Play Again</div>
                            <div class='button main-menu'>Main Menu</div>
                    </div>`

                // Opponent wins
                } else if(variables.playerPoints < variables.enemyPoints){
                    document.querySelector('.summary-container').innerHTML = 
                    `<div class='summary-box'>
                        <h2 class="summary-title">YOU LOSE</h2>
                        <p class="summary-score">${variables.playerPoints} - ${variables.enemyPoints}</p>
                        <div class="summary-buttons">
                            <div class='button play-again'>Play Again</div>
                            <div class='button main-menu'>Main Menu</div>
                    </div>`
                
                // Draw
                } else{
                    document.querySelector('.summary-container').innerHTML = 
                    `<div class='summary-box'>
                        <h2 class="summary-title">DRAW!</h2>
                        <p class="summary-score">${variables.playerPoints} - ${variables.enemyPoints}</p>
                        <div class="summary-buttons">
                            <div class='button play-again'>Play Again</div>
                            <div class='button main-menu'>Main Menu</div>
                    </div>`
                }
                document.querySelector('.main-menu').addEventListener('click', () => {
                    location.reload();
                })
    
                // Reset game
                document.querySelector('.play-again').addEventListener('click', () => {
                    variables.currentOpponent = 'slave';
                    variables.playerPoints = 0;
                    variables.enemyPoints = 0;
                    variables.roundsPlayed = 0;
                    nextRound();
                    document.querySelector('.summary-container').style.display = 'none';
                    document.querySelector('.points').innerHTML = 
                    `
                    <p id='your-score'>YOU: 0</p>
                    <p id='separation-score'>||</p>
                    <p id='opponent-score'>OPPONENT: 0</p>
                    `
                })
                variables.alert.innerHTML = '';
            }, 2000)
            
        }



    // Setting up next turn after a draw
    } else if(variables.turnBtn.textContent === 'Next turn'){
        variables.alert.innerHTML = '';

        // Removing the IMGs of used cards
        variables.moved.children[0].children[0].remove();
        variables.opponentMoved.children[1].remove();

        // This way the previous card will never be played again thanks to the random function
        variables.allOpponentCards[variables.allOpponentCards.indexOf(variables.opponentMoved)] = null;

        variables.turnState = 'player';
        variables.turnBtn.textContent = 'END TURN';
        variables.moved = undefined;

    // Setting up next round after one of the players won
    } else if(variables.turnBtn.textContent === 'Next round'){
        nextRound();

        // Change sides
        if(variables.roundsPlayed >= 3){
            variables.currentOpponent = 'emperor';
            document.querySelector('.emperor').setAttribute('src','imgs/cards/slave.jpg');
        }

        variables.alert.innerHTML = '';


    // Let player play the card
    } else{
        if(variables.turnState === 'player') {
            if(variables.moved !== undefined){
                variables.turnState = 'enemy';
                variables.turnBtn.textContent = "OPPONENT'S TURN";
                variables.turnBtn.style.backgroundColor = 'gray';
                window.setTimeout(() => {
                    variables.turnBtn.style.backgroundColor = 'rgb(255, 255, 5)';
                    variables.turnBtn.textContent = 'CHECK';
                    UI.opponentMove();
                }, 2500)
                
            }
        }
    }
}


const UI = {
    // Add animation when card is chosen
    move: (e) => {
        if(variables.turnState === 'player'){

            // Make the card come back if player decided to pick other one
            if(variables.moved){
                variables.moved.style.transform = "translateY(0) translateX(0)";
                variables.moved.children[0].style.transform = 'rotateY(0)';
                variables.moved.children[1].style.transform = 'rotateY(-180deg)';
            }
 
            switch(e.target.dataset.num){
                case '1':{
                    UI.moveIn(-185, 270, e.target.parentNode.parentNode);
                    break;
                }
 
                case '2':{
                    UI.moveIn(-185, 140, e.target.parentNode.parentNode);
                    break;
                }
 
                case '3':{
                    UI.moveIn(-185, 10, e.target.parentNode.parentNode);
                    break;
                }
 
                case '4':{
                    UI.moveIn(-185, -120, e.target.parentNode.parentNode);
                    break;
                }
 
                case '5':{
                    UI.moveIn(-185, -250, e.target.parentNode.parentNode);
                    break;
                }
            }
        }
               
    },

    // Make the opponent play random card
    opponentMove: () => {

        // Determining which card will be thrown from the opponent
        const randomCard = randomNumber();

        // Determining which card will be the king/slave
        const randomImportantCard = randomNumber();


        // Check if the thrown card is a king/slave and assign proper id
        function checkCardImportance(){
            if(randomCard === randomImportantCard){
                variables.opponentMoved.id = 'important'
            } else{
                variables.opponentMoved.id = 'not-important'
            }
        }


        switch(randomCard){
            case 1:{
                UI.moveIn(215, 275, variables.allOpponentCards[0], true);
                variables.opponentMoved = variables.allOpponentCards[0];
                checkCardImportance()
                break;
            }
            case 2:{
                UI.moveIn(215, 140, variables.allOpponentCards[1], true);
                variables.opponentMoved = variables.allOpponentCards[1];
                checkCardImportance()
                break;
            }
            case 3:{
                UI.moveIn(215, 10, variables.allOpponentCards[2], true);
                variables.opponentMoved = variables.allOpponentCards[2];
                checkCardImportance()
                break;
            }
            case 4:{
                UI.moveIn(215, -120, variables.allOpponentCards[3], true);
                variables.opponentMoved = variables.allOpponentCards[3];
                checkCardImportance()
                break;
            }
            case 5:{
                UI.moveIn(215, -260, variables.allOpponentCards[4], true);
                variables.opponentMoved = variables.allOpponentCards[4];
                checkCardImportance()
                break;
            }

        }
    },

    moveIn: (Y, X, card, opponentOrNot) => {
        card.style.transform = `translateY(${Y}px) translateX(${X}px) rotate(180deg)`;

        // Only proceed if moveIn was called from the player, not the opponent
        if(!opponentOrNot){
            card.children[0].style.transform = 'rotateY(-180deg)';
            card.children[1].style.transform = 'rotateY(0)';
            variables.moved = card;
        }
    },

}

// Reset the whole board. Cancer, dont change anything unless you have to
function nextRound() {

    // Opponent's deck
    document.querySelector('.opponent-card-deck').innerHTML = 
        `
        <div class="card-container card-opponent-container" id='first-opponent-card'>
        <div class="card-front">
            <img class='opponent-card' src="imgs/cards/back.jpg" alt="">                        
        </div>

        <div class="card-back">
            
        </div>

    </div>

    <div class="card-container card-opponent-container" id='second-opponent-card'>
        <div class="card-front">
            <img class='opponent-card' src="imgs/cards/back.jpg" alt="">                        
        </div>

        <div class="card-back">
            
        </div>

    </div>

    <div class="card-container card-opponent-container" id='third-opponent-card'>
        <div class="card-front">
            <img class='opponent-card' src="imgs/cards/back.jpg" alt="">                        
        </div>

        <div class="card-back">
            
        </div>

    </div>

    <div class="card-container card-opponent-container" id='fourth-opponent-card'>
        <div class="card-front">
            <img class='opponent-card' src="imgs/cards/back.jpg" alt="">                        
        </div>

        <div class="card-back">
            
        </div>

    </div>

    <div class="card-container card-opponent-container" id='fifth-opponent-card'>
        <div class="card-front">
            <img class='opponent-card' src="imgs/cards/back.jpg" alt="">                        
        </div>

        <div class="card-back">
            
        </div>

    </div>
    `

    // Player's deck
    document.querySelector('.card-deck').innerHTML = 
    `
        <div class="card-container" id='citizen'>
        <div class="card-front">
            <img data-num="1" data-name="citizen" class='card citizen' src="imgs/cards/citizen.jpg" alt="">
        </div>

        <div class="card-back">
            <img data-num="1" class='card back' src="imgs/cards/back.jpg" alt="">
        </div>

    </div>

    <div class="card-container" id='citizen'>
        <div class="card-front">
            <img data-num="2" data-name="citizen" class='card citizen' src="imgs/cards/citizen.jpg" alt="">                
        </div>

        <div class="card-back">
            <img data-num="2" class='card back' src="imgs/cards/back.jpg" alt="">
        </div>

    </div>

    <div class="card-container" id='citizen'>
        <div class="card-front">
            <img data-num="3" data-name="citizen" class='card citizen' src="imgs/cards/citizen.jpg" alt="">
        </div>

        <div class="card-back" id='citizen'>
            <img data-num="3" class='card back' src="imgs/cards/back.jpg" alt="">
        </div>

    </div>

    <div class="card-container" id='citizen'>
        <div class="card-front">
            <img data-num="4" data-name="citizen" class='card citizen' src="imgs/cards/citizen.jpg" alt="">
        </div>

        <div class="card-back">
            <img data-num="4" class='card back' src="imgs/cards/back.jpg" alt="">
        </div>

    </div>

    <div class="card-container" id='emperor'>
        <div class="card-front">
            <img data-num="5" data-name="emperor" class='card emperor' src="imgs/cards/emperor.jpg" alt="">
        </div>

        <div class="card-back">
            <img data-num="5" class='card back' src="imgs/cards/back.jpg" alt="">
        </div>

    </div>
    `

    variables.turnState = 'player';
    variables.turnBtn.textContent = 'END TURN';
    variables.cards = document.querySelectorAll('.card');
    variables.allOpponentCards = Array.from(document.querySelectorAll('.card-opponent-container'));
    Array.from(variables.cards).forEach(card => {
        card.addEventListener('click', UI.move)
    });
    variables.moved = undefined;
    variables.opponentMoved = undefined;

}


loadEventListeners();
