import { returnRandomNumber } from "../battle_functions/continueBattle.js";
import { redirectMonsterImage } from "./redirectMonsterImage.js";

const monsterHills = ['fox', 'bird', 'lizard', 'goblin'];


function displayMonsters(nameOfPlace) {
    let monstersToDisplay;
    const numberofMonsters = returnRandomNumber(3);

    if (numberofMonsters === 0) {
        return;
    }

    if (nameOfPlace === 'First Crossroads' || nameOfPlace === 'hills') {
        monstersToDisplay = monsterHills;
        for (let i = 0; i < numberofMonsters; i++) {
            const randomMonster = monsterHills[returnRandomNumber(monstersToDisplay.length)];
            const newDivMonster = document.createElement('div');
            const imageMonster = document.createElement('img');
            imageMonster.src = '../images/misc/unknown_enemy_0.png';
            newDivMonster.classList.add('monsterMap');
            newDivMonster.innerText = randomMonster;
            newDivMonster.style.top = `${returnRandomNumber(500)}px`;
            newDivMonster.style.left = `${returnRandomNumber(500)}px`;
            newDivMonster.appendChild(imageMonster);
            document.querySelector('.movementContainer').appendChild(newDivMonster);
        }
    }

}

export {displayMonsters};