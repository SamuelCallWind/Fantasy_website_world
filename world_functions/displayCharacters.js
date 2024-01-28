import { goCity, updateCharacter } from "../main.js";


function displayCharacters() {
    const characterChoice = document.createElement('div');
    const choiceCharacterOne = document.createElement('div');
    const choiceCharacterTwo = document.createElement('div');

    characterChoice.classList.add('characterChoice');
    choiceCharacterOne.classList.add('choiceCharacterOne');
    choiceCharacterTwo.classList.add('choiceCharacterTwo');

    choiceCharacterOne.style.backgroundImage = 'url(../images/characters/protagonist_1.png)';
    choiceCharacterTwo.style.backgroundImage = 'url(../images/characters/protagonist_2.png)';

    function updateCharacterInStatus(number) {
        goCity();
        if (number === 1) {
            characterStatusContainer.style.backgroundImage = 'url(../images/characters/protagonist_1.png)';
        } else {
            characterStatusContainer.style.backgroundImage = 'url(../images/characters/protagonist_2.png)';
        }
        characterStatusContainer.style.opacity = '1';
        document.querySelector('.gameDisplay').removeChild(characterChoice);
    }

    const characterStatusContainer = document.querySelector('.characterStatus');
    choiceCharacterOne.addEventListener('click', function() {
        updateCharacterInStatus(1)
        updateCharacter(1)
    });
    choiceCharacterTwo.addEventListener('click', function() {
        updateCharacterInStatus()
    });

    characterChoice.appendChild(choiceCharacterOne);
    characterChoice.appendChild(choiceCharacterTwo);
    document.querySelector('.gameDisplay').appendChild(characterChoice);
}



export { displayCharacters };