"use strict";

// Stack.push implementation
(function(){

    function Stack(arr) {
        this.arr = arr;
        return;
    }

    Stack.prototype.forEach = function(callback) {
        for (var i = 0; i < this.arr.length; i++) {
            callback.call(this, this.arr[i], i, this.arr);
        }

        return;
    }

    Stack.prototype.push = function(item) {
        this.arr.push(item);

        return;
    }

    Stack.prototype.peek = function() {
        return this.arr[0];
    }

    Stack.prototype.pop = function() {
        return this.arr.pop();
    }

    Stack.prototype.clear = function() {
        while (this.arr.length > 0) {
            this.pop();
        }

        return;
    }

    Stack.prototype.extend = function(stack) {
        for (var i = 0; i < stack.arr.length; i++) {
            this.push(stack.arr[i]);
        }

        return;
    }

    Stack.prototype.copy = function() {
        var stackCopy = new Stack([]);

        this.forEach(function(elem) {
            stackCopy.push(elem)
        });

        return stackCopy;
    }

    var stack = new Stack([0, 1, 2, 3, 4]);
    stack.push(5);
    console.log(stack);
    console.log(stack.pop());
    console.log(stack);
    // stack.clear();

    var stack2 = new Stack([5, 6, 7, 8, 9]);
    stack.extend(stack2);

    var stackTest = stack.copy();
    stackTest.pop();

    console.log("original stack");
    console.log(stack);
    console.log("stack copy");
    console.log(stackTest);
})();

// KS
