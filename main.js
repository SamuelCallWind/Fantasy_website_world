document.addEventListener('DOMContentLoaded', function () {
    const action1 = document.querySelector('.action1');
    const action2 = document.querySelector('.action2');
    const action3 = document.querySelector('.action3');
    const action4 = document.querySelector('.action4');


    const locations = [
        {
            name: "Town Square",
            "action names": ["Church", "Blacksmith", "Fountain", "Exit City"],
            "action functions": [goChurch, goBlackSmith, goFountain, exitCity],
            text: "You are in the town square of the city, you look around and see some buildings"
        },
        {
            name: "Church",
            "action names": ["Buy Potion", "Get poison resistance", "Exit church"],
            "action functions": [buyPotion, getPoisonResistance, goCity],
            text: "You enetered the church, there is a calm ambiance and a few monks are chanting. One of them walk towards you"
        }
    ];


    function changeActions(locationNumber) {
        const actions = locations[locationNumber]["action names"];
        const displayedActions = Array.from(document.querySelectorAll('.action'));

        while (displayedActions.length > actions.length) {
            let lastElement = displayedActions.pop();
            if (lastElement) {
                document.querySelector('.actionsContainer').removeChild(lastElement);
            }
        }
    }

    goCity();

    function goCity() {
        changeActions(1);
    }
    function goChurch() {
        changeActions(2);
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