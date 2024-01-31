import { removeMovements } from "../main.js";
import Swords from "../weapons/swords.js";

function chooseWeaponBeforeFight(nameOfMonsterToFight) {
    const weaponChoiceContainer = document.createElement('div');
    const allWeapons = Array.from(document.querySelectorAll('.squareWeapon > img'));
    const movementContainer = document.querySelector('.movementContainer');
    const title = document.createElement('h2');

    weaponChoiceContainer.classList.add('weaponChoiceContainerBeforeFight');
    title.classList.add('titleChooseWeapon');
    title.innerText = 'Choose your weapon for the fight';
    weaponChoiceContainer.appendChild(title);
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

        document.querySelector('.movementContainer').classList.add('flex', 'center')
    }

    movementContainer.className = 'movementContainer';
    movementContainer.style.cssText = 'display: flex; justify-content: center; align-items: center;'
    movementContainer.appendChild(weaponChoiceContainer);

    function checkWhichWeaponChosen() {
        switch (weaponParentClass) {
            case 'squareWeapon1': 
            const weaponChosen = Swords.find(sword => sword.name === weaponParentInnerText);
        }
    }





    // startBattle(nameOfMonsterToFight);
}

export { chooseWeaponBeforeFight };