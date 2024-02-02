import Claws from "./claws.js";
import Hammers from "./hammer.js";
import Spears from "./spears.js";
import Swords from "./swords.js";

export function redirectWeapon(nameOfWeapon) {
    const weaponTypeOne = ['Basic Sword', 'Enhanced Sword', 'Strong Sword', 'Flame Sword'];
    const redirectTypeOne = [Swords[0], Swords[1], Swords[2], Swords[3]];
    
    const weaponTypeTwo = ['Wooden Hammer', 'Enhanced Hammer', 'Strong Hammer', 'Magic Hammer'];
    const redirectTypeTwo = [Hammers[0], Hammers[1], Hammers[2], Hammers[3]];
    
    const weaponTypeThree = ['Basic Claws', 'Enhanced Claws', 'Golden Claws', 'Pair Dragon Claws'];
    const redirectTypeThree = [Claws[0], Claws[1], Claws[2], Claws[3]];
    
    const weaponTypeFour = ['Wooden Spear', 'Enhanced Spear', 'Crystal Spear', 'Magic Spear'];
    const redirectTypeFour = [Spears[0], Spears[1], Spears[2], Spears[3]];

    const weaponTypesList = [weaponTypeOne, weaponTypeTwo, weaponTypeThree, weaponTypeFour];
    const redirectTypeList = [redirectTypeOne, redirectTypeTwo, redirectTypeThree, redirectTypeFour];

    for (let i = 0; i < weaponTypesList.length; i++) {
        for (let j = 0; j < weaponTypesList[i].length; j++) {
            if (weaponTypesList[i][j] === nameOfWeapon) {
                return redirectTypeList[i][j];
            }
        }
    }
}

export function redirectTypeOfWeapon(nameOfWeapon) {
    const weaponTypeOne = ['Basic Sword', 'Enhanced Sword', 'Strong Sword', 'Flame Sword'];
    const weaponTypeTwo = ['Wooden Hammer', 'Enhanced Hammer', 'Strong Hammer', 'Magic Hammer'];
    const weaponTypeThree = ['Basic Claws', 'Enhanced Claws', 'Golden Claws', 'Pair Dragon Claws'];
    const weaponTypeFour = ['Wooden Spear', 'Enhanced Spear', 'Crystal Spear', 'Magic Spear'];
    const weaponTypesList = [weaponTypeOne, 'sword', weaponTypeTwo, 'hammer', weaponTypeThree, 'claws', weaponTypeFour, 'spear'];

    for (let i = 0; i < weaponTypesList.length; i+=2) {
        if (weaponTypesList[i].includes(nameOfWeapon)) {
            return weaponTypesList[i+1];
        }
    } 
    return null;
}