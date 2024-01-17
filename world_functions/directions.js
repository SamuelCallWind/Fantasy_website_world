
let currentLocationAxisY = 0;
let currentLocationAxisX = 0;

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
}


function changeBackground(nameBackground) {
    switch (nameBackground) {
        case 'first_crossroads': {
            document.querySelector('.gameDisplay').style.backgroundImage = 'url(../images/landscapes/first_crossroads.png)';
            const left = document.querySelector('.go.left');
            const right = document.querySelector('.go.right');
            return;
        }
    }
}

function positionTheDirections() {
    const left = document.querySelector('.go.left');
    const right = document.querySelector('.go.right');
}

export { goLeft, goRight, goForward, goBackward, currentLocationAxisX, currentLocationAxisY, changeBackground };