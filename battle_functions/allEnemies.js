import { allDrops } from "./drops.js";

const allEnemies = [
    {
        name: "Chicken",
        HP: 10,
        defense: 0,
        xp: 5,
        drops: [allDrops[0], allDrops[1]],
        size: "small",
        attacks: [ {name: "peck", power: 3}],
        attacksSprite: ['spriteEnemyAttack'], 
        sprite: "../images/monsters/small/chicken.png",
        text: "The chicken is looking furious. What will you do?"
    },
    {
        name: 'White Sheep Possessed',
        HP: 30,
        defense: 1,
        xp: 12,
        drops:  [],
        size: "small",
        attacks: [{name: 'horn strike', power: 10}],
        attacksSprite: ['spriteEnemyAttack'],
        sprite: "../images/monsters/small/White_sheep_possessed.png",
        text: "A strange looking white sheep stands in front of you. What will you do?"
    }
]

export { allEnemies };