import { startBattle } from "../battle_functions/startBattle.js";
import { changeActions } from "../main.js";

function goHills() {
    changeActions(7);
    changeBackground('hills');
    positionTheDirections('hills', false, false, false, true)
}
function goRight() {
    
}
function goForward() {
    
}


function changeBackground(nameBackground) {
    const gameDisplay = document.querySelector('.gameDisplay');
    if (nameBackground === 'firstCrossroad') {
        gameDisplay.style.backgroundImage = 'url(../images/landscapes/first_crossroads.png)';
        positionTheDirections(nameBackground, true, true, true, true);
        return;
    } else if (nameBackground === 'city') {
        if (Math.floor(Math.random() * 101 > 5)) {
            gameDisplay.style.backgroundImage = 'url(../images/landscapes/town_square_chicken.png)';
            const chickenInCity = document.createElement('div');
            chickenInCity.classList.add('chickenInCity');
            chickenInCity.addEventListener('click', function() {
                startBattle('Chicken');
            });
            document.querySelector('.movementContainer').appendChild(chickenInCity);
        } else {
            gameDisplay.style.backgroundImage = 'url(../images/landscapes/town_square.png)';
            
        }
    } else if (nameBackground === 'hills') {
        gameDisplay.style.backgroundImage = 'url(../images/landscapes/grass_hills.png)'

    }
}

function positionTheDirections(location, isLeft, isRight, isForward, isBackward) {
    
    let left, right, forward, backward;

    if (isLeft) {
        left = document.querySelector('.go.left');
    }
    if (isRight) {
        right = document.querySelector('.go.right');
    }
    if (isForward) {
        forward = document.querySelector('.go.forward');
    }
    if (isBackward) {
        backward = document.querySelector('.go.backward');
    }
    
    if (location === 'firstCrossroad') {
        left.style.top = '70px';
        left.style.left = '100px';
        right.style.bottom = '50px';
        right.style.right = '50px';
        forward.style.top = '70px';
        forward.style.right = '50px';
        backward.style.bottom = '0';
        backward.style.left = '20px';
    } else if ( location === 'hills') {
        backward.style.left = '40%';
        backward.style.bottom = '0';
    }
            

}

export { goHills, goRight, goForward, changeBackground, positionTheDirections };