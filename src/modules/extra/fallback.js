import {expression, source} from 'core/utils'

export default function fallback () {
	return {
		runtime: new Function(`key, data, fallback`, `return data && data[key] || fallback`)
		, tag: (_, key, fallback) => expression(`fallback(${source(key)}, data, ${source(fallback)})`)
	}
}
