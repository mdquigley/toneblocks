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

// is prime
function mathIsPrime(n) {
    // https://en.wikipedia.org/wiki/Primality_test#Naive_methods
    if (n == 2 || n == 3) {
        return true;
    }
    // False if n is NaN, negative, is 1, or not whole.
    // And false if n is divisible by 2 or 3.
    if (isNaN(n) || n <= 1 || n % 1 != 0 || n % 2 == 0 || n % 3 == 0) {
        return false;
    }
    // Check all the numbers of form 6k +/- 1, up to sqrt(n).
    for (var x = 6; x <= Math.sqrt(n) + 1; x += 6) {
        if (n % (x - 1) == 0 || n % (x + 1) == 0) {
            return false;
        }
    }
    return true;
}