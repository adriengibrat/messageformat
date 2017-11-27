import Vars from 'cldr/plural/compile/vars'
import parse from 'cldr/plural/compile/parse'
import test from 'cldr/plural/compile/test'
import {map, prop, by} from 'cldr/plural/utils'

export default ruleset => {
	var vars = new Vars([
		'b = (n + ".").split(".")' // array, integer digits & fractional digits in n
		, 'f = b[1]' // string, fractional digits in n
		, 'i = b[0]' // string, integer digits of n
		, 'j = Number(i) == n' // boolean, n is an integer
		, 't = f.replace(/0+$/, "")' // string, fractional digits in n without trailing zeros
		, 'v = f.length' // integer, number of fraction digits in n
	], (a, b) => a.length - b.length || (a < b ? -1 : 1)) // sort variable names
	var rules = map(parse.bind(null, vars), ruleset)
		.sort(by('type', {zero: 0, one: 1, two: 2, few: 3, many: 4, other: 5}))
	var body = rules.map(prop('source')).join('\n')
	var fn = new Function('n', '\t' + (vars.parse(body) + body).replace(/\n/g, '\n\t'))
	fn.types = rules.map(prop('type'))
	rules.forEach(rule => test(fn, rule.type, rule.test))
	return fn
}
