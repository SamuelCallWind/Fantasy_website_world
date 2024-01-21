import { goCity, updateCharacter } from "../main.js";


function displayCharacters() {
    const characterChoice = document.createElement('div');
    const choiceCharacterOne = document.createElement('div');
    const choiceCharacterTwo = document.createElement('div');

    characterChoice.classList.add('characterChoice');
    choiceCharacterOne.classList.add('choiceCharacterOne');
    choiceCharacterTwo.classList.add('choiceCharacterTwo');

    choiceCharacterOne.style.backgroundImage = 'url(../images/characters/protagonist_1.png)'
    choiceCharacterTwo.style.backgroundImage = 'url(../images/characters/protagonist_2.png)'

    choiceCharacterOne.addEventListener('click', function() {
        goCity();
        updateCharacter(1)
        document.querySelector('.gameDisplay').removeChild(characterChoice);
    });
    choiceCharacterTwo.addEventListener('click', function() {
        goCity();
        updateCharacter();
        document.querySelector('.gameDisplay').removeChild(characterChoice);
    });

    characterChoice.appendChild(choiceCharacterOne);
    characterChoice.appendChild(choiceCharacterTwo);
    document.querySelector('.gameDisplay').appendChild(characterChoice);
}



export { displayCharacters };