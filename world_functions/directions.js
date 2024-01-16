
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


function changeBackground() {
    
}


export { goLeft, goRight, goForward, goBackward, currentLocationAxisX, currentLocationAxisY };