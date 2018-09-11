window.Collections = {};

(function(module) {
    function Stack(arr) {
        /* constructor */
        this.arr = arr;
    };

    /* creating a forEach method on Stack */
    Stack.prototype.forEach = function(callback) {
        for (var i = 0; i < this.arr.length; i++) {
            callback(this.arr[i], i, this.arr);
        }
    };

    Stack.prototype.push = function(elem){
        // this.arr.push(elem);
        this.arr[this.arr.length] = elem;
    }

    Stack.prototype.peek = function() {
        return this.arr[this.arr.length-1];
    }

    Stack.prototype.pop = function() {
        // return this.arr.pop();
        var i = this.arr.length-1,
            val = this.arr[i];
        this.arr.splice(i, 1);
        return val;
    }

    Stack.prototype.clear = function() {
        /* Andrew: for loop with pop was leaving values in array, apparent known bug
         * Alternative was to set length before looping.
         * Choose to use while loop bc it was less code 
         */

        while (this.arr.length) {
            this.pop();
        }
    }

    Stack.prototype.extend = function(s) {
        /* this in forEach is different than current this */
        var that = this;

        s.forEach(function(elem) {
            that.push(elem);
        })
    }

    Stack.prototype.copy = function() {
        var clone = new Collections.Stack([]);
        
        clone.extend(this);
        
        return clone;
    }

    /* export, make visible outside file */
    module.Stack = Stack;
})(window.Collections);

var stack = new Collections.Stack([1, 2, 3, 4, 5]);

// stack.forEach(console.log);

// stack.push(489);

// stack.peek();

// stack.pop();

// stack.clear();

// var stack2 = new Collections.Stack(["cat","dog"]);
// stack.extend(stack2);

var stack3 = stack.copy();

// TL
