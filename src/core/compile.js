import {error} from 'core/utils'

function bootstrap (settings, runtime, tags, module) {
	if (runtime.hasOwnProperty(module.name) || tags.hasOwnProperty(module.name))
		return // skip if already initialized
	module.dependencies.forEach(dependency => { // init dependencies
		bootstrap(settings, runtime, tags, compile[dependency])
	})
	const init = module(settings) // init module
	Object.defineProperty(runtime, module.name, { value: init.runtime, enumerable: true }) /*, writeable: false, configurable: false*/
	Object.defineProperty(tags, module.name, { value: init.tag }) /*, enumerable: false, writeable: false, configurable: false*/
}

export default function compile (settings, runtime, tags, params) {
	if ('string' === typeof params)
		return params
	if ('#' === params[0] && 1 === params.length) // leaves # alone
		return params[0]
	const compiler = compile.bind(null, settings, runtime, tags)
	params = params.map(param => 'string' === typeof param ? param.trim() : param.map(compiler)) // recurse
	if ('string' === typeof params[0]) // explode first param
		params.splice(0, 1, ...params[0].trim().split(/\s*,\s*/))
	const tag = params.splice(1, 1).pop() || 'variable'
	if (!compile[tag])
		error('unkown module %j, unable to compile', tag)
	bootstrap(settings, runtime, tags, compile[tag])
	if (!tags[tag])
		error('module %j does not have tag, unable to compile', tag)
	return tags[tag](runtime, ...params)
}
