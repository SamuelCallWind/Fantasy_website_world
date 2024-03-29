import Claws from "./weapons/claws.js";
import { displayWeaponImagesInForge } from "./weapons/displayWeaponImages.js";
import Hammers from "./weapons/hammer.js";
import Spears from "./weapons/spears.js";
import Swords from "./weapons/swords.js";
import { buySword, buyHammer, buyClaws, buySpear } from './weapons/buyWeapon.js'
import { goForward, goRight, positionTheDirections } from "./world_functions/directions.js";
import { displayCharacters } from "./world_functions/displayCharacters.js";
import { changeBackground } from "./world_functions/changeBackground.js";
import { capitalizeFirstLetter } from "./texts_to_display/fight_texts/allTexts.js";

let character = 0;
let health = 100;
let maxHealth = 100;
let healthText = document.getElementById('healthText');
let gold = 100000;
let goldText = document.getElementById('goldText');
let xp = 0;
let xpText = document.getElementById('xpText');
let currentLocation = document.querySelector('.currentLocation');
let statsPlayer = { strength: 0, defense: 0, vitality:0, magic: 0 };
let weapons = {
    sword: 0, hammer: 0, claws: 0, spear: 0, sickle: 0
};
let inventory = [];
let armor = {
    armor1: 0,
    armor2: 0,
    armor3: 0,
    armor4: 0
};
let poisonResistance = false;
const monk = {
    bought: 0,
    happiness: 0,
    anger: 0
}
const blacksmith = {
    bought: 0,
    happiness: 0,
    anger: 0
}
let textDisplayed = document.querySelector('.textDisplayed');
const movementContainer = document.querySelector('.movementContainer');

function updateCharacter(characterNumber) {
    if (characterNumber === 1) {
        character = 1;
    } else {
        character = 2;
    }
}

function returnCharacter() {
    const characterChecked = character;
    return characterChecked;
}

function updateGold(amount, sign) {
    if (sign === '+') {
        gold += amount;
    } else if (sign === '-') {
        gold -= amount;
    }
}
function updateWeapons(weaponName) {
    if (weapons[weaponName] < 3) {
        weapons[weaponName] += 1;
    }
}
function updateHealth(points, operator, isCritical) {
    if (operator === '+') {
        if (health < maxHealth) {
            if ((health + points) > maxHealth) {
                gameDisplay.innerText = `You gained ${maxHealth - health} health points`;
                health = maxHealth;
                healthText.innerText = health;
                return;
            } else {
                health += points;
                healthText.innerText = health;
                gameDisplay.innerText = `You gained ${points} health points`;
                return;
            }
        } else {
            health += points;
            healthText.innerText = health;
            gameDisplay.innerText = `You gained ${points} health points`;
            return;
        }
    } else if (operator === '-') {
        if (isCritical) {
            health -= points * 2;
            healthText.innerText = health;
            textDisplayed.innerText = `Ouch, that was a critical hit \nYou've lost ${points * 2} health points`; 
        } else {
            health -= points;
            healthText.innerText = health;
            textDisplayed.innerText = `You've lost ${points} health points`;
        }
        return checkHealth();
    } else if (operator === '/') {
        gameDisplay.innerText = `You've lost ${Math.ceil(health /= points)} health points`;
        health = Math.ceil(health /= points);
        healthText.innerText = health;
        return;
    } else if (operator === '*') {
        gameDisplay.innerText = `You gained ${health * points} health points`;
        health *= points;
        healthText.innerText = health;
        return;
    }
}
function updateXP(number, operator) {
    if (operator === '+') {
        xp += number;
        xpText.innerText = xp;
    } else if (operator === '-') {
        xp -= number;
        xpText.innerText = xp;
    }
}

function removeMovements() {
    while (movementContainer.firstChild) {
        movementContainer.removeChild(movementContainer.firstChild);
    }
}

function getCurrentLocation() {
    return currentLocation.innerText;
}

let armorBoxes = Array.from(document.querySelectorAll('.squareArmor'))
let weaponsBoxes = Array.from(document.querySelectorAll('.squareWeapon'));


function addStartGame() {
    const startGame = document.createElement('button');
    startGame.classList.add('startGame');
    startGame.innerText = 'Start Game'
    startGame.addEventListener('click', () => {
        displayCharacters();
        document.querySelector('.gameDisplay').removeChild(startGame);
    })
    document.querySelector('.gameDisplay').appendChild(startGame);
}
addStartGame();
const locations = [
    {
        name: "Town Square",
        "movement names": ["Church", "Blacksmith", "Statue", "Exit City"],
        "movement functions": [goChurch, goBlackSmith, goStatue, goCrossroad],
        text: "You are in the town square of the city, you look around and see some buildings"
    },
    {
        name: "Church",
        "movement names": ["Buy Potion \n (+10 health)", "Get poison resistance", "Enchant weapon", "Exit"],
        "movement functions": [buyPotion, getPoisonResistance, enchantWeapon, goCity],
        text: "You enetered the church, there is a calm ambiance and a few monks are chanting. One of them walk towards you..."
    },
    {
        name: "Blacksmith",
        "movement names": ["Buy Weapon", "Buy Armor", "Exit"],
        "movement functions": [showWeaponBlacksmith, buyArmor, goCity],
        text: "You enter the forge where the blacksmith is working. He looks at you and says: \n \"Do you need something?\""
    },
    {
        name: "Buy Weapon",
        "movement names": ["sword", "hammer", "claws", "spear", "Exit"],
        "movement functions": [function () { buySword(weapons.sword)}, function () { buyHammer(weapons.hammer)}, function () { buyClaws(weapons.claws)}, function () { buySpear(weapons.spear)}, goBlackSmith],
        text: "The blacksmith turns and show you all his current weapon stock\n\"Choose what you need\" he said."
    },
    {
        name: "Buy Armor",
        "movement names": ["armor 1", "armor 2", "armor 3", "armor 4"],
        "movement functions": [],
        text: "The blacksmith turns and show you all his current weapon stock\n\"Choose what you need\" he said."
    },
    {
        name: "Statue",
        "movement names": ["Exit"],
        "movement functions": [goCity],
        text: "You look at the beautiful statue of the king. \nHis name was Kong the II.\nHe died heroically fighting the Spartan Warlord"
    }, 
    {
        name: "First Crossroad",
        "movement names": ["Go left", "Go right", "Go forward", "Go Backward"],
        "movement functions": [goHills, goRight, goGrassRockySingleRoad, goCity],
        text: "You've walked a few hundred meters out of the city following the road and you are now standing at a crossroad.\nWhich direction do you want to go?"
    },
    {
        name: "Hills", 
        "movement names": ["Go Backward"],
        "movement functions": [goCrossroad],
        text: "This is the end of the road.\nThere is a beautiful view and a calm breeze.\nWhat do you want to do?"
    },
    {
        name: "Grass Rocky Single Road",
        "movement names": ["Go forward", "Go backward"],
        "movement functions": [goBeginningOfForrest, goCrossroad],
        text: "You walked for about 15 minutes and start to see some trees on the side. What do you want to do?"
    },
    {
        name: "Beginning of forrest",
        "movement names": ["Go forward", "Go backward"],
        "movement functions": [goForrest, goGrassRockySingleRoad],
        text: "You are at the beginning of a forrest, what do you want to do?"
    }
];
function changeActions(locationNumber) {
    currentLocation.innerText = locations[locationNumber].name;
    const newMovement = locations[locationNumber]["movement names"];
    const movementFunctions = locations[locationNumber]["movement functions"];
    const displayedMovement = Array.from(document.querySelectorAll('.movement'));
    const textToDisplay = locations[locationNumber].text;
    const container = movementContainer;
    displayedMovement.forEach(element => {
        container.removeChild(element);
    });
    for (let i = 0; i < newMovement.length; i++) {
        const newDiv = document.createElement('div');
        const containerMovement = movementContainer;
        //--------------------------START Case for Blacksmith's show weapons --------------
        if (locationNumber === 3) {
            if (i === newMovement.length - 1) {
                newDiv.classList.add('exit', 'movement');
            } else {
                newDiv.classList.add('weaponBox');
            }
            newDiv.addEventListener('click', movementFunctions[i])
            containerMovement.classList.add('gridAutoCol50', 'flexColumn', 'spaceEvenly');
            // adding the pictures once if the last box was added:
            if ( i === newMovement.length - 1) {
                displayWeaponImagesInForge(weapons.sword, weapons.hammer, weapons.claws, weapons.spear);
            }
        //--------------------------END Case for Blacksmith's show weapons --------------
        
        //--------------------------START Case for Blacksmith's show armor --------------
        } else if (locationNumber === 4) {
            newDiv.classList.add('armorBox');
            containerMovement.classList.add('gridAutoCol50', 'flexColumn', 'spaceEvenly');
        //--------------------------END Case for Blacksmith's show armor --------------
        } else {
            newDiv.classList.add('movement');
            containerMovement.classList.remove('gridAutoCol50', 'flexColumn', 'spaceEvenly');
        }
        addClassOfMovement(i, newDiv, locationNumber);
        newDiv.addEventListener('click', movementFunctions[i]);
        newDiv.innerText = newMovement[i];
        container.appendChild(newDiv);
    }
    
    textDisplayed.innerText = textToDisplay;
}
function addClassOfMovement(movementNumber, newDivToAssignClasses, locationNumber) {
    const listClasses = locations[locationNumber]["movement names"][movementNumber].toLowerCase().split(' ');
    listClasses.map(item => {
        if (item.length > 1) {
            newDivToAssignClasses.classList.add(item);
        }
    })
}
function goCity() {
    if (currentLocation.innerText === 'Church') {
        changeActions(0);
        changeBackground('city');
        if (monk.bought === 0) {
            nothingBoughtFromMonk();
        }
    } else if (currentLocation.innerText === 'Blacksmith'){
        changeActions(0);
        changeBackground('city');
        if (blacksmith.bought === 0) {
            nothingBoughtFromBlacksmith();
        }
        
        movementContainer.classList.remove('gridAutoCol50', 'flexColumn', 'spaceEvenly');
    } else {
        changeActions(0);
        changeBackground('city');
    }
}
function goChurch() {
    changeActions(1);
    changeBackground('church');
    movementContainer.style.cssText = 'display: flex; align-items: center; justify-content: space-evenly;';
    if (monk.anger >= 2) {
        textDisplayed.innerText = 'The monks are looking at you strangely.\n It seems like they don\'t want to see you wandering around in their place.\n Especially when you don\'t buy anything.'
    }
    const buyPotionDiv = document.querySelector('.buy.potion');
    const poisonResistanceDiv = document.querySelector('.poison.resistance');
    const enchantWeaponDiv = document.querySelector('.enchant.weapon');

    const priceBuyPotion = document.createElement('div');
    const pricePoisonResistance = document.createElement('div');
    const priceEnchantWeapon = document.createElement('div');

    priceBuyPotion.textContent = 'Price: \n10 gold';
    priceBuyPotion.classList.add('priceBuyPotion');
    pricePoisonResistance.textContent = 'Price: \n30 gold';
    pricePoisonResistance.classList.add('pricePoisonResistance')
    priceEnchantWeapon.textContent = 'Price: \n50 gold';
    priceEnchantWeapon.classList.add('priceEnchantWeapon');

    buyPotionDiv.appendChild(priceBuyPotion);
    poisonResistanceDiv.appendChild(pricePoisonResistance);
    enchantWeaponDiv.appendChild(priceEnchantWeapon);
    
}
function goBlackSmith() {
    const weaponDisplayed = Array.from(document.querySelectorAll('.weaponBox'));
    const armorDisplayed = Array.from(document.querySelectorAll('.armorBoxes'));
    if (weaponDisplayed.length > 1) {
        weaponDisplayed.map(element => movementContainer.removeChild(element));
        movementContainer.removeChild(document.querySelector('.exit'))
    }
    changeActions(2);
    changeBackground('blacksmith');
    
    if (blacksmith.anger === 2) {
        textDisplayed.innerText = 'The blacksmith starts to look at you angrily.';
    } else if (blacksmith.anger > 2) {
        textDisplayed.innerText = 'The blacksmith is grabbing a spear! It\'s becoming serious.\n You better buy something to calm him a bit.';
    }
}
function showWeaponBlacksmith() {
    changeActions(3);
}
function buyArmor() {
    // changeActions(4);
    // Armors to be implpemented later
}
function goStatue() {
    changeActions(5);
}
function goCrossroad() {
    changeActions(6);
    changeBackground('firstCrossroad');
}
function goHills() {
    changeActions(7);
    changeBackground('hills');
    positionTheDirections('hills', false, false, false, true)
}
function goGrassRockySingleRoad() {
    changeActions(8);
    changeBackground('grassRockySingleRoad');
    positionTheDirections('grassRockySingleRoad', true, false, false, true);
}
function goBeginningOfForrest() {
    changeActions(9);
    changeBackground('beginningForrest');
    positionTheDirections('beginningForrest', true, false, false, true);
}
function goForrest() {
    changeActions(10);
    changeBackground('beginningForrest');
    positionTheDirections('beginningForrest');
}

function checkHealth() {
    if (health <= 0) {
        looseGame();
        health = 0;
        healthText.innerText = 0;
        return 'dead';
    } else {
        return 'alive';
    }
}
function looseGame() {
    const movements = Array.from(movementContainer.children);
    movements.forEach(element => {
        element.remove();
    }); 
    if (document.querySelector('buttonOK')) {
        document.querySelector('buttonOK').remove();
    } 
    document.querySelector('.action').displayCharacters= 'none';
    const gameDisplay = document.querySelector('.gameDisplay');
    gameDisplay.style.backgroundImage = 'none';
    const playAgainContainer = document.createElement('div');
    const playAgainButton = document.createElement('button');
    playAgainContainer.classList.add('playAgainContainer');
    playAgainContainer.innerText = 'You died';
    playAgainButton.classList.add('playAgainButton');
    playAgainButton.innerText = 'Play Again';
    playAgainButton.addEventListener('click', function () {
        restartGame(playAgainContainer);
    });
    playAgainContainer.appendChild(playAgainButton);
    gameDisplay.appendChild(playAgainContainer)
    
}
function boughtFromMonk() {
    monk.happiness += 1;
    monk.anger = 0;
}
function nothingBoughtFromMonk() {
    monk.happiness = 0;
    monk.anger += 1;
    if (monk.anger >= 3) {
        textDisplayed.innerText = 'The monks push you out of the church and you miss one step.\n You sprained your ankle and lost 5 health points'
        health -= 5;
        healthText.innerText = health;
        checkHealth()
    }
}
function boughtFromBlacksmith() {
    blacksmith.happiness += 1;
    blacksmith.anger = 0;
}
function nothingBoughtFromBlacksmith() {
    blacksmith.happiness = 0;
    blacksmith.anger += 1;
    if (blacksmith.anger === 3) {
        textDisplayed.innerText = 'The blacksmith throws his hammer to your shoulder and hurt you.\nYou run outside to not get another hit.'
        health -= 5;
        healthText.innerText = health;
        checkHealth()
    } else if (blacksmith.anger > 3) {
        textDisplayed.innerText = 'The blacksmith throws the spear at your leg and you now have a big cut.\nYou ran off as you could.'
        health -= 40;
        healthText.innerText = health;
        checkHealth()
    }
}
function buyPotion() {
    if (gold >= 10) {
        if (health < maxHealth) {
            health = (health + 10 > maxHealth) ? maxHealth : health + 10;
            healthText.innerText = health;
            gold -= 10;
            goldText.innerText = gold;
        } else {
            textDisplayed.innerText = 'Your health is currently at it\'s maximum.';
        }
    } else {
        textDisplayed.innerText = "You don't have enough gold to buy more health"
    }
}
function getPoisonResistance() {
    if (gold >= 30) {
        gold -= 30;
        goldText.innerText = gold;
        boughtFromMonk();
        updatePoisonResistance();
    } else {
        textDisplayed.innerText = "You don't have enough gold to buy more poison resistance."
    }
}
function updatePoisonResistance(howMuchToRemove) {
    if (howMuchToRemove) {
        if (poisonResistance === false) {
            console.log('no poison resistance found')
            return;
        } else {
            poisonResistance.rounds -= howMuchToRemove;
            console.log(poisonResistance.rounds + ' left of poison resist');
            if (poisonResistance.rounds === 0) {
                poisonResistance = false;
                document.querySelector('.poisonResistanceLogo').remove();
                console.log('no more poison resistance');
            }
        }
        return;
    }
    if (!document.querySelector('.poisonResistanceLogo')) {
        const poisonResistanceLogo = document.createElement('img');
        poisonResistanceLogo.src = './images/misc/poison_resistance_logo.png';
        poisonResistanceLogo.classList.add('poisonResistanceLogo');
        document.querySelector('.status').appendChild(poisonResistanceLogo);
    }
    if (poisonResistance !== false) {
        poisonResistance.rounds = poisonResistance.rounds += 10;
        textDisplayed.innerText = `The monk took a strange feather and added a mixture on it's tip.\n The moment the feather made contact with your head, you felt a strong energy protecting you.\nYou still have ${poisonResistance.rounds} rounds with the protection`;
    } else {
        poisonResistance = { rounds: 10 };
        textDisplayed.innerText = "The monk took a strange feather and added a mixture on it's tip.\n The moment the feather made contact with your head, you felt a strong energy protecting you.\nYou now are protected against poisons";
    }
}
function enchantWeapon() {
    if (weapons.sword === 0 && weapons.claws === 0 && weapons.hammer === 0 && weapons.spear === 0) {
        textDisplayed.innerText = 'You do not have any weapon to enchant.';
        return;
    }
    if (weapons === 0) {
        textDisplayed.innerHTML = "You don't have any weapon, therefore you cannot enchant it"
    } else {
        if (gold > 50) {
            gold -= 50;
            goldText.innerText = gold;
            textDisplayed.innerText = "The monk called the other ones in the church.\nThey all gave their hands on your weapon and made an incantation.\nYour Weapon now has an aura around it";
            boughtFromMonk();
        } else {
            textDisplayed.innerText = "You don't have enough money to purchase the Enchantment"
        }
    }
}
function restartGame(restartContainer) {
    health = 100;
    healthText.innerText = 100
    gold = 60;
    goldText.innerText = 60;
    xp = 0;
    xpText.innerText = 0
    weapons.sword = 0;
    weapons.hammer = 0, 
    weapons.claws = 0, 
    weapons.spear = 0,
    armor.armor1 = 0;
    armor.armor2 = 0;
    armor.armor3 = 0;
    armor.armor4 = 0;
    poisonResistance = false;
    monk.anger = 0;
    monk.bought = 0;
    monk.happiness = 0;
    blacksmith.anger = 0;
    blacksmith.bought = 0;
    blacksmith.happiness = 0;
    armorBoxes.map(box => {
        while (box.firstChild) {
            box.removeChild(box.firstChild)
        }
    });
    weaponsBoxes.map(box => {
        while (box.firstChild) {
            box.removeChild(box.firstChild)
        }
    });
    restartContainer.remove();
    document.querySelector('.gameDisplay').style.backgroundImage = 'url(./images/landscapes/town_square.png)'
    goCity();
}

// document.querySelector('.addOneOfEverything').addEventListener('click', function() {
//     addOneOfEverything();
// })

function addOneOfEverything() {
    statsPlayer.strength += 1;
    statsPlayer.defense += 1;
    statsPlayer.magic += 1;
    statsPlayer.vitality += 1;
}

function removeAndCreateActionButtons() {
    const actionContainer = document.querySelector('.action');
    while (actionContainer.firstChild) {
        actionContainer.firstChild.remove()
    }
    const actions = ["attack", "special", "dodge", "inventory", "run"];
    for (let i = 0; i < actions.length; i++) {
        let newAction = document.createElement('button');
        newAction.innerText = capitalizeFirstLetter(actions[i]);
        newAction.classList.add(actions[i]);
        actionContainer.appendChild(newAction);
    }
}

document.querySelector('.gameDisplay').addEventListener('click', function(event) {
    console.log(`mouse X: ${event.offsetX}, Mouse Y: ${event.offsetY}`);
});

export { gold, updateXP, goldText, inventory, updateGold, updatePoisonResistance, updateHealth, locations, weapons, statsPlayer, updateWeapons, showWeaponBlacksmith, textDisplayed, goCity, changeActions, boughtFromBlacksmith, updateCharacter, returnCharacter, removeMovements, checkHealth , getCurrentLocation, removeAndCreateActionButtons};
