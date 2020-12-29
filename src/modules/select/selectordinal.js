/* global ordinals: false */
import compileSelect from 'modules/select/_compile'
import noplural from 'modules/select/helpers/noplural'

selectordinal.dependencies = ['locale', 'select', 'num']

function localeOrdinal (settings) {
	return settings.ordinal || Object.hasOwnProperty.call(localeOrdinal, settings.locale) && localeOrdinal[settings.locale] || noplural
}

if ('function' === typeof ordinals)
	Object.assign(localeOrdinal, ordinals())

export default function selectordinal (settings) {
	return {
		runtime: localeOrdinal(settings)
		, tag: compileSelect.bind(null, 'selectordinal')
	}
}
