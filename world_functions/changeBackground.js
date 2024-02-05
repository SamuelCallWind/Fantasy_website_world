import { chooseWeaponBeforeFight } from "../battle_functions/chooseWeapon.js";
import { returnRandomNumber } from "../battle_functions/continueBattle.js";
import { positionTheDirections } from "./directions.js";

export function changeBackground(nameBackground) {
    const gameDisplay = document.querySelector('.gameDisplay');
    if (nameBackground === 'firstCrossroad') {
        gameDisplay.style.backgroundImage = 'url(../images/landscapes/first_crossroads.png)';
        positionTheDirections(nameBackground, true, true, true, true);
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

    }
}