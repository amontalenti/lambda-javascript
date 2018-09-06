"use strict";
// lambda-javascript: beginner's delight!

var log = console.log;
var assert = console.assert;

log("---------------------");

// variables
var one = 1;
var empty;
var nil = null;

assert(one == 1); // works
assert(typeof one == "number"); // works
assert(one !== null); // works
assert(one + one == 2); // works
assert(typeof one != "undefined"); // works
assert(typeof empty == "undefined"); // works
assert(nil == null); // works

assert(empty != nil); // fails!

assert(empty !== nil); // works

// numbers and math
log("numbers:");
var four = 2 + 2;
var eight = 2 * four;
var sixtyFour = eight * eight;
log(four, eight, sixtyFour); // 4 8 64

// boolean logic
log("booleans:");
var T = true;
var F = false;
var NOT_T = !true;
var NOT_F = !false;
log(NOT_T); // false
log(NOT_F); // true
assert(true || false) // works
assert(true && false); // failure

/*
 * "and" truth table
 * ------------------
 *     T    F   F   T  assert(F && T)
 * &&  F    T   F   T  "short circuit"
 *     --------------
 *     F    F   F   T
 */


/* "or" truth table
 * ------------------
 *     T    F   F   T  assert(T || F)
 * ||  F    T   F   T  "short circuit"
 *     --------------
 *     T    T   F   T
 */

// strings
log("strings:");
var aba = "abacadabra";
log(aba.length);  // 10
log(aba[0]);      // a
log(aba[11]);     // undefined

// JSON and chained function calls
var sampleData = {
	"data": [45, 23, 51, 32, 5],
    "label": "Some numbers"
}
log(sampleData["label"])
log(sampleData["data"]);
assert(sampleData["label"] === sampleData.label);
assert(sampleData["data"] === sampleData.data);
log(sampleData);
log(JSON.stringify(sampleData));
log(JSON.parse(JSON.stringify(sampleData)));

// arrays
var nums = Array();
nums.push(45); nums.push(23); nums.push(51);
nums.push(32); nums.push(5);
log(nums.toString()); // 45,23,51,32,5

var simplerNums = [45, 23, 51, 32, 5];
log(simplerNums.toString()); // 45,23,51,32,5

assert(nums !== simplerNums); // works
assert(nums != simplerNums); // works
assert(nums.toString() == simplerNums.toString()) // works

// loops and indexing
log("loops:");
for (var i = 0; i < nums.length; i++) {
	assert(nums[i] === simplerNums[i]); // works every time
}

var nums = [45, 23, 51, 32, 5];
for (var i = 0; i < nums.length; i++) {
    console.log(i, nums[i]);
}

// make your own function
log("functions:");

function square(x) {
    return x * x;
}
log(square(3)) // 9
log(square(9)) // 81

function factorial(n) {
    if (n == 0) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}
// recursive definition should make your brain hurt a little
log(factorial(5)); // 120 = 5 * 4 * 3 * 2 * 1 => 20 * 6 * 1 = 120
log(factorial(10)); // 3628800 ... trust me :-)

for (var i = 0; i < nums.length; i++) {
    var elem = nums[i];
    console.log(i, elem, square(elem), factorial(elem));
}

/*

for (var i = 0; i < 10000; i++) {
    if (i % 1000 == 0) log("thinking...");
    factorial(i);
}
// the above might exceed your call stack!

*/

"done!";
