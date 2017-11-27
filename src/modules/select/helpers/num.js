
export default function num (settings) {
	const debugArgs = settings.debug ? ', id' : ''
	return {
		runtime: new Function(`key, data, offset${debugArgs}`
			, `var num = data && (data[key] - offset);`
			+ `return isNaN(num) ? variable(key, data${debugArgs}) : num`
		)
	}
}