import format from 'modules/format/_format'
import compileFormat from 'modules/format/_compile'

time.dependencies = ['intl']

export default function time (settings) {
	return {
		runtime: format(settings, 'time', 'DateTimeFormat', settings.time || {
			default: 'medium'
			, short: { hour: 'numeric', minute: 'numeric' }
			, medium: { hour: 'numeric', minute: 'numeric', second: 'numeric' }
			, long: { hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' }
			, full: { hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' }
		})
		, tag: compileFormat.bind(null, 'time')
	}
}
