import { removeMovements } from "../main.js";
import Swords from "../weapons/swords.js";

function chooseWeaponBeforeFight(nameOfMonsterToFight) {
    const weaponChoiceContainer = document.createElement('div');
    const allWeapons = Array.from(document.querySelectorAll('.squareWeapon > img'));

    weaponChoiceContainer.classList.add('weaponChoiceContainerBeforeFight');
    removeMovements();

    for (let i = 0; i < allWeapons.length; i++) {
        const weaponContainer = document.createElement('div')
        const weaponImage = document.createElement('img');
        const weaponParentClass = allWeapons[i].parentElement.classList[1];
        const weaponParentInnerText = allWeapons[i].parentElement.innerText;

        weaponImage.src = allWeapons[i].src; 
        weaponContainer.classList.add('weaponChoiceBoxBeforeFight')

        weaponContainer.appendChild(weaponImage);
        weaponChoiceContainer.appendChild(weaponContainer);

        document.querySelector('.movementContainer').classList.add('flex')
    }

    if (document.querySelector('.gridAutoCol50')) {
        document.querySelector('.gameDisplay').classList.remove('gridAutoCol50');
    }
    document.querySelector('.movementContainer').appendChild(weaponChoiceContainer);

    function checkWhichWeaponChosen() {
        switch (weaponParentClass) {
            case 'squareWeapon1': 
            const weaponChosen = Swords.find(sword => sword.name === weaponParentInnerText);
        }
    }





    // startBattle(nameOfMonsterToFight);
}

export { chooseWeaponBeforeFight };