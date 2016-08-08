import {warn, expression, source} from 'core/utils'

export default (formater, runtime, key, format) => {
	// check format support
	const formats = runtime[formater].formats
	if (format && !formats.hasOwnProperty(format))
		warn('unknow %j %s format (supported are %j), will fallback to default %s format in message %j with %j locale'
			, format, formater, Object.keys(formats), formater, runtime.id, runtime.locale)
	// add used formats to runtime
	runtime.formats || (runtime.formats = {})
	const used = runtime.formats[formater] || (runtime.formats[formater] = {})
	const current = format || 'default'
	if (!used.hasOwnProperty(current))
		used[current] = formats[current]
	// compose expression
	const debugArgs = runtime.debug ? ', id' : ''
	const args = format ? `, ${source(format)}${debugArgs}` : debugArgs ? `, null${debugArgs}` : ''
	return expression(`${formater}(${source(key)}, data${args})`)
}
