=================
Lambda JavaScript
=================

Writing Real Programs... with JavaScript!?

*Andrew Montalenti, CTO*

.. rst-class:: logo

    .. image:: ./_static/parsely.png
        :width: 40%
        :align: right

JavaScript iteration
====================

.. sourcecode:: JavaScript

    var nums = [45, 23, 51, 32, 5];
    for (var i = 0; i < nums.length; i++) {
        console.log(i, nums[i]);
    }

    // 0 45
    // 1 23
    // 2 51
    // 3 32
    // 4 5

But, what's going on here?
==========================

.. sourcecode:: JavaScript

    window.nums = window.Array(45, 23, 51, 32, 5);
    for (window.i = 0; window.i < window.nums.length; window.i++) {
        window.console.log(window.i, window.nums[window.i]);
    }

Some first JS rules
===================

``[1, 2, 3]`` is like ``Array(1, 2, 3)``; what Python calls a "list", JS calls an "Array".

To iterate an array, you must get an index (``i``) and index into it (``nums[i]``).

Making variables with ``var`` outside of a function sets or overrides a *global variable*.
This even applies to constructs that seem to have block scope, like ``for`` loops.

Fixing it with function scope
=============================

.. sourcecode:: JavaScript

    (function() {
        // creates a "temporary" local function scope
        var nums = [1, 2, 3];
        for (var i = 0; i < nums.length; i++) {
            console.log(i, nums[i]);
        }
        z = "some value"; // warning!
    })();
    // now back in global scope
    console.log(typeof nums === 'undefined');
    console.log(typeof i === 'undefined');
    console.log(typeof z === 'undefined');

    // 0 1
    // 1 2
    // 2 3
    // true
    // true
    // false

Some more JS rules
==================

Check whether a variable was set with ``'undefined'``, e.g.

.. sourcecode:: JavaScript

    console.log(typeof nums === 'undefined'); // true
    console.log(typeof z === 'undefined'); // false

The pattern ``(function() { ... })();`` creates a local scope by using a
"self-executing function", aka IIFE, or "immediately invoked function
expression". This weird-looking pattern can be explained here:

.. sourcecode:: JavaScript

    var someFunction = function() { /* this part defines => */
        var nums = [1, 2, 3];
        console.log(nums);
    };
    someFunction /* this part invokes => */ ();

Now, some style rules
=====================

When writing JS code, you need to heed the following:

- When JavaScript applications are combined via ``<script>`` tags in the browser, they all
  have access to the global scope.
- You must always be mindful of globals; your "application" should only use
  *one* global variable, use a good unique name for it, and then store
  everything else *in there*.
- For example, Parse.ly's JavaScript tracker uses the global name ``PARSELY``.
- jQuery uses ``$`` and ``jQuery`` (which are aliases).

As for scope
============

- Always use ``var`` to set **local function-scoped variables**.
- Always put ``var`` definitions at the top of your function.
- Always wrap your code in functions, either "self-executing" or "normal" ones.

Introducing functions
=====================

.. sourcecode:: JavaScript

    function printIndexed(arr) {
        for (var i = 0; i < arr.length; i++) {
            console.log(i, arr[i]);
        }
    };
    (function() {
        var nums = [1, 2, 3];
        printIndexed(nums);
    })();

    // 0 1
    // 1 2
    // 2 3

Named Functions
===============

.. sourcecode:: JavaScript

    function name(arguments) {
        // ... body ...
    };

    // => basically does =>

    window.name = function(arguments) {
        // ... body ...
    };

    // with a "twist"

In a lot of beginner JavaScript code, this is the only ``function``
you'll see used. Some tricky rules related to "function hoisting".

What's broken here?
===================

.. sourcecode:: JavaScript

    (function() {
        function printIndexed(arr) {
            for (var i = 0; i < arr.length; i++) {
                console.log(i, arr[i]);
            }
        };
    })();
    (function() {
        var nums = [1, 2, 3];
        printIndexed(nums);
    })();


Will this work?
===============

.. sourcecode:: JavaScript

    (function() {
        function printIndexed(arr) {
            for (var i = 0; i < arr.length; i++) {
                console.log(i, arr[i]);
            }
        };
        var nums = [1, 2, 3];
        printIndexed(nums);
    })();

What we're learning
===================

- Named function declarations operate similarly to ``var``.
- If they are within another function, they will only set
  scope within that function.
- But this also raises another issue -- nested scopes?

Will this work?
===============

.. sourcecode:: JavaScript

    (function() {
        var nums = [1, 2, 3];
        function printIndexed() {
            for (var i = 0; i < nums.length; i++) {
                console.log(i, nums[i]);
            }
        };
        printIndexed();
    })();

Nested Scope, aka Closure
=========================

.. rst-class:: image

    .. image:: ./_static/nested_scope.png
        :width: 100%
        :align: center

See it yourself.

`View on JavaScript Visual Tutor!`_

.. _View on JavaScript Visual Tutor!: http://pythontutor.com/javascript.html#code=%28function%28%29%20%7B%0A%20%20%20%20var%20nums%20%3D%20%5B1,%202,%203%5D%3B%0A%20%20%20%20function%20printIndexed%28%29%20%7B%0A%20%20%20%20%20%20%20%20for%20%28var%20i%20%3D%200%3B%20i%20%3C%20nums.length%3B%20i%2B%2B%29%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20console.log%28i,%20nums%5Bi%5D%29%3B%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%3B%0A%20%20%20%20printIndexed%28%29%3B%0A%7D%29%28%29%3B&curInstr=0&mode=display&origin=opt-frontend.js&py=js&rawInputLstJSON=%5B%5D


Can we make our function generic?
=================================

.. sourcecode:: JavaScript

    function iterateIndexed(arr, callback) {
        for (var i = 0; i < arr.length; i++) {
            callback(i, arr[i]);
        }
    };
    (function() {
        var nums = [1, 2, 3];
        iterateIndexed(nums, /* what goes here? */);
    })();

Using an "in-line" function
===========================

.. sourcecode:: JavaScript

    function iterateIndexed(arr, callback) {
        for (var i = 0; i < arr.length; i++) {
            callback(i, arr[i]);
        }
    };
    (function() {
        var nums = [1, 2, 3];
        iterateIndexed(nums, function(idx, elem) {
            console.log(idx, elem);
        });
    })();

Using a "higher-order" reference
================================

.. sourcecode:: JavaScript

    function iterateIndexed(arr, callback) {
        for (var i = 0; i < arr.length; i++) {
            callback(i, arr[i]);
        }
    };
    (function() {
        var nums = [1, 2, 3];
        iterateIndexed(nums, console.log);
        // why does this work?
    })();

A couple more `each` implementations
====================================

.. sourcecode:: JavaScript

    (function() {
        var nums = [1, 2, 3];
        // prints same thing
        jQuery.each(nums, console.log);
        // prints same thing
        nums.forEach(function(elem, idx, arr) {
            console.log(idx, elem);
        });
    })();

Our first "browser compatibility issue"
=======================================

- Should you use ``jQuery.each``, or the "built-in" ``Array.forEach``?
- Answer, like many things in JS: it depends.
- For full browser compatibility, **you can't**.
- It's not in IE8 and below, for example. And older browsers from same era.
- ``Array.forEach`` was added in "ECMA-262 standard in the 5th edition".
- You can `Polyfill`_ it using the standard itself.
- Issues like this are why Babel exists.

.. _Polyfill: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#Polyfill

Explaining ``this`` with ``forEach``
====================================

.. sourcecode:: JavaScript

        [1, 2, 3].forEach(function(elem, idx, arr) {
            console.log(idx, elem);
        });

One interesting thing about this code is that the ``forEach`` function
must "know" about the input array merely by virtue of the ``.`` dot operator.

How does it know? Is there a JavaScript facility that lets you get access
to "the object from which this function was called"?

Sort of. For this, we need to take a small detour.

Building our own Stack
======================

.. sourcecode:: JavaScript

        var stack = Stack([1, 2, 3]);
        stack.forEach(function(elem, idx, arr) {
            console.log(idx, elem);
        });

Can we build our own ``Stack`` object that supports the ``forEach`` style call?


Building our own Stack
======================

.. sourcecode:: JavaScript

        function Stack(arr) {
            this.arr = arr;
            this.forEach = function(callback) {
                for (var i = 0; i < this.arr.length; i++) {
                    callback(this.arr[i], i, this.arr);
                }
            }
        };
        var stack = Stack([1, 2, 3]);
        console.log(typeof arr === "undefined"); // false
        stack.forEach(function(elem, idx, arr) {
            console.log(idx, elem);
        });
        // TypeError: cannot read property 'forEach' of undefined

What hath we wrought?

The ``new`` keyword
===================

Our call to ``Stack`` is a "bare function call".

It turns out, with these, ``this`` is bound to the global object, aka ``window``.

That's why ``arr`` was actually defined globally after we called ``Stack()``!

To "fix this", we need to use ``new Stack([1, 2, 3]);``... here, JS will
bind ``this`` to a ``new Object`` before calling the ``Stack`` function.

The function will then **return the new object** (that is, return ``this``).

A working Stack
===============

.. sourcecode:: JavaScript

        function Stack(arr) {
            this.arr = arr;
            this.forEach = function(callback) {
                for (var i = 0; i < this.arr.length; i++) {
                    callback(this.arr[i], i, this.arr);
                }
            }
        };
        var stack = new Stack([1, 2, 3]);
        console.log(typeof arr === "undefined"); // true
        stack.forEach(function(elem, idx, arr) {
            console.log(idx, elem);
        });
        // 0 1
        // 1 2
        // 2 3

What's ``this`` in the callback?
================================

We have a callback function, will ``this`` refer to the Stack in there?

If so, we should be able to access ``this.arr`` and compare it to ``arr``.

.. sourcecode:: JavaScript

        var stack = new Stack([1, 2, 3]);
        stack.forEach(function(elem, idx, arr) {
            console.log(this.arr === arr);
        });
        // false
        // false
        // false

Huh. What's wrong here?

Go back to our rule: bare function call
=======================================

.. sourcecode:: JavaScript

        function Stack(arr) {
            this.arr = arr;
            this.forEach = function(callback) {
                for (var i = 0; i < this.arr.length; i++) {
                    callback(this.arr[i], i, this.arr);
                    // ^^^^^ problematic call
                }
            }
        };

There is a utility available to help us: ``Function.call``.

We can translate this to:

.. sourcecode:: JavaScript

    callback.call(this, i, this.arr[i], this.arr);

Even better Stack
=================

.. sourcecode:: JavaScript

        function Stack(arr) {
            this.arr = arr;
            this.forEach = function(callback) {
                for (var i = 0; i < this.arr.length; i++) {
                    callback.call(this, this.arr[i], i, this.arr);
                }
            }
        };
        var stack = new Stack([1, 2, 3]);
        stack.forEach(function(elem, idx, arr) {
            console.log(this.arr === arr);
        });
        // true
        // true
        // true

Can we "borrow" the ``Stack.forEach``?
======================================

.. sourcecode:: JavaScript

        function Stack(arr) {
            this.arr = arr;
        };
        Stack.prototype.forEach = function(callback) {
            for (var i = 0; i < this.arr.length; i++) {
                callback(this.arr[i], i, this.arr);
            }
        };
        (new Stack([1])).forEach(function(elem) {
            console.log(elem);
        });
        // 1
        var obj = {"arr": [1]}
        Stack.prototype.forEach.call(obj, function(elem) {
            console.log(elem);
        });
        // 1


Quick comparison
================

================== =================== ===================
Idea               Python              JavaScript
================== =================== ===================
Binding            ``label = val``     ``var label = val``
Default Scope      Local               Global
Iteration          ``for``             ``for`` or ``.forEach``
Functions          ``def, lambda``     ``function()`` forms
File Open          ``open()``          It's Complicated
Classes            ``class``           On your own
Namespaces         Modules             On your own
Imports            ``import``          On your own
Data Structs       ``{} [] (,)``       ``{}* []``
================== =================== ===================

JavaScript unique stuff
=======================

+------------------------+---------------------+-----------------+
| Idea                   | Python              | JavaScript      |
+========================+=====================+=================+
| Anonymous Functions    | Limited ``lambda``  | Built-in        |
+------------------------+---------------------+-----------------+
| Performance            | via C, Cython, etc. | via V8, Node    |
+------------------------+---------------------+-----------------+
| Language Evolution     | Python 3 (10 years) | Babel (annual)  |
+------------------------+---------------------+-----------------+
| Object Orientation     | Trad'l, class-based | Prototypal      |
+------------------------+---------------------+-----------------+

Still left to cover
===================

- Preview of ES6 scoping rules.
- The formal "module pattern".
- ``Object`` vs ``dict`` and dynamic dispatch.
- Binary search basic algorithm.
- Binary search recursive version with named function expressions.
- Big-O overview for lists (``Array``) vs hashes (``Object``).
- Implementing a ``Tree``.
- How ``Tree`` relates to browser DOM.

.. ifnotslides::

    .. raw:: html

        <script>
        $(function() {
            $("body").css("width", "1080px");
            $(".sphinxsidebar").css({"width": "200px", "font-size": "12px"});
            $(".bodywrapper").css("margin", "auto");
            $(".documentwrapper").css("width", "880px");
            $(".logo").removeClass("align-right");
        });
        </script>

.. ifslides::

    .. raw:: html

        <script>
        $("tr").each(function() {
            $(this).find("td:first").css("background-color", "#eee");
            $(this).css("font-size", "0.8em");
        });
        </script>


