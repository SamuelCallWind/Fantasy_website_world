import Swords from "./swords.js";
import Hammers from "./hammer.js";
import Claws from "./claws.js";
import Spears from "./spears.js";
import { boughtFromBlacksmith, gold, goldText, showWeaponBlacksmith, textDisplayed, updateGold, updateWeapons, weapons } from "../main.js";
import { Weapons } from "./displayWeaponImages.js";

function buySword (weaponLevel) {
    const currentSword = document.querySelector('.squareWeapon1');
    const priceOfWeapon = Swords[weaponLevel].price;

    if (priceOfWeapon > gold) {
        textDisplayed.innerText = 'You don\'t have enough gold to buy this weapon';
        return;
    } else if (currentSword.innerText === "Flame Sword") {
        textDisplayed.innerText = 'you already maxed out the upgrade of the sword';
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
    const currentHammer = document.querySelector('.squareWeapon2');
    const priceOfWeapon = Hammers[weaponLevel].price;

    if (priceOfWeapon > gold) {
        textDisplayed.innerText = 'You don\'t have enough gold to buy this weapon';
        return;
    } else if (currentHammer.innerText === "Magic Hammer") {
        textDisplayed.innerText = 'you already maxed out the upgrade of the hammer';
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
    const currentClaws = document.querySelector('.squareWeapon3');
    const priceOfWeapon = Claws[weaponLevel].price;

    if (priceOfWeapon > gold) {
        textDisplayed.innerText = 'You don\'t have enough gold to buy this weapon';
        return;
    } else if (currentClaws.innerText === "Pair Dragon Claws") {
        textDisplayed.innerText = 'you already maxed out the upgrade of the claws';
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
    const currentSpear = document.querySelector('.squareWeapon4');
    const priceOfWeapon = Spears[weaponLevel].price;

    if (priceOfWeapon > gold) {
        textDisplayed.innerText = 'You don\'t have enough gold to buy this weapon';
        return;
    } else if (currentSpear.innerText === "Magic Spear") {
        textDisplayed.innerText = 'you already maxed out the upgrade of the spear';
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
        if (!element.classList.contains('chickenInCity')) {
            element.remove();
        }
    })
    showWeaponBlacksmith();
}

function addWeaponToInventory(weaponType, weaponLevel) {
    const listWeaponBoxes = Array.from(document.querySelectorAll('.squareWeapon'));
    let weaponToUpdate = -1;


    if (weaponType === 'sword') {
        weaponToUpdate = 0;
        removePreviousImage();
        listWeaponBoxes[weaponToUpdate].innerText = Swords[weaponLevel].name;
    } else if (weaponType === 'hammer') {
        weaponToUpdate = 1;
        removePreviousImage();
        listWeaponBoxes[weaponToUpdate].innerText = Hammers[weaponLevel].name;
    } else if (weaponType === 'claws') {
        weaponToUpdate = 2;
        removePreviousImage();
        listWeaponBoxes[weaponToUpdate].innerText = Claws[weaponLevel].name;
    } else if (weaponType === 'spear') {
        weaponToUpdate = 3;
        removePreviousImage();
        listWeaponBoxes[weaponToUpdate].innerText = Spears[weaponLevel].name;
    }

    function removePreviousImage() {
        if (listWeaponBoxes[weaponToUpdate].children.length > 0) {
            Array.from(listWeaponBoxes[weaponToUpdate].children).forEach(element => element.remove());
        }
    }

    const newImage = document.createElement('img');
    const sourceImageWeapon = Weapons[weaponToUpdate][weaponLevel];
    newImage.src = sourceImageWeapon;
    newImage.classList.add('swordInventoryBox');

    listWeaponBoxes[weaponToUpdate].appendChild(newImage);
}

export { buySword, buyHammer, buyClaws, buySpear };