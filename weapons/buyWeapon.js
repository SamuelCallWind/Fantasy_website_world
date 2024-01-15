import Swords from "./swords.js";
import Hammers from "./hammer.js";
import Claws from "./claws.js";
import Spears from "./spears.js";
import { gold, goldText, textDisplayed, updateGold, updateWeapons, weapons } from "../main.js";
import { Weapons } from "./displayWeaponImages.js";

function buySword (weaponLevel) {
    const priceOfWeapon = Swords[weaponLevel].price;
    const listWeaponBoxes = Array.from(document.querySelectorAll('.squareWeapon'));

    if (priceOfWeapon > gold) {
        textDisplayed.innerText = 'You don\'t have enough gold to buy this weapon';
        return;
    } else {
        updateGold(priceOfWeapon, '-');
        goldText.innerText = gold;
        textDisplayed.innerText = `You bought the ${Swords[weaponLevel].name}`;
        updateWeapons('sword');

        const swordBoxInventory = listWeaponBoxes[0];
        const newImage = document.createElement('img');
        const sourceImageWeapon = Weapons[0][weaponLevel];
        newImage.src = sourceImageWeapon;
        newImage.classList.add('swordInventoryBox');
        if (swordBoxInventory.children.length > 0) {
            Array.from(swordBoxInventory.children).forEach(element => element.remove());
        }
        swordBoxInventory.innerText = `${Swords[weaponLevel].name}`;
        swordBoxInventory.appendChild(newImage);
    }
    
}
function buyHammer(weaponLevel) {
    const priceOfWeapon = Hammers[weaponLevel].price;

    if (priceOfWeapon > gold) {
        textDisplayed.innerText = 'You don\'t have enough gold to buy this weapon';
        return;
    } else {
        updateGold(priceOfWeapon, '-');
        goldText.innerText = gold;
        textDisplayed.innerText = `You bought the ${Hammers[weaponLevel].name}`;
        updateWeapons('hammer');
    }
}
function buyClaws(weaponLevel) {
    const priceOfWeapon = Claws[weaponLevel].price;

    if (priceOfWeapon > gold) {
        textDisplayed.innerText = 'You don\'t have enough gold to buy this weapon';
        return;
    } else {
        updateGold(priceOfWeapon, '-');
        goldText.innerText = gold;
        textDisplayed.innerText = `You bought the ${Claws[weaponLevel].name}`;
        updateWeapons('claws');
    }
}
function buySpear(weaponLevel) {
    const priceOfWeapon = Spears[weaponLevel].price;

    if (priceOfWeapon > gold) {
        textDisplayed.innerText = 'You don\'t have enough gold to buy this weapon';
        return;
    } else {
        updateGold(priceOfWeapon, '-');
        goldText.innerText = gold;
        textDisplayed.innerText = `You bought the ${Spears[weaponLevel].name}`;
        updateWeapons('spear');
    }
}

export { buySword, buyHammer, buyClaws, buySpear };