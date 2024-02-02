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
        animateAttack();

        if (chosenWeapon === null) {
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

function animateAttack() {
    const playerCharacter = document.querySelector('.characterBackBattle');
    const currentLeft = parseInt(playerCharacter.style.left || 50);
    const newLeft = currentLeft + 50;
    playerCharacter.style.left = `${newLeft}px`; 

    setTimeout(() => {
        playerCharacter.style.left = `${newLeft - 50}px`;
    }, 200);


    const spriteAttack = document.createElement('div');
    spriteAttack.classList.add('spriteAttack');
    document.querySelector('.gameDisplay').appendChild(spriteAttack);



    let frame = 0;
    const totalFrames = 10;
    const frameRate = 50; 
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