var block = document.getElementById('movableBlock');
var step = 20; // This will define the number of pixels per arrow click

window.addEventListener('keydown', function(event) {
    var left = block.offsetLeft;
    var top = block.offsetTop;

    switch(event.key) {
        case 'ArrowLeft':
            block.style.left = (left - step) + 'px';
            break;
        case 'ArrowRight':
            block.style.left = (left + step) + 'px';
            break;
        case 'ArrowUp':
            block.style.top = (top - step) + 'px';
            break;
        case 'ArrowDown':
            block.style.top = (top + step) + 'px';
            break;
    }

});