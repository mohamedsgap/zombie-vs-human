// weapon function constructor:
function Weapon(type, value, itemClass) {
    this.type = type;
    this.value = value;
    this.itemClass = itemClass;

    // add weapons to the map
    this.add = function () {
    addComponents(this.itemClass);
    }
};


// create weapons for the game
let firstWeapon = new Weapon("firstWeapon", 15, "wp-1 weapon");
let secondWeapon = new Weapon("secondWeapon", 30, "wp-2 weapon");
let thirdWeapon = new Weapon("thirdWeapon", 45, "wp-3 weapon");
let fourthWeapon = new Weapon("fourthWeapon", 60, "wp-4 weapon");

