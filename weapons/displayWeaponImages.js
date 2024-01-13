

function displayWeaponImagesInForge(sword, hammer, claws, spear) {
    const sourceSwords = ['../images/weapons/swords/sword_level_1.png', '../images/weapons/swords/enhanced_sword.png', '../images/weapons/swords/strong_sword.png', '../images/weapons/swords/flame_sword.png'];
    const sourceHammers = ['../images/weapons/hammers/wooden_hammer.png', '../images/weapons/hammers/enhanced_hammer.png', '../images/weapons/hammers/strong_hammer.png', '../images/weapons/hammers/magic_hammer.png'];
    const sourceClaws = ['../images/weapons/claws/basic_claws.png', '../images/weapons/claws/enhanced_claws.png', '../images/weapons/claws/golden_claws.png', '../images/weapons/claws/pair_dragon_claws.png'];
    const sourceSpear = ['../images/weapons/spears/wooden_spear.png', '../images/weapons/spears/enhanced_spear.png', '../images/weapons/spears/crystal_spear.png', '../images/weapons/spears/magic_spear.png'];
    
    const gameDisplay = document.querySelector('.gameDisplay');
    

    for (let i = 0; i < sourceSwords.length; i++) {
        let test = document.createElement('img');
        test.src = sourceSwords[i];
        gameDisplay.append(test);
    }
}

export default displayWeaponImagesInForge;