import { statsPlayer, textDisplayed, updateHealth } from "../main.js";
import { createButtonOK } from "../texts_to_display/fight_texts/createButtons.js";
import { redirectTypeOfWeapon, redirectWeapon } from "../weapons/redirectWeapon.js";
import { removeActions } from "./displayActions.js";


let returnRandomNumber = (maxNumber) => Math.floor(Math.random() * maxNumber);


function continueBattle(enemy, chosenWeapon) {
    const enemyHealthInPoint = enemy.HP;
    const enemyGreenHealthBar = document.createElement('div');

    enemyGreenHealthBar.innerText = `${enemyHealthInPoint}/${enemyHealthInPoint}`;
    enemyGreenHealthBar.classList.add('enemyGreenHealthBar');
    document.querySelector('.enemyHPBar').appendChild(enemyGreenHealthBar)

    createEventListenerAttack(enemy, chosenWeapon);
}

function handleAttack(enemy, chosenWeapon) {

    const action = document.querySelector('.action');
    if (returnRandomNumber(100) < 10) {
        const buttonOK = createButtonOK();
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
        let totalDamage = rawDamage;
        const weaponAttributes = redirectWeapon(chosenWeapon);
        const enemyHP = document.querySelector('.enemyGreenHealthBar');

        const maxHealthOfEnemy = enemyHP.innerText.split('/')[1];
        let currentHealthOfEnemyWithSlash = enemyHP.innerText.split('/')[0];
        let currentEnemyHealthInPercent = `${currentHealthOfEnemyWithSlash * 100 / maxHealthOfEnemy}`;
        
        animateAttack(chosenWeapon);

        const isCritical = (returnRandomNumber(100) < 10) ? true : false;

        if (chosenWeapon === null) {
            totalDamage = rawDamage + statsPlayer.strength;
            if (isCritical) totalDamage *= 2;
        } else {
            totalDamage = (rawDamage * statsPlayer.strength) + weaponAttributes.damage - (enemy.defense);     
            if (isCritical) totalDamage *= 2;
        }

        currentHealthOfEnemyWithSlash = `${parseInt(enemyHP.innerText) - parseInt(totalDamage)}/${maxHealthOfEnemy}`;
        let currentEnemyHealthAlone = currentHealthOfEnemyWithSlash.split('/')[0];
        currentEnemyHealthInPercent = currentEnemyHealthAlone * 100 / maxHealthOfEnemy;
    
        
        enemyHP.innerText = currentHealthOfEnemyWithSlash;   
        enemyHP.style.width = `${currentEnemyHealthInPercent}%`;
        removeActions();

        if (!isCritical) {
            textDisplayed.innerText = `You inflicted ${totalDamage} points of damage to the ${enemy.name}`;
        } else {
            textDisplayed.innerText = `A nice critical hit ! ${totalDamage} points of damage inflicted to the ${enemy.name}`;
        }

        const buttonOK = createButtonOK();
        textDisplayed.appendChild(buttonOK);

        buttonOK.addEventListener('click', () => {
            if (parseInt(currentHealthOfEnemyWithSlash.split('/')[0]) <= 0) {
                defeatEnemy(enemy);
                textDisplayed.innerText = `You defeated the ${enemy.name}`;
            } else {
                enemyAttack(enemy);
            }
        });

    }
    
}

function enemyAttack(enemy) {
    const enemyImg = document.querySelector('.enemySprite');
    const randomNumber = returnRandomNumber(enemy.attacks.length);
    const attackChosen = enemy.attacks[randomNumber];
    const spriteAttackChosen = enemy.attacksSprite[randomNumber];
    const powerOfTheAttack = attackChosen.power;
    const currentEnemyPosition = parseInt(window.getComputedStyle(enemyImg).left, 10);
    const adjustmentToLeft = currentEnemyPosition * 0.10; 
    const buttonOK = createButtonOK();

    animateEnemyMovement(enemyImg, currentEnemyPosition, adjustmentToLeft)
    animateEnemyAttack(spriteAttackChosen);
    updateHealth(powerOfTheAttack, '-');

}

function animateAttack(chosenWeapon) {
    const playerCharacter = document.querySelector('.characterBackBattle');
    const currentLeft = parseInt(playerCharacter.style.left || 50);
    const newLeft = currentLeft + 50;
    playerCharacter.style.left = `${newLeft}px`; 

    setTimeout(() => {
        playerCharacter.style.left = `${newLeft - 50}px`;
    }, 200);


    const spriteAttack = document.createElement('div');
    const typeOfWeapon = redirectTypeOfWeapon(chosenWeapon);

    if (typeOfWeapon === 'sword') {
        spriteAttack.classList.add('swordAttack');
    } else if (typeOfWeapon === 'hammer') {
        spriteAttack.classList.add('spriteAttack');
    } else if (typeOfWeapon === 'claws') {
        spriteAttack.classList.add('slashAttack');
    } else if (typeOfWeapon === 'spear') {
        spriteAttack.classList.add('swordAttack'); // to change for a spear sprite
    } else {
        spriteAttack.classList.add('spriteAttack'); // to change if bare hand
    }

    document.querySelector('.gameDisplay').appendChild(spriteAttack);



    let frame = 0;
    const totalFrames = 10;
    const frameRate = 30; 
    const animationInterval = setInterval(() => {
        animateSprite(spriteAttack, frame, totalFrames, animationInterval);
        frame++;
    }, frameRate);

}

function animateSprite(spriteAttack, frame, totalFrames, animationInterval) {
    
    if (frame < totalFrames) {
        const xPosition = -(frame * 64) + 'px';
        spriteAttack.style.backgroundPosition = `${xPosition} 0px`;
    } else {
        spriteAttack.remove();
        clearInterval(animationInterval);
    }
}

function animateEnemyMovement(enemyImg, originalPosition, leftChange){

    enemyImg.style.left = (originalPosition - leftChange) + 'px';
    setTimeout(() => {
        enemyImg.style.left = originalPosition + 'px';
    }, 200);
}

function animateEnemyAttack(attackSprite) {
    const spriteForAttack = document.createElement('div');
    spriteForAttack.classList.add(attackSprite);
    document.querySelector('.gameDisplay').appendChild(spriteForAttack);
    let frame = 0;
    const totalFrames = 10;
    const frameRate = 30; 
    const animationInterval = setInterval(() => {
        animateSprite(spriteForAttack, frame, totalFrames, animationInterval);
        frame++;
    }, frameRate);
}

function defeatEnemy(enemy) {
    document.querySelector('.action').remove();
    document.querySelector('.enemySprite').classList.add('fade');
    document.querySelector('.enemyNameText').classList.add('fade');
    document.querySelector('.enemyHPBar').classList.add('fade');

    setTimeout(() => {
        const rewardEarned = document.createElement('div');
        rewardEarned.classList.add('rewardEarned');
        rewardEarned.style.cssText = 'display: flex; flex-direction: column; justify-content: center; align-items: center;';
        rewardEarned.innerText = `${enemy.xp} XP earned\n`;

        const buttonQuitFight = document.createElement('button');
        buttonQuitFight.classList.add('buttonExitFight');
        buttonQuitFight.innerText = 'Exit fight';
        rewardEarned.appendChild(buttonQuitFight);

        document.querySelector('.movementContainer').appendChild(rewardEarned);

    }, 1000);
}

function createEventListenerAttack(enemy, chosenWeapon) {
    const attack = document.querySelector('.attack');
    attack.addEventListener('click', function() {
        handleAttack(enemy, chosenWeapon);
    });
}


export { continueBattle };