
window.onload = () => preparePage();

function preparePage() {
    document.querySelector("#rule_btn").addEventListener("click", displayRules);
    document.querySelector("#setup_game").addEventListener("click", saveSettings);
}

function displayRules() {
    const rules = document.querySelector('#rules');
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
    window.open("lscoondicegame2.html", "_self");
}