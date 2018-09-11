"use strict";

var log = console.log;
var assert = console.assert;

window.Collections = Object.create(null);

(function(root) {
    function Stack(arr=[]) {
        this.arr = arr;
    };

    //stack.forEach
    Stack.prototype.forEach = function(callback) {
        for (var i = 0; i < this.arr.length; i++) {
            callback(this.arr[i], i, this.arr);
        }
    };

    // stack.push
    Stack.prototype.push = function(addition) {
        this.arr[this.arr.length] = addition;
    };
    
    //stack.peek
    Stack.prototype.peek = function() {
        return this.arr[this.arr.length - 1];
    };

    //stack.pop
    Stack.prototype.pop = function() {
        return this.arr.splice(-1, 1);
    };

    //stack.clear
     Stack.prototype.clear = function() { 
        while (this.arr.length > 0) {
            this.pop();
        }
    };

   Stack.prototype.extend = function(obj) {
       for (var i = 0; i < obj.arr.length; i++) {
            this.push(obj.arr[i]);
       }
    };

    //stack.copy
    Stack.prototype.copy = function() {
        var newStack = new Collections.Stack();
        newStack.extend(this);
        return newStack;
    };


    // export
    root.Stack = Stack;
})(window.Collections);

var stack = new Collections.Stack([5, 6, 7]);

var s2 = new Collections.Stack([2, 5, 4, 9]);

// tests
stack.forEach(console.log);
stack.push(14);
console.log(stack.peek());
stack.pop();
stack.extend(s2);
console.log(stack.arr);
var s3 = stack.copy();
console.log(s3.arr);
stack.clear();
console.log(stack);

// CM
