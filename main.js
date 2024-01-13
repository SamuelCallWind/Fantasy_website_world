import Claws from "./weapons/claws.js";
import displayWeaponImagesInForge from "./weapons/displayWeaponImages.js";
import Hammers from "./weapons/hammer.js";
import Spears from "./weapons/spear.js";
import Swords from "./weapons/swords.js";


document.addEventListener('DOMContentLoaded', function () {
    let health = 100;
    let healthText = document.getElementById('healthText');
    let gold = 75;
    let goldText = document.getElementById('goldText');
    let xp = 0;
    let xpText = document.getElementById('xpText');
    let currentLocation = document.querySelector('.currentLocation');
    let weapons = {
        sword: 0, hammer: 0, claws: 0, spear: 0,
    };
    let weaponsBoxes = Array.from(document.querySelectorAll('.squareWeapon'));
    let armor = {
        armor1: 0,
        armor2: 0,
        armor3: 0,
        armor4: 0
    };
    let armorBoxes = Array.from(document.querySelectorAll('.squareArmor'))
    let poisonResistance = false;
    let textDisplayed = document.querySelector('.textDisplayed');


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

    const movement1 = document.querySelector('.movement1');
    const movement2 = document.querySelector('.movement2');
    const movement3 = document.querySelector('.movement3');
    const movement4 = document.querySelector('.movement4');

    movement1.addEventListener('click', function() {
        goChurch();
    });
    movement2.addEventListener('click', function() {
        goBlackSmith();
    })

    const locations = [
        {
            name: "Town Square",
            "movement names": ["Church", "Blacksmith", "Fountain", "Exit City"],
            "movement functions": [goChurch, goBlackSmith, goFountain, exitCity],
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
            "movement names": ["sword", "hammer", "claws", "spear"],
            "movement functions": [],
            text: "The blacksmith turns and show you all his current weapon stock\n\"Choose what you need\" he said."
        },
        {
            name: "Buy Armor",
            "movement names": ["armor 1", "armor 2", "armor 3", "armor 4"],
            "movement functions": [],
            text: "The blacksmith turns and show you all his current weapon stock\n\"Choose what you need\" he said."
        }
    ];

    const weaponArts = {

    }

    function changeActions(locationNumber) {
        currentLocation.innerText = locations[locationNumber].name;
        const newMovement = locations[locationNumber]["movement names"];
        const movementFunctions = locations[locationNumber]["movement functions"];
        const displayedMovement = Array.from(document.querySelectorAll('.movement'));
        const textToDisplay = locations[locationNumber].text;
        const container = document.querySelector('.movementContainer');

        displayedMovement.forEach(element => {
            container.removeChild(element);
        });


        for (let i = 0; i < newMovement.length; i++) {
            const newDiv = document.createElement('div');
            const containerMovement = document.querySelector('.movementContainer');

            if (locationNumber === 3) {
                newDiv.classList.add('weaponBox');
                

                newDiv.addEventListener('click', (event) => {
                    let selectedWeapon = event.target.innerText;
                    buyWeapon(selectedWeapon, weapons[selectedWeapon])
                })
                displayWeaponImagesInForge();
                containerMovement.classList.add('gridAutoCol50', 'flexColumn', 'spaceEvenly');

            } else if (locationNumber === 4) {
                newDiv.classList.add('armorBox');
                containerMovement.classList.add('gridAutoCol50', 'flexColumn', 'spaceEvenly');
            } else {
                newDiv.classList.add('movement');
            }
            newDiv.addEventListener('click', movementFunctions[i]);
            newDiv.innerText = newMovement[i];
            container.appendChild(newDiv);
        }

        textDisplayed.innerText = textToDisplay;
    }

    function goCity() {
        if (currentLocation.innerText === 'Church') {
            changeActions(0);
            if (monk.bought === 0) {
                nothingBoughtFromMonk();
            }
        } else if (currentLocation.innerText === 'Blacksmith'){
            changeActions(0);
            if (blacksmith.bought === 0) {
                nothingBoughtFromBlacksmith();
            }
        } else {
            changeActions(0);
        }
    }
    function goChurch() {
        changeActions(1);
        if (monk.anger >= 2) {
            textDisplayed.innerText = 'The monks are looking at you strangely.\n It seems like they don\'t want to see you wandering around in their place.\n Especially when you don\'t buy anything.'
        }
    }
    function goBlackSmith() {
        changeActions(2);
        if (blacksmith.anger === 2) {
            textDisplayed.innerText = 'The blacksmith starts to look at you angrily.';
        } else if (blacksmith.anger > 2) {
            textDisplayed.innerText = 'The blacksmith is grabbing a spear! It\'s becoming serious. You better buy something to calm him a bit.';
        }
    }
    function showWeaponBlacksmith() {
        changeActions(3);
    }
    function buyArmor() {
        changeActions(4);
    }
    function goFountain() {

    }

    function exitCity() {

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
        } else if (blacksmith.anger > 3) {
            textDisplayed.innerText = 'The blacksmith throws the spear at your leg and you now have a big cut.\nYou ran off as you could.'
            health -= 40;
            healthText.innerText = health;
        }

    }


    function buyPotion() {
        if (gold >= 10) {
            gold -= 10;
            goldText.innerText = gold;
            health += 10;
            healthText.innerText = health;
            textDisplayed.innerText = "You drank the potion and feel a bit better. You gained 10 health";
        } else {
            textDisplayed.innerText = "You don't have enough gold to buy more health"
        }
    }
    function getPoisonResistance() {
        if (gold >= 30) {
            gold -= 30;
            goldText.innerText = gold;
            textDisplayed.innerText = "The monk took a strange feather and added a mixture on it's tip.\n The moment the feather made contact with your head, you felt a strong energy protecting you.\nYou now are protected against poisons";
            poisonResistance = true;
            boughtFromMonk();
        } else {
            textDisplayed.innerText = "You don't have enough gold to buy more health"
        }
    }
    function enchantWeapon() {
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


    function buyWeapon(weaponType, weaponLevel) {
        const price = 0;

        if (weaponType === 'sword') {
            const price = Swords[weaponLevel].price;
        } else if (weaponType === 'hammer') {
            const price = Hammers[weaponLevel].price;
        } else if (weaponType === 'claws') {
            const price = Claws[weaponLevel].price;
        } else if (weaponType === 'spear') {
            const price = Spears[weaponLevel].price;
        }

    }




})