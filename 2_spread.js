'use strict';

// if ... is located at the end of the arguments list, it is the rest parameters operator
// if you encounter ... inside a function call or somewhere else, this is spread operator. it extracts elements from iterable data structure, usually from array

// # .. in array literals
{
	// if ...iterable is used in function call, it 'unfolds' the iterable object into a sequence of arguments.

	// Math.max takes arguments, separated by comma
	// but if we have an array of arguments, we can use spread to unfold it into arguments list
	console.log(Math.max(7, 2, 3, 4));

	const arr = [7, 2, 3, 4];

	console.log(Math.max(...arr));

	console.log(Math.max.apply(null, arr));

	/*
feature of ...: new object is returned, because all contents elements are copied in turn
spread is a non-mutating alternative to unshift and other array methods
*/
}

// ~ ...spread usage

// = cloning the array
{
	/*
allows to get real copy of array (not by reference)
creates a shallow copy (nested arrays, if present, will be copied by reference)
So it's like Object.assign for objects
 */
	const original = [1, 2, 3];

	const clone = [...original];

	console.log(original === clone);

	clone[0] = 'changed';
	console.log(original, clone);
}

// = concatenation - combining 2 arrays - more convenient alternative to [].concat
{
	let arr1 = [6, -5, 0];
	let arr2 = [12, 3, -2, -4];

	console.log([...arr1, ...arr2]);

	// can be combined with other values
	console.log([1, ...arr1, 2, ...arr2, 25]);
}

/*
spread inside [] uses iterators behind the scenes,
so it works only with iterable objects
that includes strings
*/

// ~ converting into array

// = a) using ...
{
	const str = 'Hello';
	console.log([...str]);

	console.log(...str);
}

// = b) using Array.from - a better way:

const arraylike = {
	0: 'baz',
	1: 'foo',
	2: 'bar',
	length: 3,
};

// console.log([...arraylike]);

{
	/*
	apart from iterables, also works with array-likes (any object, that has 'digital' keys and length property)
	returns a new object (non-mutating)

	second argument - callback function that can be used to transform the elements (works like Array.map)
	*/

	const str = 'Hello';
	console.log(Array.from(str));

	console.log(Array.from(str, (letter) => letter.toUpperCase()));
}

// # ... in object literals

{
	const obj1 = { foo: 'bar', x: 1 };

	const obj2 = { foo: 'baz', y: 2 };

	// = cloning
	console.log({ ...obj1 });

	// = concatenation
	console.log({ ...obj1, ...obj2 });

	// = adding a property
	console.log({ ...obj1, newProperty: 'new!' });
}
