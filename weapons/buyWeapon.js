import Swords from "./swords.js";
import Hammers from "./hammer.js";
import Claws from "./claws.js";
import Spears from "./spears.js";
import { gold, goldText, textDisplayed, updateGold } from "../main.js";

function buySword (weaponLevel) {
    const priceOfWeapon = Swords[weaponLevel].price;

    if (priceOfWeapon > gold) {
        textDisplayed.innerText = 'You don\'t have enough gold to buy this weapon';
        return;
    } else {
        updateGold(priceOfWeapon, '-');
        goldText.innerText = gold;
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
    }
}

export { buySword, buyHammer, buyClaws, buySpear };