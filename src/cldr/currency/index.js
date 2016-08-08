import currencies from 'cldr-core/supplemental/currencyData.json'
import parse from 'cldr/currency/parse'
import {identity, pick, umd, parseLocale} from 'cldr/plural/utils'

const args = process.argv.slice(2)
const data = parse(currencies.supplemental.currencyData.region)
const subset = args.length ? pick.bind(null, args) : identity

// eslint-disable-next-line no-console
console.log(umd('currency', `function () {`
	+ `var currencies = ${JSON.stringify(subset(data))};`
	+ `${parseLocale};`
	+ `return function (locale) {`
	+	`return (currencies[parseLocale(locale).region] || currencies[locale.toUpperCase()] || [])[0]`
	+ `} }`
))
