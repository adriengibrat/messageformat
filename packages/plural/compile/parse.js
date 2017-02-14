// build rule definition object
export default function parse (vars, rule, name) {
	const parts = rule.trim().split(/\s*@\w*/)
	const type = name.replace('pluralRule-count-', '')
	const AND = ' && ', OR = ' || ', EQ = ' == ', INT = 'j && '
	// shamelessly borrowed from https://github.com/eemeli/make-plural.js
	const condition = parts.shift()
		.replace(/([fin]) % (\d+)/g, (_, x, n) => { // modulos
			const name = x + n
			vars.declarations[name] = `${name} = ${'n' === x ? 'i' : x} % ${n}`
			return `${'n' === x ? INT : ''}${name}`
		})
		.replace(/(\w+ (!?)= )([0-9.]+,[0-9.,]+)/g, (_, expr, not, list) => // lists
			`(${expr}${list.split(',').join((not ? AND : OR) + expr)})`
		)
		.replace(/(\w+) (!?)= ([0-9]+)\.\.([0-9]+)/g, (_, x, not, a, b) => // ranges
			not ?
				`(${x} < ${a}${OR}${x} > ${b})`
				: `${'n' === x ? INT : ''}${x} >= ${a}${AND}${x} <= ${b}`
		)
		.replace(/ and /g, AND)
		.replace(/ or /g, OR)
		.replace(/ = /g, EQ)

	return {
		source: `${condition ? 'if (' + condition + ')' : ''}return "${type}"`
		, type: type
		, test: parts.join(' ').split(/[ ,~…]+/).filter(Boolean)
	}
}
