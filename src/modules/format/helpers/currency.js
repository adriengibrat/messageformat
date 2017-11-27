import {expression, source} from 'core/utils'

currency.override = true

export default function currency (settings) {
	return { runtime: settings.currency && expression(`override.currency || ${source(settings.currency)}`) }
}
