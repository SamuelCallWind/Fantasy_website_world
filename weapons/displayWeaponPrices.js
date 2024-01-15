import Swords from "./swords.js";
import Claws from "./claws.js";
import Hammers from "./hammer.js";
import Spears from "./spears.js";

function displayWeaponPrices(weapon, levelWeapon) {
    switch (weapon) {
        case 0:
            return `Price: ${Swords[levelWeapon].price}`;
        case 1:
            return `Price: ${Hammers[levelWeapon].price}`;
        case 2:
            return `Price: ${Claws[levelWeapon].price}`;
        case 3:
            return `Price: ${Spears[levelWeapon].price}`;
                
    }
}

export default displayWeaponPrices;