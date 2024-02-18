import { chooseWeaponBeforeFight } from "../battle_functions/chooseWeapon.js";
import { returnRandomNumber } from "../battle_functions/continueBattle.js";
import { redirectMonsterImage } from "./redirectMonsterImage.js";

const monsterHills = ['fox', 'bird', 'lizard', 'goblin'];

function checkIfMonsterIsInBadPlace(location) {
    if (location === 'First Crossroads') {
        
    }
}

function displayMonsters(nameOfPlace) {
    let monstersToDisplay;
    const numberOfMonsters = returnRandomNumber(4);

    if (numberOfMonsters === 0) {
        return;
    }

    if (nameOfPlace === 'First Crossroads' || nameOfPlace === 'hills') {
        monstersToDisplay = monsterHills;
        for (let i = 0; i < numberOfMonsters; i++) {
            const randomMonster = monsterHills[returnRandomNumber(monstersToDisplay.length)];
            const newDivMonster = document.createElement('div');
            const imageMonster = document.createElement('img');
            imageMonster.src = '../images/misc/unknown_enemy_0.png';
            newDivMonster.classList.add('monsterMap');
            newDivMonster.innerText = randomMonster;
            newDivMonster.style.top = `${returnRandomNumber(350) + 50}px`;
            newDivMonster.style.left = `${returnRandomNumber(600)+ 50}px`;
            newDivMonster.appendChild(imageMonster);

            newDivMonster.addEventListener('click', function() {
                chooseWeaponBeforeFight(randomMonster);
            })
            document.querySelector('.movementContainer').appendChild(newDivMonster);
        }
    }

}

export {displayMonsters};