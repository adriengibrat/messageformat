# messageformat
The purpose of this package is to precompile messages as optimised functions for translation with full messageformat support.

## Command Line Interface

The CLI `messageformat` (usable via npm scripts) takes a hash of messages in json as input and generates a js file that exports a factory of compiled messages as an UMD module.

And helpers CLI utils (usable via npm scripts), based on CLDR data:
1. plural: geneates a factory of plural and ordinal functions of common locales as an UMD module
2. currency: exports a factory of currency mapping of common locales as an UMD module
3. list: exports a factory of list formats of common locales as an UMD module

### messageformat

Takes a hash of messages in json as input and generates a js file that exports a factory of compiled messages as an UMD module.

Usage: 
```sh
messageformat [options] < messages.json
```
or
```sh
cat messages.json | messageformat [options]
```

ex: 
```sh
messageformat --locale en-US --currency --debug < test/messages.json | npx uglifyjs --beautify > i18n.js

messageformat --locale en-US --currency < test/messages.json | npx uglifyjs > i18n.min.js
```

Options:
`--locale=<locale code>`                          Set locale

Optional settings:
`--name=<function name>`                          Default is "i18n"
`--debug`                                         Debug messages on error at runtime

Enable currency support:
`--currency`                                      Guess currency from locale, see currencies.js
`--currency=<currency code>`                      Set currency

Custom date, number & time formats:
`--date=<intl date formats json>`                 Default formats are provided (short, medium,long, full)
`--number=<intl number formats json>`             Default formats are provided (decimal, integer, percent, currency)
`--time=<intl time formats json>`                 Default formats are provided (short, medium,long, full)

Custom plural & ordinal rules:
`--plural=<plural js file>`                       Default is resolved from locale, see plurals.js
`--ordinal=<ordinal js file>`                     Default is resolved from locale, see ordinals.js

### plural

Geneates a factory of plural or ordinal functions of common locales as an UMD module.

The `plural` generated js files are exported in [dist/plurals.js](dist/plurals.js) and [dist/ordinals.js](dist/ordinals.js).

Usage: 
```sh
plural | npx uglifyjs --beautify > dist/plurals.js

plural | npx uglifyjs > dist/plurals.min.js

plural --ordinal | npx uglifyjs --beautify > dist/ordinals.js

plural --ordinal | npx uglifyjs > dist/ordinals.min.js
```

Options:
`--ordinal`                          Generates ordinals functions (instead of purals)

### currency

Exports a factory of currency mapping of common locales as an UMD module.

The `currency` generated js file is exported in [dist/currencies.js](dist/currencies.js).

Usage: 
```sh
currency | npx uglifyjs --beautify > dist/currencies.js

currency | npx uglifyjs > dist/currencies.min.js
```

### list

Exports a factory of list formats of common locales as an UMD module.

The `list` generated js file is exported in [dist/lists.js](dist/lists.js).

Usage: 
```sh
list | npx uglifyjs --beautify > dist/lists.js

list | npx uglifyjs > dist/lists.min.js
```
