import { error } from 'core/utils'

export const ESC = `'`

const NUM = new RegExp(`${ESC}*#$`)

const UNESC = new RegExp(`${ESC}${ESC}`, 'g')

export default message => cleanup(matching('{', '}', ESC, message))

function cleanup (array) { // @todo move cleanup logic in matching ?
	return array.reduce((cleaned, item, index, array) => {
		if ('string' === typeof item) // remove (skip) first/last empty strings & unescape
			return cleaned.concat(/^\s*$/.test(item) && (0 === index || index === array.length - 1) ?
				[] : item.replace(UNESC, ESC))
		return cleaned.concat([cleanup(item)]) // recusive clean
	}, [])
}

// recursive explode by matching pair of tokens
function matching (open, close, escape, string, start = 0, end = string.length) {
	const deep = []
	const buffer = []
	for (let offset = start, token = string.charAt(offset); offset < end; token = string.charAt(++offset))
		// @todo test edge cases
		// https://github.com/format-message/format-message/tree/master/packages/message-format#quote-escaping-rules
		// http://userguide.icu-project.org/formatparse/messages#TOC-Quoting-Escaping
		if (escape === token && /[{}]/.test(string.charAt(offset + 1))) {
			for (token = string.charAt(++offset); offset < end; token = string.charAt(++offset))
				if (escape === token && escape !== string.charAt(offset + 1))
					break // swallow until next (not escaped) escape char
		} else if (open === token) {
			if (!deep.length) // prepend first token
				buffer.push(string.slice(start, offset))

			deep.push(offset)
		} else if (close === token) {
			if (!deep.length)
				matching.error(`missing a "${open}" before the "${close}"`, string, offset)
			const begin = deep.pop()
			if (deep.length) // skip sub matching pairs
				continue
			buffer.push( // found first match, recurse
				matching(open, close, escape, string, begin + 1, offset) // first matching pair content
				, ...matching(open, close, escape, string, offset + 1, end) // till end
			)
			break
		} else if (!deep.length && '#' === token) {
			const text = string.slice(start, offset + 1)
			if (text.match(NUM)[0].length % 2) { // not escaped
				buffer.push(
					text.slice(0, -1) // text and #
					, ['#']
					, ...matching(open, close, escape, string, offset + 1, end) // till end
				)
				break
			}
		}

	if (!buffer.length)
		buffer.push(string.slice(start, end))
	if (deep.length)
		matching.error(`missing a "${close}" matching the "${open}"`, string, start + deep.shift())
	return buffer
}

matching.error = (message, string, offset) => {
	// eslint-disable-next-line no-console
	console.warn(`${string.slice(0, offset)}%c${string.substr(offset, 1)}`, 'background: red; color: white', string.slice(offset + 1) || '<-')
	// @TODO format in node (not browser)
	const lines = string.slice(0, offset).split(/\r?\n/)
	error('%s at line %i, column %i (offset %i).', message, lines.length, lines.pop().length + 1, offset)
}
