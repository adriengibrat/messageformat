import {umd} from 'cldr/plural/utils'

const fs = require('fs')
const path = require('path')
const directory = path.resolve('node_modules/cldr-misc-modern/main/')

let lists = fs.readdirSync(directory)
	.reduce((lists, locale) => {
		lists[locale] = JSON.parse(fs.readFileSync(`${directory}/${locale}/listPatterns.json`, 'utf8'))
				.main[locale].listPatterns['listPattern-type-standard']
		return lists
	}, {})

lists = Object.keys(lists)
	.reduce((cleaned, locale) => {
		let list = lists[locale]
		if (list[2] === list.end)
			delete list[2]
		if (list.start === list.middle)
			delete list.middle
		list = JSON.stringify(list)
		if (!cleaned[list])
			cleaned[list] = []
		cleaned[list].push(locale)
		return cleaned
	}, {})

Object.keys(lists)
	.forEach(key =>
		lists[key] = lists[key]
			.reduce((shortlist, locale, index, locales) => {
				const language = locale.split('-').shift()
				locale = -1 !== locales.indexOf(language) ? language : locale
				return -1 !== shortlist.indexOf(locale) ? shortlist : shortlist.concat(locale)
			}, [])
	)

lists = Object.keys(lists)
	.reduce((data, key) => {
		lists[key].forEach(locale => data[locale] = JSON.parse(key))
		return data
	}, {})

// eslint-disable-next-line no-console
console.log(umd('list', `function () { return ${JSON.stringify(lists)} }`))
 