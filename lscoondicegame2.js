/**
 * Description: Dice Game Javascript for page 2
 *  Author: Linda Scoon
 *  Date: 22/03/2022
 */

/**
 * This method loads the javascript when the browser has loaded the page
 * @returns void
 */
window.onload = () => startGame();

/**
 * Initialising constant variables and creating 2 player classes to hold the scores and names of each player.
 */
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

/**
 * This method starts the game by displaying scores of the two players and prompting the first player to start their turn.
 */
function startGame() {
  document.querySelector("#replay").addEventListener("click", playAgain);
  document.querySelector("#player1").innerHTML = player1.name;
  document.querySelector("#player2").innerHTML = player2.name;
  setCurrentPlayer(player1);
  displayScores(player1);
}

/**
 * This method sets the current player
 * @param {Player} currentPlayer
 */
function setCurrentPlayer(currentPlayer) {
  document.querySelector("#dice_btn").onclick = () => rollDice(currentPlayer);
  document.querySelector("#end_turn").onclick = () =>
    switchPlayer(currentPlayer);
  document.querySelector("#current_player").innerHTML = currentPlayer.name;
  document.querySelector(".msg").innerHTML =
    currentPlayer.name + "'s turn to roll the dice.";
  displayScores(currentPlayer);
}

/**
 * This method displays the current players current score and updates the overall scores as well
 * @param {Player} currentPlayer
 */
function displayScores(currentPlayer) {
  document.querySelector("#score").innerHTML = currentPlayer.currScore;

  //if the overall score has changed it will be updated here as it shall just be updated to the same value
  document.querySelector("#player1_score").innerHTML = player1.overallScore;
  document.querySelector("#player2_score").innerHTML = player2.overallScore;
}

/**
 * Rolls the dice for the give player and checks for
 * 1. roll six then end turn
 * 2. roll double sixes and double sixes is allowed then make overall score = 0
 * 3. Roll double sixes and double sixes is not allowd then just end turn
 * 4. Overall score is >= 30 then end game
 * 5. All conditions above are not met then add amount to overal score
 * @param {Player} player
 */
function rollDice(player) {
  let endTurn = false;
  // clear the screen
  clearDice();

  // then roll the dice
  let score = 0;
  let dice1 = 1 + Math.round(Math.random() * (DICE_FACES - 1));
  let dice2 = 1 + Math.round(Math.random() * (DICE_FACES - 1));
  let total = dice1 + dice2;

  // display the dice on the screen
  displayDice(dice1, dice2);

  // then check if 2 sixes were rolled
  if (dice1 === DICE_FACES && dice2 === DICE_FACES) {
    // if the double sixes rule is allowed change overall score to 0
    if (localStorage.dblSixes === "false") {
      player.overallScore = 0;
      player.currScore = 0;
      document.querySelector(".msg").innerHTML =
        "You rolled double sixes. Your turn has ended";

      // buttons are disabled temporarily when player's turn ends to prevent button spamming
      document.querySelector("#dice_btn").disabled = true;
      document.querySelector("#end_turn").disabled = true;

      // adding delay so that players can see the scores and message before the screen changes
      setTimeout(() => switchPlayer(player), 3000);
    } else {
      // else end the turn as if only one six was rolled [which is the condition in the elseif]
      endTurn = true;
    }
  } else if (dice1 === DICE_FACES || dice2 === DICE_FACES || endTurn) {
    //else remove the current score from the players overall score if the players overall score is greater than 0. This is to avoid having negative scores
    score = player.overallScore - player.currScore;
    player.overallScore = score < 0 ? 0 : score;
    document.querySelector(".msg").innerHTML =
      "You rolled a six. Your turn has ended";

    // buttons are disabled temporarily when player's turn ends to prevent button spamming
    document.querySelector("#dice_btn").disabled = true;
    document.querySelector("#end_turn").disabled = true;

    // adding delay so that players can see the scores and message before the screen changes
    setTimeout(() => switchPlayer(player), 3000);
  } else {
    // if none of the above conditions are met then increment scores and check if overall score is above 30
    player.overallScore += total;
    player.currScore += total;

    // if the game is over, disable all the buttons then remove them and display the play again button
    if (player.overallScore >= MAX_SCORE) {
      document.querySelector(".msg").innerHTML =
        "Game Over " + player.name + " wins.";
      document.querySelector("#dice_btn").disabled = true;
      document.querySelector("#end_turn").disabled = true;
      document.querySelector("#replay").style.display = "block";

      // slowing this down so that user can see their scores before screen updates.
      setTimeout(() => {
        document.querySelector(".play_btns").style.display = "none";
        document.querySelector(".current_score").style.display = "none";
        clearDice();
      }, 3000);
    }
  }

  // display scores if the game is not over
  displayScores(player);
}

/**
 * Redisplays all play buttons and clears scores so that players can play again
 */
function playAgain() {
  // clear player scores
  player1.overallScore = 0;
  player2.overallScore = 0;
  player1.currScore = 0;
  player2.currScore = 0;
  setCurrentPlayer(player1);

  // hide replay btn show play_btns
  document.querySelector(".current_score").style.display = "flex";
  document.querySelector(".play_btns").style.display = "flex";
  document.querySelector("#replay").style.display = "none";
  document.querySelector("#dice_btn").disabled = false;
  document.querySelector("#end_turn").disabled = false;
}

/**
 * Switches the current player to the opposite of the current current player
 * @param {Player} player
 */
function switchPlayer(player) {
  if (player.id === player1.id) {
    setCurrentPlayer(player2);
  } else {
    setCurrentPlayer(player1);
  }
  clearDice();

  // reenable button
  document.querySelector("#dice_btn").disabled = false;
  document.querySelector("#end_turn").disabled = false;

  //clear current players current score
  player.currScore = 0;
}

/**
 * Displays the dice with the corresponding values on the screen
 * @param {int} d1 value of the first dice roll
 * @param {int} d2 value of the second dice roll
 */
function displayDice(d1, d2) {
  // retrieve the corresponding dice of the generated numbers and display them
  let dice = document.querySelectorAll(".dice");
  let dice1 = dice[d1 - 1];
  let dice2 = dice[d2 - 1];

  dice1.style.display = "block";
  dice2.style.display = "block";

  // if it is the same dice then duplicate it to be displayed twice
  if (d1 === d2) {
    clone = dice1.cloneNode(true);
    document.querySelector("#die").appendChild(clone);
  }
}

/**
 * Clears the dice that are being displayed on the screen
 */
function clearDice() {
  let dice = document.querySelectorAll(".dice");

  // remove duplicate element from end of list
  if (dice.length > DICE_FACES) {
    document.querySelector("#die").removeChild(dice[DICE_FACES]);
  }

  // hide dice that are currently being displayed
  dice.forEach((dice) => {
    dice.style.display = "none";
  });
}
