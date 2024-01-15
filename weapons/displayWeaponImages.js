
import displayWeaponPrices from "./displayWeaponPrices.js";

const Weapons = [   
    /* swords */ ['../images/weapons/swords/basic_sword.png', '../images/weapons/swords/enhanced_sword.png', '../images/weapons/swords/strong_sword.png', '../images/weapons/swords/flame_sword.png'],
    /* hammers */ ['../images/weapons/hammers/wooden_hammer.png', '../images/weapons/hammers/enhanced_hammer.png', '../images/weapons/hammers/strong_hammer.png', '../images/weapons/hammers/magic_hammer.png'],
    /* claws */ ['../images/weapons/claws/basic_claws.png', '../images/weapons/claws/enhanced_claws.png', '../images/weapons/claws/golden_claws.png', '../images/weapons/claws/pair_dragon_claws.png'],
    /* spears */ ['../images/weapons/spears/wooden_spear.png', '../images/weapons/spears/enhanced_spear.png', '../images/weapons/spears/crystal_spear.png', '../images/weapons/spears/magic_spear.png']
]

function displayWeaponImagesInForge(...args) {

    
    const listBoxes = Array.from(document.querySelectorAll('.weaponBox'));
    

    for (let i = 0; i < args.length; i++) {
        const sourcePicture = document.createElement('img');
        const priceTag = document.createElement('div');
        priceTag.classList.add('priceTag');
        priceTag.innerText = displayWeaponPrices(i, args[i]);
        
        sourcePicture.classList.add('weaponDisplayedBlacksmith');
        sourcePicture.src = Weapons[i][args[i]];
        listBoxes[i].appendChild(sourcePicture);
        listBoxes[i].appendChild(priceTag);
    }
}

export { displayWeaponImagesInForge, Weapons };