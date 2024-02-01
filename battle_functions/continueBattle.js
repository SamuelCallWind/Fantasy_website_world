import { statsPlayer, textDisplayed } from "../main.js";
import { redirectWeapon } from "../weapons/redirectWeapon.js";

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
    console.log(chosenWeapon);
    let returnRandomNumber = (maxNumber) => Math.floor(Math.random() * maxNumber);
    const action = document.querySelector('.action');
    if (returnRandomNumber(100) < 1) {
        const buttonOK = document.createElement('button');
        buttonOK.classList.add('buttonOK')
        buttonOK.innerText = 'OK';
        textDisplayed.innerText = 'You slipped on the ground and missed your attack\n';
        textDisplayed.parentElement.appendChild(buttonOK);
        action.style.display = 'none';

        buttonOK.addEventListener('click', function () {
            action.style.display = 'flex';
            enemyAttack(enemy);
        })
    } else {
        let rawDamage = 2;
        const weaponAttributes = redirectWeapon(chosenWeapon);
        console.log(weaponAttributes);

        if (chosenWeapon === null) {
            rawDamage = rawDamage + statsPlayer.strength;
        } else {
            rawDamage = (rawDamage * statsPlayer.strength);
        }
    }
    
}

function enemyAttack() {
    console.log('The Enemy attacked');
}

export { continueBattle };