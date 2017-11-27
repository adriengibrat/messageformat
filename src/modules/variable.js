import {expression, source} from 'core/utils'

variable.dependencies = ['locale', 'debug']

export default function variable (settings) {
	const debugArgs = settings.debug ? ', id' : ''
	return {
		runtime: new Function(`key, data${debugArgs}`
			, `if (data && {}.hasOwnProperty.call(data, key))`
			+	`return data[key];`
			+ (settings.debug ? `debug('missing %o key in %o data for message %o with %o locale', key, data, id, locale);` : '')
			+ `return '{' + key + '}'`
		)
		, tag: (_, key) => expression(`variable(${source(key)}, data${debugArgs})`)
	}
}
