import {expression, source} from 'core/utils'

export default (settings, type, intl, formats) => {
	let Type, check
	intl.replace(/(Date|Number)(Time)?Format/, (_, Constructor, dateTime) => {
		Type = Constructor
		check = `isNaN(valid${dateTime ? '.getTime()' : ''})`
	})
	const invalid = settings.debug && `debug(invalid, key, data, ${source(type)}, ${source(Type)}, id, locale),`
	const support = `intl(${source(intl)}, formats.${type}, locale)`
	const debugArgs = settings.debug ? ', id' : ''
	const body = `function(key, data, format${debugArgs}) { `
		+ `var value = variable(key, data${debugArgs})`
		+	`, valid = new ${Type}(value)`
		+	`, options = formats.${type}[format] || formats.${type}.default`
		+	`, ${type} = options.cache || (options.cache = new Intl.${intl}(locale, options).format);`
		+ `return ${check} ? (${invalid || ''}value) : ${type}(valid) }`
	return Object.assign(expression(`(${support}, ${body})`), {
		// ensure default format, resolves text alias default property
		formats: Object.assign(formats, { 
			default: 'string' !== typeof formats.default && formats.default
			|| formats[formats.default] || formats[Object.keys(formats).shift()]
		})
	})
}
