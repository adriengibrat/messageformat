import parse from 'parse'

export default parse(require('cldr-core/supplemental/currencyData.json').supplemental.currencyData.region)
