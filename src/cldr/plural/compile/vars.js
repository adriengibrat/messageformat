import {map, identity} from 'cldr/plural/utils'

Vars.prototype = {
	// generate var declarations block
	toString () {
		var declarations = map(identity, this.declarations, this.sort)
		return declarations.length ? 'var ' + declarations.join('\n\t, ') + '\n' : ''
	}
	// parse source to find given operands (variable names)
	, parse (source) {
		this.lookups.forEach(lookup => lookup.call(this, source))
		return this
	}
}

// helps tracking variables used in source code
export default function Vars (operands, sort) {
	this.declarations = {}
	this.lookups = (operands || [])
		// create operand lookup function used to parse source
		.map(operand => {
			var name = /^\w+/.exec(operand).pop()
			var pattern = new RegExp('\\b' + name + '\\b')
			return function (source) {
				if (pattern.test(this + source))
					this.declarations[name] = operand
			}
		})
		// reverse for dependencies
		.reverse()
	this.sort = sort
}
