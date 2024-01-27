import { allEnemies } from "./allEnemies.js";

function startBattle(enemyName) {
    const enemy = allEnemies.find(element => element.name === enemyName);
    if (!enemy) {
        throw new Error('Enemy');
    } else {

        document.querySelector('.gameDisplay').style.backgroundImage = '../images/seaView.png';
        const movementContainer = document.querySelector('.movementContainer');
        movementContainer.classList.add('battle');

        movementContainer.style.filter = 'blur 50px';
        while (movementContainer.firstChild) {
            movementContainer.removeChild(movementContainer.firstChild);
        }

        const enemyStrength = enemy.strength;
        const enemyHP = enemy["health points"];

        const enemyName = enemy.name;

        const nameText = document.createElement('div');
        nameContainer.innerText = enemyName;
        nameText.classList.add('nameText');

        const strengthText = document.createElement('div');
        nameContainer.innerText = enemyStrength;
        strengthText.classList.add('strengthText');

        const HPText = document.createElement('div');
        nameContainer.innerText = enemyHP;
        HPText.classList.add('HPText');

        movementContainer.append(nameText, strengthText, HPText);
        


    }
}

export { startBattle };