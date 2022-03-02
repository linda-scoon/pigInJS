window.onload = () => startGame();
const DICE_FACES = 6;
const MAX_SCORE = 30;

class Player {
    constructor(name) {
        this.id = Math.random() * Math.random();
        this.name = name;
        this.overallScore = 0;
        this.currScore = 0;
    }
}
const player1 = new Player(localStorage.player1);
const player2 = new Player(localStorage.player2);

function startGame() {
    document.querySelector("#replay_btn").addEventListener("click", playAgain);
    document.querySelector("#player1").innerHTML = player1.name;
    document.querySelector("#player2").innerHTML = player2.name;
    setCurrentPlayer(player1);
    displayScores(player1);
}

function setCurrentPlayer(currentPlayer) {
    document.querySelector('#dice_btn').onclick = () => rollDice(currentPlayer);
    document.querySelector('#end_turn').onclick = () => switchPlayer(currentPlayer);
    document.querySelector('#current_player').innerHTML = currentPlayer.name;
    displayScores(currentPlayer);
}

function displayScores(currentPlayer) {
    document.querySelector('#score').innerHTML = currentPlayer.currScore;
    document.querySelector("#player1_score").innerHTML = player1.overallScore;
    document.querySelector("#player2_score").innerHTML = player2.overallScore;
}

function rollDice(player) {
    clearDice();

    let dice1 = 1 + Math.round(Math.random() * (DICE_FACES - 1));
    let dice2 = 1 + Math.round(Math.random() * (DICE_FACES - 1));
    let total = dice1 + dice2;

    displayDice(dice1, dice2);

    if (dice1 === DICE_FACES && dice2 === DICE_FACES) {
        if (localStorage.dblSixes === 'false') {
            player.overallScore = 0;
            player.currScore = 0;
        } else {
            player.overallScore = (player.overallScore == 0) ? 0 : (player.overallScore - player.currScore);
        }
        setTimeout(() => switchPlayer(player), 2000);

    } else if (dice1 === DICE_FACES || dice2 === DICE_FACES) {
        player.overallScore = (player.overallScore == 0) ? 0 : (player.overallScore - player.currScore);
        setTimeout(() => switchPlayer(player), 2000);

    } else {
        player.overallScore += total;
        player.currScore += total;

        if (player.overallScore >= MAX_SCORE) {
            document.querySelector('.msg').innerHTML = "Game Over " + player.name + " wins."
            document.querySelector('#dice_btn').disabled = true;
            document.querySelector('#end_turn').disabled = true;
            document.querySelector('#replay').style.display = 'block';

            setTimeout(() => {
                document.querySelector('.score_tracker').style.display = 'none';

                clearDice();
            }, 5000);
        }
    }
    displayScores(player);
}

function playAgain() {
    // clear player scores
    player1.overallScore = 0;
    player2.overallScore = 0;
    player1.currScore = 0;
    player2.currScore = 0;
    setCurrentPlayer(player1);

    // hide replay btn show score_tracker
    document.querySelector('.score_tracker').style.display = 'block';
    document.querySelector('#replay').style.display = 'none';
    document.querySelector('#dice_btn').disabled = false;
    document.querySelector('#end_turn').disabled = false;
}

function switchPlayer(player) {
    if (player.id === player1.id) {
        setCurrentPlayer(player2);
    } else {
        setCurrentPlayer(player1);
    }
    player.currScore = 0;
    clearDice();
}

function displayDice(d1, d2) {
    // retrieve the corresponding dice of the generated numbers and display them
    let dice = document.querySelectorAll('.dice');
    let dice1 = dice[d1 - 1];
    let dice2 = dice[d2 - 1];

    dice1.style.display = "block";
    dice2.style.display = "block";

    // if it is the same dice then duplicate it to be displayed twice
    if (d1 === d2) {
        clone = dice1.cloneNode(true);
        document.querySelector('#die').appendChild(clone);
    }
}

function clearDice() {
    let dice = document.querySelectorAll('.dice');

    // remove duplicate element from end of list
    if (dice.length > DICE_FACES) {
        document.querySelector('#die').removeChild(dice[DICE_FACES]);
    }

    // hide dice that are currently being displayed
    dice.forEach(dice => {
        dice.style.display = "none";
    });
}