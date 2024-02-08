const allEnemies = [
    {
        name: "Chicken",
        HP: 10,
        defense: 0,
        xp: 5,
        size: "small",
        attacks: [ {name: "peck", power: 2}],
        attacksSprite: ['claws'], 
        sprite: "../images/monsters/small/chicken.png",
        text: "The chicken is looking furious. What will you do?"
    },
    {
        name: "fox",
        HP: 25,
        defense: 1,
        xp: 10,
        size: "small",
        attacks: [ {name: "scratch", power: 4}, {name: "bite", power: 6}],
        attacksSprite: ['claws'], 
        sprite: "../images/monsters/small/fox.png",
        text: "A fox is starring at you. What will you do?"
    },
    {
        name: "bird",
        HP: 19,
        defense: 0,
        xp: 10,
        size: "small",
        attacks: [ {name: "scratch", power: 4}, {name: "peck", power: 2}],
        attacksSprite: ['claws'], 
        sprite: "../images/monsters/small/bird.png",
        text: "This bird wants to fight with you, one to one. What will you do?"
    },
    {
        name: "lizard",
        HP: 11,
        defense: 0,
        xp: 12,
        size: "small",
        attacks: [ {name: "quick bite", power: 5} ],
        attacksSprite: ['claws'], 
        sprite: "../images/monsters/small/small_lizard.png",
        text: "This brave and small lizard is looking real' serious. What will you do?"
    },
    {
        name: "goblin",
        HP: 31,
        defense: 4,
        xp: 25,
        size: "small",
        attacks: [ {name: "scratch", power: 4}, {name: "peck", power: 2}],
        attacksSprite: ['spriteAttack'], 
        sprite: "../images/monsters/small/goblin.png",
        text: "A malicious goblin wants to go bare fight with you. What will you do?"
    },
]

export { allEnemies };

