import builder from 'cldr/plural/build/index'
import compiler from 'cldr/plural/compile/index'
import {umd, clean, parseArgs} from 'cldr/plural/utils'

const options = parseArgs(process.argv.slice(2))
const compile = builder(compiler)
const plurals = compile(options.ordinal ? 
	require('cldr-core/supplemental/ordinals.json').supplemental['plurals-type-ordinal']
	: require('cldr-core/supplemental/plurals.json').supplemental['plurals-type-cardinal']
)

// eslint-disable-next-line no-console
console.log(umd(options.ordinal ? 'ordinal' : 'plural', clean(plurals.factory())))
