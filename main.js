document.addEventListener('DOMContentLoaded', function () {
    const movement1 = document.querySelector('.movement1');
    const movement2 = document.querySelector('.movement2');
    const movement3 = document.querySelector('.movement3');
    const movement4 = document.querySelector('.movement4');

    movement1.addEventListener('click', function() {
        goChurch();
    });

    const locations = [
        {
            name: "Town Square",
            "movement names": ["Church", "Blacksmith", "Fountain", "Exit City"],
            "movement functions": [goChurch, goBlackSmith, goFountain, exitCity],
            text: "You are in the town square of the city, you look around and see some buildings"
        },
        {
            name: "Church",
            "movement names": ["Buy Potion", "Get poison resistance", "Exit church"],
            "movement functions": [buyPotion, getPoisonResistance, goCity],
            text: "You enetered the church, there is a calm ambiance and a few monks are chanting. One of them walk towards you"
        }
    ];


    function changeActions(locationNumber) {
        const newMovement = locations[locationNumber]["movement names"];
        const displayedMovement = Array.from(document.querySelectorAll('.movement'));

        if (newMovement.length < displayedMovement.length) {
            const lastElement = displayedMovement.pop();
            lastElement.parentElement.removeChild(lastElement);

            changeActions(locationNumber);
            return;
        } else if (newMovement.length > displayedMovement.length) {
            newDiv = document.createElement('div');
            newDiv.classList.add('movement');
            
            document.querySelector('.movementContainer').appendChild(newDiv);
            changeActions(locationNumber);
            return;
        }

        for (let i = 0; i < newMovement.length; i++) {
            displayedMovement[i].innerText = newMovement[i];
            console.log(displayedMovement[i].innerText);
        }


    }

    function goCity() {
        changeActions(0);
    }
    function goChurch() {
        changeActions(1);
    }
    function goBlackSmith() {

    }
    function goFountain() {

    }

    function exitCity() {

    }





    function buyPotion() {

    }
    function getPoisonResistance() {

    }

})