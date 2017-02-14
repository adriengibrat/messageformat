import {variable} from 'cldr/plural/utils'

// make source parts from deduped fn definitions and types
export default function make (source, dedupe) {
	const types = this[dedupe.fn.types]
	const name = variable(source.refs.length)
	source.refs.push(`${name} = ${dedupe.fn}`)
	if (!types.name) {
		types.name = variable(source.refs.length)
		source.refs.push(`${types.name} = ${JSON.stringify(types.list)}`)
	}
	source.types.push(`types(${name}, ${types.name})`)
	dedupe.locales.forEach(locale => source.props.push(`"${locale}": ${name}`))
	return source
}
