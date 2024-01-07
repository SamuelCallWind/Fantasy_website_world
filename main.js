document.addEventListener('DOMContentLoaded', function () {
    let health = 100;
    let healthText = document.getElementById('healthText');
    let gold = 75;
    let goldText = document.getElementById('goldText');
    let xp = 0;
    let xpText = document.getElementById('xpText');
    let weapons = 0;
    let weaponsBoxes = Array.from(document.querySelectorAll('.squareWeapon'));
    let armor = 0;
    let armorBoxes = Array.from(document.querySelectorAll('.squareArmor'))
    let poisonResistance = false;
    let textDisplayed = document.querySelector('.textDisplayed');

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

        textDisplayed.innerText = textToDisplay;
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
            console.log(poisonResistance);
        } else {
            textDisplayed.innerText = "You don't have enough gold to buy more health"
        }
    }
    function enchantWeapon() {

    }

    function buyWeapon() {
    }
    function buyArmor() {

    }


})