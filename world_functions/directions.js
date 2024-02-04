import { chooseWeaponBeforeFight } from "../battle_functions/chooseWeapon.js";
import { startBattle } from "../battle_functions/startBattle.js";
import { changeActions } from "../main.js";


function goRight() {
    
}
function goForward() {
    
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

export { goRight, goForward, positionTheDirections };