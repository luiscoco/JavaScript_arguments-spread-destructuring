'use strict';
/* DEFAULT PARAMETERS */

{
	// # ways to set a default
	function hasDefaults(
		defaultIfFalsy,
		defaultIfNullish,
		defaultIfUndefined,
		defaultIfUndefined2 = 'default'
	) {
		// = 1. Set the default, if argument is falsy (not true after being converted to Boolean)
		// downside: 0, null, false, '' will trigger default, that usually we don't want
		defaultIfFalsy = defaultIfFalsy || 'default';
		console.log(defaultIfFalsy);

		// = 2. Set the default, if argument is non-nullish (not null or undefined),
		// same as
		// arg2 = (arg2 !== null && arg2 !== undefined) ? arg2 : 'default';

		//  downside: null still triggers default
		defaultIfNullish = defaultIfNullish ?? 'default';
		console.log(defaultIfNullish);

		// = 3. Set the default, if argument is undefined
		defaultIfUndefined =
			defaultIfUndefined !== undefined ? defaultIfUndefined : 'default';
		// arg2 = arg2 === undefined ? 'default' : arg2;
		console.log(defaultIfUndefined);

		// * 4. Set the default, if argument is undefined
		// use parameter defaults
		console.log(defaultIfUndefined2);
	}

	const args = new Array(4);
	['value', undefined, null, false, '', NaN].forEach((val) =>
		hasDefaults(...args.fill(val))
	);

	}

// default parameters are calculated each time when the function is called
{
	let value = 0;

	function test(arg = value) {
		return arg;
	}
	console.log(test());

	value = 1;
	console.log(test());
}

// ~ parameters are accessible in default parameters that go after them:
{
	function greet(name, greeting, message = `${greeting}, ${name}!`) {
		return message;
	}

	console.log(greet('David', 'Hi'));
	console.log(greet('David', 'Hi', 'Happy Birthday!'));
	// console.log(greet());
}

// ~ externally declared functions can be used to calculate default parameters
{
	function getDefault() {
		return 'default';
	}

	function hasDefault(arg = getDefault()) {
		return arg;
	}

	console.log(hasDefault());
}

// ~ internally declared functions won't work, because they are created after default parameters are calculated
{
	function hasDefault(arg = getDefault()) {
		function getDefault() {
			return 'default';
		}

		return arg;
	}

	// console.log(hasDefault()); // getDefault is not defined
}

// # 'option bag' pattern
{
	{
		const a = 1;
		const b = 2; // optional
		const c = 3;
		const d = 4; // optional

		function test2(a, c, optionBag) {
			console.log(a);
			console.log(c);
			console.log(optionBag.b);
			console.log(optionBag.d);
		}

		// required parameters are passed first, optional parameters are passed as an object
		test2(a, c, {
			b,
			// d: d,
		});
	}

	{
		// often it's better to pass optional parameters inside an object
		// because usual way of doing it requires to keep the order of arguments
		// if one of them is absent, you won't be able to do that and will be forced to pass undefined or null instead

		function receivesOptionBag(requiredArg, optionalArgs) {
			console.log(requiredArg);
			console.log(optionalArgs?.optionalArg1);
			console.log(optionalArgs?.optionalArg2);
			console.log(optionalArgs?.optionalArg3);
		}

		receivesOptionBag('I am required!', {
			optionalArg1: 'I am optional!',
			optionalArg3: 'I am optional too!',
		});
	}

	{
		// = you can set some default for options bag
		function receivesOptionBag(
			requiredArg,
			optionalArgs = { optionalArg1: 'arg1default' }
		) {
			console.log(requiredArg);
			console.log(optionalArgs?.optionalArg1);
			console.log(optionalArgs?.optionalArg2);
			console.log(optionalArgs?.optionalArg3);
		}

		receivesOptionBag('I am required!');
	}

	{
		// = but you can do it only for all parameters in a bag at once, not for individual parameters
		function receivesOptionBag(
			requiredArg,
			optionalArgs = {
				optionalArg1: 'optionalArg1default',
				optionalArg2: 'optionalArg2default',
			}
		) {
			console.log(requiredArg);
			console.log(optionalArgs.optionalArg1);
			console.log(optionalArgs.optionalArg2);
			console.log(optionalArgs.optionalArg3);
		}

		// receivesOptionBag('I am required!', {
		// 	optionalArg1: 'I am optional!',
		// 	optionalArg3: 'I am optional too!',
		// });
		receivesOptionBag('I am required!');
		// second optional parameter is not passed in a bag, but the default value for it won't be set, because option bag object is passed and default parameter value won't be applied
	}

	{
		// to set individual defaults, we can use destructuring defaults
		function receivesOptionBag(
			requiredArg,
			{
				optionalArg1 = 'optionalArg1default',
				optionalArg2 = 'optionalArg2default',
				optionalArg3 = 'optionalArg3default',
			} = {}
		) {
			console.log(requiredArg);
			console.log(optionalArg1);
			console.log(optionalArg2);
			console.log(optionalArg3);
		}

		receivesOptionBag('I am required!', {
			optionalArg1: 'I am optional!',
			optionalArg3: 'I am optional too!',
		});
	}
}

// same as
const {
	optionalArg1 = 'optionalArg1default',
	optionalArg2 = 'optionalArg2default',
	optionalArg3 = 'optionalArg3default',
} = {
	optionalArg1: 'I am optional!',
	optionalArg3: 'I am optional too!',
};
