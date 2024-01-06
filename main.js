document.addEventListener('DOMContentLoaded', function () {
    const health = 100;
    const healthText = document.getElementById('healthText');
    const gold = 75;
    const goldText = document.getElementById('goldText');
    const xp = 0;
    const xpText = document.getElementById('xpText');
    const weapons = 0;
    const weaponsBoxes = Array.from(document.querySelectorAll('.squareWeapon'));
    const armor = 0;
    const armorBoxes = Array.from(document.querySelectorAll('.squareArmor'))


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
            "movement names": ["Buy Potion", "Get poison resistance", "Enchant weapon", "Exit"],
            "movement functions": [buyPotion, getPoisonResistance, enchantWeapon, goCity],
            text: "You enetered the church, there is a calm ambiance and a few monks are chanting. One of them walk towards you..."
        },
        {
            name: "Blacksmith",
            "movement names": ["Buy Weapon", "Buy Armor", "Exit"],
            "movement functions": [buyWeapon, buyArmor, goCity],
            text: "You enter the forge where the blacksmith is working. He looks at you and say: \n \"Do you need something?\""
        }
    ];


    function changeActions(locationNumber) {
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
            newDiv.classList.add('movement');
            newDiv.addEventListener('click', movementFunctions[i]);
            newDiv.innerText = newMovement[i];
            container.appendChild(newDiv);
        }

        document.querySelector('.textDisplayed').innerText = textToDisplay;
    }

    function goCity() {
        changeActions(0);
    }
    function goChurch() {
        changeActions(1);
    }
    function goBlackSmith() {
        changeActions(2);
    }
    function goFountain() {

    }

    function exitCity() {

    }





    function buyPotion() {
        const currentGold = document.querySelector('gold')
    }
    function getPoisonResistance() {

    }
    function enchantWeapon() {

    }

    function buyWeapon() {
    }
    function buyArmor() {

    }


})