(function(root, name, factory) {
    if ("function" === typeof define && define.amd) define(name, factory()); else if ("object" === typeof exports) module.exports = factory(); else root[name] = factory();
})(this, "ordinal", function() {
    var a = function(n) {
        return "other";
    }, b = [ "other" ], c = function(n) {
        if (n == 1 || n == 5 || n == 7 || n == 8 || n == 9 || n == 10) return "one";
        if (n == 2 || n == 3) return "two";
        if (n == 4) return "few";
        if (n == 6) return "many";
        return "other";
    }, d = [ "one", "two", "few", "many", "other" ], e = function(n) {
        var b = (n + ".").split("."), i = b[0], i10 = i % 10, i100 = i % 100, i1000 = i % 1e3;
        if (i10 == 1 || i10 == 2 || i10 == 5 || i10 == 7 || i10 == 8 || (i100 == 20 || i100 == 50 || i100 == 70 || i100 == 80)) return "one";
        if (i10 == 3 || i10 == 4 || (i1000 == 100 || i1000 == 200 || i1000 == 300 || i1000 == 400 || i1000 == 500 || i1000 == 600 || i1000 == 700 || i1000 == 800 || i1000 == 900)) return "few";
        if (i == 0 || i10 == 6 || (i100 == 40 || i100 == 60 || i100 == 90)) return "many";
        return "other";
    }, f = [ "one", "few", "many", "other" ], g = function(n) {
        var b = (n + ".").split("."), i = b[0], j = Number(i) == n, n10 = i % 10, n100 = i % 100;
        if (j && (n10 == 2 || n10 == 3) && j && (n100 != 12 && n100 != 13)) return "few";
        return "other";
    }, h = [ "few", "other" ], i = function(n) {
        if (n == 1 || n == 3) return "one";
        if (n == 2) return "two";
        if (n == 4) return "few";
        return "other";
    }, j = [ "one", "two", "few", "other" ], k = function(n) {
        if (n == 0 || n == 7 || n == 8 || n == 9) return "zero";
        if (n == 1) return "one";
        if (n == 2) return "two";
        if (n == 3 || n == 4) return "few";
        if (n == 5 || n == 6) return "many";
        return "other";
    }, l = [ "zero", "one", "two", "few", "many", "other" ], m = function(n) {
        var b = (n + ".").split("."), i = b[0], j = Number(i) == n, n10 = i % 10, n100 = i % 100;
        if (j && n10 == 1 && j && n100 != 11) return "one";
        if (j && n10 == 2 && j && n100 != 12) return "two";
        if (j && n10 == 3 && j && n100 != 13) return "few";
        return "other";
    }, n = function(n) {
        if (n == 1) return "one";
        return "other";
    }, o = [ "one", "other" ], p = function(n) {
        if (n == 1) return "one";
        if (n == 2 || n == 3) return "two";
        if (n == 4) return "few";
        if (n == 6) return "many";
        return "other";
    }, q = function(n) {
        if (n == 1 || n == 5) return "one";
        return "other";
    }, r = function(n) {
        if (n == 11 || n == 8 || n == 80 || n == 800) return "many";
        return "other";
    }, s = [ "many", "other" ], t = function(n) {
        var b = (n + ".").split("."), i = b[0], i100 = i % 100;
        if (i == 1) return "one";
        if (i == 0 || (i100 >= 2 && i100 <= 20 || i100 == 40 || i100 == 60 || i100 == 80)) return "many";
        return "other";
    }, u = [ "one", "many", "other" ], v = function(n) {
        var b = (n + ".").split("."), i = b[0], j = Number(i) == n, n10 = i % 10;
        if (j && n10 == 6 || j && n10 == 9 || j && n10 == 0 && n != 0) return "many";
        return "other";
    }, w = function(n) {
        var b = (n + ".").split("."), i = b[0], i10 = i % 10, i100 = i % 100;
        if (i10 == 1 && i100 != 11) return "one";
        if (i10 == 2 && i100 != 12) return "two";
        if ((i10 == 7 || i10 == 8) && (i100 != 17 && i100 != 18)) return "many";
        return "other";
    }, x = [ "one", "two", "many", "other" ], y = function(n) {
        if (n == 1) return "one";
        if (n == 2 || n == 3) return "two";
        if (n == 4) return "few";
        return "other";
    }, z = function(n) {
        var b = (n + ".").split("."), i = b[0], j = Number(i) == n;
        if (j && n >= 1 && n <= 4) return "one";
        return "other";
    }, a1 = function(n) {
        var b = (n + ".").split("."), i = b[0], j = Number(i) == n, n10 = i % 10, n100 = i % 100;
        if (n == 1) return "one";
        if (j && n10 == 4 && j && n100 != 14) return "many";
        return "other";
    }, b1 = function(n) {
        var b = (n + ".").split("."), i = b[0], j = Number(i) == n, n10 = i % 10, n100 = i % 100;
        if (j && (n10 == 1 || n10 == 2) && j && (n100 != 11 && n100 != 12)) return "one";
        return "other";
    }, c1 = function(n) {
        var b = (n + ".").split("."), i = b[0], j = Number(i) == n, n10 = i % 10, n100 = i % 100;
        if (j && n10 == 3 && j && n100 != 13) return "few";
        return "other";
    };
    function types(fn, types) {
        fn.types = types.slice();
    }
    types(a, b);
    types(c, d);
    types(e, f);
    types(g, h);
    types(i, j);
    types(k, l);
    types(m, j);
    types(n, o);
    types(p, d);
    types(q, o);
    types(r, s);
    types(t, u);
    types(v, s);
    types(w, x);
    types(y, j);
    types(z, o);
    types(a1, u);
    types(b1, o);
    types(c1, h);
    return {
        af: a,
        am: a,
        ar: a,
        bg: a,
        bs: a,
        ce: a,
        cs: a,
        da: a,
        de: a,
        dsb: a,
        el: a,
        es: a,
        et: a,
        eu: a,
        fa: a,
        fi: a,
        fy: a,
        gl: a,
        he: a,
        hr: a,
        hsb: a,
        id: a,
        in: a,
        is: a,
        iw: a,
        ja: a,
        km: a,
        kn: a,
        ko: a,
        ky: a,
        lt: a,
        lv: a,
        ml: a,
        mn: a,
        my: a,
        nb: a,
        nl: a,
        pa: a,
        pl: a,
        prg: a,
        pt: a,
        root: a,
        ru: a,
        sh: a,
        si: a,
        sk: a,
        sl: a,
        sr: a,
        sw: a,
        ta: a,
        te: a,
        th: a,
        tr: a,
        ur: a,
        uz: a,
        zh: a,
        zu: a,
        as: c,
        bn: c,
        az: e,
        be: g,
        ca: i,
        cy: k,
        en: m,
        fil: n,
        fr: n,
        ga: n,
        hy: n,
        lo: n,
        mo: n,
        ms: n,
        ro: n,
        tl: n,
        vi: n,
        gu: p,
        hi: p,
        hu: q,
        it: r,
        ka: t,
        kk: v,
        mk: w,
        mr: y,
        ne: z,
        sq: a1,
        sv: b1,
        uk: c1
    };
});
