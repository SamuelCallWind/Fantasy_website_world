import { goCity } from "../main.js";

let currentLocationAxisY = 0;
let currentLocationAxisX = 0;

function updatedCoordinateXY(Axis, operator) {
    if (Axis === 'y') {
        if (operator === "-") {
            currentLocationAxisY -= 1;
        } else {
            currentLocationAxisY += 1;
        }
    } else {
        if (operator === '-') {
            currentLocationAxisX -= 1;
        } else {
            currentLocationAxisX += 1;
        }
    }
}

function goLeft() {
    currentLocationAxisX -= 1;
}
function goRight() {
    currentLocationAxisX += 1;
}
function goForward() {
    currentLocationAxisY += 1;
}
function goBackward() {
    currentLocationAxisY -= 1;
    checkPositionCoordinate();
}

function checkPositionCoordinate() {
    if (currentLocationAxisX === 0 && currentLocationAxisY === 0) {
        goCity();
        changeBackground('city');
    }
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

export { goLeft, goRight, goForward, goBackward, currentLocationAxisX, currentLocationAxisY, updatedCoordinateXY, changeBackground };