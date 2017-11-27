
intl.dependencies = ['locale', 'formats', 'invalid', 'debug']

export default function intl (settings) {
	return {
		runtime: new Function('intl, formats, _locale'
			, `try {`
			+	`if (!Intl[intl].supportedLocalesOf(locale).length) {`
			+		`locale = 'object' === typeof navigator && navigator.language || 'en'`
			+ (settings.debug ? `;debug('formating %o locale is not supported, fallback to %o locale', _locale, locale)` : '')
			+	`}`
			+ `} catch (e) {`
			+ (settings.debug ? `debug('Intl.%s not supported, formating will be broken. Use a polyfill:', intl, 'https://www.npmjs.com/package/intl');` : '')
			+	`for (var format in formats)`
			+		`if (formats.hasOwnProperty(format))`
			+			`formats[format].cache = function (value) {`
			+				`return value.toLocaleString(locale, formats[format])`
			+			`}`
			+ `}`
		)
	}
}
