import { allEnemies } from "./allEnemies.js";

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
            movementContainer.append(nameText, HPText);
            movementContainer.appendChild(playerCharacter);
        }, 2000);

        const enemyHP = enemy["health points"];
        const enemyName = enemy.name;

        const nameText = document.createElement('div');
        nameText.innerText = enemyName;
        nameText.classList.add('nameText');

        const HPText = document.createElement('div');
        HPText.innerText = enemyHP;
        HPText.classList.add('HPText');

        const playerCharacter = document.createElement('img');
        playerCharacter.classList.add('characterBackBattle');
        if (character === 1) {
            playerCharacter.src = '../images/characters/character_back_battle_1.png';
        } else {
            playerCharacter.src = '../images/characters/character_back_battle_2.png';
        }
        
    }
}

export { startBattle };