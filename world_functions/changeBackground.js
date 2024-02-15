import { chooseWeaponBeforeFight } from "../battle_functions/chooseWeapon.js";
import { returnRandomNumber } from "../battle_functions/continueBattle.js";
import { displayMonsters } from "./displayMonsters.js";
import { positionTheDirections } from "./directions.js";

export function changeBackground(nameBackground) {
    const monstersDisplayed = document.querySelectorAll('.monsterMap');
    if (monstersDisplayed.length > 0) {
        monstersDisplayed.forEach(monster => monster.remove());
    }
    const gameDisplay = document.querySelector('.gameDisplay');
    if (nameBackground === 'firstCrossroad' || nameBackground === 'First Crossroad') {
        gameDisplay.style.backgroundImage = 'url(../images/landscapes/first_crossroads.png)';
        positionTheDirections(nameBackground, true, true, true, true);
        displayMonsters('First Crossroads')
        return;
    } else if (nameBackground === 'city') {
        if (returnRandomNumber(101) < 100) {
            gameDisplay.style.backgroundImage = 'url(../images/landscapes/town_square_chicken.png)';
            const chickenInCity = document.createElement('div');
            chickenInCity.classList.add('chickenInCity');
            chickenInCity.addEventListener('click', function() {
                chooseWeaponBeforeFight('Chicken');
            });
            document.querySelector('.movementContainer').appendChild(chickenInCity);
        } else {
            gameDisplay.style.backgroundImage = 'url(../images/landscapes/town_square.png)';
            
        }
    } else if (nameBackground === 'hills') {
        gameDisplay.style.backgroundImage = 'url(../images/landscapes/grass_hills.png)'
        displayMonsters('hills');
    }
}