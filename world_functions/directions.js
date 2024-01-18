import { changeActions } from "../main.js";

function goHills() {
    changeActions(7);
    changeBackground('hills');
}
function goRight() {
    
}
function goForward() {
    
}


function changeBackground(nameBackground) {
    const gameDisplay = document.querySelector('.gameDisplay');
    switch (nameBackground) {
        case 'first_crossroads': 
           gameDisplay.style.backgroundImage = 'url(../images/landscapes/first_crossroads.png)';
            positionTheDirections(nameBackground, true, true, true, true);
            return;
        case 'city':
            if (Math.floor(Math.random() * 101 > 95)) {
                gameDisplay.style.backgroundImage = 'url(../images/landscapes/town_square_chicken.png)'
            } else {
                gameDisplay.style.backgroundImage = 'url(../images/landscapes/town_square.png)'
            }
        case 'hills':
           // gameDisplay.style.backgroundImage = 'url(../images/landscapes/grass_hills.png)'

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
    
    switch (location) {
        case 'first_crossroads':
            left.style.top = '70px';
            left.style.left = '100px';
            right.style.bottom = '50px';
            right.style.right = '50px';
            forward.style.top = '70px';
            forward.style.right = '50px';
            backward.style.bottom = '0';
            backward.style.left = '20px';
    }

}

export { goHills, goRight, goForward, changeBackground };