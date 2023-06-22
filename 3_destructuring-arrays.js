// how can we turn array elements into variables?
const fullName = 'Edgar Allan Poe';

const arr = fullName.split(' ');

console.log(arr);

{
	const name = arr[0];
	const middleName = arr[1];
	const surname = arr[2];

	console.log(name);
	console.log(middleName);
	console.log(surname);
	// not very convenient...
}

// # destructuring syntax!
{
	const [name, middleName, surname] = arr;

	console.log(name);
	console.log(middleName);
	console.log(surname);
}

// ~ Elements can be skipped
{
	const [firstName, , title] = [
		'Julius',
		'Caesar',
		'Consul',
		'of the Roman Republic',
	];

	console.log(title);
}

// ~ works with any iterable data structure (like ...spread operator)
{
	const [firstLetter, secondLetter] = 'abc';
	console.log(firstLetter);
	console.log(secondLetter);
}

// ~ common usage with for..of and Object.entries:
{
	const user = {
		name: 'Jim',
		age: 30,
		occupation: 'Luxoft training student',
	};

	console.log(Object.entries(user));

	for (const [key, value] of Object.entries(user)) {
		console.log(`${key}: ${value}`);
	}
}

// ~ can be used to re-assign already existing variables
{
	// for example, swapping the values:
	let a = 1;
	let b = 3;

	[a, b] = [b, a];

	console.log(a);
	console.log(b);
}

// ~ ... rest operator can be used to destructure into array
{
	const [one, two, three, ...rest] = [1, 2, 3, 4, 5];
	console.log(one);
	console.log(two);
	console.log(three);
	console.log(rest);
}

// ~ we can set default values
{
	const arr = [1];

	const [a = 5, b = 7] = arr;
	console.log(a);
	console.log(b);
}

// ~ we can desctructure nested arrays too
{
	const [a, b, c] = [1, ['foo', 'bar'], 2];

	console.log(a, b, c);
}
{
	// to correctly desctructure we need to reproduce the structure of array on the right
	const [a, [b, c], d] = [1, ['foo', 'bar'], 2];
	console.log(a, b, c, d);
}
