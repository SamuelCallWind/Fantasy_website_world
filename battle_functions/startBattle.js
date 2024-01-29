import { returnCharacter } from '../main.js';
import { allEnemies } from './allEnemies.js';

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
            movementContainer.append(nameText, HPText, playerCharacter, enemysprite);
            document.querySelector('.action').style.display = 'block';
            document.querySelector('.textDisplayed').innerText = enemy.text;
        }, 2000);

        const enemyHP = enemy['health points'];
        const enemyName = enemy.name;
        const enemysprite = document.createElement('img');

        const nameText = document.createElement('div');
        nameText.innerText = enemyName;
        nameText.classList.add('nameText');

        const HPText = document.createElement('div');
        HPText.classList.add('HPText');

        const playerCharacter = document.createElement('img');
        playerCharacter.classList.add('characterBackBattle');
        const character = returnCharacter();
        if (character === 1) {
            playerCharacter.src = '../images/characters/character_back_battle_1.png';
        } else {
            playerCharacter.src = '../images/characters/character_back_battle_2.png';
        }
        enemysprite.src = enemy.sprite;
        enemysprite.classList.add('enemySprite');
        if (enemy.size === 'small') {
            enemysprite.classList.add('smallEnemy');
        } else if (enemy.size === 'big') {
            enemysprite.classList.add('bigEnemy');
        } else if (enemy.size === 'boss') {
            enemysprite.classList.add('bossEnemy');
        }
    }
}

export { startBattle };