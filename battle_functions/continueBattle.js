import { statsPlayer, textDisplayed } from "../main.js";
import { redirectTypeOfWeapon, redirectWeapon } from "../weapons/redirectWeapon.js";


let returnRandomNumber = (maxNumber) => Math.floor(Math.random() * maxNumber);


function continueBattle(enemy, chosenWeapon) {
    const enemyHealthInPoint = enemy.HP;
    const enemyGreenHealthBar = document.createElement('div');

    enemyGreenHealthBar.innerText = `${enemyHealthInPoint}/${enemyHealthInPoint}`;
    enemyGreenHealthBar.classList.add('enemyGreenHealthBar');
    document.querySelector('.enemyHPBar').appendChild(enemyGreenHealthBar)
    console.log(enemy.name, chosenWeapon);

    const attack = document.querySelector('.attack');
    attack.addEventListener('click', function() {
        handleAttack(enemy, chosenWeapon);
    });
}

function handleAttack(enemy, chosenWeapon) {

    const action = document.querySelector('.action');
    if (returnRandomNumber(100) < 10) {
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
        let totalDamage = rawDamage;
        const weaponAttributes = redirectWeapon(chosenWeapon);
        const enemyHP = document.querySelector('.enemyGreenHealthBar');

        const maxHealthOfEnemy = enemyHP.innerText.split('/')[1];
        let currentHealthOfEnemyWithSlash = enemyHP.innerText.split('/')[0];
        let currentEnemyHealthInPercent = `${currentHealthOfEnemyWithSlash * 100 / maxHealthOfEnemy}`;
        
        animateAttack(chosenWeapon);


        if (chosenWeapon === null) {
            totalDamage = rawDamage + statsPlayer.strength;
        } else {
            totalDamage = (rawDamage * statsPlayer.strength) + weaponAttributes.damage;     
        }

        currentHealthOfEnemyWithSlash = `${parseInt(enemyHP.innerText) - parseInt(rawDamage)}/${maxHealthOfEnemy}`;
        let currentEnemyHealthAlone = currentHealthOfEnemyWithSlash.split('/')[0];
        currentEnemyHealthInPercent = currentEnemyHealthAlone * 100 / maxHealthOfEnemy;
    
        
        enemyHP.innerText = currentHealthOfEnemyWithSlash;   
        enemyHP.style.width = `${currentEnemyHealthInPercent}%`;
        
        setTimeout(() => {
            if (parseInt(currentHealthOfEnemyWithSlash.split('/')[0]) <= 0) {
                defeatEnemy(enemy);
                textDisplayed.innerText = `You defeated the ${enemy.name}`;
            } else {
                enemyAttack(enemy);
            }
        }, 500);

    }
    
}

function enemyAttack(enemy) {
    const enemyImg = document.querySelector('.enemySprite');
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

export { continueBattle };