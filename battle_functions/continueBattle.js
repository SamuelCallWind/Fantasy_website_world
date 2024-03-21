import { changeActions, inventory, locations, removeAndCreateActionButtons, removeMovements, statsPlayer, textDisplayed, updateHealth, updatePoisonResistance, updateXP } from "../main.js";
import { createButtonOK } from "../texts_to_display/fight_texts/createButtons.js";
import { redirectTypeOfWeapon, redirectWeapon } from "../weapons/redirectWeapon.js";
import { changeBackground } from "../world_functions/changeBackground.js";
import { positionTheDirections } from "../world_functions/directions.js";

let returnRandomNumber = (maxNumber) => Math.floor(Math.random() * maxNumber);
let enemyHeight = 0;

function continueBattle(enemy, chosenWeapon) {
    const enemyHealthInPoint = enemy.HP;
    const enemyGreenHealthBar = document.createElement('div');

    enemyGreenHealthBar.innerText = `${enemyHealthInPoint}/${enemyHealthInPoint}`;
    enemyGreenHealthBar.classList.add('enemyGreenHealthBar');
    document.querySelector('.enemyHPBar').appendChild(enemyGreenHealthBar)

    document.querySelector('.attack').addEventListener('click', function () {
        handleAttack(enemy, chosenWeapon);
    })
    document.querySelector('.run').addEventListener('click',function () {
        document.querySelector('.action').style.display = 'none';
        if (returnRandomNumber(10) > 1) {
            textDisplayed.innerText = `You ran away from the ${enemy.name}`;
            document.querySelector('.action').style.display = 'none';
            setTimeout(() => {
                returnToMap();
            }, 1000);
        } else {
            textDisplayed.innerText = 'You were not able to run away.';
            setTimeout(() => {
                enemyAttack(enemy);
            }, 2000);
        }
    })

    if (enemy.size === 'small') {
        enemyHeight = '100px';
    } else if (enemy.size === 'medium') {
        enemyHeight = '200px';
    } else if (enemy.size === 'big') {
        enemyHeight = '50px';
    }
}

function handleAttack(enemy, chosenWeapon) {

    const action = document.querySelector('.action');
    if (returnRandomNumber(100) < 10) {
        const buttonOK = createButtonOK();
        textDisplayed.innerText = 'You slipped on the ground and missed your attack\n';
        textDisplayed.parentElement.appendChild(buttonOK);
        action.style.display = 'none';

        buttonOK.addEventListener('click', function () {
            buttonOK.remove();
            enemyAttack(enemy);
        })
    } else {
        let rawDamage = 2;
        let totalDamage = rawDamage;
        const weaponAttributes = redirectWeapon(chosenWeapon);
        const enemyHP = document.querySelector('.enemyGreenHealthBar');

        const maxHealthOfEnemy = enemyHP.innerText.split('/')[1];
        let currentHealthOfEnemyWithSlash = enemyHP.innerText.split('/')[0];
        const enemyHealthInPercent = currentHealthOfEnemyWithSlash * 100 / maxHealthOfEnemy;
        let currentEnemyHealthInPercent = enemyHealthInPercent < 0 ? 0: enemyHealthInPercent;
        
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
        const currentEnemyHealthUnchecked = currentEnemyHealthAlone * 100 / maxHealthOfEnemy;
        currentEnemyHealthInPercent = currentEnemyHealthUnchecked < 0 ? 0 : currentEnemyHealthUnchecked;
    
        
        enemyHP.innerText = currentHealthOfEnemyWithSlash;   
        enemyHP.style.width = `${currentEnemyHealthInPercent}%`;
        document.querySelector('.action').style.display = 'none';

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
    let isPlayerAlive = 'alive';
    if (returnRandomNumber(101) < 10) {
        textDisplayed.innerText = `The ${enemy.name} attacked, but missed.`;
    } else {
        const enemyImg = document.querySelector('.enemySprite');
        const randomNumber = returnRandomNumber(enemy.attacks.length);
        const attackChosen = enemy.attacks[randomNumber];
        const spriteAttackChosen = enemy.attacksSprite[randomNumber];
        const isCritical =  (returnRandomNumber(101) < 10);
        const powerOfTheAttack = returnRandomNumber(attackChosen.power) + 1;
        const currentEnemyPosition = parseInt(window.getComputedStyle(enemyImg).left, 10);
        const adjustmentToLeft = currentEnemyPosition * 0.10; 
        updatePoisonResistance(1);

        animateEnemyMovement(enemyImg, currentEnemyPosition, adjustmentToLeft)
        animateEnemyAttack(spriteAttackChosen);
        
        isPlayerAlive = updateHealth(powerOfTheAttack, '-', isCritical);
    }
    
    

    if (isPlayerAlive === 'alive') {
        const buttonOK = createButtonOK();
        textDisplayed.appendChild(buttonOK);
        buttonOK.addEventListener('click', () => {
        buttonOK.remove();
            document.querySelector('.action').style.display = 'flex';
            textDisplayed.innerText = 'What will you do now?';
        });
    }

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

    spriteAttack.style.top = enemyHeight;
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
    spriteForAttack.classList.add("spriteEnemyAttack", attackSprite);
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
    removeAndCreateActionButtons();
    // document.querySelector('.action').style.display = 'none';
    document.querySelector('.enemySprite').classList.add('fade');
    document.querySelector('.enemyNameText').classList.add('fade');
    document.querySelector('.enemyHPBar').classList.add('fade');

    setTimeout(() => {
        const enemyDrops = enemy.drops;
        const rewardEarned = document.createElement('div');
        rewardEarned.classList.add('rewardEarned');
        rewardEarned.style.cssText = 'display: flex; flex-direction: column; justify-content: center; align-items: center;';
        rewardEarned.innerText = `${enemy.xp} XP earned \n`;

        if (enemyDrops) {
            for (let i = 0; i < enemyDrops.length; i++) {
                const itemToCheck = enemyDrops[i];
                const randomNumber = returnRandomNumber(101);
                
                if (randomNumber <= itemToCheck.dropChance) {
                    const newDiv = document.createElement('div');
                    newDiv.innerText += itemToCheck.name + ' looted';
                    rewardEarned.appendChild(newDiv);
                    inventory.push(itemToCheck);
                }
            }
        }
        

        const buttonQuitFight = document.createElement('button');
        buttonQuitFight.classList.add('buttonExitFight');
        buttonQuitFight.innerText = 'Exit fight';
        buttonQuitFight.addEventListener('click', returnToMap);
        rewardEarned.appendChild(buttonQuitFight);

        document.querySelector('.movementContainer').appendChild(rewardEarned);
        updateXP(enemy.xp, '+');

    }, 1000);
}

function returnToMap() {
    const gameDisplay = document.querySelector('.gameDisplay');
    gameDisplay.style.backgroundPosition = 'left';
    gameDisplay.style.cssText = '';
    removeMovements();

    let currentLocation = document.querySelector('.currentLocation').innerText;
    if (currentLocation === 'Church' || currentLocation === 'Blacksmith' || currentLocation === 'Buy Armor' || currentLocation === 'Buy Weapon' || currentLocation === 'Statue') {
        currentLocation = 'Town Square';
    } 
    for (let i = 0; i < locations.length; i++) {
        if (locations[i].name === currentLocation) {
            changeActions(i);
        }
    }
    changeBackground(currentLocation);
    positionTheDirections(currentLocation);
    document.querySelector('.movementContainer').style.cssText = '';
}


export { continueBattle, returnRandomNumber };