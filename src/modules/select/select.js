import compileSelect from 'modules/select/_compile'

select.dependencies = ['variable']

export default function select (settings) {
	const debugArgs = settings.debug ? ', id' : ''
	return {
		runtime: new Function(`key, data, options, plural, offset${debugArgs}`
			, `var value = variable(key, data${debugArgs}); `
			+ `if({}.hasOwnProperty.call(options, value))`
			+	`return options[value];`
			+ `return plural && options[plural(value - offset)] || options.other`
		)
		, tag: compileSelect.bind(null, 'select')
	}
}
