const recording = {
	band: 'the Beatles',
	album: 'Yellow Submarine',
	length: '39:16',
	year: 1969,
};

// = the usual way of putting properties into variables is not convenient
{
	const band = recording.band;
	const album = recording.album;
	const length = recording.length;
	const year = recording.year;
}

// # object destructuring syntax
{
	// objects destructuring works inside curly brackets {}
	// in order to write the property value into variable, property name must match the specified variable name
	const { album, band, length, year } = recording;

	console.log(band);

	// same as above
}

// ~ order of destructuring doesn't matter for objects
{
	// in any case the value of the same-named property will be written into the variable
	// we can extract only the properties that we're interested in
	const { year, band } = recording;
	console.log(band, year);
}

// ~ destructuring into variable with other name
{
	// we can write the property into differently-named variable, if we pass a new name after the colon
	// we need to do this if property name won't work as a valid variable name

	recording['release-date'] = new Date(1969, 7, 10);
	const { band: artist, 'release-date': releaseDate } = recording;

	console.log(artist);
	console.log(releaseDate);
}

// ~ destructuring into existing variables
{
	// we can destructure values into already existing variables
	// because JS will consider curly brackets a code block delimiters, we need to additionally wrap the destructuring expression into ()
	let a, b;

	// { a, b } = { a: 1, b: 2 } // this will throw an error:
	({ a, b } = { a: 1, b: 2 }); // this works

	console.log(a, b);
}

// # using ...rest

// ~ we can use ...rest operator to gather all un-destructured properties into new object
{
	const recording = {
		band: 'the Beatles',
		album: 'Yellow Submarine',
		length: '39:16',
		year: 1969,
	};

	const { band, album, ...meta } = recording;

	console.log(band, album);

	console.log(meta);
}

// ~ deleting properties
{
	// = usual way (mutates the object)
	{
		const options = {
			title: 'Menu',
			height: 200,
			width: 100,
		};

		delete options.title;
		console.log(options); // original object has changed
	}

	// = immutable way using ...rest
	// ...rest can be used to delete properties from object (in immutable way - creating a new object) as an alternative to delete operator)
	{
		const options = {
			title: 'Menu',
			height: 200,
			width: 100,
		};

		const { height, ...newOptions } = options;

		console.log(newOptions);

		console.log(options); // original object has not changed
	}
}

// ~ we can set default values
{
	const options = {
		width: 4096,
		height: 2160,
	};

	const { width: w = 1920, height: h = 1080, quality = 'medium' } = options;

	console.log(w, h, quality);
}

// ~ in function parameters
{
	/* destructuring is often used in function parameters
  when the last argument passed is an object with optional parameters (option bag)

  we need empty object as a default, because if we don't set it, options object itself will become a required argument
  (if it's not passed, destructuring operation will throw an error)
  */

	function drawChart(type, { size = 'big', radius = 25 } = {}) {
		console.log(type, size, radius);
		// do some chart drawing
	}

	drawChart('circular', {
		radius: 30,
	});

	drawChart('circular'); // we can omit the last argument, because default is set
}

// ~ Combined object/array destructuring
{
	const props = [
		{ id: 1, name: 'Fizz' },
		{ id: 2, name: 'Buzz' },
		{ id: 3, name: 'FizzBuzz' },
	];

	const [, , { name }] = props;

	console.log(name);
	console.log(props[2].name);
}
