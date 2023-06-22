// # things that are posiible combining destructuring and spread operator

const obj = {
	foo: 1,
	bar: 2,
	baz: 3,
};

// ~ delete property (immutable)
{
	const { foo, ...objWithoutFoo } = obj;
	console.log(objWithoutFoo);
}

// ~ delete property (immutable) dynamic
{
	const propName = 'foo';
	const { [propName]: _, ...objWithoutPropName } = obj;
	console.log(objWithoutPropName);
}

// ~ change props order
// = up
{
	// bar value will be taken rom destructured object (that's why we can set it to null/undefined/whatever)
	// but in new object the property will now be on the first place
	console.log({ bar: null, ...obj });
}

// = down
{
	const { foo, ...objWithoutFoo } = obj;
	console.log({ ...objWithoutFoo, foo });
}

// ~ set default property (is added, if absent)
{
	const setDefaults = (object) => ({
		defaultProp: 'defaultValue',
		...object,
	});

	console.log(setDefaults(obj));
}

// ~ rename property
{
	const renamed = ({ foo, ...object }) => ({ quux: foo, ...object });
	console.log(renamed(obj));
}

// ~ conditional property
{
	// conditionalProp is added only if foo prop is present
	console.log({
		...obj,
		...(obj.foo && { conditionalProp: 'optional' }),
	});
	}
