import plurals from 'cldr-core/supplemental/plurals.json'
import ordinals from 'cldr-core/supplemental/ordinals.json'

import builder from 'cldr/plural/build/index'
import compiler from 'cldr/plural/compile/index'
import {identity, pick, umd} from 'cldr/plural/utils'

const args = process.argv.slice(2)
const plural = {
	plural: plurals.supplemental['plurals-type-cardinal']
	, ordinal :ordinals.supplemental['plurals-type-ordinal']
}

Object.keys(plural)
	.forEach(name => {
		const subset = args.length ? pick.bind(null, args) : identity
		const compile = builder(compiler)
		const plurals = compile(subset(plural[name]))
		// eslint-disable-next-line no-console
		console.log(umd(name, plurals.factory()))
	})
