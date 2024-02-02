function displayActions() {
    const listClasses = ['attack', 'special', 'dodge', 'inventory', 'run'];
    const action = document.createElement('div');
    action.classList.add('action');

    for (let i= 0; i < listClasses.length; i++) {
        const newElement = document.createElement('button');
        newElement.classList.add(listClasses[i]);

        action.appendChild(newElement);
    }

    document.body.appendChild(action);
}
function removeActions() {
    document.querySelector('.action').remove();
}

export { displayActions, removeActions };