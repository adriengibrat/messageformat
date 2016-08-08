(function(root, name, factory) {
    if ("function" === typeof define && define.amd) define(name, factory()); else if ("object" === typeof exports) module.exports = factory(); else root[name] = factory();
})(this, "list", function() {
    var lists = {
        af: {
            start: "{0}, {1}",
            end: "{0} en {1}"
        },
        nl: {
            start: "{0}, {1}",
            end: "{0} en {1}"
        },
        am: {
            "2": "{0} እና {1}",
            start: "{0}፣ {1}",
            end: "{0}, እና {1}"
        },
        ar: {
            "2": "{0} و{1}",
            start: "{0}، {1}",
            end: "{0}، و{1}"
        },
        az: {
            start: "{0}, {1}",
            end: "{0} və {1}"
        },
        be: {
            start: "{0}, {1}",
            end: "{0} і {1}"
        },
        uk: {
            start: "{0}, {1}",
            end: "{0} і {1}"
        },
        bg: {
            start: "{0}, {1}",
            end: "{0} и {1}"
        },
        ru: {
            start: "{0}, {1}",
            end: "{0} и {1}"
        },
        sr: {
            start: "{0}, {1}",
            end: "{0} и {1}"
        },
        bn: {
            "2": "{0} এবং {1}",
            start: "{0}, {1}",
            end: "{0}, এবং {1}"
        },
        bs: {
            start: "{0}, {1}",
            end: "{0} i {1}"
        },
        ca: {
            start: "{0}, {1}",
            end: "{0} i {1}"
        },
        hr: {
            start: "{0}, {1}",
            end: "{0} i {1}"
        },
        pl: {
            start: "{0}, {1}",
            end: "{0} i {1}"
        },
        "sr-Latn": {
            start: "{0}, {1}",
            end: "{0} i {1}"
        },
        "sr-Latn-BA": {
            start: "{0}, {1}",
            end: "{0} i {1}"
        },
        "sr-Latn-ME": {
            start: "{0}, {1}",
            end: "{0} i {1}"
        },
        "sr-Latn-XK": {
            start: "{0}, {1}",
            end: "{0} i {1}"
        },
        cs: {
            start: "{0}, {1}",
            end: "{0} a {1}"
        },
        cy: {
            start: "{0}, {1}",
            end: "{0}, {1}"
        },
        mn: {
            start: "{0}, {1}",
            end: "{0}, {1}"
        },
        root: {
            start: "{0}, {1}",
            end: "{0}, {1}"
        },
        da: {
            start: "{0}, {1}",
            end: "{0} og {1}"
        },
        fo: {
            start: "{0}, {1}",
            end: "{0} og {1}"
        },
        is: {
            start: "{0}, {1}",
            end: "{0} og {1}"
        },
        nb: {
            start: "{0}, {1}",
            end: "{0} og {1}"
        },
        de: {
            start: "{0}, {1}",
            end: "{0} und {1}"
        },
        el: {
            start: "{0}, {1}",
            end: "{0} και {1}"
        },
        en: {
            "2": "{0} and {1}",
            start: "{0}, {1}",
            end: "{0}, and {1}"
        },
        "en-AU": {
            start: "{0}, {1}",
            end: "{0} and {1}"
        },
        "en-GB": {
            start: "{0}, {1}",
            end: "{0} and {1}"
        },
        es: {
            start: "{0}, {1}",
            end: "{0} y {1}"
        },
        et: {
            start: "{0}, {1}",
            end: "{0} ja {1}"
        },
        fi: {
            start: "{0}, {1}",
            end: "{0} ja {1}"
        },
        eu: {
            start: "{0}, {1}",
            end: "{0} eta {1}"
        },
        fa: {
            "2": "{0} و {1}",
            start: "{0}،‏ {1}",
            end: "{0}، و {1}"
        },
        fil: {
            "2": "{0} at {1}",
            start: "{0}, {1}",
            end: "{0}, at {1}"
        },
        fr: {
            start: "{0}, {1}",
            end: "{0} et {1}"
        },
        ga: {
            "2": "{0} agus {1}",
            start: "{0}, {1}",
            end: "{0}, agus {1}"
        },
        gl: {
            start: "{0}, {1}",
            end: "{0} e {1}"
        },
        it: {
            start: "{0}, {1}",
            end: "{0} e {1}"
        },
        pt: {
            start: "{0}, {1}",
            end: "{0} e {1}"
        },
        gu: {
            start: "{0}, {1}",
            end: "{0} અને {1}"
        },
        he: {
            start: "{0}, {1}",
            end: "{0} ו{1}"
        },
        hi: {
            "2": "{0} और {1}",
            start: "{0}, {1}",
            end: "{0}, और {1}"
        },
        hu: {
            start: "{0}, {1}",
            end: "{0} és {1}"
        },
        hy: {
            start: "{0}, {1}",
            end: "{0} և {1}"
        },
        id: {
            "2": "{0} dan {1}",
            start: "{0}, {1}",
            end: "{0}, dan {1}"
        },
        ja: {
            start: "{0}、{1}",
            end: "{0}、{1}"
        },
        ka: {
            start: "{0}, {1}",
            end: "{0} და {1}"
        },
        kk: {
            "2": "{0} және {1}",
            start: "{0}, {1}",
            end: "{0}, {1}"
        },
        km: {
            "2": "{0} និង​{1}",
            start: "{0}, {1}",
            end: "{0} និង {1}"
        },
        kn: {
            "2": "{0} ಮತ್ತು {1}",
            start: "{0}, {1}",
            end: "{0}, ಮತ್ತು {1}"
        },
        ko: {
            start: "{0}, {1}",
            end: "{0} 및 {1}"
        },
        ky: {
            start: "{0}, {1}",
            end: "{0} жана {1}"
        },
        lo: {
            "2": "{0} ແລະ {1}",
            start: "{0}, {1}",
            end: "{0}, {1}"
        },
        lt: {
            start: "{0}, {1}",
            end: "{0} ir {1}"
        },
        lv: {
            start: "{0}, {1}",
            end: "{0} un {1}"
        },
        mk: {
            "2": "{0}, {1}",
            start: "{0}, {1}",
            end: "{0} и {1}"
        },
        ml: {
            "2": "{0} കൂടാതെ {1}",
            start: "{0}, {1}",
            end: "{0}, {1} എന്നിവ"
        },
        mr: {
            start: "{0}, {1}",
            end: "{0} आणि {1}"
        },
        ms: {
            start: "{0}, {1}",
            end: "{0} dan {1}"
        },
        my: {
            "2": "{0}နှင့်{1}",
            start: "{0}၊ {1}",
            end: "{0}၊ နှင့်{1}"
        },
        ne: {
            start: "{0} र {1}",
            middle: "{0}, {1}",
            end: "{0} र {1}"
        },
        pa: {
            start: "{0}, {1}",
            end: "{0} ਅਤੇ {1}"
        },
        ro: {
            start: "{0}, {1}",
            end: "{0} și {1}"
        },
        si: {
            "2": "{0} සහ {1}",
            start: "{0}, {1}",
            end: "{0}, සහ {1}"
        },
        sk: {
            "2": "{0} a {1}",
            start: "{0}, {1}",
            end: "{0} a {1}"
        },
        sl: {
            start: "{0}, {1}",
            end: "{0} in {1}"
        },
        sq: {
            start: "{0}, {1}",
            end: "{0} dhe {1}"
        },
        sv: {
            start: "{0}, {1}",
            end: "{0} och {1}"
        },
        sw: {
            start: "{0}, {1}",
            end: "{0} na {1}"
        },
        ta: {
            start: "{0}, {1}",
            end: "{0} மற்றும் {1}"
        },
        te: {
            start: "{0}, {1}",
            end: "{0} మరియు {1}"
        },
        th: {
            "2": "{0}และ{1}",
            start: "{0} {1}",
            end: "{0} และ{1}"
        },
        to: {
            start: "{0} mo {1}",
            end: "{0} mo {1}"
        },
        tr: {
            start: "{0}, {1}",
            end: "{0} ve {1}"
        },
        ur: {
            "2": "{0} اور {1}",
            start: "{0}، {1}",
            end: "{0}، اور {1}"
        },
        uz: {
            start: "{0}, {1}",
            end: "{0} va {1}"
        },
        vi: {
            start: "{0}, {1}",
            end: "{0} và {1}"
        },
        yue: {
            start: "{0}、{1}",
            end: "{0}同{1}"
        },
        zh: {
            start: "{0}、{1}",
            end: "{0}和{1}"
        },
        "zh-Hant-HK": {
            start: "{0}、{1}",
            end: "{0}及{1}"
        },
        "zh-Hant-MO": {
            start: "{0}、{1}",
            end: "{0}及{1}"
        },
        zu: {
            "2": "I-{0} ne-{1}",
            start: "{0}, {1}",
            end: "{0}, ne-{1}"
        }
    };
    function parseLocale(value) {
        var ref = /^([a-z]{2,3})(?:[-_]([A-Z][a-z]{3}))?(?:[-_]([A-Z]{2}|[0-9]{3}))?$/.exec(value) || [ value ];
        var locale = ref[0];
        var language = ref[1];
        var script = ref[2];
        var region = ref[3];
        return {
            locale: locale,
            language: language,
            script: script,
            region: region
        };
    }
    function lookup(dictionary, key) {
        var ref = parseLocale(key);
        var locale = ref.locale;
        var language = ref.language;
        var script = ref.script;
        var region = ref.region;
        return dictionary[locale] || dictionary[language + "-" + region] || dictionary[language + "-" + script] || dictionary[language] || dictionary[region];
    }
    return function(locale) {
        return lookup(lists, locale);
    };
});
