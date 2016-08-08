import {expression} from 'core/utils'
import format from 'modules/format/_format'
import compileFormat from 'modules/format/_compile'

number.dependencies = ['currency', 'intl'] // currency must be defined before intl / formats

export default function number (settings) {
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
