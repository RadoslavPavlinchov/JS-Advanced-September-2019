function heroicInventory(params) {
    let heroes = [];
    let hero = {};
    for (const line of params) {
        let [name, level, items] = line.split(" / ");
        items = items ? items.split(", ") : items = [];
        hero.name = name;
        hero.level = Number(level);
        hero.items = items;
        heroes.push(hero);
        hero = {};
    }
    return JSON.stringify(heroes);
}
console.log(heroicInventory(['Isacc / 25 / Apple, GravityGun',
    'Derek / 12 / BarrelVest, DestructionSword',
    'Hes / 1 / Desolator, Sentinel, Antara']));
