function createButtonOK() {
    const buttonOK = document.createElement('button');
    buttonOK.classList.add('buttonOK')
    buttonOK.innerText = 'OK';

    return buttonOK;
}

export { createButtonOK };