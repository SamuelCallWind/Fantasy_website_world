import { allDrops } from "./drops.js";

const allEnemies = [
    {
        name: "Chicken",
        HP: 10,
        defense: 0,
        xp: 5,
        drops: [allDrops[0], allDrops[1]],
        size: "small",
        attacks: [ {name: "peck", power: 2}],
        attacksSprite: ['spriteEnemyAttack'], 
        sprite: "../images/monsters/small/chicken.png",
        text: "The chicken is looking furious. What will you do?"
    }
]

export { allEnemies };