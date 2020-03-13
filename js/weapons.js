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


