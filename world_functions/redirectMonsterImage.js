

function redirectMonsterImage(monster) {
    switch (monster) {
        case 'fox':
            return '../images/monsters/small/fox.png';
        case 'bird':
            return '../images/monsters/small/bird.png';
        case 'lizard':
            return '../images/monsters/small/small_lizard.png';
        case 'goblin':
            return '../images/monsters/small/fox.png';
    }
}

export { redirectMonsterImage };