(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define('messageformat', factory) :
	(global.messageformat = factory());
}(this, function () { 'use strict';

	/**
	 * messageformat 0.0.1 – i18n message formating, all inclusive
	 * Made with ♫·♪ & -♥- by Adrien Gibrat <adrien.gibrat@gmail.com>
	 * Published under (WTFPL OR MIT) License
	 */

	function warn () {
		// eslint-disable-next-line no-console
		console.warn.apply(console, arguments)
	}

	function error (message) {
		var index = 0
		var args = arguments
		var types = {s: String, i: Number, o: JSON.stringify}
		throw Error(message.replace(/%([soi])/g, function (placeholder, type) {
			return args.hasOwnProperty(++index) ? types[type](args[index]) : placeholder
		}))
	}

	function expression (code) {
		return Object.assign(new Function(), { toString: function () { return code; } })
	}

	function source (object) {
		var withFn = function (_, value) { return 'function' === typeof value ? value.toString() : value; }
		var stringify = function (value) { return JSON.stringify(value, withFn); }
		function sourcify (json, value) {
			if ('function' === typeof value) // /!\ replace only once
				return json.replace(stringify(value), value.toString())
			if (Array.isArray(value))
				value.forEach(function (item) { json = sourcify(json, item) })
			else if (value && 'object' === typeof value)
				Object.keys(value).forEach(function (key) { json = sourcify(json, value[key]) })
			return json
		}
		return sourcify(stringify(object), object)
	}

	var ESC = "'"

	var NUM = new RegExp((ESC + "*#$"))

	var UNESC = new RegExp(("" + ESC + ESC), 'g')

	function parse (message) { return cleanup(matching('{', '}', ESC, message)); }

	function cleanup (array) { // @todo move cleanup logic in matching ?
		return array.reduce(function (cleaned, item, index, array) {
			if ('string' === typeof item) // remove (skip) first/last empty strings & unescape
				return cleaned.concat(/^\s*$/.test(item) && (0 === index || index === array.length - 1) ?
					[] : item.replace(UNESC, ESC))
			return cleaned.concat([cleanup(item)]) // recusive clean
		}, [])
	}

	// recursive explode by matching pair of tokens
	function matching (open, close, escape, string, start, end) {
		if ( start === void 0 ) start = 0;
		if ( end === void 0 ) end = string.length;

		var deep = []
		var buffer = []
		for (var offset = start, token = string.charAt(offset); offset < end; token = string.charAt(++offset))
			// @todo test edge cases
			// https://github.com/format-message/format-message/tree/master/packages/message-format#quote-escaping-rules
			// http://userguide.icu-project.org/formatparse/messages#TOC-Quoting-Escaping
			if (escape === token && /[\{\}]/.test(string.charAt(offset + 1))) {
				for (token = string.charAt(++offset); offset < end; token = string.charAt(++offset))
					if (escape === token && escape !== string.charAt(offset + 1))
						break // swallow until next (not escaped) escape char
			} else if (open === token) {
				if (!deep.length) // prepend first token
					buffer.push(string.slice(start, offset))

				deep.push(offset)
			} else if (close === token) {
				if (!deep.length)
					matching.error(("missing a \"" + open + "\" before the \"" + close + "\""), string, offset)
				var begin = deep.pop()
				if (deep.length) // skip sub matching pairs
					continue
				buffer.push.apply( // found first match, recurse
					buffer, [ matching(open, close, escape, string, begin + 1, offset) ].concat( matching(open, close, escape, string, offset + 1, end) ) // till end
				)
				break
			} else if (!deep.length && '#' === token) {
				var text = string.slice(start, offset + 1)
				if (text.match(NUM)[0].length % 2) { // not escaped
					buffer.push.apply(
						buffer, [ text.slice(0, -1) // text and #
						, ['#'] ].concat( matching(open, close, escape, string, offset + 1, end) ) // till end
					)
					break
				}
			}

		if (!buffer.length)
			buffer.push(string.slice(start, end))
		if (deep.length)
			matching.error(("missing a \"" + close + "\" matching the \"" + open + "\""), string, start + deep.shift())
		return buffer
	}

	matching.error = function (message, string, offset) {
		// eslint-disable-next-line no-console
		console.warn(((string.slice(0, offset)) + "%c" + (string.substr(offset, 1))), 'background: red; color: white', string.slice(offset + 1) || '<-')
		// @TODO format in node (not browser)
		var lines = string.slice(0, offset).split(/\r?\n/)
		error('%s at line %i, column %i (offset %i).', message, lines.length, lines.pop().length + 1, offset)
	}

	function bootstrap (settings, runtime, tags, module) {
		if (runtime.hasOwnProperty(module.name) || tags.hasOwnProperty(module.name))
			return // skip if already initialized
		module.dependencies.forEach(function (dependency) { // init dependencies
			bootstrap(settings, runtime, tags, compile[dependency])
		})
		var init = module(settings) // init module
		Object.defineProperty(runtime, module.name, { value: init.runtime, enumerable: true }) /*, writeable: false, configurable: false*/
		Object.defineProperty(tags, module.name, { value: init.tag }) /*, enumerable: false, writeable: false, configurable: false*/
	}

	function compile (settings, runtime, tags, params) {
		if ('string' === typeof params)
			return params
		if ('#' === params[0] && 1 === params.length) // leaves # alone
			return params[0]
		var compiler = compile.bind(null, settings, runtime, tags)
		params = params.map(function (param) { return 'string' === typeof param ? param.trim() : param.map(compiler); }) // recurse
		if ('string' === typeof params[0]) // explode first param
			params.splice.apply(params, [ 0, 1 ].concat( params[0].trim().split(/\s*,\s*/) ))
		var tag = params.splice(1, 1).pop() || 'variable'
		if (!compile[tag])
			error('unkown module %j, unable to compile', tag)
		bootstrap(settings, runtime, tags, compile[tag])
		if (!tags[tag])
			error('module %j does not have tag, unable to compile', tag)
		return tags[tag].apply(tags, [ runtime ].concat( params ))
	}

	function add (module) {
		var dependencies = [], len = arguments.length - 1;
		while ( len-- > 0 ) dependencies[ len ] = arguments[ len + 1 ];

		if (!module || 'function' !== typeof module || !module.name)
			error('you must provide a module as a named function')

		if (compile.hasOwnProperty(module.name))
			error('%j module is already defined', module.name)

		compile[module.name] = Object.assign(module, {
			dependencies: (module.dependencies || dependencies).map(function (dependency) {
				if (!compile.hasOwnProperty(dependency))
					error('add %j dependency before requiring it in %j module', dependency, module.name)
				return dependency
			})
		})
	}

	debug.override = true

	function debug (settings) {
		var debug = settings.debug ? 'function' === typeof settings.debug ? settings.debug : warn : false
		return { runtime: debug && expression(("override.debug || " + debug)) }
	}

	function locale (settings) {
		return { runtime: settings.locale || 'en' }
	}

	variable.dependencies = ['locale', 'debug']

	function variable (settings) {
		var debugArgs = settings.debug ? ', id' : ''
		return {
			runtime: new Function(("key, data" + debugArgs)
				, "if (data && {}.hasOwnProperty.call(data, key))"
				+	"return data[key];"
				+ (settings.debug ? "debug('missing %o key in %o data for message %o with %o locale', key, data, id, locale);" : '')
				+ "return '{' + key + '}'"
			)
			, tag: function (_, key) { return expression(("variable(" + (source(key)) + ", data" + debugArgs + ")")); }
		}
	}

	function num (settings) {
		var debugArgs = settings.debug ? ', id' : ''
		return {
			runtime: new Function(("key, data, offset" + debugArgs)
				, "var num = data && (data[key] - offset);"
				+ "return isNaN(num) ? variable(key, data" + debugArgs + ") : num"
			)
		}
	}

	function compileOptions (runtime, type, key, params, offset) {
		var plural = type.replace(/^select/, '')
		var number = plural && expression(("num(" + (source(key)) + ", data, " + (source(offset)) + (runtime.debug ? ', id' : '') + ")"))
		// pair [key, value ...] as {key: value ...}
		var options = params.reduce(function (options, param, index, params) {
			if ('string' === typeof param)
				options[param.replace(/^=(\d+)$/, '$1')] = expression(
					params[index + 1]
					.map(function (part) { return '#' === part && number || part; }) // replace # in text
					.map(source).join(' + ')
				)
			return options
		}, {})
		// check options
		var keys = Object.keys(options)
		// 'other' option is specified
		if (!options.hasOwnProperty('other'))
			error('mandatory %s "other" option is missing (found %j) in message %j with %j locale'
				, type, keys, runtime.id, runtime.locale)
		// check plural / selectordinal types
		var types = runtime[type] && runtime[type].types
		if (types) {
			// check plural type used in message but not supported by locale
			var unknown = keys.filter(isNaN).filter(function (option) { return -1 === types.indexOf(option); })
			if (unknown.length)
				warn('unknown %s %j (locale %j only accepts %j) found in message %j with %j locale'
				, type, unknown, runtime.locale, types, runtime.id, runtime.locale)
			// check plural type actually used by locale but not specified in message
			var forgotten = types.filter(function (option) { return !options.hasOwnProperty(option); })
			if (forgotten.length)
				warn('%s %j not specified (locale %j use %j) in message %j with %j locale'
				, type, forgotten, runtime.locale, types, runtime.id, runtime.locale)
		}
		return source(options)
	}

	function compileSelect (type, runtime, key) {
		var params = [], len = arguments.length - 3;
		while ( len-- > 0 ) params[ len ] = arguments[ len + 3 ];

		var offset = 0
		var args = ''
		if ('select' !== type) { // only plural / selectordinal
			// parse offset
			params[0] = params[0].replace(/^offset:\s*(.+?)\s+/, function (_, number) {
				if (isNaN(number))
					error('%s offset must be a number, invalid %j offset found in message %j with %j locale'
						, type, number, runtime.id, runtime.locale)
				offset = Number(number)
				return ''
			})
			args += ", " + type + ", " + offset
		}
		// compose expression
		args += runtime.debug ? ((args ? '' : ', null, null') + ", id") : ''
		return expression(("select(" + (source(key)) + ", data, " + (compileOptions(runtime, type, key, params, offset)) + args + ")"))
	}

	function noplural () { return 'other' }

	plural.dependencies = ['locale', 'select', 'num']

	function localePlural (settings) {
		return settings.plural || localePlural.hasOwnProperty(settings.locale) && localePlural[settings.locale] || noplural
	}

	if ('function' === typeof plurals)
		Object.assign(localePlural, plurals())

	function plural (settings) {
		return {
			runtime: localePlural(settings)
			, tag: compileSelect.bind(null, 'plural')
		}
	}

	select.dependencies = ['variable']

	function select (settings) {
		var debugArgs = settings.debug ? ', id' : ''
		return {
			runtime: new Function(("key, data, options, plural, offset" + debugArgs)
				, "var value = variable(key, data" + debugArgs + "); "
				+ "if({}.hasOwnProperty.call(options, value))"
				+	"return options[value];"
				+ "return plural && options[plural(value - offset)] || options.other"
			)
			, tag: compileSelect.bind(null, 'select')
		}
	}

	selectordinal.dependencies = ['locale', 'select', 'num']

	function localeOrdinal (settings) {
		return settings.ordinal || localeOrdinal.hasOwnProperty(settings.locale) && localeOrdinal[settings.locale] || noplural
	}

	if ('function' === typeof ordinals)
		Object.assign(localeOrdinal, ordinals())

	function selectordinal (settings) {
		return {
			runtime: localeOrdinal(settings)
			, tag: compileSelect.bind(null, 'selectordinal')
		}
	}

	currency.override = true

	function currency (settings) {
		return { runtime: settings.currency && expression(("override.currency || " + (source(settings.currency)))) }
	}

	formats.dependencies = ['currency']

	function formats () {
		return { runtime: {} }
	}

	function invalid () {
		return { runtime: '%o key in %o data is an invalid %s (should be a valid %o) for message %o with %o locale' }
	}

	intl.dependencies = ['locale', 'formats', 'invalid', 'debug']

	function intl (settings) {
		return {
			runtime: new Function('intl, formats, _locale'
				, "try {"
				+	"if (!Intl[intl].supportedLocalesOf(locale).length) {"
				+		"locale = 'object' === typeof navigator && navigator.language || 'en'"
				+ (settings.debug ? ";debug('formating %o locale is not supported, fallback to %o locale', _locale, locale)" : '')
				+	"}"
				+ "} catch (e) {"
				+ (settings.debug ? "debug('Intl.%s not supported, formating will be broken. Use a polyfill:', intl, 'https://www.npmjs.com/package/intl');" : '')
				+	"for (var format in formats)"
				+		"if (formats.hasOwnProperty(format))"
				+			"formats[format].cache = function (value) {"
				+				"return value.toLocaleString(locale, formats[format])"
				+			"}"
				+ "}"
			)
		}
	}

	function format (settings, type, intl, formats) {
		var Type, check
		intl.replace(/(Date|Number)(Time)?Format/, function (_, Constructor, dateTime) {
			Type = Constructor
			check = "isNaN(valid" + (dateTime ? '.getTime()' : '') + ")"
		})
		var invalid = settings.debug && ("debug(invalid, key, data, " + (source(type)) + ", " + (source(Type)) + ", id, locale),")
		var support = "intl(" + (source(intl)) + ", formats." + type + ", locale)"
		var debugArgs = settings.debug ? ', id' : ''
		var body = "function(key, data, format" + debugArgs + ") { "
			+ "var value = variable(key, data" + debugArgs + ")"
			+	", valid = new " + Type + "(value)"
			+	", options = formats." + type + "[format] || formats." + type + ".default"
			+	", " + type + " = options.cache || (options.cache = new Intl." + intl + "(locale, options).format);"
			+ "return " + check + " ? (" + (invalid || '') + "value) : " + type + "(valid) }"
		return Object.assign(expression(("(" + support + ", " + body + ")")), {
			// ensure default format, resolves text alias default property
			formats: Object.assign(formats, { 
				default: 'string' !== typeof formats.default && formats.default
				|| formats[formats.default] || formats[Object.keys(formats).shift()]
			})
		})
	}

	function compileFormat (formater, runtime, key, format) {
		// check format support
		var formats = runtime[formater].formats
		if (format && !formats.hasOwnProperty(format))
			warn('unknow %j %s format (supported are %j), will fallback to default %s format in message %j with %j locale'
				, format, formater, Object.keys(formats), formater, runtime.id, runtime.locale)
		// add used formats to runtime
		runtime.formats || (runtime.formats = {})
		var used = runtime.formats[formater] || (runtime.formats[formater] = {})
		var current = format || 'default'
		if (!used.hasOwnProperty(current))
			used[current] = formats[current]
		// compose expression
		var debugArgs = runtime.debug ? ', id' : ''
		var args = format ? (", " + (source(format)) + debugArgs) : debugArgs ? (", null" + debugArgs) : ''
		return expression((formater + "(" + (source(key)) + ", data" + args + ")"))
	}

	date.dependencies = ['intl']

	function date (settings) {
		return {
			runtime: format(settings, 'date', 'DateTimeFormat', settings.date || {
				default: 'medium'
				, short: { month: 'numeric', day: 'numeric', year: '2-digit' }
				, medium: { month: 'short', day: 'numeric', year: 'numeric' }
				, long: { month: 'long', day: 'numeric', year: 'numeric' }
				, full: { month: 'long', day: 'numeric', year: 'numeric', weekday: 'long' }
			})
			, tag: compileFormat.bind(null, 'date')
		}
	}

	time.dependencies = ['intl']

	function time (settings) {
		return {
			runtime: format(settings, 'time', 'DateTimeFormat', settings.time || {
				default: 'medium'
				, short: { hour: 'numeric', minute: 'numeric' }
				, medium: { hour: 'numeric', minute: 'numeric', second: 'numeric' }
				, long: { hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' }
				, full: { hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' }
			})
			, tag: compileFormat.bind(null, 'time')
		}
	}

	number.dependencies = ['currency', 'intl'] // currency must be defined before intl / formats

	function number (settings) {
		return {
			runtime: format(settings, 'number', 'NumberFormat', settings.number || Object.assign({
				default: 'decimal'
				, decimal: { style: 'decimal' }
				, integer: { style: 'decimal', maximumFractionDigits: 0 }
				, percent: { style: 'percent' }
			}, settings.currency && { currency: { style: 'currency', currency: expression('(currency)') } }))
			, tag: compileFormat.bind(null, 'number')
		}
	}

	function fallback () {
		return {
			runtime: new Function("key, data, fallback", "return data && data[key] || fallback")
			, tag: function (_, key, fallback) { return expression(("fallback(" + (source(key)) + ", data, " + (source(fallback)) + ")")); }
		}
	}

	add(debug)
	add(locale)
	add(variable) // dependencies: locale, debug

	add(num)
	add(select) // dependency: variable
	add(plural) // dependency: locale, select, num
	add(selectordinal) // dependency: locale, select, num

	add(currency)
	add(formats)
	add(invalid)
	add(intl) // dependencies: locale, debug, formats, invalid
	add(date) // dependency: intl
	add(time) // dependency: intl
	add(number) // dependencies: currency, intl

	add(fallback)

	function vars (runtime) {
		var vars = Object.keys(runtime)
			.reduce(function (declarations, name) { return declarations.concat((name + " = " + (source(runtime[name])))); }, [])
		return vars.length ? ("var " + (vars.join(', ')) + "; ") : ''
	}

	function messageformat (messages, settings) {
		if ( settings === void 0 ) settings = {};

		if (!messages)
			error('you must provide messages (map of {id: message})')
		var runtime = {}
		var compiler = compile.bind(null, settings, runtime, {})
		var compiled = Object.keys(messages)
			.reduce(function (compiled, id) {
				runtime.id = id
				var body = parse(messages[id]).map(compiler).map(source).join(' + ')
				var debugId = runtime.debug ? ("var id = " + (source(id)) + ";") : ''
				compiled[id] = new Function('data', (debugId + "return " + body))
				return compiled
			}, {})
		delete runtime.id
		var args = '', override = '' 
		if (Object.keys(runtime).some(function (module) { return compile[module].override; })) {
			args = 'override'
			override = 'override||(override = {});'
		}
		return new Function(args, ("" + override + (vars(runtime)) + "return " + (source(compiled))))
	}

	var index = Object.assign(messageformat, {add: add, warn: warn, error: error, expression: expression, source: source})

	return index;

}));