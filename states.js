const mq = window.matchMedia( "(max-width: 1200px)" );

const possibleStates = {
    about: document.querySelector('#about'),
    rules: document.querySelector('#rules'),
    startingPage: document.querySelector('#starting-page'),
    game: document.querySelector('.game-container'),
    homePage: document.querySelector('.homepage-container'),
    nonCompatible: document.querySelector('.non-compatible'),
}

const buttons = {
    backArrow: document.querySelector('.back-arrow'),
    backFromGameArrow: document.querySelector('.back-from-game'),
    rulesButton: document.querySelector('#rules-button'),
    aboutButton: document.querySelector('#about-us'),
    playButton: document.querySelector('#play-button'),
    playAgainButton: document.querySelector('.play-again'),
    mainMenuButton: document.querySelector('.main-menu'),
}


const changeStates = {
    startingPageState: () => {
        buttons.backArrow.style.display = 'none';
        possibleStates.about.style.display = 'none';
        possibleStates.rules.style.display = 'none';
        document.querySelector('.summary-container').style.display = 'none';
        possibleStates.game.style.display = 'none';
        possibleStates.startingPage.style.display = 'block';
        possibleStates.nonCompatible.style.display = 'none';

    },

    rulesState: () => {
        buttons.backArrow.style.display = 'inline-block';
        possibleStates.startingPage.style.display = 'none';
        possibleStates.rules.style.display = 'flex';
        possibleStates.nonCompatible.style.display = 'none';

    },

    aboutState: () => {
        buttons.backArrow.style.display = 'inline-block';
        possibleStates.startingPage.style.display = 'none';
        possibleStates.about.style.display = 'flex';
        possibleStates.nonCompatible.style.display = 'none';

    },

    gameState: () => {
        if(mq.matches){
            possibleStates.startingPage.style.display = 'none';
            buttons.backArrow.style.display = 'inline-block';
            possibleStates.nonCompatible.style.display = 'block';

        } else{
            possibleStates.homePage.style.display = 'none';
            possibleStates.game.style.display = 'block';
            buttons.backArrow.style.display = 'inline-block';
            buttons.backFromGameArrow.style.display = 'block';

        }

    },

    goBackFromGame: () => {
        location.reload();    
    }
}

loadClickStates = () => {
    buttons.backArrow.addEventListener('click', changeStates.startingPageState)
    buttons.rulesButton.addEventListener('click', changeStates.rulesState)
    buttons.aboutButton.addEventListener('click', changeStates.aboutState)
    buttons.playButton.addEventListener('click', changeStates.gameState)

    buttons.backFromGameArrow.addEventListener('click', () => {
        if(confirm('Are you sure you want to leave the game?')){
            changeStates.goBackFromGame()
        }
    })
}

loadClickStates();

