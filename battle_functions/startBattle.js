import { returnCharacter } from '../main.js';
import { allEnemies } from './allEnemies.js';
import { continueBattle } from './continueBattle.js';

function startBattle(enemyName) {
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
            gameDisplay.style.backgroundImage = 'url("../images/loading_screens/white_background.png")';
            movementContainer.append(enemyNameText, enemyHPText, playerCharacter, enemySprite);
            document.querySelector('.action').style.display = 'flex';
            document.querySelector('.textDisplayed').innerText = enemy.text;
            continueBattle(enemy)
        }, 2000);

        const enemyHP = enemy.HP;
        const enemyName = enemy.name;
        const enemySprite = document.createElement('img');

        const enemyNameText = document.createElement('div');
        enemyNameText.innerText = enemyName;
        enemyNameText.classList.add('enemyNameText');

        const enemyHPText = document.createElement('div');
        enemyHPText.classList.add('enemyHPText');

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
        } else if (enemy.size === 'big') {
            enemySprite.classList.add('bigEnemy');
        } else if (enemy.size === 'boss') {
            enemySprite.classList.add('bossEnemy');
        }
    }
}


export { startBattle };