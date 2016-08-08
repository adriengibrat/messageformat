var i18n = function (override) {
override||(override = {});var locale = "en-US", debug = false, variable = function (key, data) {
if (data && {}.hasOwnProperty.call(data, key))return data[key];return '{' + key + '}'
}, select = function (key, data, options, plural, offset) {
var value = variable(key, data); if({}.hasOwnProperty.call(options, value))return options[value];return plural && options[plural(value - offset)] || options.other
}, num = function (key, data, offset) {
var num = data && (data[key] - offset);return isNaN(num) ? variable(key, data) : num
}, plural = function (n) {
        var b = (n + ".").split("."), f = b[1], i = b[0], v = f.length;
        if (i == 1 && v == 0) return "one";
        return "other";
    }, currency = override.currency || "USD", formats = {"date":{"short":{"month":"numeric","day":"numeric","year":"2-digit"}},"time":{"short":{"hour":"numeric","minute":"numeric"}},"number":{"currency":{"style":"currency","currency":(currency)}}}, invalid = "%o key in %o data is an invalid %s (should be a valid %o) for message %o with %o locale", intl = function (intl, formats, _locale) {
try {if (!Intl[intl].supportedLocalesOf(locale).length) {locale = 'object' === typeof navigator && navigator.language || 'en'}} catch (e) {for (var format in formats)if (formats.hasOwnProperty(format))formats[format].cache = function (value) {return value.toLocaleString(locale, formats[format])}}
}, date = (intl("DateTimeFormat", formats.date, locale), function(key, data, format) { var value = variable(key, data), valid = new Date(value), options = formats.date[format] || formats.date.default, date = options.cache || (options.cache = new Intl.DateTimeFormat(locale, options).format);return isNaN(valid.getTime()) ? (value) : date(valid) }), time = (intl("DateTimeFormat", formats.time, locale), function(key, data, format) { var value = variable(key, data), valid = new Date(value), options = formats.time[format] || formats.time.default, time = options.cache || (options.cache = new Intl.DateTimeFormat(locale, options).format);return isNaN(valid.getTime()) ? (value) : time(valid) }), number = (intl("NumberFormat", formats.number, locale), function(key, data, format) { var value = variable(key, data), valid = new Number(value), options = formats.number[format] || formats.number.default, number = options.cache || (options.cache = new Intl.NumberFormat(locale, options).format);return isNaN(valid) ? (value) : number(valid) }); return {"party":function (data) {
return variable("host", data) + " " + select("gender_of_host", data, {"female":select("num_guests", data, {"0":"does not give a","1":"invites " + variable("guest", data) + " to her","2":"invites " + variable("guest", data) + " and one other person to her","other":"invites " + variable("guest", data) + " and " + num("num_guests", data, 1) + " other people to her"}, plural, 1),"male":select("num_guests", data, {"0":"does not give a","1":"invites " + variable("guest", data) + " to his","2":"invites " + variable("guest", data) + " and one other person to his","other":"invites " + variable("guest", data) + " and " + num("num_guests", data, 1) + " other people to his"}, plural, 1),"other":select("num_guests", data, {"0":"does not give a","1":"invites " + variable("guest", data) + " to their","2":"invites " + variable("guest", data) + " and one other person to their","other":"invites " + variable("guest", data) + " and " + num("num_guests", data, 1) + " other people to their"}, plural, 1)}) + " party the " + date("date", data, "short") + " @ " + time("date", data, "short") + " (" + number("price", data, "currency") + ")"
}}
};

console.log(i18n().party({
	gender_of_host: 'male'
	, host: 'Léo'
	, guest: 'Mia'
	, num_guests: 12
	, date: new Date()
	, price: 2
}))
