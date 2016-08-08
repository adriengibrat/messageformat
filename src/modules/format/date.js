import format from 'modules/format/_format'
import compileFormat from 'modules/format/_compile'

date.dependencies = ['intl']

export default function date (settings) {
	return {
		runtime: format(settings, 'date', 'DateTimeFormat', settings.date || {
			default: 'medium'
			, short: { month: 'numeric', day: 'numeric', year: '2-digit' }
			, medium: { month: 'short', day: 'numeric', year: 'numeric' }
			, long: { month: 'long', day: 'numeric', year: 'numeric' }
			, full: { month: 'long', day: 'numeric', year: 'numeric', weekday: 'long' }
		})
		, tag: compileFormat.bind(null, 'date')
	}
}
