import add from 'core/add'
// core
import debug from 'modules/debug'
import locale from 'modules/locale'
import variable from 'modules/variable'
// selects
import num from 'modules/select/helpers/num'
import plural from 'modules/select/plural'
import select from 'modules/select/select'
import selectordinal from 'modules/select/selectordinal'
// formats
import currency from 'modules/format/helpers/currency'
import formats from 'modules/format/helpers/formats'
import invalid from 'modules/format/helpers/invalid'
import intl from 'modules/format/helpers/intl'
import date from 'modules/format/date'
import time from 'modules/format/time'
import number from 'modules/format/number'

import fallback from 'modules/extra/fallback'

add(debug)
add(locale)
add(variable) // dependencies: locale, debug

add(num)
add(select) // dependency: variable
add(plural) // dependency: locale, select, num
add(selectordinal) // dependency: locale, select, num

add(currency)
add(formats)
add(invalid)
add(intl) // dependencies: locale, debug, formats, invalid
add(date) // dependency: intl
add(time) // dependency: intl
add(number) // dependencies: currency, intl

add(fallback)
