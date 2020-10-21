// load stock blockly functions for global use


// random integer from A to B
function mathRandomInt(a, b) {
    if (a > b) {
        // Swap a and b to ensure a is smaller.
        var c = a;
        a = b;
        b = c;
    }
    return Math.floor(Math.random() * (b - a + 1) + a);
}

// create list with item repeated
function listsRepeat(value, n) {
    var array = [];
    for (var i = 0; i < n; i++) {
        array[i] = value;
    }
    return array;
}

// sort list
function listsGetSortCompare(type, direction) {
    var compareFuncs = {
        "NUMERIC": function (a, b) {
            return Number(a) - Number(b);
        },
        "TEXT": function (a, b) {
            return a.toString() > b.toString() ? 1 : -1;
        },
        "IGNORE_CASE": function (a, b) {
            return a.toString().toLowerCase() > b.toString().toLowerCase() ? 1 : -1;
        },
    };
    var compare = compareFuncs[type];
    return function (a, b) { return compare(a, b) * direction; }
}