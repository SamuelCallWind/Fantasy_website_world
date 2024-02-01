import { statsPlayer, textDisplayed } from "../main.js";
import { redirectWeapon } from "../weapons/redirectWeapon.js";


function continueBattle(enemy, chosenWeapon) {
    const enemyHealthInPoint = enemy.HP;
    const enemyGreenHealthBar = document.createElement('div');

    enemyGreenHealthBar.innerText = enemyHealthInPoint;
    enemyGreenHealthBar.classList.add('enemyGreenHealthBar');
    document.querySelector('.enemyHPBar').appendChild(enemyGreenHealthBar)
    console.log(enemy.name, chosenWeapon);

    const attack = document.querySelector('.attack');
    attack.addEventListener('click', function() {
        handleAttack(enemy, chosenWeapon);
    });
}

function handleAttack(enemy, chosenWeapon) {
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
            enemyAttack(enemy);
            setTimeout(() => {
                buttonOK.remove();
                action.style.display = 'flex';
            }, 300);
        })
    } else {
        let rawDamage = 2;
        const weaponAttributes = redirectWeapon(chosenWeapon);
        const enemyHP = document.querySelector('.enemyGreenHealthBar');
        const playerCharacter = document.querySelector('.characterBackBattle');

        console.log(`The enemy currently has ${document.querySelector('.enemyGreenHealthBar').innerText} health points`)
        if (chosenWeapon === null) {
            playerCharacter.style.left = `${playerCharacter.style.left + 50}px`; 
            rawDamage = rawDamage + statsPlayer.strength;
            enemyHP.innerText = parseInt(enemyHP.innerText) - parseInt(rawDamage);
        } else {
            rawDamage = (rawDamage * statsPlayer.strength) + weaponAttributes.damage;
            enemyHP.innerText = parseInt(enemyHP.innerText) - parseInt(rawDamage);
        }

        if (enemyHP.innerText <= parseInt(0)) {
            defeatEnemy(enemy);
            textDisplayed.innerText = `You defeated the ${enemy.name}`;
        }

    }
    
}

function enemyAttack() {
    console.log('The Enemy attacked');
}

function defeatEnemy() {
    document.querySelector('.enemySprite').classList.add('fade');
    document.querySelector('.enemyNameText').classList.add('fade');
    document.querySelector('.enemyHPBar').classList.add('fade');
}

export { continueBattle };