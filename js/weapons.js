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

// replace the weapon on the map:
function replaceWeaponOnMap(value, weapon, num) {
    let tile = $('.box[data-index="' + num + '"]');
    whoIsActive();
    tile.removeClass(weapon).addClass(playerActive.weapon);
    playerActive.weapon = weapon;    
    playerNotActive.power = value;        
}

// replace the information on the player's board:
function replaceWeaponOnBoard(power){
    whoIsActive();
    $('.weps-' + notActivePlayer).empty();
    $('<img src="images/weapon-' + currentWeapon +'.png">').appendTo(".weps-" + notActivePlayer);
    $(".weapons-" + notActivePlayer).text(power);
}

// check weapon on the tile and call replace functions (for the player's boards and for the map):
function checkWeapon(num) {
    let tile = $('.box[data-index="' + num + '"]');
    if (tile.hasClass('weapon')) {
        if (tile.hasClass('wp-1')) {
            currentWeapon = 1;
            replaceWeaponOnMap(firstWeapon.value, 'wp-1', num);
            replaceWeaponOnBoard(firstWeapon.value);
            return;
        }
        if (tile.hasClass('wp-2')) {
            currentWeapon = 2;
            replaceWeaponOnMap(secondWeapon.value,'wp-2',num);
            replaceWeaponOnBoard(secondWeapon.value); 
            return;
        }
        if (tile.hasClass('wp-3')) {
            currentWeapon = 3;
            replaceWeaponOnMap(thirdWeapon.value, 'wp-3', num);
            replaceWeaponOnBoard(thirdWeapon.value);
            return;
        }
        if (tile.hasClass('wp-4')) {
        currentWeapon = 4;
        replaceWeaponOnMap(fourthWeapon.value,'wp-4', num);
        replaceWeaponOnBoard(fourthWeapon.value);
        return;
        }
        
    }    

}
