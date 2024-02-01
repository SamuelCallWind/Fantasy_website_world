import { removeMovements } from "../main.js";
import Swords from "../weapons/swords.js";
import { startBattle } from "./startBattle.js";

function chooseWeaponBeforeFight(nameOfMonsterToFight) {
    const allWeapons = document.querySelectorAll('.squareWeapon > img');
    if (allWeapons.length === 0) {
        startBattle(nameOfMonsterToFight);
        return
    }
    const weaponChoiceContainer = document.createElement('div');
    const movementContainer = document.querySelector('.movementContainer');
    const title = document.createElement('h2');
    const cancelButton = document.createElement('button');

    weaponChoiceContainer.classList.add('weaponChoiceContainerBeforeFight');
    title.classList.add('titleChooseWeapon');
    title.innerText = 'Choose your weapon for the fight';
    cancelButton.innerText = 'Cancel';
    weaponChoiceContainer.appendChild(title, cancelButton);
    removeMovements();

    for (let i = 0; i < allWeapons.length; i++) {
        const weaponContainer = document.createElement('div')
        const weaponImage = document.createElement('img');
        const weaponParentClass = allWeapons[i].parentElement.classList[1];
        const weaponParentInnerText = allWeapons[i].parentElement.innerText;

        weaponImage.src = allWeapons[i].src; 
        weaponContainer.classList.add('weaponChoiceBoxBeforeFight')
        weaponContainer.innerText = weaponParentInnerText;

        weaponContainer.appendChild(weaponImage);
        weaponChoiceContainer.appendChild(weaponContainer);
        
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

    const boxesWeapon = Array.from(document.querySelectorAll('.weaponChoiceBoxBeforeFight'))
    boxesWeapon.forEach(element => {
        element.addEventListener('click', function () {
            const nameWeapon = element.innerText;
            document.querySelector('.weaponChoiceContainerBeforeFight').remove();
            startBattle(nameOfMonsterToFight, nameWeapon);
        })
    })



    // startBattle(nameOfMonsterToFight);
}

export { chooseWeaponBeforeFight };