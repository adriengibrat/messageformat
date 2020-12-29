(function(root, name, factory) {
    if ("function" === typeof define && define.amd) {
        define(name, factory());
    } else if ("object" === typeof exports) {
        module.exports = factory();
    } else {
        root[name] = factory();
    }
})(this, "i18n", function() {
    return function(override) {
        override || (override = {});
        var locale = "en-US", debug = override.debug || function warn() {
            console.warn.apply(console, arguments);
        }, variable = function(key, data, id) {
            if (data && {}.hasOwnProperty.call(data, key)) return data[key];
            debug("missing %o key in %o data for message %o with %o locale", key, data, id, locale);
            return "{" + key + "}";
        }, select = function(key, data, options, plural, offset, id) {
            var value = variable(key, data, id);
            if ({}.hasOwnProperty.call(options, value)) return options[value];
            return plural && options[plural(value - offset)] || options.other;
        }, num = function(key, data, offset, id) {
            var num = data && data[key] - offset;
            return isNaN(num) ? variable(key, data, id) : num;
        }, plural = function(n) {
            var b = (n + ".").split("."), f = b[1], i = b[0], v = f.length;
            if (i == 1 && v == 0) return "one";
            return "other";
        }, currency = override.currency || "USD", formats = {
            date: {
                short: {
                    month: "numeric",
                    day: "numeric",
                    year: "2-digit"
                }
            },
            time: {
                short: {
                    hour: "numeric",
                    minute: "numeric"
                }
            },
            number: {
                currency: {
                    style: "currency",
                    currency: currency
                }
            }
        }, invalid = "%o key in %o data is an invalid %s (should be a valid %o) for message %o with %o locale", intl = function(intl, formats, _locale) {
            try {
                if (!Intl[intl].supportedLocalesOf(locale).length) {
                    locale = "object" === typeof navigator && navigator.language || "en";
                    debug("formating %o locale is not supported, fallback to %o locale", _locale, locale);
                }
            } catch (e) {
                debug("Intl.%s not supported, formating will be broken. Use a polyfill:", intl, "https://www.npmjs.com/package/intl");
                for (var format in formats) if (formats.hasOwnProperty(format)) formats[format].cache = function(value) {
                    return value.toLocaleString(locale, formats[format]);
                };
            }
        }, date = (intl("DateTimeFormat", formats.date, locale), function(key, data, format, id) {
            var value = variable(key, data, id), valid = new Date(value), options = formats.date[format] || formats.date.default, date = options.cache || (options.cache = new Intl.DateTimeFormat(locale, options).format);
            return isNaN(valid.getTime()) ? (debug(invalid, key, data, "date", "Date", id, locale), 
            value) : date(valid);
        }), time = (intl("DateTimeFormat", formats.time, locale), function(key, data, format, id) {
            var value = variable(key, data, id), valid = new Date(value), options = formats.time[format] || formats.time.default, time = options.cache || (options.cache = new Intl.DateTimeFormat(locale, options).format);
            return isNaN(valid.getTime()) ? (debug(invalid, key, data, "time", "Date", id, locale), 
            value) : time(valid);
        }), number = (intl("NumberFormat", formats.number, locale), function(key, data, format, id) {
            var value = variable(key, data, id), valid = new Number(value), options = formats.number[format] || formats.number.default, number = options.cache || (options.cache = new Intl.NumberFormat(locale, options).format);
            return isNaN(valid) ? (debug(invalid, key, data, "number", "Number", id, locale), 
            value) : number(valid);
        });
        return {
            party: function(data) {
                var id = "party";
                return variable("host", data, id) + " " + select("gender_of_host", data, {
                    female: select("num_guests", data, {
                        0: "does not give a",
                        1: "invites " + variable("guest", data, id) + " to her",
                        2: "invites " + variable("guest", data, id) + " and one other person to her",
                        other: "invites " + variable("guest", data, id) + " and " + num("num_guests", data, 1, id) + " other people to her"
                    }, plural, 1, id),
                    male: select("num_guests", data, {
                        0: "does not give a",
                        1: "invites " + variable("guest", data, id) + " to his",
                        2: "invites " + variable("guest", data, id) + " and one other person to his",
                        other: "invites " + variable("guest", data, id) + " and " + num("num_guests", data, 1, id) + " other people to his"
                    }, plural, 1, id),
                    other: select("num_guests", data, {
                        0: "does not give a",
                        1: "invites " + variable("guest", data, id) + " to their",
                        2: "invites " + variable("guest", data, id) + " and one other person to their",
                        other: "invites " + variable("guest", data, id) + " and " + num("num_guests", data, 1, id) + " other people to their"
                    }, plural, 1, id)
                }, null, null, id) + " party the " + date("date", data, "short", id) + " @ " + time("date", data, "short", id) + " (" + number("price", data, "currency", id) + ")";
            }
        };
    };
});
