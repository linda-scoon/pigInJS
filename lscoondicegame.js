let player1;
let player2;
const DICE_FACES = 6;

class Player {
    constructor(name) {
        this.id = Math.random() * Math.random();
        this.name = name;
        this.overallScore = 0;
        this.currScore = 0;
    }
}

function displayRules() {
    const rules = document.getElementById('rules');
    if (rules.style.display === 'none') {
        rules.style.display = 'block';
    } else {
        rules.style.display = 'none';
    }
}

function saveSettings() {
    localStorage.player1 = document.querySelector('#player1').value;
    localStorage.player2 = document.querySelector('#player2').value;
    localStorage.dblSixes = document.querySelector('#dblSixes').checked;
    window.open("lscoondicegame1.html", "_self");
}

function startGame() {
    player1 = new Player(localStorage.player1);
    player2 = new Player(localStorage.player2);
    setPlayer(player1);

    document.querySelector('#end_turn').onclick = () => switchPlayer(player1);
}

function setPlayer(player) {
    let diceBtn = document.querySelector('#dice_btn');
    diceBtn.onclick = () => rollDice(player);
    document.getElementById('player_name').innerHTML = player.name;
    document.getElementById('score').innerHTML = player.overallScore;
}

function rollDice(player) {
    clearDice();

    let dice1 = 1 + Math.round(Math.random() * (DICE_FACES - 1));
    let dice2 = 1 + Math.round(Math.random() * (DICE_FACES - 1));
    let total = dice1 + dice2;

    displayDice(dice1, dice2);

    if (dice1 === DICE_FACES && dice2 === DICE_FACES) {
        if (localStorage.dblSixes === 'checked') {
            player.overallScore = 0; 
            player.currScore = 0;
        } else {
            player.overallScore -= player.currScore; 
        }
        setTimeout(() => switchPlayer(player), 500);
    } else if (dice1 === DICE_FACES || dice2 === DICE_FACES) {
        player.overallScore -= player.currScore; 
        setTimeout(() => switchPlayer(player), 500);
    } else {
        player.overallScore += total; player.currScore += total;
        setPlayer(player);
        checkGameOver(player.currScore);
    }
}

function checkGameOver() {
    if (player1.overallScore >= 30 || player2.overallScore >= 30) {
        document.querySelector('#score_tracker').style.display = 'none';
        document.querySelector('#play_again').style.display = 'block';
        let aScore = document.createElement('p');
        let bScore = document.createElement('p');
        aScore.innerHTML = player1.name + ' scored ' + player1.overallScore;
        bScore.innerHTML = player2.name + ' scored ' + player2.overallScore;
        let playAgain = document.getElementById('play_again');
        playAgain.prepend(bScore);
        playAgain.prepend(aScore);
        setTimeout(clearDice, 1000);
    }
}

function playAgain() {
    // clear player scores
    player1.overallScore = 0;
    player2.overallScore = 0;
    setPlayer(player1);

    // hide play_again btn show score_tracker
    document.querySelector('#score_tracker').style.display = 'block';
    document.querySelector('#play_again').style.display = 'none';
    clearDice();
}

function switchPlayer(player) {
    if (player.id === player1.id) {
        setPlayer(player2);
        document.querySelector('#end_turn').onclick = () => switchPlayer(player2);
    } else {
        setPlayer(player1);
        document.querySelector('#end_turn').onclick = () => switchPlayer(player1);
    } 
    player.currScore = 0;
    clearDice();
}

function displayDice(d1, d2) {
    // retrieve the corresponding dice of the generated numbers and display them
    let dice = document.getElementsByClassName('dice');
    let dice1 = dice[d1 - 1];
    let dice2 = dice[d2 - 1];

    dice1.style.display = "block";
    dice2.style.display = "block";

    // if it is the same dice then duplicate it to be displayed twice
    if (d1 === d2) {
        let die = document.getElementById('die');
        clone = dice1.cloneNode(true);
        die.appendChild(clone);
    }
}

function clearDice() {
    let die = document.querySelector('#die');
    let dice = document.querySelectorAll('.dice');

    // remove duplicate element from end of list
    if (dice.length > DICE_FACES) {
        die.removeChild(dice[DICE_FACES]);
    }

    // hide dice that are currently being displayed
    dice.forEach(dice => {
        dice.style.display = "none";
    });
}