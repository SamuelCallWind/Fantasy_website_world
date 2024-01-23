import { allEnemies } from "./allEnemies.js";

function startBattle(enemyName) {
    const enemy = allEnemies.find(element => element.name === enemyName);
    if (!enemy) {
        throw new Error('Enemy');
    } else {

        document.querySelector('.gameDisplay').style.backgroundImage = 'url(../images/loading_screens/fight_chicken.png)';
        const movementContainer = document.querySelector('.movementContainer');
        movementContainer.classList.add('battle');

        movementContainer.style.filter = 'blur 50px';
        movementContainer.style.opacity = '0';
        movementContainer.style.backgroundColor = 'white';

        const enemyStrength = enemy.strength;
        const enemyHP = enemy["health points"];

    }
}

export { startBattle };