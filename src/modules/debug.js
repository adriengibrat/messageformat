import {warn, expression} from 'core/utils'

debug.override = true

export default function debug (settings) {
	const debug = settings.debug ? 'function' === typeof settings.debug ? settings.debug : warn : false
	return { runtime: debug && expression(`override.debug || ${debug}`) }
}
