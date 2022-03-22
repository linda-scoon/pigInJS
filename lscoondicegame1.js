/**
 * Description: Dice Game Javascript for page 1
 *  Author: Linda Scoon
 *  Date: 22/03/2022
 */

/**
 * sets all event listeners when the page has loaded
 * @returns void
 */
window.onload = () => preparePage();

/**
 * defines the even listeners that have to be set
 */
function preparePage() {
  document
    .querySelector("#setup_game")
    .addEventListener("click", validateInput);
}

/**
 * Saves users' names and doule sixes option in local storage then redirects to second page
 */
function saveSettings() {
  localStorage.player1 = document.querySelector("#player1").value;
  localStorage.player2 = document.querySelector("#player2").value;
  localStorage.dblSixes = document.querySelector("#dblSixes").checked;
  window.open("lscoondicegame2.html", "_self");
}
/**
 * Ensures that the user has entered 2 player names
 */
function validateInput() {
  let player1 = document.querySelector("#player1");
  let player2 = document.querySelector("#player2");

  if (player1.value.trim().length == 0) {
    player1.className = "error";
  } else if (player2.value.trim().length == 0) {
    player2.className = "error";
  } else {
    saveSettings();
  }
}
