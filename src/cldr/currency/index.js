import parse from 'cldr/currency/parse'
import {umd} from 'cldr/plural/utils'

const currencies = parse(require('cldr-core/supplemental/currencyData.json').supplemental.currencyData.region)

// eslint-disable-next-line no-console
console.log(umd('currency', `function () { return ${JSON.stringify(currencies)} }` ))
