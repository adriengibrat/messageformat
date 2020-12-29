/* global plurals: false */
import compileSelect from 'modules/select/_compile'
import noplural from 'modules/select/helpers/noplural'

plural.dependencies = ['locale', 'select', 'num']

function localePlural (settings) {
	return settings.plural || Object.hasOwnProperty.call(localePlural, settings.locale) && localePlural[settings.locale] || noplural
}

if ('function' === typeof plurals)
	Object.assign(localePlural, plurals())

export default function plural (settings) {
	return {
		runtime: localePlural(settings)
		, tag: compileSelect.bind(null, 'plural')
	}
}
