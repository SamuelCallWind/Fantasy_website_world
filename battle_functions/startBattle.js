import { getCurrentLocation, returnCharacter, textDisplayed } from '../main.js';
import { capitalizeFirstLetter } from '../texts_to_display/fight_texts/allTexts.js';
import { changeBattleBackground } from '../world_functions/changeBackground.js';
import { allEnemies } from './allEnemies.js';
import { continueBattle } from './continueBattle.js';

function startBattle(enemyName, chosenWeapon) {
    const enemy = allEnemies.find(element => element.name === enemyName);
    if (!enemy) {
        throw new Error('Enemy');
    } else {
        const gameDisplay = document.querySelector('.gameDisplay');
        gameDisplay.style.backgroundImage = 'url(../images/loading_screens/fight_chicken.png)';
        const movementContainer = document.querySelector('.movementContainer');
        movementContainer.classList.add('battle');

        movementContainer.style.filter = 'blur 50px';
        while (movementContainer.firstChild) {
            movementContainer.removeChild(movementContainer.firstChild);
        }
        setTimeout(() => {
            changeBattleBackground();
            movementContainer.append(enemyNameText, enemyHPBar, playerCharacter, containerEnemySprite);
            document.querySelector('.action').style.display = 'flex';
            document.querySelector('.textDisplayed').innerText = enemy.text;
            continueBattle(enemy, chosenWeapon ? chosenWeapon : null);
            document.querySelector('.enemyGreenHealthBar');
        }, 2000);

        const enemyName = enemy.name;
        const containerEnemySprite = document.createElement('div');
        const enemySprite = document.createElement('img');

        const enemyNameText = document.createElement('div');
        enemyNameText.innerText = capitalizeFirstLetter(enemyName);
        enemyNameText.classList.add('enemyNameText');

        const enemyHPBar = document.createElement('div');
        enemyHPBar.classList.add('enemyHPBar');

        const playerCharacter = document.createElement('img');
        playerCharacter.classList.add('characterBackBattle');
        const character = returnCharacter();
        if (character === 1) {
            playerCharacter.src = '../images/characters/character_back_battle_1.png';
        } else {
            playerCharacter.src = '../images/characters/character_back_battle_2.png';
        }
        enemySprite.src = enemy.sprite;
        enemySprite.classList.add('enemySprite');
        if (enemy.size === 'small') {
            enemySprite.classList.add('smallEnemy');
        } else if (enemy.size === 'medium') {
            enemySprite.classList.add('mediumEnemy');
        } else if (enemy.size === 'big') {
            enemySprite.classList.add('bigEnemy');
        } else if (enemy.size === 'boss') {
            enemySprite.classList.add('bossEnemy');
        } else if (enemy.size === 'chicken') {
            enemySprite.classList.add('chicken');
        }

        containerEnemySprite.appendChild(enemySprite);
        containerEnemySprite.classList.add('containerEnemySprite');
    }
    
}



export { startBattle };