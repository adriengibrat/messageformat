export function warn () {
	// eslint-disable-next-line no-console
	console.warn(...arguments)
}

export function error (message) {
	let index = 0
	const args = arguments
	const types = {s: String, i: Number, o: JSON.stringify}
	throw Error(message.replace(/%([soi])/g, function (placeholder, type) {
		return args.hasOwnProperty(++index) ? types[type](args[index]) : placeholder
	}))
}

export function expression (code) {
	return Object.assign(new Function(), { toString: () => code })
}

export function source (object) {
	const withFn = (_, value) => 'function' === typeof value ? value.toString() : value
	const stringify = value => JSON.stringify(value, withFn)
	function sourcify (json, value) {
		if ('function' === typeof value) // /!\ replace only once
			return json.replace(stringify(value), value.toString())
		if (Array.isArray(value))
			value.forEach(item => { json = sourcify(json, item) })
		else if (value && 'object' === typeof value)
			Object.keys(value).forEach(key => { json = sourcify(json, value[key]) })
		return json
	}
	return sourcify(stringify(object), object)
}
