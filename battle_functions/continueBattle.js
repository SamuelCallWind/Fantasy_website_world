import { statsPlayer } from "../main.js";

function continueBattle(enemy, chosenWeapon) {
    const enemyHealthInPoint = enemy.HP;
    const enemyGreenHealthBar = document.createElement('div');

    enemyGreenHealthBar.classList.add('enemyGreenHealthBar');
    document.querySelector('.enemyHPBar').appendChild(enemyGreenHealthBar)
    console.log(enemy.name, chosenWeapon);

    const attack = document.querySelector('.attack');
    attack.addEventListener('click', function() {
        handleAttack(enemy, chosenWeapon);
    });
}

function handleAttack(enemy, chosenWeapon) {
    let rawDamage = 2;

    console.log(enemy.name, 'this is your current strength: ' + statsPlayer.strength);

    if (chosenWeapon === null) {
        console.log('null')
    }
}

export { continueBattle };