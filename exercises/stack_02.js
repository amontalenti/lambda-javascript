//Stack.push: one
window.Collections = Object.create(null);

(function(root) {
    function Stack(arr) {
        this.arr = arr;
    };
    Stack.prototype.push = function(elem, callback) {
        this.arr.push(elem);
        callback(this.arr);
    };
    // export
    root.Stack = Stack;
})(window.Collections);

var stack = new Collections.Stack([1, 2, 3]);
stack.push(4, console.log);



//Stack.push: multiple
window.Collections = Object.create(null);

(function(root) {
    function Stack(arr) {
        this.arr = arr;
    };
    Stack.prototype.push = function(...callback) {
        var callback = arguments[arguments.length - 1];

        for (var i = 0; i < arguments.length - 1; i++) {
            this.arr.push(arguments[i]);
        }
        callback(this.arr);
    };
    // export
    root.Stack = Stack;
})(window.Collections);

var stack = new Collections.Stack([1, 2, 3]);
stack.push(4, 6, 10, console.log);



//Stack.peek
window.Collections = Object.create(null);

(function(root) {
    function Stack(arr) {
        this.arr = arr;
    };
    Stack.prototype.peek = function(callback) {
        callback(this.arr[this.arr.length - 1]);
    };
    // export
    root.Stack = Stack;
})(window.Collections);

var stack = new Collections.Stack([1, 2, 3]);
stack.peek(console.log);



//Stack.pop
window.Collections = Object.create(null);

(function(root) {
    function Stack(arr) {
        this.arr = arr;
    };
    Stack.prototype.pop = function(callback) {
        callback(this.arr.splice(-1,1));
    };
    // export
    root.Stack = Stack;
})(window.Collections);

var stack = new Collections.Stack([1, 2, 3]);
stack.pop(console.log);



//Stack.clear
window.Collections = Object.create(null);

(function(root) {
    function Stack(arr) {
        this.arr = arr;
    };
    Stack.prototype.clear = function(callback) {
        while (this.arr.length > 0) {
            this.arr.pop();
        }
        callback(this.arr);
    };
    // export
    root.Stack = Stack;
})(window.Collections);

var stack = new Collections.Stack([1, 2, 3]);
stack.clear(console.log);



//What about redefining the array to an empty array? 🤷
window.Collections = Object.create(null);

(function(root) {
    function Stack(arr) {
        this.arr = arr;
    };
    Stack.prototype.clear = function(callback) {
        this.arr = [];
        callback(this.arr);
    };
    // export
    root.Stack = Stack;
})(window.Collections);

var stack = new Collections.Stack([1, 2, 3]);
stack.clear(console.log);



//Stack.extend
window.Collections = Object.create(null);

(function(root) {
    function Stack(arr) {
        this.arr = arr;
    };

    Stack.prototype.extend = function(otherStack, callback) {
        var extendedStack = this.arr.concat(otherStack.arr);
        callback(extendedStack);
    };
    // export
    root.Stack = Stack;
})(window.Collections);

var stack = new Collections.Stack([1, 2, 3]);
var otherStack = new Collections.Stack([4, 5, 6]);
stack.extend(otherStack, console.log);



//Stack.new
window.Collections = Object.create(null);

(function(root) {
    function Stack(arr) {
        this.arr = arr;
    };

    Stack.prototype.new = function(newStack, callback) {
        newStack.arr = this.arr;
        callback(newStack.arr);
    };
    // export
    root.Stack = Stack;
})(window.Collections);

var stack = new Collections.Stack([1, 2, 3]);
var newStack = new Collections.Stack([]);
stack.new(newStack, console.log);

// MR
