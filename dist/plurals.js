(function(root, name, factory) {
    if ("function" === typeof define && define.amd) define(name, factory()); else if ("object" === typeof exports) module.exports = factory(); else root[name] = factory();
})(this, "plural", function() {
    var a = function(n) {
        if (n == 1) return "one";
        return "other";
    }, b = [ "one", "other" ], c = function(n) {
        var b = (n + ".").split("."), i = b[0], j = Number(i) == n;
        if (j && n >= 0 && n <= 1) return "one";
        return "other";
    }, d = function(n) {
        var b = (n + ".").split("."), i = b[0];
        if (i == 0 || n == 1) return "one";
        return "other";
    }, e = function(n) {
        var b = (n + ".").split("."), i = b[0], j = Number(i) == n, n100 = i % 100;
        if (n == 0) return "zero";
        if (n == 1) return "one";
        if (n == 2) return "two";
        if (j && n100 >= 3 && n100 <= 10) return "few";
        if (j && n100 >= 11 && n100 <= 99) return "many";
        return "other";
    }, f = [ "zero", "one", "two", "few", "many", "other" ], g = function(n) {
        var b = (n + ".").split("."), f = b[1], i = b[0], v = f.length;
        if (i == 1 && v == 0) return "one";
        return "other";
    }, h = function(n) {
        var b = (n + ".").split("."), i = b[0], j = Number(i) == n, n10 = i % 10, n100 = i % 100;
        if (j && n10 == 1 && j && n100 != 11) return "one";
        if (j && n10 >= 2 && n10 <= 4 && j && (n100 < 12 || n100 > 14)) return "few";
        if (j && n10 == 0 || j && n10 >= 5 && n10 <= 9 || j && n100 >= 11 && n100 <= 14) return "many";
        return "other";
    }, i = [ "one", "few", "many", "other" ], j = function(n) {
        return "other";
    }, k = [ "other" ], l = function(n) {
        var b = (n + ".").split("."), i = b[0], j = Number(i) == n, n10 = i % 10, n100 = i % 100, n1000000 = i % 1e6;
        if (j && n10 == 1 && j && (n100 != 11 && n100 != 71 && n100 != 91)) return "one";
        if (j && n10 == 2 && j && (n100 != 12 && n100 != 72 && n100 != 92)) return "two";
        if (j && (n10 >= 3 && n10 <= 4 || n10 == 9) && j && ((n100 < 10 || n100 > 19) && (n100 < 70 || n100 > 79) && (n100 < 90 || n100 > 99))) return "few";
        if (n != 0 && j && n1000000 == 0) return "many";
        return "other";
    }, m = [ "one", "two", "few", "many", "other" ], n = function(n) {
        var b = (n + ".").split("."), f = b[1], i = b[0], v = f.length, f10 = f % 10, i10 = i % 10, f100 = f % 100, i100 = i % 100;
        if (v == 0 && i10 == 1 && i100 != 11 || f10 == 1 && f100 != 11) return "one";
        if (v == 0 && i10 >= 2 && i10 <= 4 && (i100 < 12 || i100 > 14) || f10 >= 2 && f10 <= 4 && (f100 < 12 || f100 > 14)) return "few";
        return "other";
    }, o = [ "one", "few", "other" ], p = function(n) {
        var b = (n + ".").split("."), f = b[1], i = b[0], v = f.length;
        if (i == 1 && v == 0) return "one";
        if (i >= 2 && i <= 4 && v == 0) return "few";
        if (v != 0) return "many";
        return "other";
    }, q = function(n) {
        if (n == 0) return "zero";
        if (n == 1) return "one";
        if (n == 2) return "two";
        if (n == 3) return "few";
        if (n == 6) return "many";
        return "other";
    }, r = function(n) {
        var b = (n + ".").split("."), f = b[1], i = b[0], t = f.replace(/0+$/, "");
        if (n == 1 || t != 0 && (i == 0 || i == 1)) return "one";
        return "other";
    }, s = function(n) {
        var b = (n + ".").split("."), f = b[1], i = b[0], v = f.length, f100 = f % 100, i100 = i % 100;
        if (v == 0 && i100 == 1 || f100 == 1) return "one";
        if (v == 0 && i100 == 2 || f100 == 2) return "two";
        if (v == 0 && i100 >= 3 && i100 <= 4 || f100 >= 3 && f100 <= 4) return "few";
        return "other";
    }, t = [ "one", "two", "few", "other" ], u = function(n) {
        var b = (n + ".").split("."), i = b[0];
        if (i == 0 || i == 1) return "one";
        return "other";
    }, v = function(n) {
        var b = (n + ".").split("."), f = b[1], i = b[0], v = f.length, f10 = f % 10, i10 = i % 10;
        if (v == 0 && (i == 1 || i == 2 || i == 3) || v == 0 && (i10 != 4 && i10 != 6 && i10 != 9) || v != 0 && (f10 != 4 && f10 != 6 && f10 != 9)) return "one";
        return "other";
    }, w = function(n) {
        var b = (n + ".").split("."), i = b[0], j = Number(i) == n;
        if (n == 1) return "one";
        if (n == 2) return "two";
        if (j && n >= 3 && n <= 6) return "few";
        if (j && n >= 7 && n <= 10) return "many";
        return "other";
    }, x = function(n) {
        var b = (n + ".").split("."), i = b[0], j = Number(i) == n;
        if (n == 1 || n == 11) return "one";
        if (n == 2 || n == 12) return "two";
        if (j && n >= 3 && n <= 10 || j && n >= 13 && n <= 19) return "few";
        return "other";
    }, y = function(n) {
        var b = (n + ".").split("."), f = b[1], i = b[0], v = f.length, i10 = i % 10, i100 = i % 100;
        if (v == 0 && i10 == 1) return "one";
        if (v == 0 && i10 == 2) return "two";
        if (v == 0 && (i100 == 0 || i100 == 20 || i100 == 40 || i100 == 60 || i100 == 80)) return "few";
        if (v != 0) return "many";
        return "other";
    }, z = function(n) {
        var b = (n + ".").split("."), f = b[1], i = b[0], j = Number(i) == n, v = f.length, n10 = i % 10;
        if (i == 1 && v == 0) return "one";
        if (i == 2 && v == 0) return "two";
        if (v == 0 && (n < 0 || n > 10) && j && n10 == 0) return "many";
        return "other";
    }, a1 = [ "one", "two", "many", "other" ], b1 = function(n) {
        var b = (n + ".").split("."), f = b[1], i = b[0], t = f.replace(/0+$/, ""), i10 = i % 10, i100 = i % 100;
        if (t == 0 && i10 == 1 && i100 != 11 || t != 0) return "one";
        return "other";
    }, c1 = function(n) {
        if (n == 1) return "one";
        if (n == 2) return "two";
        return "other";
    }, d1 = [ "one", "two", "other" ], e1 = function(n) {
        if (n == 0) return "zero";
        if (n == 1) return "one";
        return "other";
    }, f1 = [ "zero", "one", "other" ], g1 = function(n) {
        var b = (n + ".").split("."), i = b[0];
        if (n == 0) return "zero";
        if ((i == 0 || i == 1) && n != 0) return "one";
        return "other";
    }, h1 = function(n) {
        var b = (n + ".").split("."), f = b[1], i = b[0], j = Number(i) == n, n10 = i % 10, n100 = i % 100;
        if (j && n10 == 1 && j && (n100 < 11 || n100 > 19)) return "one";
        if (j && n10 >= 2 && n10 <= 9 && j && (n100 < 11 || n100 > 19)) return "few";
        if (f != 0) return "many";
        return "other";
    }, i1 = function(n) {
        var b = (n + ".").split("."), f = b[1], i = b[0], j = Number(i) == n, v = f.length, f10 = f % 10, n10 = i % 10, f100 = f % 100, n100 = i % 100;
        if (j && n10 == 0 || j && n100 >= 11 && n100 <= 19 || v == 2 && f100 >= 11 && f100 <= 19) return "zero";
        if (j && n10 == 1 && j && n100 != 11 || v == 2 && f10 == 1 && f100 != 11 || v != 2 && f10 == 1) return "one";
        return "other";
    }, j1 = function(n) {
        var b = (n + ".").split("."), f = b[1], i = b[0], v = f.length, f10 = f % 10, i10 = i % 10;
        if (v == 0 && i10 == 1 || f10 == 1) return "one";
        return "other";
    }, k1 = function(n) {
        var b = (n + ".").split("."), f = b[1], i = b[0], j = Number(i) == n, v = f.length, n100 = i % 100;
        if (i == 1 && v == 0) return "one";
        if (v != 0 || n == 0 || n != 1 && j && n100 >= 1 && n100 <= 19) return "few";
        return "other";
    }, l1 = function(n) {
        var b = (n + ".").split("."), i = b[0], j = Number(i) == n, n100 = i % 100;
        if (n == 1) return "one";
        if (n == 0 || j && n100 >= 2 && n100 <= 10) return "few";
        if (j && n100 >= 11 && n100 <= 19) return "many";
        return "other";
    }, m1 = function(n) {
        var b = (n + ".").split("."), f = b[1], i = b[0], v = f.length, i10 = i % 10, i100 = i % 100;
        if (i == 1 && v == 0) return "one";
        if (v == 0 && i10 >= 2 && i10 <= 4 && (i100 < 12 || i100 > 14)) return "few";
        if (v == 0 && i != 1 && i10 >= 0 && i10 <= 1 || v == 0 && i10 >= 5 && i10 <= 9 || v == 0 && i100 >= 12 && i100 <= 14) return "many";
        return "other";
    }, n1 = function(n) {
        var b = (n + ".").split("."), i = b[0], j = Number(i) == n;
        if (j && n >= 0 && n <= 2 && n != 2) return "one";
        return "other";
    }, o1 = function(n) {
        var b = (n + ".").split("."), f = b[1], v = f.length;
        if (n == 1 && v == 0) return "one";
        return "other";
    }, p1 = function(n) {
        var b = (n + ".").split("."), f = b[1], i = b[0], v = f.length, i10 = i % 10, i100 = i % 100;
        if (v == 0 && i10 == 1 && i100 != 11) return "one";
        if (v == 0 && i10 >= 2 && i10 <= 4 && (i100 < 12 || i100 > 14)) return "few";
        if (v == 0 && i10 == 0 || v == 0 && i10 >= 5 && i10 <= 9 || v == 0 && i100 >= 11 && i100 <= 14) return "many";
        return "other";
    }, q1 = function(n) {
        var b = (n + ".").split("."), i = b[0], j = Number(i) == n;
        if (i == 0 || n == 1) return "one";
        if (j && n >= 2 && n <= 10) return "few";
        return "other";
    }, r1 = function(n) {
        var b = (n + ".").split("."), f = b[1], i = b[0];
        if (n == 0 || n == 1 || i == 0 && f == 1) return "one";
        return "other";
    }, s1 = function(n) {
        var b = (n + ".").split("."), f = b[1], i = b[0], v = f.length, i100 = i % 100;
        if (v == 0 && i100 == 1) return "one";
        if (v == 0 && i100 == 2) return "two";
        if (v == 0 && i100 >= 3 && i100 <= 4 || v != 0) return "few";
        return "other";
    }, t1 = function(n) {
        var b = (n + ".").split("."), i = b[0], j = Number(i) == n;
        if (j && n >= 0 && n <= 1 || j && n >= 11 && n <= 99) return "one";
        return "other";
    };
    function types(fn, types) {
        fn.types = types.slice();
    }
    types(a, b);
    types(c, b);
    types(d, b);
    types(e, f);
    types(g, b);
    types(h, i);
    types(j, k);
    types(l, m);
    types(n, o);
    types(p, i);
    types(q, f);
    types(r, b);
    types(s, t);
    types(u, b);
    types(v, b);
    types(w, m);
    types(x, t);
    types(y, m);
    types(z, a1);
    types(b1, b);
    types(c1, d1);
    types(e1, f1);
    types(g1, f1);
    types(h1, i);
    types(i1, f1);
    types(j1, b);
    types(k1, o);
    types(l1, i);
    types(m1, i);
    types(n1, b);
    types(o1, b);
    types(p1, i);
    types(q1, o);
    types(r1, b);
    types(s1, t);
    types(t1, b);
    return {
        af: a,
        asa: a,
        az: a,
        bem: a,
        bez: a,
        bg: a,
        brx: a,
        ce: a,
        cgg: a,
        chr: a,
        ckb: a,
        dv: a,
        ee: a,
        el: a,
        eo: a,
        es: a,
        eu: a,
        fo: a,
        fur: a,
        gsw: a,
        ha: a,
        haw: a,
        hu: a,
        jgo: a,
        jmc: a,
        ka: a,
        kaj: a,
        kcg: a,
        kk: a,
        kkj: a,
        kl: a,
        ks: a,
        ksb: a,
        ku: a,
        ky: a,
        lb: a,
        lg: a,
        mas: a,
        mgo: a,
        ml: a,
        mn: a,
        nah: a,
        nb: a,
        nd: a,
        ne: a,
        nn: a,
        nnh: a,
        no: a,
        nr: a,
        ny: a,
        nyn: a,
        om: a,
        or: a,
        os: a,
        pap: a,
        ps: a,
        rm: a,
        rof: a,
        rwk: a,
        saq: a,
        sdh: a,
        seh: a,
        sn: a,
        so: a,
        sq: a,
        ss: a,
        ssy: a,
        st: a,
        syr: a,
        ta: a,
        te: a,
        teo: a,
        tig: a,
        tk: a,
        tn: a,
        tr: a,
        ts: a,
        ug: a,
        uz: a,
        ve: a,
        vo: a,
        vun: a,
        wae: a,
        xh: a,
        xog: a,
        ak: c,
        bh: c,
        guw: c,
        ln: c,
        mg: c,
        nso: c,
        pa: c,
        ti: c,
        wa: c,
        am: d,
        as: d,
        bn: d,
        fa: d,
        gu: d,
        hi: d,
        kn: d,
        mr: d,
        zu: d,
        ar: e,
        ast: g,
        ca: g,
        de: g,
        en: g,
        et: g,
        fi: g,
        fy: g,
        gl: g,
        it: g,
        ji: g,
        nl: g,
        sv: g,
        sw: g,
        ur: g,
        yi: g,
        be: h,
        bm: j,
        bo: j,
        dz: j,
        id: j,
        ig: j,
        ii: j,
        in: j,
        ja: j,
        jbo: j,
        jv: j,
        jw: j,
        kde: j,
        kea: j,
        km: j,
        ko: j,
        lkt: j,
        lo: j,
        ms: j,
        my: j,
        nqo: j,
        root: j,
        sah: j,
        ses: j,
        sg: j,
        th: j,
        to: j,
        vi: j,
        wo: j,
        yo: j,
        zh: j,
        br: l,
        bs: n,
        hr: n,
        sh: n,
        sr: n,
        cs: p,
        sk: p,
        cy: q,
        da: r,
        dsb: s,
        hsb: s,
        ff: u,
        fr: u,
        hy: u,
        kab: u,
        fil: v,
        tl: v,
        ga: w,
        gd: x,
        gv: y,
        he: z,
        iw: z,
        is: b1,
        iu: c1,
        kw: c1,
        naq: c1,
        se: c1,
        sma: c1,
        smi: c1,
        smj: c1,
        smn: c1,
        sms: c1,
        ksh: e1,
        lag: g1,
        lt: h1,
        lv: i1,
        prg: i1,
        mk: j1,
        mo: k1,
        ro: k1,
        mt: l1,
        pl: m1,
        pt: n1,
        "pt-PT": o1,
        ru: p1,
        uk: p1,
        shi: q1,
        si: r1,
        sl: s1,
        tzm: t1
    };
});
