export default function parse (data, historical) {
	return Object.keys(data)
		.reduce((map, region) => {
			const history = {}
			const currencies = data[region]
				.reduce((local, currencies) =>
					local.concat(
						Object.keys(currencies)
							.reduce((list, name) => {
								const currency = currencies[name]
								history[name] = currency._from
								return !historical && (!currency._from || currency._to) ?
									list
									: list.concat(name)
							}, [])
					)
				, [])
			if (currencies.length)
				map[region] = currencies.sort((a, b) => history[a] > history[b] ? history[a] ? -1 : 0 : 1)
			return map
		}, {})
}
