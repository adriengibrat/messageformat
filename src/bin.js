import {umd, parseLocale, parseArgs} from 'cldr/plural/utils'

const messageformat = require('../messageformat.js')
const options = Object.assign({ locale: 'en' }, parseArgs(process.argv.slice(2)))
const stdin = process.stdin
let input = ''

stdin.setEncoding('utf8')
stdin.on('data', chunk =>  { input += chunk })
stdin.on('end', function () {
	let messages
	try {
		messages = JSON.parse(input)
	}
	catch (error) {
		// eslint-disable-next-line no-console
		return console.error('messages must be valid JSON', error.message)
	}
	Array('date', 'number', 'time').forEach(option => {
		if (options.hasOwnProperty(option))
			options[option] = JSON.parse(options[option])
	})
	options.plural = options.plural ? require(options.plural) : lookupPlural(require('../plurals.js'), options.locale)
	options.ordinal = options.ordinal ? require(options.ordinal) : lookupPlural(require('../ordinals.js'), options.locale)
	if (true === options.currency)
		options.currency = lookupCurrency(require('../currencies.js'), options.locale)

	// eslint-disable-next-line no-console
	console.log(umd(options.name || 'i18n', `function () { return ${messageformat(messages, options)} }`))

	function lookupPlural (plurals, locale) {
		const {language, region} = parseLocale(locale)
		return plurals[`${language}-${region}`] || plurals[language]
	}

	function lookupCurrency (currencies, locale) {
		const {language, region} = parseLocale(locale)
		return (currencies[region] || currencies[language.toUpperCase()] || [])[0]
	}

})

if (stdin.isTTY) { // outputs help when no stdin
	// eslint-disable-next-line no-console
	console.log('Usage: messageformat [options] < messages.json > i18n.js\n\
or\n\
cat messages.json | messageformat [options] > i18n.js\n\
\n\
ex: messageformat --locale en-US --currency --debug < messages.json | uglifyjs --beautify -- - > i18n.js\n\
\n\
Options:\n\
--locale=<locale code>				Set locale\n\
\n\
Optional settings:\n\
--name=<function name>				Default is "i18n"\n\
--debug						Debug messages on error at runtime\n\
\n\
Enable currency support:\n\
--currency					Guess currency from locale, see currencies.js\n\
--currency=<currency code>			Set currency\n\
\n\
Custom date, number & time formats:\n\
--date=<intl date formats json>			Default formats are provided (short, medium, long, full)\n\
--number=<intl number formats json>		Default formats are provided (decimal, integer, percent, currency)\n\
--time=<intl time formats json>			Default formats are provided (short, medium, long, full)\n\
\n\
Custom plural & ordinal rules:\n\
--plural=<plural js file>			Default is resolved from locale, see plurals.js\n\
--ordinal=<ordinal js file>			Default is resolved from locale, see ordinals.js\n\
\n\
Todo: list formats support, see lists.js')
	process.exit()
}
