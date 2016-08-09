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
	// Options:
	// currency, debug, date, list, locale, name, number, ordinal, plural, time

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

console.log(`
console.log(${options.name || 'i18n'}().party({
	gender_of_host: 'male'
	, host: 'Léo'
	, guest: 'Mia'
	, num_guests: 12
	, date: new Date()
	, price: 2
}))`)

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
	'aa'
	process.exit()
}
