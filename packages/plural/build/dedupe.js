// dedupe plural fn definitions and types
export default function dedupe (dedupe, fn, locale) {
	const fns = dedupe.fns
	fns[fn] = { locales: fns[fn] ? fns[fn].locales.concat(locale) : [locale], fn: fn }
	dedupe.types[fn.types] = { list: fn.types }
	return dedupe
}
