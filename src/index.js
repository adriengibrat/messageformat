import {warn, error, expression, source} from 'core/utils'
import parse from 'core/parse'
import compile from 'core/compile'
import add from 'core/add'
import 'modules/_init'

function vars (runtime) {
	const vars = Object.keys(runtime)
		.reduce((declarations, name) => declarations.concat(`${name} = ${source(runtime[name])}`), [])
	return vars.length ? `var ${vars.join(', ')}; ` : ''
}

function messageformat (messages, settings = {}) {
	if (!messages)
		error('you must provide messages (map of {id: message})')
	const runtime = {}
	const compiler = compile.bind(null, settings, runtime, {})
	const compiled = Object.keys(messages)
		.reduce((compiled, id) => {
			runtime.id = id
			const body = parse(messages[id]).map(compiler).map(source).join(' + ')
			const debugId = runtime.debug ? `var id = ${source(id)};` : ''
			compiled[id] = new Function('data', `${debugId}return ${body}`)
			return compiled
		}, {})
	delete runtime.id
	let args = '', override = '' 
	if (Object.keys(runtime).some(module => compile[module].override)) {
		args = 'override'
		override = 'override||(override = {});'
	}
	return new Function(args, `${override}${vars(runtime)}return ${source(compiled)}`)
}

export default Object.assign(messageformat, {add, warn, error, expression, source})
