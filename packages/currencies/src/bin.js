import currencies from 'index'
import {umd} from '../../plural/utils'

// eslint-disable-next-line no-console
console.log(umd('currency', `function () { return ${JSON.stringify(currencies)} }` ))
