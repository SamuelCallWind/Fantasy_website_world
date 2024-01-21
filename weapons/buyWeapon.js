import Swords from "./swords.js";
import Hammers from "./hammer.js";
import Claws from "./claws.js";
import Spears from "./spears.js";
import { boughtFromBlacksmith, gold, goldText, showWeaponBlacksmith, textDisplayed, updateGold, updateWeapons, weapons } from "../main.js";
import { Weapons } from "./displayWeaponImages.js";

function buySword (weaponLevel) {
    const priceOfWeapon = Swords[weaponLevel].price;

    if (priceOfWeapon > gold) {
        textDisplayed.innerText = 'You don\'t have enough gold to buy this weapon';
        return;
    } else {
        updateGold(priceOfWeapon, '-');
        goldText.innerText = gold;
        updateWeapons('sword');
        updateWeaponsDisplayed();
        addWeaponToInventory('sword', weaponLevel);
        textDisplayed.innerText = `You bought the ${Swords[weaponLevel].name}`;
        boughtFromBlacksmith();
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
        updateWeapons('hammer');
        updateWeaponsDisplayed();
        addWeaponToInventory('hammer', weaponLevel);
        textDisplayed.innerText = `You bought the ${Hammers[weaponLevel].name}`;
        boughtFromBlacksmith();
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
        updateWeapons('claws');
        updateWeaponsDisplayed();
        addWeaponToInventory('claws', weaponLevel);
        textDisplayed.innerText = `You bought the ${Claws[weaponLevel].name}`;
        boughtFromBlacksmith();
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
        updateWeapons('spear');
        updateWeaponsDisplayed();
        addWeaponToInventory('spear', weaponLevel);
        textDisplayed.innerText = `You bought the ${Spears[weaponLevel].name}`;
        boughtFromBlacksmith();
    }
}

function updateWeaponsDisplayed() {
    Array.from(document.querySelector('.movementContainer').children).forEach(element => {
        element.remove();
    })
    showWeaponBlacksmith();
}

function addWeaponToInventory(weaponType, weaponLevel) {
    const listWeaponBoxes = Array.from(document.querySelectorAll('.squareWeapon'));
    let weaponToUpdate = -1;

    if (weaponType === 'sword') {
        weaponToUpdate = 0;
    } else if (weaponType === 'hammer') {
        weaponToUpdate = 1;
    } else if (weaponType === 'claws') {
        weaponToUpdate = 2;
    } else if (weaponType === 'spear') {
        weaponToUpdate = 3;
    }

    const newImage = document.createElement('img');
    const sourceImageWeapon = Weapons[weaponToUpdate][weaponLevel];
    newImage.src = sourceImageWeapon;
    newImage.classList.add('swordInventoryBox');
    if (listWeaponBoxes[weaponToUpdate].children.length > 0) {
        Array.from(swordBoxInventory.children).forEach(element => element.remove());
    }
    listWeaponBoxes[weaponToUpdate].innerText = `${Swords[weaponLevel].name}`;
    listWeaponBoxes[weaponToUpdate].appendChild(newImage);
}

export { buySword, buyHammer, buyClaws, buySpear };