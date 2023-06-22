'use strict';

// # arguments
{
	// all arguments, passed into the function, are contained in `arguments` array-like
	// even if they were not explicitly specified as parameters
	function test() {
		console.log(arguments);

		console.log(arguments[0]);
		console.log(arguments.length);

		// arguments doesn't have array's methods, but has 'length' property and numeric indices, so it is iterable with for...of

		for (const arg of arguments) console.log(arg);
	}

	test('first', 'second', 'third');
}

/*
some functions can be called with different number of arguments,
and we need to treat such situations differently, depending on the number of the arguments that were passed
we can analyze 'arguments' array-like to achieve this
*/
{
	function test(...rest) {
		if (arguments.length === 2) console.log('just as expected!');
		if (arguments[2])
			console.log('extra argument passed! Should we handle it?');
		if (arguments[3]) console.log('oh, we have fourth argument');
	}

	test(1, 2, 3, 4);
}

// # ...rest
{
	/*
	But it's more convenient to use ... operator, that 'gathers' all the remaining arguments after it in one array
	Ellipsis (...) is the operator itself, after it we should write the name of the variable that will be used to gather the arguments
	Conventionally 'rest' is used for this purpose
	*/

	/* Advantages compared to 'arguments':
	- we can control which arguments will go into 'rest' array, and which - into separate variables
	- we get a real array with all array methods
	*/

	function test(a, b, ...rest) {
		console.log(rest);

		if (rest[0]) console.log('extra argument passed!');

		rest.forEach((a) => {
			return console.log(a);
		});
	}
	test(1, 2, 3, 4);

	/* there's no sense to specify any parameters after ...rest, because all of them will be consumed by the...rest argument
	a, b, ...rest, d  // d is useless here
	*/
}

// # arguments of arrow functions
{
	/* Arrow function doesn't have their own 'arguments' object,
	inside the arrow function 'arguments' will contain the arguments, received by the parent function

	This can be used to create wrappers for passing the arguments into the modified version of function */

	const sayHiDeferred = defer(sayHi, 2000);

	sayHiDeferred('John'); // outputs "Hello, John" after 2 seconds
	// deferredFn is called with 'John'
	// inside arrow function, 'arguments' will equal ['John'], cause 'arguments' will be taken from parent deferredFn
	// we pass this arguments to fn (which is sayHi) and call sayHi with this arguments

	function sayHi(name) {
		console.log(`Hello, ${name}`);
	}

	function defer(fn, ms) {
		/* return the function, that will be executed with the specified delay  */
		return function deferredFn() {
			setTimeout(() => fn(...arguments), ms);
		};
	}

	// but the same can be done with 'rest'
	function deferWithRest(fn, ms) {
		/* return the function, that will be executed with the specified delay  */
		return function deferredFn(...rest) {
			setTimeout(() => fn(...rest), ms);
		};
	}
}
