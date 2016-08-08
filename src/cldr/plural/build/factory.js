import {reduce} from 'cldr/plural/utils'
import dedupe from 'cldr/plural/build/dedupe'
import make from 'cldr/plural/build/make'

// compile factory of locales plural hash
export default function factory () {
	const dedupes = reduce(dedupe, {fns: {}, types: {}}, this)
	const sources = reduce(make.bind(dedupes.types), {refs: [], types: [], props: []}, dedupes.fns)
	const LF = '\n'
	const COMMA = ', '
	return new Function('', [
		'var ' + sources.refs.join(COMMA)
		, 'function types (fn, types) { fn.types = types.slice() }'
		, sources.types.join(LF)
		, 'return {' + sources.props.join(COMMA) + '}'
	].join(LF))
}
