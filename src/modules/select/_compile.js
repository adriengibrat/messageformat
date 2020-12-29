import {warn, error, expression, source} from 'core/utils'

function compileOptions (runtime, type, key, params, offset) {
	const plural = type.replace(/^select/, '')
	const number = plural && expression(`num(${source(key)}, data, ${source(offset)}${runtime.debug ? ', id' : ''})`)
	// pair [key, value ...] as {key: value ...}
	const options = params.reduce((options, param, index, params) => {
		if ('string' === typeof param)
			options[param.replace(/^=(\d+)$/, '$1')] = expression(
				params[index + 1]
				.map(part => '#' === part && number || part) // replace # in text
				.map(source).join(' + ')
			)
		return options
	}, {})
	// check options
	const keys = Object.keys(options)
	// 'other' option is specified
	if (!Object.hasOwnProperty.call(options, 'other'))
		error('mandatory %s "other" option is missing (found %j) in message %j with %j locale'
			, type, keys, runtime.id, runtime.locale)
	// check plural / selectordinal types
	const types = runtime[type] && runtime[type].types
	if (types) {
		// check plural type used in message but not supported by locale
		const unknown = keys.filter(isNaN).filter(option => -1 === types.indexOf(option))
		if (unknown.length)
			warn('unknown %s %j (locale %j only accepts %j) found in message %j with %j locale'
			, type, unknown, runtime.locale, types, runtime.id, runtime.locale)
		// check plural type actually used by locale but not specified in message
		const forgotten = types.filter(option => !Object.hasOwnProperty.call(options, option))
		if (forgotten.length)
			warn('%s %j not specified (locale %j use %j) in message %j with %j locale'
			, type, forgotten, runtime.locale, types, runtime.id, runtime.locale)
	}
	return source(options)
}

export default (type, runtime, key, ...params) => {
	let offset = 0
	let args = ''
	if ('select' !== type) { // only plural / selectordinal
		// parse offset
		params[0] = params[0].replace(/^offset:\s*(.+?)\s+/, (_, number) => {
			if (isNaN(number))
				error('%s offset must be a number, invalid %j offset found in message %j with %j locale'
					, type, number, runtime.id, runtime.locale)
			offset = Number(number)
			return ''
		})
		args += `, ${type}, ${offset}`
	}
	// compose expression
	args += runtime.debug ? `${args ? '' : ', null, null'}, id` : ''
	return expression(`select(${source(key)}, data, ${compileOptions(runtime, type, key, params, offset)}${args})`)
}
