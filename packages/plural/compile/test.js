// test if function returns as expected for given values
export default function test (fn, expected, values) {
	values.forEach(n => {
		const result = fn(n)
		if (result != expected)
			throw Error(`n = ${n} -> ${result}, expected ${expected}`)
	})
}
