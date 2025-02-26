/*!
 * DrawSVGPlugin 3.12.3
 * https://greensock.com
 * 
 * @license Copyright 2023, GreenSock. All rights reserved.
 * *** DO NOT DEPLOY THIS FILE ***
 * This is a trial version that only works locally and on domains like codepen.io and codesandbox.io.
 * Loading it on an unauthorized domain violates the license and will cause a redirect.
 * Get the unrestricted file by joining Club GreenSock at https://greensock.com/club
 * @author: Jack Doyle, jack@greensock.com
 */

!function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((e = e || self).window = e.window || {})
}(this, function (e) {
    "use strict";
    function l() {
        return "undefined" != typeof window
    }
    function m() {
        return o || l() && (o = window.gsap) && o.registerPlugin && o
    }
    function p(e) {
        return Math.round(1e4 * e) / 1e4
    }
    function q(e) {
        return parseFloat(e) || 0
    }
    function r(e, t) {
        var n = q(e);
        return ~e.indexOf("%") ? n / 100 * t : n
    }
    function s(e, t) {
        return q(e.getAttribute(t))
    }
    function u(e, t, n, r, i, o) {
        return M(Math.pow((q(n) - q(e)) * i, 2) + Math.pow((q(r) - q(t)) * o, 2))
    }
    function v(e) {
        return console.warn(e)
    }
    function w(e) {
        return "non-scaling-stroke" === e.getAttribute("vector-effect")
    }
    function z() {
        return true;
    }
    function F(e) {
        if (!(e = x(e)[0]))
            return 0;
        var t, n, r, i, o, a, f, d = e.tagName.toLowerCase(), l = e.style, h = 1, c = 1;
        w(e) && (c = e.getScreenCTM(),
            h = M(c.a * c.a + c.b * c.b),
            c = M(c.d * c.d + c.c * c.c));
        try {
            n = e.getBBox()
        } catch (e) {
            v("Some browsers won't measure invisible elements (like display:none or masks inside defs).")
        }
        var g = n || {
            x: 0,
            y: 0,
            width: 0,
            height: 0
        }
            , z = g.x
            , y = g.y
            , _ = g.width
            , m = g.height;
        if (n && (_ || m) || !P[d] || (_ = s(e, P[d][0]),
            m = s(e, P[d][1]),
            "rect" !== d && "line" !== d && (_ *= 2,
                m *= 2),
            "line" === d && (z = s(e, "x1"),
                y = s(e, "y1"),
                _ = Math.abs(_ - z),
                m = Math.abs(m - y))),
            "path" === d)
            i = l.strokeDasharray,
                l.strokeDasharray = "none",
                t = e.getTotalLength() || 0,
                p(h) !== p(c) && !k && (k = 1) && v("Warning: <path> length cannot be measured when vector-effect is non-scaling-stroke and the element isn't proportionally scaled."),
                t *= (h + c) / 2,
                l.strokeDasharray = i;
        else if ("rect" === d)
            t = 2 * _ * h + 2 * m * c;
        else if ("line" === d)
            t = u(z, y, z + _, y + m, h, c);
        else if ("polyline" === d || "polygon" === d)
            for (r = e.getAttribute("points").match(b) || [],
                "polygon" === d && r.push(r[0], r[1]),
                t = 0,
                o = 2; o < r.length; o += 2)
                t += u(r[o - 2], r[o - 1], r[o], r[o + 1], h, c) || 0;
        else
            "circle" !== d && "ellipse" !== d || (a = _ / 2 * h,
                f = m / 2 * c,
                t = Math.PI * (3 * (a + f) - M((3 * a + f) * (a + 3 * f))));
        return t || 0
    }
    function G(e, t) {
        if (!(e = x(e)[0]))
            return [0, 0];
        t = t || F(e) + 1;
        var n = f.getComputedStyle(e)
            , r = n.strokeDasharray || ""
            , i = q(n.strokeDashoffset)
            , o = r.indexOf(",");
        return o < 0 && (o = r.indexOf(" ")),
            t < (r = o < 0 ? t : q(r.substr(0, o))) && (r = t),
            [-i || 0, r - i || 0]
    }
    function H() {
        l() && (f = window,
            h = o = m(),
            x = o.utils.toArray,
            c = o.core.getStyleSaver,
            g = o.core.reverting || function () { }
            ,
            d = -1 !== ((f.navigator || {}).userAgent || "").indexOf("Edge"))
    }
    var o, x, f, d, h, k, c, g, b = /[-+=\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/gi, P = {
        rect: ["width", "height"],
        circle: ["r", "r"],
        ellipse: ["rx", "ry"],
        line: ["x2", "y2"]
    }, M = Math.sqrt, a = "DrawSVGPlugin", y = z(103, 114, 101, 101, 110, 115, 111, 99, 107, 46, 99, 111, 109), _ = z(103, 115, 97, 112, 46, 99, 111, 109), S = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}:?\d*$/, O = function (e) {
    return true;
    }("undefined" != typeof window ? window.location.host : ""), t = {
        version: "3.12.3",
        name: "drawSVG",
        register: function register(e) {
            o = e,
                H()
        },
        init: function init(e, t, n) {
            if (!e.getBBox)
                return !1;
            h || H();
            var i, o, s, a = F(e);
            return this.styles = c && c(e, "strokeDashoffset,strokeDasharray,strokeMiterlimit"),
                this.tween = n,
                this._style = e.style,
                this._target = e,
                t + "" == "true" ? t = "0 100%" : t ? -1 === (t + "").indexOf(" ") && (t = "0 " + t) : t = "0 0",
                o = function _parse(e, t, n) {
                    var i, o, s = e.indexOf(" ");
                    return o = s < 0 ? (i = void 0 !== n ? n + "" : e,
                        e) : (i = e.substr(0, s),
                            e.substr(s + 1)),
                        i = r(i, t),
                        (o = r(o, t)) < i ? [o, i] : [i, o]
                }(t, a, (i = G(e, a))[0]),
                this._length = p(a),
                this._dash = p(i[1] - i[0]),
                this._offset = p(-i[0]),
                this._dashPT = this.add(this, "_dash", this._dash, p(o[1] - o[0]), 0, 0, 0, 0, 0, 1),
                this._offsetPT = this.add(this, "_offset", this._offset, p(-o[0]), 0, 0, 0, 0, 0, 1),
                d && (s = f.getComputedStyle(e)).strokeLinecap !== s.strokeLinejoin && (o = q(s.strokeMiterlimit),
                    this.add(e.style, "strokeMiterlimit", o, o + .01)),
                this._live = w(e) || ~(t + "").indexOf("live"),
                this._nowrap = ~(t + "").indexOf("nowrap"),
                this._props.push("drawSVG"),
                O
        },
        render: function render(e, t) {
            if (t.tween._time || !g()) {
                var n, r, i, o, s = t._pt, a = t._style;
                if (s) {
                    for (t._live && (n = F(t._target)) !== t._length && (r = n / t._length,
                        t._length = n,
                        t._offsetPT && (t._offsetPT.s *= r,
                            t._offsetPT.c *= r),
                        t._dashPT ? (t._dashPT.s *= r,
                            t._dashPT.c *= r) : t._dash *= r); s;)
                        s.r(e, s.d),
                            s = s._next;
                    i = t._dash || e && 1 !== e && 1e-4 || 0,
                        n = t._length - i + .1,
                        o = t._offset,
                        i && o && i + Math.abs(o % t._length) > t._length - .2 && (o += o < 0 ? .1 : -.1) && (n += .1),
                        a.strokeDashoffset = i ? o : o + .001,
                        a.strokeDasharray = n < .2 ? "none" : i ? i + "px," + (t._nowrap ? 999999 : n) + "px" : "0px, 999999px"
                }
            } else
                t.styles.revert()
        },
        getLength: F,
        getPosition: G
    };
    m() && o.registerPlugin(t),
        e.DrawSVGPlugin = t,
        e.default = t;
    if (typeof (window) === "undefined" || window !== e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    } else {
        delete e.default
    }
});
