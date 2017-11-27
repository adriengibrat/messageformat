import factory from 'cldr/plural/build/factory'
import {reduce} from 'cldr/plural/utils'

// locales batch rules parser
export default compiler =>
	// build locales plural hash
	dictionary => reduce((locales, rules, locale) => {
		try { locales[locale] = compiler(rules) }
		catch (error) { throw Error(`compile ${locale} plural failed (${error.message})`) }
		return locales
	}, Object.create({factory}), dictionary)
