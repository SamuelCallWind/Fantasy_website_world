import { chooseWeaponBeforeFight } from "../battle_functions/chooseWeapon.js";
import { returnRandomNumber } from "../battle_functions/continueBattle.js";
import { displayMonsters } from "./displayMonsters.js";
import { positionTheDirections } from "./directions.js";
import { changeActions, getCurrentLocation } from "../main.js";

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
    } else if (nameBackground === 'hills' || nameBackground === 'Hills') {
        gameDisplay.style.backgroundImage = 'url(../images/landscapes/grass_hills.png)';
        displayMonsters('hills');
        changeActions(7);
        positionTheDirections('hills', false, false, false, true)
    } else if (nameBackground === 'blacksmith') {
        gameDisplay.style.backgroundImage = 'url("../images/insides/inside_forge.png")';
    } else if (nameBackground === 'church') {
        gameDisplay.style.backgroundImage = 'url("../images/insides/inside_church.png")';
    } else if (nameBackground === 'grassRockySingleRoad') {
        gameDisplay.style.backgroundImage = 'url("../images/landscapes/grass_rock_single_road.png")';
    }
}

function changeBattleBackground() {
    const currentLocation = getCurrentLocation();
    const gameDisplay = document.querySelector('.gameDisplay');
    if (currentLocation === 'Town Square') {
        gameDisplay.style.backgroundImage = "url('../images/battle/battle_arena_village.png')"
        gameDisplay.style.backgroundPosition = '-50px';            
    } else if (currentLocation === 'First Crossroad') {
        gameDisplay.style.backgroundImage = "url('../images/battle/battle_arena_grassland.png')"
        gameDisplay.style.backgroundPosition = '-50px';
    }
}

export { changeBattleBackground };