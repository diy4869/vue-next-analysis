var e = Object.defineProperty,
  t = Object.prototype.hasOwnProperty,
  n = Object.getOwnPropertySymbols,
  o = Object.prototype.propertyIsEnumerable,
  r = (t, n, o) =>
    n in t
      ? e(t, n, { enumerable: !0, configurable: !0, writable: !0, value: o })
      : (t[n] = o),
  s = (e, s) => {
    for (var l in s || (s = {})) t.call(s, l) && r(e, l, s[l])
    if (n) for (var l of n(s)) o.call(s, l) && r(e, l, s[l])
    return e
  }
function l(e, t) {
  const n = Object.create(null),
    o = e.split(',')
  for (let r = 0; r < o.length; r++) n[o[r]] = !0
  return t ? e => !!n[e.toLowerCase()] : e => !!n[e]
}
!(function(e = '.', t = '__import__') {
  try {
    self[t] = new Function('u', 'return import(u)')
  } catch (n) {
    const o = new URL(e, location),
      r = e => {
        URL.revokeObjectURL(e.src), e.remove()
      }
    ;(self[t] = e =>
      new Promise((n, s) => {
        const l = new URL(e, o)
        if (self[t].moduleMap[l]) return n(self[t].moduleMap[l])
        const i = new Blob(
            [`import * as m from '${l}';`, `${t}.moduleMap['${l}']=m;`],
            { type: 'text/javascript' }
          ),
          c = Object.assign(document.createElement('script'), {
            type: 'module',
            src: URL.createObjectURL(i),
            onerror() {
              s(new Error(`Failed to import: ${e}`)), r(c)
            },
            onload() {
              n(self[t].moduleMap[l]), r(c)
            }
          })
        document.head.appendChild(c)
      })),
      (self[t].moduleMap = {})
  }
})('/vue-next-analysis/assets/')
const i = l(
    'Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt'
  ),
  c = l(
    'itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly'
  )
function a(e) {
  if (E(e)) {
    const t = {}
    for (let n = 0; n < e.length; n++) {
      const o = e[n],
        r = a(L(o) ? f(o) : o)
      if (r) for (const e in r) t[e] = r[e]
    }
    return t
  }
  if (I(e)) return e
}
const u = /;(?![^(]*\))/g,
  p = /:(.+)/
function f(e) {
  const t = {}
  return (
    e.split(u).forEach(e => {
      if (e) {
        const n = e.split(p)
        n.length > 1 && (t[n[0].trim()] = n[1].trim())
      }
    }),
    t
  )
}
function d(e) {
  let t = ''
  if (L(e)) t = e
  else if (E(e))
    for (let n = 0; n < e.length; n++) {
      const o = d(e[n])
      o && (t += o + ' ')
    }
  else if (I(e)) for (const n in e) e[n] && (t += n + ' ')
  return t.trim()
}
const h = e => (null == e ? '' : I(e) ? JSON.stringify(e, m, 2) : String(e)),
  m = (e, t) =>
    O(t)
      ? {
          [`Map(${t.size})`]: [...t.entries()].reduce(
            (e, [t, n]) => ((e[`${t} =>`] = n), e),
            {}
          )
        }
      : R(t)
        ? { [`Set(${t.size})`]: [...t.values()] }
        : !I(t) || E(t) || j(t)
          ? t
          : String(t),
  v = {},
  g = [],
  y = () => {},
  b = () => !1,
  _ = /^on[^a-z]/,
  x = e => _.test(e),
  k = e => e.startsWith('onUpdate:'),
  w = Object.assign,
  C = (e, t) => {
    const n = e.indexOf(t)
    n > -1 && e.splice(n, 1)
  },
  $ = Object.prototype.hasOwnProperty,
  S = (e, t) => $.call(e, t),
  E = Array.isArray,
  O = e => '[object Map]' === M(e),
  R = e => '[object Set]' === M(e),
  T = e => 'function' == typeof e,
  L = e => 'string' == typeof e,
  A = e => 'symbol' == typeof e,
  I = e => null !== e && 'object' == typeof e,
  P = e => I(e) && T(e.then) && T(e.catch),
  F = Object.prototype.toString,
  M = e => F.call(e),
  j = e => '[object Object]' === M(e),
  U = e => L(e) && 'NaN' !== e && '-' !== e[0] && '' + parseInt(e, 10) === e,
  N = l(
    ',key,ref,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted'
  ),
  V = e => {
    const t = Object.create(null)
    return n => t[n] || (t[n] = e(n))
  },
  B = /-(\w)/g,
  D = V(e => e.replace(B, (e, t) => (t ? t.toUpperCase() : ''))),
  H = /\B([A-Z])/g,
  W = V(e => e.replace(H, '-$1').toLowerCase()),
  q = V(e => e.charAt(0).toUpperCase() + e.slice(1)),
  z = V(e => (e ? `on${q(e)}` : '')),
  K = (e, t) => e !== t && (e == e || t == t),
  G = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t)
  },
  J = (e, t, n) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n })
  },
  Y = e => {
    const t = parseFloat(e)
    return isNaN(t) ? e : t
  },
  X = new WeakMap(),
  Z = []
let Q
const ee = Symbol(''),
  te = Symbol('')
function ne(e, t = v) {
  ;(function(e) {
    return e && !0 === e._isEffect
  })(e) && (e = e.raw)
  const n = (function(e, t) {
    const n = function() {
      if (!n.active) return t.scheduler ? void 0 : e()
      if (!Z.includes(n)) {
        se(n)
        try {
          return ie.push(le), (le = !0), Z.push(n), (Q = n), e()
        } finally {
          Z.pop(), ae(), (Q = Z[Z.length - 1])
        }
      }
    }
    return (
      (n.id = re++),
      (n.allowRecurse = !!t.allowRecurse),
      (n._isEffect = !0),
      (n.active = !0),
      (n.raw = e),
      (n.deps = []),
      (n.options = t),
      n
    )
  })(e, t)
  return t.lazy || n(), n
}
function oe(e) {
  e.active && (se(e), e.options.onStop && e.options.onStop(), (e.active = !1))
}
let re = 0
function se(e) {
  const { deps: t } = e
  if (t.length) {
    for (let n = 0; n < t.length; n++) t[n].delete(e)
    t.length = 0
  }
}
let le = !0
const ie = []
function ce() {
  ie.push(le), (le = !1)
}
function ae() {
  const e = ie.pop()
  le = void 0 === e || e
}
function ue(e, t, n) {
  if (!le || void 0 === Q) return
  let o = X.get(e)
  o || X.set(e, (o = new Map()))
  let r = o.get(n)
  r || o.set(n, (r = new Set())), r.has(Q) || (r.add(Q), Q.deps.push(r))
}
function pe(e, t, n, o, r, s) {
  const l = X.get(e)
  if (!l) return
  const i = new Set(),
    c = e => {
      e &&
        e.forEach(e => {
          ;(e !== Q || e.allowRecurse) && i.add(e)
        })
    }
  if ('clear' === t) l.forEach(c)
  else if ('length' === n && E(e))
    l.forEach((e, t) => {
      ;('length' === t || t >= o) && c(e)
    })
  else
    switch ((void 0 !== n && c(l.get(n)), t)) {
      case 'add':
        E(e) ? U(n) && c(l.get('length')) : (c(l.get(ee)), O(e) && c(l.get(te)))
        break
      case 'delete':
        E(e) || (c(l.get(ee)), O(e) && c(l.get(te)))
        break
      case 'set':
        O(e) && c(l.get(ee))
    }
  i.forEach(e => {
    e.options.scheduler ? e.options.scheduler(e) : e()
  })
}
const fe = l('__proto__,__v_isRef,__isVue'),
  de = new Set(
    Object.getOwnPropertyNames(Symbol)
      .map(e => Symbol[e])
      .filter(A)
  ),
  he = be(),
  me = be(!1, !0),
  ve = be(!0),
  ge = be(!0, !0),
  ye = {}
function be(e = !1, t = !1) {
  return function(n, o, r) {
    if ('__v_isReactive' === o) return !e
    if ('__v_isReadonly' === o) return e
    if ('__v_raw' === o && r === (e ? (t ? Je : Ge) : t ? Ke : ze).get(n))
      return n
    const s = E(n)
    if (!e && s && S(ye, o)) return Reflect.get(ye, o, r)
    const l = Reflect.get(n, o, r)
    if (A(o) ? de.has(o) : fe(o)) return l
    if ((e || ue(n, 0, o), t)) return l
    if (lt(l)) {
      return !s || !U(o) ? l.value : l
    }
    return I(l) ? (e ? Ze(l) : Xe(l)) : l
  }
}
;['includes', 'indexOf', 'lastIndexOf'].forEach(e => {
  const t = Array.prototype[e]
  ye[e] = function(...e) {
    const n = ot(this)
    for (let t = 0, r = this.length; t < r; t++) ue(n, 0, t + '')
    const o = t.apply(n, e)
    return -1 === o || !1 === o ? t.apply(n, e.map(ot)) : o
  }
}),
  ['push', 'pop', 'shift', 'unshift', 'splice'].forEach(e => {
    const t = Array.prototype[e]
    ye[e] = function(...e) {
      ce()
      const n = t.apply(this, e)
      return ae(), n
    }
  })
function _e(e = !1) {
  return function(t, n, o, r) {
    let s = t[n]
    if (!e && ((o = ot(o)), (s = ot(s)), !E(t) && lt(s) && !lt(o)))
      return (s.value = o), !0
    const l = E(t) && U(n) ? Number(n) < t.length : S(t, n),
      i = Reflect.set(t, n, o, r)
    return (
      t === ot(r) && (l ? K(o, s) && pe(t, 'set', n, o) : pe(t, 'add', n, o)), i
    )
  }
}
const xe = {
    get: he,
    set: _e(),
    deleteProperty: function(e, t) {
      const n = S(e, t)
      e[t]
      const o = Reflect.deleteProperty(e, t)
      return o && n && pe(e, 'delete', t, void 0), o
    },
    has: function(e, t) {
      const n = Reflect.has(e, t)
      return (A(t) && de.has(t)) || ue(e, 0, t), n
    },
    ownKeys: function(e) {
      return ue(e, 0, E(e) ? 'length' : ee), Reflect.ownKeys(e)
    }
  },
  ke = { get: ve, set: (e, t) => !0, deleteProperty: (e, t) => !0 },
  we = w({}, xe, { get: me, set: _e(!0) })
w({}, ke, { get: ge })
const Ce = e => (I(e) ? Xe(e) : e),
  $e = e => (I(e) ? Ze(e) : e),
  Se = e => e,
  Ee = e => Reflect.getPrototypeOf(e)
function Oe(e, t, n = !1, o = !1) {
  const r = ot((e = e.__v_raw)),
    s = ot(t)
  t !== s && !n && ue(r, 0, t), !n && ue(r, 0, s)
  const { has: l } = Ee(r),
    i = o ? Se : n ? $e : Ce
  return l.call(r, t) ? i(e.get(t)) : l.call(r, s) ? i(e.get(s)) : void 0
}
function Re(e, t = !1) {
  const n = this.__v_raw,
    o = ot(n),
    r = ot(e)
  return (
    e !== r && !t && ue(o, 0, e),
    !t && ue(o, 0, r),
    e === r ? n.has(e) : n.has(e) || n.has(r)
  )
}
function Te(e, t = !1) {
  return (e = e.__v_raw), !t && ue(ot(e), 0, ee), Reflect.get(e, 'size', e)
}
function Le(e) {
  e = ot(e)
  const t = ot(this)
  return Ee(t).has.call(t, e) || (t.add(e), pe(t, 'add', e, e)), this
}
function Ae(e, t) {
  t = ot(t)
  const n = ot(this),
    { has: o, get: r } = Ee(n)
  let s = o.call(n, e)
  s || ((e = ot(e)), (s = o.call(n, e)))
  const l = r.call(n, e)
  return (
    n.set(e, t), s ? K(t, l) && pe(n, 'set', e, t) : pe(n, 'add', e, t), this
  )
}
function Ie(e) {
  const t = ot(this),
    { has: n, get: o } = Ee(t)
  let r = n.call(t, e)
  r || ((e = ot(e)), (r = n.call(t, e))), o && o.call(t, e)
  const s = t.delete(e)
  return r && pe(t, 'delete', e, void 0), s
}
function Pe() {
  const e = ot(this),
    t = 0 !== e.size,
    n = e.clear()
  return t && pe(e, 'clear', void 0, void 0), n
}
function Fe(e, t) {
  return function(n, o) {
    const r = this,
      s = r.__v_raw,
      l = ot(s),
      i = t ? Se : e ? $e : Ce
    return !e && ue(l, 0, ee), s.forEach((e, t) => n.call(o, i(e), i(t), r))
  }
}
function Me(e, t, n) {
  return function(...o) {
    const r = this.__v_raw,
      s = ot(r),
      l = O(s),
      i = 'entries' === e || (e === Symbol.iterator && l),
      c = 'keys' === e && l,
      a = r[e](...o),
      u = n ? Se : t ? $e : Ce
    return (
      !t && ue(s, 0, c ? te : ee),
      {
        next() {
          const { value: e, done: t } = a.next()
          return t
            ? { value: e, done: t }
            : { value: i ? [u(e[0]), u(e[1])] : u(e), done: t }
        },
        [Symbol.iterator]() {
          return this
        }
      }
    )
  }
}
function je(e) {
  return function(...t) {
    return 'delete' !== e && this
  }
}
const Ue = {
    get(e) {
      return Oe(this, e)
    },
    get size() {
      return Te(this)
    },
    has: Re,
    add: Le,
    set: Ae,
    delete: Ie,
    clear: Pe,
    forEach: Fe(!1, !1)
  },
  Ne = {
    get(e) {
      return Oe(this, e, !1, !0)
    },
    get size() {
      return Te(this)
    },
    has: Re,
    add: Le,
    set: Ae,
    delete: Ie,
    clear: Pe,
    forEach: Fe(!1, !0)
  },
  Ve = {
    get(e) {
      return Oe(this, e, !0)
    },
    get size() {
      return Te(this, !0)
    },
    has(e) {
      return Re.call(this, e, !0)
    },
    add: je('add'),
    set: je('set'),
    delete: je('delete'),
    clear: je('clear'),
    forEach: Fe(!0, !1)
  },
  Be = {
    get(e) {
      return Oe(this, e, !0, !0)
    },
    get size() {
      return Te(this, !0)
    },
    has(e) {
      return Re.call(this, e, !0)
    },
    add: je('add'),
    set: je('set'),
    delete: je('delete'),
    clear: je('clear'),
    forEach: Fe(!0, !0)
  }
function De(e, t) {
  const n = t ? (e ? Be : Ne) : e ? Ve : Ue
  return (t, o, r) =>
    '__v_isReactive' === o
      ? !e
      : '__v_isReadonly' === o
        ? e
        : '__v_raw' === o
          ? t
          : Reflect.get(S(n, o) && o in t ? n : t, o, r)
}
;['keys', 'values', 'entries', Symbol.iterator].forEach(e => {
  ;(Ue[e] = Me(e, !1, !1)),
    (Ve[e] = Me(e, !0, !1)),
    (Ne[e] = Me(e, !1, !0)),
    (Be[e] = Me(e, !0, !0))
})
const He = { get: De(!1, !1) },
  We = { get: De(!1, !0) },
  qe = { get: De(!0, !1) },
  ze = new WeakMap(),
  Ke = new WeakMap(),
  Ge = new WeakMap(),
  Je = new WeakMap()
function Ye(e) {
  return e.__v_skip || !Object.isExtensible(e)
    ? 0
    : (function(e) {
        switch (e) {
          case 'Object':
          case 'Array':
            return 1
          case 'Map':
          case 'Set':
          case 'WeakMap':
          case 'WeakSet':
            return 2
          default:
            return 0
        }
      })((e => M(e).slice(8, -1))(e))
}
function Xe(e) {
  return e && e.__v_isReadonly ? e : Qe(e, !1, xe, He, ze)
}
function Ze(e) {
  return Qe(e, !0, ke, qe, Ge)
}
function Qe(e, t, n, o, r) {
  if (!I(e)) return e
  if (e.__v_raw && (!t || !e.__v_isReactive)) return e
  const s = r.get(e)
  if (s) return s
  const l = Ye(e)
  if (0 === l) return e
  const i = new Proxy(e, 2 === l ? o : n)
  return r.set(e, i), i
}
function et(e) {
  return tt(e) ? et(e.__v_raw) : !(!e || !e.__v_isReactive)
}
function tt(e) {
  return !(!e || !e.__v_isReadonly)
}
function nt(e) {
  return et(e) || tt(e)
}
function ot(e) {
  return (e && ot(e.__v_raw)) || e
}
function rt(e) {
  return J(e, '__v_skip', !0), e
}
const st = e => (I(e) ? Xe(e) : e)
function lt(e) {
  return Boolean(e && !0 === e.__v_isRef)
}
function it(e) {
  return (function(e, t = !1) {
    if (lt(e)) return e
    return new ct(e, t)
  })(e)
}
class ct {
  constructor(e, t = !1) {
    ;(this._rawValue = e),
      (this._shallow = t),
      (this.__v_isRef = !0),
      (this._value = t ? e : st(e))
  }
  get value() {
    return ue(ot(this), 0, 'value'), this._value
  }
  set value(e) {
    K(ot(e), this._rawValue) &&
      ((this._rawValue = e),
      (this._value = this._shallow ? e : st(e)),
      pe(ot(this), 'set', 'value', e))
  }
}
function at(e) {
  return lt(e) ? e.value : e
}
const ut = {
  get: (e, t, n) => at(Reflect.get(e, t, n)),
  set: (e, t, n, o) => {
    const r = e[t]
    return lt(r) && !lt(n) ? ((r.value = n), !0) : Reflect.set(e, t, n, o)
  }
}
function pt(e) {
  return et(e) ? e : new Proxy(e, ut)
}
function ft(e) {
  const t = E(e) ? new Array(e.length) : {}
  for (const n in e) t[n] = ht(e, n)
  return t
}
class dt {
  constructor(e, t) {
    ;(this._object = e), (this._key = t), (this.__v_isRef = !0)
  }
  get value() {
    return this._object[this._key]
  }
  set value(e) {
    this._object[this._key] = e
  }
}
function ht(e, t) {
  return lt(e[t]) ? e[t] : new dt(e, t)
}
class mt {
  constructor(e, t, n) {
    ;(this._setter = t),
      (this._dirty = !0),
      (this.__v_isRef = !0),
      (this.effect = ne(e, {
        lazy: !0,
        scheduler: () => {
          this._dirty || ((this._dirty = !0), pe(ot(this), 'set', 'value'))
        }
      })),
      (this.__v_isReadonly = n)
  }
  get value() {
    const e = ot(this)
    return (
      e._dirty && ((e._value = this.effect()), (e._dirty = !1)),
      ue(e, 0, 'value'),
      e._value
    )
  }
  set value(e) {
    this._setter(e)
  }
}
function vt(e, t, n, o) {
  let r
  try {
    r = o ? e(...o) : e()
  } catch (s) {
    yt(s, t, n)
  }
  return r
}
function gt(e, t, n, o) {
  if (T(e)) {
    const r = vt(e, t, n, o)
    return (
      r &&
        P(r) &&
        r.catch(e => {
          yt(e, t, n)
        }),
      r
    )
  }
  const r = []
  for (let s = 0; s < e.length; s++) r.push(gt(e[s], t, n, o))
  return r
}
function yt(e, t, n, o = !0) {
  t && t.vnode
  if (t) {
    let o = t.parent
    const r = t.proxy,
      s = n
    for (; o; ) {
      const t = o.ec
      if (t) for (let n = 0; n < t.length; n++) if (!1 === t[n](e, r, s)) return
      o = o.parent
    }
    const l = t.appContext.config.errorHandler
    if (l) return void vt(l, null, 10, [e, r, s])
  }
  !(function(e, t, n, o = !0) {
    console.error(e)
  })(e, 0, 0, o)
}
let bt = !1,
  _t = !1
const xt = []
let kt = 0
const wt = []
let Ct = null,
  $t = 0
const St = []
let Et = null,
  Ot = 0
const Rt = Promise.resolve()
let Tt = null,
  Lt = null
function At(e) {
  const t = Tt || Rt
  return e ? t.then(this ? e.bind(this) : e) : t
}
function It(e) {
  if (
    !(
      (xt.length && xt.includes(e, bt && e.allowRecurse ? kt + 1 : kt)) ||
      e === Lt
    )
  ) {
    const t = (function(e) {
      let t = kt + 1,
        n = xt.length
      const o = Ut(e)
      for (; t < n; ) {
        const e = (t + n) >>> 1
        Ut(xt[e]) < o ? (t = e + 1) : (n = e)
      }
      return t
    })(e)
    t > -1 ? xt.splice(t, 0, e) : xt.push(e), Pt()
  }
}
function Pt() {
  bt || _t || ((_t = !0), (Tt = Rt.then(Nt)))
}
function Ft(e, t, n, o) {
  E(e)
    ? n.push(...e)
    : (t && t.includes(e, e.allowRecurse ? o + 1 : o)) || n.push(e),
    Pt()
}
function Mt(e, t = null) {
  if (wt.length) {
    for (
      Lt = t, Ct = [...new Set(wt)], wt.length = 0, $t = 0;
      $t < Ct.length;
      $t++
    )
      Ct[$t]()
    ;(Ct = null), ($t = 0), (Lt = null), Mt(e, t)
  }
}
function jt(e) {
  if (St.length) {
    const e = [...new Set(St)]
    if (((St.length = 0), Et)) return void Et.push(...e)
    for (Et = e, Et.sort((e, t) => Ut(e) - Ut(t)), Ot = 0; Ot < Et.length; Ot++)
      Et[Ot]()
    ;(Et = null), (Ot = 0)
  }
}
const Ut = e => (null == e.id ? 1 / 0 : e.id)
function Nt(e) {
  ;(_t = !1), (bt = !0), Mt(e), xt.sort((e, t) => Ut(e) - Ut(t))
  try {
    for (kt = 0; kt < xt.length; kt++) {
      const e = xt[kt]
      e && vt(e, null, 14)
    }
  } finally {
    ;(kt = 0),
      (xt.length = 0),
      jt(),
      (bt = !1),
      (Tt = null),
      (xt.length || St.length) && Nt(e)
  }
}
function Vt(e, t, ...n) {
  const o = e.vnode.props || v
  let r = n
  const s = t.startsWith('update:'),
    l = s && t.slice(7)
  if (l && l in o) {
    const e = `${'modelValue' === l ? 'model' : l}Modifiers`,
      { number: t, trim: s } = o[e] || v
    s ? (r = n.map(e => e.trim())) : t && (r = n.map(Y))
  }
  let i,
    c = o[(i = z(t))] || o[(i = z(D(t)))]
  !c && s && (c = o[(i = z(W(t)))]), c && gt(c, e, 6, r)
  const a = o[i + 'Once']
  if (a) {
    if (e.emitted) {
      if (e.emitted[i]) return
    } else (e.emitted = {})[i] = !0
    gt(a, e, 6, r)
  }
}
function Bt(e, t, n = !1) {
  if (!t.deopt && void 0 !== e.__emits) return e.__emits
  const o = e.emits
  let r = {},
    s = !1
  if (!T(e)) {
    const o = e => {
      const n = Bt(e, t, !0)
      n && ((s = !0), w(r, n))
    }
    !n && t.mixins.length && t.mixins.forEach(o),
      e.extends && o(e.extends),
      e.mixins && e.mixins.forEach(o)
  }
  return o || s
    ? (E(o) ? o.forEach(e => (r[e] = null)) : w(r, o), (e.__emits = r))
    : (e.__emits = null)
}
function Dt(e, t) {
  return (
    !(!e || !x(t)) &&
    ((t = t.slice(2).replace(/Once$/, '')),
    S(e, t[0].toLowerCase() + t.slice(1)) || S(e, W(t)) || S(e, t))
  )
}
let Ht = 0
const Wt = e => (Ht += e)
function qt(e, t, n = {}, o, r) {
  let s = e[t]
  Ht++, po()
  const l = s && zt(s(n)),
    i = ho(
      so,
      { key: n.key || `_${t}` },
      l || (o ? o() : []),
      l && 1 === e._ ? 64 : -2
    )
  return !r && i.scopeId && (i.slotScopeIds = [i.scopeId + '-s']), Ht--, i
}
function zt(e) {
  return e.some(
    e => !mo(e) || (e.type !== io && !(e.type === so && !zt(e.children)))
  )
    ? e
    : null
}
let Kt = null,
  Gt = null
function Jt(e) {
  const t = Kt
  return (Kt = e), (Gt = (e && e.type.__scopeId) || null), t
}
function Yt(e) {
  Gt = e
}
function Xt() {
  Gt = null
}
const Zt = e => Qt
function Qt(e, t = Kt) {
  if (!t) return e
  const n = (...n) => {
    Ht || po(!0)
    const o = Jt(t),
      r = e(...n)
    return Jt(o), Ht || fo(), r
  }
  return (n._c = !0), n
}
function en(e) {
  const {
    type: t,
    vnode: n,
    proxy: o,
    withProxy: r,
    props: s,
    propsOptions: [l],
    slots: i,
    attrs: c,
    emit: a,
    render: u,
    renderCache: p,
    data: f,
    setupState: d,
    ctx: h
  } = e
  let m
  const v = Jt(e)
  try {
    let e
    if (4 & n.shapeFlag) {
      const t = r || o
      ;(m = $o(u.call(t, t, p, s, d, f, h))), (e = c)
    } else {
      const n = t
      0,
        (m = $o(
          n.length > 1 ? n(s, { attrs: c, slots: i, emit: a }) : n(s, null)
        )),
        (e = t.props ? c : nn(c))
    }
    let v = m
    if (!1 !== t.inheritAttrs && e) {
      const t = Object.keys(e),
        { shapeFlag: n } = v
      t.length &&
        (1 & n || 6 & n) &&
        (l && t.some(k) && (e = on(e, l)), (v = xo(v, e)))
    }
    n.dirs && (v.dirs = v.dirs ? v.dirs.concat(n.dirs) : n.dirs),
      n.transition && (v.transition = n.transition),
      (m = v)
  } catch (g) {
    ;(ao.length = 0), yt(g, e, 1), (m = _o(io))
  }
  return Jt(v), m
}
function tn(e) {
  let t
  for (let n = 0; n < e.length; n++) {
    const o = e[n]
    if (!mo(o)) return
    if (o.type !== io || 'v-if' === o.children) {
      if (t) return
      t = o
    }
  }
  return t
}
const nn = e => {
    let t
    for (const n in e)
      ('class' === n || 'style' === n || x(n)) && ((t || (t = {}))[n] = e[n])
    return t
  },
  on = (e, t) => {
    const n = {}
    for (const o in e) (k(o) && o.slice(9) in t) || (n[o] = e[o])
    return n
  }
function rn(e, t, n) {
  const o = Object.keys(t)
  if (o.length !== Object.keys(e).length) return !0
  for (let r = 0; r < o.length; r++) {
    const s = o[r]
    if (t[s] !== e[s] && !Dt(n, s)) return !0
  }
  return !1
}
function sn(e) {
  if ((T(e) && (e = e()), E(e))) {
    e = tn(e)
  }
  return $o(e)
}
function ln(e, t) {
  t && t.pendingBranch
    ? E(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : Ft(e, Et, St, Ot)
}
function cn(e, t, n, o = !1) {
  const r = {},
    s = {}
  J(s, go, 1),
    (e.propsDefaults = Object.create(null)),
    an(e, t, r, s),
    n
      ? (e.props = o ? r : Qe(r, !1, we, We, Ke))
      : e.type.props
        ? (e.props = r)
        : (e.props = s),
    (e.attrs = s)
}
function an(e, t, n, o) {
  const [r, s] = e.propsOptions
  if (t)
    for (const l in t) {
      const s = t[l]
      if (N(l)) continue
      let i
      r && S(r, (i = D(l))) ? (n[i] = s) : Dt(e.emitsOptions, l) || (o[l] = s)
    }
  if (s) {
    const t = ot(n)
    for (let o = 0; o < s.length; o++) {
      const l = s[o]
      n[l] = un(r, t, l, t[l], e)
    }
  }
}
function un(e, t, n, o, r) {
  const s = e[n]
  if (null != s) {
    const e = S(s, 'default')
    if (e && void 0 === o) {
      const e = s.default
      if (s.type !== Function && T(e)) {
        const { propsDefaults: s } = r
        n in s ? (o = s[n]) : (qo(r), (o = s[n] = e(t)), qo(null))
      } else o = e
    }
    s[0] &&
      (S(t, n) || e ? !s[1] || ('' !== o && o !== W(n)) || (o = !0) : (o = !1))
  }
  return o
}
function pn(e, t, n = !1) {
  if (!t.deopt && e.__props) return e.__props
  const o = e.props,
    r = {},
    s = []
  let l = !1
  if (!T(e)) {
    const o = e => {
      l = !0
      const [n, o] = pn(e, t, !0)
      w(r, n), o && s.push(...o)
    }
    !n && t.mixins.length && t.mixins.forEach(o),
      e.extends && o(e.extends),
      e.mixins && e.mixins.forEach(o)
  }
  if (!o && !l) return (e.__props = g)
  if (E(o))
    for (let i = 0; i < o.length; i++) {
      const e = D(o[i])
      fn(e) && (r[e] = v)
    }
  else if (o)
    for (const i in o) {
      const e = D(i)
      if (fn(e)) {
        const t = o[i],
          n = (r[e] = E(t) || T(t) ? { type: t } : t)
        if (n) {
          const t = mn(Boolean, n.type),
            o = mn(String, n.type)
          ;(n[0] = t > -1),
            (n[1] = o < 0 || t < o),
            (t > -1 || S(n, 'default')) && s.push(e)
        }
      }
    }
  return (e.__props = [r, s])
}
function fn(e) {
  return '$' !== e[0]
}
function dn(e) {
  const t = e && e.toString().match(/^\s*function (\w+)/)
  return t ? t[1] : ''
}
function hn(e, t) {
  return dn(e) === dn(t)
}
function mn(e, t) {
  return E(t) ? t.findIndex(t => hn(t, e)) : T(t) && hn(t, e) ? 0 : -1
}
function vn(e, t, n = Wo, o = !1) {
  if (n) {
    const r = n[e] || (n[e] = []),
      s =
        t.__weh ||
        (t.__weh = (...o) => {
          if (n.isUnmounted) return
          ce(), qo(n)
          const r = gt(t, n, e, o)
          return qo(null), ae(), r
        })
    return o ? r.unshift(s) : r.push(s), s
  }
}
const gn = e => (t, n = Wo) => !Ko && vn(e, t, n),
  yn = gn('bm'),
  bn = gn('m'),
  _n = gn('bu'),
  xn = gn('u'),
  kn = gn('bum'),
  wn = gn('um'),
  Cn = gn('rtg'),
  $n = gn('rtc')
const Sn = {}
function En(e, t, n) {
  return On(e, t, n)
}
function On(
  e,
  t,
  { immediate: n, deep: o, flush: r, onTrack: s, onTrigger: l } = v,
  i = Wo
) {
  let c,
    a,
    u = !1
  if (
    (lt(e)
      ? ((c = () => e.value), (u = !!e._shallow))
      : et(e)
        ? ((c = () => e), (o = !0))
        : (c = E(e)
            ? () =>
                e.map(
                  e =>
                    lt(e)
                      ? e.value
                      : et(e)
                        ? Tn(e)
                        : T(e)
                          ? vt(e, i, 2, [i && i.proxy])
                          : void 0
                )
            : T(e)
              ? t
                ? () => vt(e, i, 2, [i && i.proxy])
                : () => {
                    if (!i || !i.isUnmounted) return a && a(), gt(e, i, 3, [p])
                  }
              : y),
    t && o)
  ) {
    const e = c
    c = () => Tn(e())
  }
  let p = e => {
      a = m.options.onStop = () => {
        vt(e, i, 4)
      }
    },
    f = E(e) ? [] : Sn
  const d = () => {
    if (m.active)
      if (t) {
        const e = m()
        ;(o || u || K(e, f)) &&
          (a && a(), gt(t, i, 3, [e, f === Sn ? void 0 : f, p]), (f = e))
      } else m()
  }
  let h
  ;(d.allowRecurse = !!t),
    (h =
      'sync' === r
        ? d
        : 'post' === r
          ? () => Xn(d, i && i.suspense)
          : () => {
              !i || i.isMounted
                ? (function(e) {
                    Ft(e, Ct, wt, $t)
                  })(d)
                : d()
            })
  const m = ne(c, { lazy: !0, onTrack: s, onTrigger: l, scheduler: h })
  return (
    Yo(m, i),
    t ? (n ? d() : (f = m())) : 'post' === r ? Xn(m, i && i.suspense) : m(),
    () => {
      oe(m), i && C(i.effects, m)
    }
  )
}
function Rn(e, t, n) {
  const o = this.proxy
  return On(L(e) ? () => o[e] : e.bind(o), t.bind(o), n, this)
}
function Tn(e, t = new Set()) {
  if (!I(e) || t.has(e)) return e
  if ((t.add(e), lt(e))) Tn(e.value, t)
  else if (E(e)) for (let n = 0; n < e.length; n++) Tn(e[n], t)
  else if (R(e) || O(e))
    e.forEach(e => {
      Tn(e, t)
    })
  else for (const n in e) Tn(e[n], t)
  return e
}
const Ln = e => e.type.__isKeepAlive
function An(e, t, n = Wo) {
  const o =
    e.__wdc ||
    (e.__wdc = () => {
      let t = n
      for (; t; ) {
        if (t.isDeactivated) return
        t = t.parent
      }
      e()
    })
  if ((vn(t, o, n), n)) {
    let e = n.parent
    for (; e && e.parent; ) Ln(e.parent.vnode) && In(o, t, n, e), (e = e.parent)
  }
}
function In(e, t, n, o) {
  const r = vn(t, e, o, !0)
  wn(() => {
    C(o[t], r)
  }, n)
}
const Pn = e => '_' === e[0] || '$stable' === e,
  Fn = e => (E(e) ? e.map($o) : [$o(e)]),
  Mn = (e, t, n) => Qt(e => Fn(t(e)), n),
  jn = (e, t) => {
    const n = e._ctx
    for (const o in e) {
      if (Pn(o)) continue
      const r = e[o]
      if (T(r)) t[o] = Mn(0, r, n)
      else if (null != r) {
        const e = Fn(r)
        t[o] = () => e
      }
    }
  },
  Un = (e, t) => {
    const n = Fn(t)
    e.slots.default = () => n
  }
function Nn(e, t, n, o) {
  const r = e.dirs,
    s = t && t.dirs
  for (let l = 0; l < r.length; l++) {
    const i = r[l]
    s && (i.oldValue = s[l].value)
    const c = i.dir[o]
    c && gt(c, n, 8, [e.el, i, e, t])
  }
}
function Vn() {
  return {
    app: null,
    config: {
      isNativeTag: b,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      isCustomElement: b,
      errorHandler: void 0,
      warnHandler: void 0
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null)
  }
}
let Bn = 0
function Dn(e, t) {
  return function(n, o = null) {
    null == o || I(o) || (o = null)
    const r = Vn(),
      s = new Set()
    let l = !1
    const i = (r.app = {
      _uid: Bn++,
      _component: n,
      _props: o,
      _container: null,
      _context: r,
      version: tr,
      get config() {
        return r.config
      },
      set config(e) {},
      use: (e, ...t) => (
        s.has(e) ||
          (e && T(e.install)
            ? (s.add(e), e.install(i, ...t))
            : T(e) && (s.add(e), e(i, ...t))),
        i
      ),
      mixin: e => (
        r.mixins.includes(e) ||
          (r.mixins.push(e), (e.props || e.emits) && (r.deopt = !0)),
        i
      ),
      component: (e, t) => (t ? ((r.components[e] = t), i) : r.components[e]),
      directive: (e, t) => (t ? ((r.directives[e] = t), i) : r.directives[e]),
      mount(s, c, a) {
        if (!l) {
          const u = _o(n, o)
          return (
            (u.appContext = r),
            c && t ? t(u, s) : e(u, s, a),
            (l = !0),
            (i._container = s),
            (s.__vue_app__ = i),
            u.component.proxy
          )
        }
      },
      unmount() {
        l && (e(null, i._container), delete i._container.__vue_app__)
      },
      provide: (e, t) => ((r.provides[e] = t), i)
    })
    return i
  }
}
let Hn = !1
const Wn = e => /svg/.test(e.namespaceURI) && 'foreignObject' !== e.tagName,
  qn = e => 8 === e.nodeType
function zn(e) {
  const {
      mt: t,
      p: n,
      o: {
        patchProp: o,
        nextSibling: r,
        parentNode: s,
        remove: l,
        insert: i,
        createComment: c
      }
    } = e,
    a = (n, o, l, i, c, m = !1) => {
      const v = qn(n) && '[' === n.data,
        g = () => d(n, o, l, i, c, v),
        { type: y, ref: b, shapeFlag: _ } = o,
        x = n.nodeType
      o.el = n
      let k = null
      switch (y) {
        case lo:
          3 !== x
            ? (k = g())
            : (n.data !== o.children && ((Hn = !0), (n.data = o.children)),
              (k = r(n)))
          break
        case io:
          k = 8 !== x || v ? g() : r(n)
          break
        case co:
          if (1 === x) {
            k = n
            const e = !o.children.length
            for (let t = 0; t < o.staticCount; t++)
              e && (o.children += k.outerHTML),
                t === o.staticCount - 1 && (o.anchor = k),
                (k = r(k))
            return k
          }
          k = g()
          break
        case so:
          k = v ? f(n, o, l, i, c, m) : g()
          break
        default:
          if (1 & _)
            k =
              1 !== x || o.type.toLowerCase() !== n.tagName.toLowerCase()
                ? g()
                : u(n, o, l, i, c, m)
          else if (6 & _) {
            o.slotScopeIds = c
            const e = s(n),
              a = () => {
                t(o, e, null, l, i, Wn(e), m)
              },
              u = o.type.__asyncLoader
            u ? u().then(a) : a(), (k = v ? h(n) : r(n))
          } else
            64 & _
              ? (k = 8 !== x ? g() : o.type.hydrate(n, o, l, i, c, m, e, p))
              : 128 & _ &&
                (k = o.type.hydrate(n, o, l, i, Wn(s(n)), c, m, e, a))
      }
      return null != b && Zn(b, null, i, o), k
    },
    u = (e, t, n, r, s, i) => {
      i = i || !!t.dynamicChildren
      const { props: c, patchFlag: a, shapeFlag: u, dirs: f } = t
      if (-1 !== a) {
        if ((f && Nn(t, null, n, 'created'), c))
          if (!i || 16 & a || 32 & a)
            for (const t in c) !N(t) && x(t) && o(e, t, null, c[t])
          else c.onClick && o(e, 'onClick', null, c.onClick)
        let d
        if (
          ((d = c && c.onVnodeBeforeMount) && eo(d, n, t),
          f && Nn(t, null, n, 'beforeMount'),
          ((d = c && c.onVnodeMounted) || f) &&
            ln(() => {
              d && eo(d, n, t), f && Nn(t, null, n, 'mounted')
            }, r),
          16 & u && (!c || (!c.innerHTML && !c.textContent)))
        ) {
          let o = p(e.firstChild, t, e, n, r, s, i)
          for (; o; ) {
            Hn = !0
            const e = o
            ;(o = o.nextSibling), l(e)
          }
        } else
          8 & u &&
            e.textContent !== t.children &&
            ((Hn = !0), (e.textContent = t.children))
      }
      return e.nextSibling
    },
    p = (e, t, o, r, s, l, i) => {
      i = i || !!t.dynamicChildren
      const c = t.children,
        u = c.length
      for (let p = 0; p < u; p++) {
        const t = i ? c[p] : (c[p] = $o(c[p]))
        if (e) e = a(e, t, r, s, l, i)
        else {
          if (t.type === lo && !t.children) continue
          ;(Hn = !0), n(null, t, o, null, r, s, Wn(o), l)
        }
      }
      return e
    },
    f = (e, t, n, o, l, a) => {
      const { slotScopeIds: u } = t
      u && (l = l ? l.concat(u) : u)
      const f = s(e),
        d = p(r(e), t, f, n, o, l, a)
      return d && qn(d) && ']' === d.data
        ? r((t.anchor = d))
        : ((Hn = !0), i((t.anchor = c(']')), f, d), d)
    },
    d = (e, t, o, i, c, a) => {
      if (((Hn = !0), (t.el = null), a)) {
        const t = h(e)
        for (;;) {
          const n = r(e)
          if (!n || n === t) break
          l(n)
        }
      }
      const u = r(e),
        p = s(e)
      return l(e), n(null, t, p, u, o, i, Wn(p), c), u
    },
    h = e => {
      let t = 0
      for (; e; )
        if ((e = r(e)) && qn(e) && ('[' === e.data && t++, ']' === e.data)) {
          if (0 === t) return r(e)
          t--
        }
      return e
    }
  return [
    (e, t) => {
      ;(Hn = !1),
        a(t.firstChild, e, null, null, null),
        jt(),
        Hn && console.error('Hydration completed but contains mismatches.')
    },
    a
  ]
}
function Kn(e) {
  return T(e) ? { setup: e, name: e.name } : e
}
function Gn(e) {
  T(e) && (e = { loader: e })
  const {
    loader: t,
    loadingComponent: n,
    errorComponent: o,
    delay: r = 200,
    timeout: s,
    suspensible: l = !0,
    onError: i
  } = e
  let c,
    a = null,
    u = 0
  const p = () => {
    let e
    return (
      a ||
      (e = a = t()
        .catch(e => {
          if (((e = e instanceof Error ? e : new Error(String(e))), i))
            return new Promise((t, n) => {
              i(e, () => t((u++, (a = null), p())), () => n(e), u + 1)
            })
          throw e
        })
        .then(
          t =>
            e !== a && a
              ? a
              : (t &&
                  (t.__esModule || 'Module' === t[Symbol.toStringTag]) &&
                  (t = t.default),
                (c = t),
                t)
        ))
    )
  }
  return Kn({
    __asyncLoader: p,
    name: 'AsyncComponentWrapper',
    setup() {
      const e = Wo
      if (c) return () => Jn(c, e)
      const t = t => {
        ;(a = null), yt(t, e, 13, !o)
      }
      if (l && e.suspense)
        return p()
          .then(t => () => Jn(t, e))
          .catch(e => (t(e), () => (o ? _o(o, { error: e }) : null)))
      const i = it(!1),
        u = it(),
        f = it(!!r)
      return (
        r &&
          setTimeout(() => {
            f.value = !1
          }, r),
        null != s &&
          setTimeout(() => {
            if (!i.value && !u.value) {
              const e = new Error(`Async component timed out after ${s}ms.`)
              t(e), (u.value = e)
            }
          }, s),
        p()
          .then(() => {
            i.value = !0
          })
          .catch(e => {
            t(e), (u.value = e)
          }),
        () =>
          i.value && c
            ? Jn(c, e)
            : u.value && o
              ? _o(o, { error: u.value })
              : n && !f.value
                ? _o(n)
                : void 0
      )
    }
  })
}
function Jn(e, { vnode: { ref: t, props: n, children: o } }) {
  const r = _o(e, n, o)
  return (r.ref = t), r
}
const Yn = { scheduler: It, allowRecurse: !0 },
  Xn = ln,
  Zn = (e, t, n, o) => {
    if (E(e))
      return void e.forEach((e, r) => Zn(e, t && (E(t) ? t[r] : t), n, o))
    let r
    if (o) {
      if (o.type.__asyncLoader) return
      r = 4 & o.shapeFlag ? o.component.exposed || o.component.proxy : o.el
    } else r = null
    const { i: s, r: l } = e,
      i = t && t.r,
      c = s.refs === v ? (s.refs = {}) : s.refs,
      a = s.setupState
    if (
      (null != i &&
        i !== l &&
        (L(i)
          ? ((c[i] = null), S(a, i) && (a[i] = null))
          : lt(i) && (i.value = null)),
      L(l))
    ) {
      const e = () => {
        ;(c[l] = r), S(a, l) && (a[l] = r)
      }
      r ? ((e.id = -1), Xn(e, n)) : e()
    } else if (lt(l)) {
      const e = () => {
        l.value = r
      }
      r ? ((e.id = -1), Xn(e, n)) : e()
    } else T(l) && vt(l, s, 12, [r, c])
  }
function Qn(e) {
  return (function(e, t) {
    const {
        insert: n,
        remove: o,
        patchProp: r,
        forcePatchProp: s,
        createElement: l,
        createText: i,
        createComment: c,
        setText: a,
        setElementText: u,
        parentNode: p,
        nextSibling: f,
        setScopeId: d = y,
        cloneNode: h,
        insertStaticContent: m
      } = e,
      b = (e, t, n, o = null, r = null, s = null, l = !1, i = null, c = !1) => {
        e && !vo(e, t) && ((o = te(e)), Y(e, r, s, !0), (e = null)),
          -2 === t.patchFlag && ((c = !1), (t.dynamicChildren = null))
        const { type: a, ref: u, shapeFlag: p } = t
        switch (a) {
          case lo:
            _(e, t, n, o)
            break
          case io:
            x(e, t, n, o)
            break
          case co:
            null == e && k(t, n, o, l)
            break
          case so:
            F(e, t, n, o, r, s, l, i, c)
            break
          default:
            1 & p
              ? E(e, t, n, o, r, s, l, i, c)
              : 6 & p
                ? M(e, t, n, o, r, s, l, i, c)
                : (64 & p || 128 & p) &&
                  a.process(e, t, n, o, r, s, l, i, c, se)
        }
        null != u && r && Zn(u, e && e.ref, s, t)
      },
      _ = (e, t, o, r) => {
        if (null == e) n((t.el = i(t.children)), o, r)
        else {
          const n = (t.el = e.el)
          t.children !== e.children && a(n, t.children)
        }
      },
      x = (e, t, o, r) => {
        null == e ? n((t.el = c(t.children || '')), o, r) : (t.el = e.el)
      },
      k = (e, t, n, o) => {
        ;[e.el, e.anchor] = m(e.children, t, n, o)
      },
      C = ({ el: e, anchor: t }, o, r) => {
        let s
        for (; e && e !== t; ) (s = f(e)), n(e, o, r), (e = s)
        n(t, o, r)
      },
      $ = ({ el: e, anchor: t }) => {
        let n
        for (; e && e !== t; ) (n = f(e)), o(e), (e = n)
        o(t)
      },
      E = (e, t, n, o, r, s, l, i, c) => {
        ;(l = l || 'svg' === t.type),
          null == e ? O(t, n, o, r, s, l, i, c) : L(e, t, r, s, l, i, c)
      },
      O = (e, t, o, s, i, c, a, p) => {
        let f, d
        const {
          type: m,
          props: v,
          shapeFlag: g,
          transition: y,
          patchFlag: b,
          dirs: _
        } = e
        if (e.el && void 0 !== h && -1 === b) f = e.el = h(e.el)
        else {
          if (
            ((f = e.el = l(e.type, c, v && v.is, v)),
            8 & g
              ? u(f, e.children)
              : 16 & g &&
                T(
                  e.children,
                  f,
                  null,
                  s,
                  i,
                  c && 'foreignObject' !== m,
                  a,
                  p || !!e.dynamicChildren
                ),
            _ && Nn(e, null, s, 'created'),
            v)
          ) {
            for (const t in v)
              N(t) || r(f, t, null, v[t], c, e.children, s, i, ee)
            ;(d = v.onVnodeBeforeMount) && eo(d, s, e)
          }
          R(f, e, e.scopeId, a, s)
        }
        _ && Nn(e, null, s, 'beforeMount')
        const x = (!i || (i && !i.pendingBranch)) && y && !y.persisted
        x && y.beforeEnter(f),
          n(f, t, o),
          ((d = v && v.onVnodeMounted) || x || _) &&
            Xn(() => {
              d && eo(d, s, e), x && y.enter(f), _ && Nn(e, null, s, 'mounted')
            }, i)
      },
      R = (e, t, n, o, r) => {
        if ((n && d(e, n), o)) for (let s = 0; s < o.length; s++) d(e, o[s])
        if (r) {
          if (t === r.subTree) {
            const t = r.vnode
            R(e, t, t.scopeId, t.slotScopeIds, r.parent)
          }
        }
      },
      T = (e, t, n, o, r, s, l, i, c = 0) => {
        for (let a = c; a < e.length; a++) {
          const c = (e[a] = l ? So(e[a]) : $o(e[a]))
          b(null, c, t, n, o, r, s, l, i)
        }
      },
      L = (e, t, n, o, l, i, c) => {
        const a = (t.el = e.el)
        let { patchFlag: p, dynamicChildren: f, dirs: d } = t
        p |= 16 & e.patchFlag
        const h = e.props || v,
          m = t.props || v
        let g
        if (
          ((g = m.onVnodeBeforeUpdate) && eo(g, n, t, e),
          d && Nn(t, e, n, 'beforeUpdate'),
          p > 0)
        ) {
          if (16 & p) I(a, t, h, m, n, o, l)
          else if (
            (2 & p && h.class !== m.class && r(a, 'class', null, m.class, l),
            4 & p && r(a, 'style', h.style, m.style, l),
            8 & p)
          ) {
            const i = t.dynamicProps
            for (let t = 0; t < i.length; t++) {
              const c = i[t],
                u = h[c],
                p = m[c]
              ;(p !== u || (s && s(a, c))) &&
                r(a, c, u, p, l, e.children, n, o, ee)
            }
          }
          1 & p && e.children !== t.children && u(a, t.children)
        } else c || null != f || I(a, t, h, m, n, o, l)
        const y = l && 'foreignObject' !== t.type
        f
          ? A(e.dynamicChildren, f, a, n, o, y, i)
          : c || H(e, t, a, null, n, o, y, i, !1),
          ((g = m.onVnodeUpdated) || d) &&
            Xn(() => {
              g && eo(g, n, t, e), d && Nn(t, e, n, 'updated')
            }, o)
      },
      A = (e, t, n, o, r, s, l) => {
        for (let i = 0; i < t.length; i++) {
          const c = e[i],
            a = t[i],
            u =
              c.type === so || !vo(c, a) || 6 & c.shapeFlag || 64 & c.shapeFlag
                ? p(c.el)
                : n
          b(c, a, u, null, o, r, s, l, !0)
        }
      },
      I = (e, t, n, o, l, i, c) => {
        if (n !== o) {
          for (const a in o) {
            if (N(a)) continue
            const u = o[a],
              p = n[a]
            ;(u !== p || (s && s(e, a))) &&
              r(e, a, p, u, c, t.children, l, i, ee)
          }
          if (n !== v)
            for (const s in n)
              N(s) || s in o || r(e, s, n[s], null, c, t.children, l, i, ee)
        }
      },
      F = (e, t, o, r, s, l, c, a, u) => {
        const p = (t.el = e ? e.el : i('')),
          f = (t.anchor = e ? e.anchor : i(''))
        let { patchFlag: d, dynamicChildren: h, slotScopeIds: m } = t
        d > 0 && (u = !0),
          m && (a = a ? a.concat(m) : m),
          null == e
            ? (n(p, o, r), n(f, o, r), T(t.children, o, f, s, l, c, a, u))
            : d > 0 && 64 & d && h && e.dynamicChildren
              ? (A(e.dynamicChildren, h, o, s, l, c, a),
                (null != t.key || (s && t === s.subTree)) && to(e, t, !0))
              : H(e, t, o, f, s, l, c, a, u)
      },
      M = (e, t, n, o, r, s, l, i, c) => {
        ;(t.slotScopeIds = i),
          null == e
            ? 512 & t.shapeFlag
              ? r.ctx.activate(t, n, o, l, c)
              : j(t, n, o, r, s, l, c)
            : U(e, t, c)
      },
      j = (e, t, n, o, r, s, l) => {
        const i = (e.component = (function(e, t, n) {
          const o = e.type,
            r = (t ? t.appContext : e.appContext) || Do,
            s = {
              uid: Ho++,
              vnode: e,
              type: o,
              parent: t,
              appContext: r,
              root: null,
              next: null,
              subTree: null,
              update: null,
              render: null,
              proxy: null,
              exposed: null,
              withProxy: null,
              effects: null,
              provides: t ? t.provides : Object.create(r.provides),
              accessCache: null,
              renderCache: [],
              components: null,
              directives: null,
              propsOptions: pn(o, r),
              emitsOptions: Bt(o, r),
              emit: null,
              emitted: null,
              propsDefaults: v,
              ctx: v,
              data: v,
              props: v,
              attrs: v,
              slots: v,
              refs: v,
              setupState: v,
              setupContext: null,
              suspense: n,
              suspenseId: n ? n.pendingId : 0,
              asyncDep: null,
              asyncResolved: !1,
              isMounted: !1,
              isUnmounted: !1,
              isDeactivated: !1,
              bc: null,
              c: null,
              bm: null,
              m: null,
              bu: null,
              u: null,
              um: null,
              bum: null,
              da: null,
              a: null,
              rtg: null,
              rtc: null,
              ec: null
            }
          return (
            (s.ctx = { _: s }),
            (s.root = t ? t.root : s),
            (s.emit = Vt.bind(null, s)),
            s
          )
        })(e, o, r))
        if (
          (Ln(e) && (i.ctx.renderer = se),
          (function(e, t = !1) {
            Ko = t
            const { props: n, children: o } = e.vnode,
              r = zo(e)
            cn(e, n, r, t),
              ((e, t) => {
                if (32 & e.vnode.shapeFlag) {
                  const n = t._
                  n ? ((e.slots = t), J(t, '_', n)) : jn(t, (e.slots = {}))
                } else (e.slots = {}), t && Un(e, t)
                J(e.slots, go, 1)
              })(e, o)
            const s = r
              ? (function(e, t) {
                  const n = e.type
                  ;(e.accessCache = Object.create(null)),
                    (e.proxy = new Proxy(e.ctx, Vo))
                  const { setup: o } = n
                  if (o) {
                    const n = (e.setupContext =
                      o.length > 1
                        ? (function(e) {
                            const t = t => {
                              e.exposed = pt(t)
                            }
                            return {
                              attrs: e.attrs,
                              slots: e.slots,
                              emit: e.emit,
                              expose: t
                            }
                          })(e)
                        : null)
                    ;(Wo = e), ce()
                    const r = vt(o, e, 0, [e.props, n])
                    if ((ae(), (Wo = null), P(r))) {
                      if (t)
                        return r
                          .then(t => {
                            Go(e, t)
                          })
                          .catch(t => {
                            yt(t, e, 0)
                          })
                      e.asyncDep = r
                    } else Go(e, r)
                  } else Jo(e)
                })(e, t)
              : void 0
            Ko = !1
          })(i),
          i.asyncDep)
        ) {
          if ((r && r.registerDep(i, V), !e.el)) {
            const e = (i.subTree = _o(io))
            x(null, e, t, n)
          }
        } else V(i, e, t, n, r, s, l)
      },
      U = (e, t, n) => {
        const o = (t.component = e.component)
        if (
          (function(e, t, n) {
            const { props: o, children: r, component: s } = e,
              { props: l, children: i, patchFlag: c } = t,
              a = s.emitsOptions
            if (t.dirs || t.transition) return !0
            if (!(n && c >= 0))
              return (
                !((!r && !i) || (i && i.$stable)) ||
                (o !== l && (o ? !l || rn(o, l, a) : !!l))
              )
            if (1024 & c) return !0
            if (16 & c) return o ? rn(o, l, a) : !!l
            if (8 & c) {
              const e = t.dynamicProps
              for (let t = 0; t < e.length; t++) {
                const n = e[t]
                if (l[n] !== o[n] && !Dt(a, n)) return !0
              }
            }
            return !1
          })(e, t, n)
        ) {
          if (o.asyncDep && !o.asyncResolved) return void B(o, t, n)
          ;(o.next = t),
            (function(e) {
              const t = xt.indexOf(e)
              t > kt && xt.splice(t, 1)
            })(o.update),
            o.update()
        } else (t.component = e.component), (t.el = e.el), (o.vnode = t)
      },
      V = (e, t, n, o, r, s, l) => {
        e.update = ne(function() {
          if (e.isMounted) {
            let t,
              { next: n, bu: o, u: i, parent: c, vnode: a } = e,
              u = n
            n ? ((n.el = a.el), B(e, n, l)) : (n = a),
              o && G(o),
              (t = n.props && n.props.onVnodeBeforeUpdate) && eo(t, c, n, a)
            const f = en(e),
              d = e.subTree
            ;(e.subTree = f),
              b(d, f, p(d.el), te(d), e, r, s),
              (n.el = f.el),
              null === u &&
                (function({ vnode: e, parent: t }, n) {
                  for (; t && t.subTree === e; )
                    ((e = t.vnode).el = n), (t = t.parent)
                })(e, f.el),
              i && Xn(i, r),
              (t = n.props && n.props.onVnodeUpdated) &&
                Xn(() => {
                  eo(t, c, n, a)
                }, r)
          } else {
            let l
            const { el: i, props: c } = t,
              { bm: a, m: u, parent: p } = e
            a && G(a), (l = c && c.onVnodeBeforeMount) && eo(l, p, t)
            const f = (e.subTree = en(e))
            if (
              (i && ie
                ? ie(t.el, f, e, r, null)
                : (b(null, f, n, o, e, r, s), (t.el = f.el)),
              u && Xn(u, r),
              (l = c && c.onVnodeMounted))
            ) {
              const e = t
              Xn(() => {
                eo(l, p, e)
              }, r)
            }
            const { a: d } = e
            d && 256 & t.shapeFlag && Xn(d, r),
              (e.isMounted = !0),
              (t = n = o = null)
          }
        }, Yn)
      },
      B = (e, t, n) => {
        t.component = e
        const o = e.vnode.props
        ;(e.vnode = t),
          (e.next = null),
          (function(e, t, n, o) {
            const {
                props: r,
                attrs: s,
                vnode: { patchFlag: l }
              } = e,
              i = ot(r),
              [c] = e.propsOptions
            if (!(o || l > 0) || 16 & l) {
              let o
              an(e, t, r, s)
              for (const s in i)
                (t && (S(t, s) || ((o = W(s)) !== s && S(t, o)))) ||
                  (c
                    ? !n ||
                      (void 0 === n[s] && void 0 === n[o]) ||
                      (r[s] = un(c, t || v, s, void 0, e))
                    : delete r[s])
              if (s !== i) for (const e in s) (t && S(t, e)) || delete s[e]
            } else if (8 & l) {
              const n = e.vnode.dynamicProps
              for (let o = 0; o < n.length; o++) {
                const l = n[o],
                  a = t[l]
                if (c)
                  if (S(s, l)) s[l] = a
                  else {
                    const t = D(l)
                    r[t] = un(c, i, t, a, e)
                  }
                else s[l] = a
              }
            }
            pe(e, 'set', '$attrs')
          })(e, t.props, o, n),
          ((e, t, n) => {
            const { vnode: o, slots: r } = e
            let s = !0,
              l = v
            if (32 & o.shapeFlag) {
              const e = t._
              e
                ? n && 1 === e
                  ? (s = !1)
                  : (w(r, t), n || 1 !== e || delete r._)
                : ((s = !t.$stable), jn(t, r)),
                (l = t)
            } else t && (Un(e, t), (l = { default: 1 }))
            if (s) for (const i in r) Pn(i) || i in l || delete r[i]
          })(e, t.children, n),
          ce(),
          Mt(void 0, e.update),
          ae()
      },
      H = (e, t, n, o, r, s, l, i, c = !1) => {
        const a = e && e.children,
          p = e ? e.shapeFlag : 0,
          f = t.children,
          { patchFlag: d, shapeFlag: h } = t
        if (d > 0) {
          if (128 & d) return void z(a, f, n, o, r, s, l, i, c)
          if (256 & d) return void q(a, f, n, o, r, s, l, i, c)
        }
        8 & h
          ? (16 & p && ee(a, r, s), f !== a && u(n, f))
          : 16 & p
            ? 16 & h
              ? z(a, f, n, o, r, s, l, i, c)
              : ee(a, r, s, !0)
            : (8 & p && u(n, ''), 16 & h && T(f, n, o, r, s, l, i, c))
      },
      q = (e, t, n, o, r, s, l, i, c) => {
        t = t || g
        const a = (e = e || g).length,
          u = t.length,
          p = Math.min(a, u)
        let f
        for (f = 0; f < p; f++) {
          const o = (t[f] = c ? So(t[f]) : $o(t[f]))
          b(e[f], o, n, null, r, s, l, i, c)
        }
        a > u ? ee(e, r, s, !0, !1, p) : T(t, n, o, r, s, l, i, c, p)
      },
      z = (e, t, n, o, r, s, l, i, c) => {
        let a = 0
        const u = t.length
        let p = e.length - 1,
          f = u - 1
        for (; a <= p && a <= f; ) {
          const o = e[a],
            u = (t[a] = c ? So(t[a]) : $o(t[a]))
          if (!vo(o, u)) break
          b(o, u, n, null, r, s, l, i, c), a++
        }
        for (; a <= p && a <= f; ) {
          const o = e[p],
            a = (t[f] = c ? So(t[f]) : $o(t[f]))
          if (!vo(o, a)) break
          b(o, a, n, null, r, s, l, i, c), p--, f--
        }
        if (a > p) {
          if (a <= f) {
            const e = f + 1,
              p = e < u ? t[e].el : o
            for (; a <= f; )
              b(null, (t[a] = c ? So(t[a]) : $o(t[a])), n, p, r, s, l, i, c),
                a++
          }
        } else if (a > f) for (; a <= p; ) Y(e[a], r, s, !0), a++
        else {
          const d = a,
            h = a,
            m = new Map()
          for (a = h; a <= f; a++) {
            const e = (t[a] = c ? So(t[a]) : $o(t[a]))
            null != e.key && m.set(e.key, a)
          }
          let v,
            y = 0
          const _ = f - h + 1
          let x = !1,
            k = 0
          const w = new Array(_)
          for (a = 0; a < _; a++) w[a] = 0
          for (a = d; a <= p; a++) {
            const o = e[a]
            if (y >= _) {
              Y(o, r, s, !0)
              continue
            }
            let u
            if (null != o.key) u = m.get(o.key)
            else
              for (v = h; v <= f; v++)
                if (0 === w[v - h] && vo(o, t[v])) {
                  u = v
                  break
                }
            void 0 === u
              ? Y(o, r, s, !0)
              : ((w[u - h] = a + 1),
                u >= k ? (k = u) : (x = !0),
                b(o, t[u], n, null, r, s, l, i, c),
                y++)
          }
          const C = x
            ? (function(e) {
                const t = e.slice(),
                  n = [0]
                let o, r, s, l, i
                const c = e.length
                for (o = 0; o < c; o++) {
                  const c = e[o]
                  if (0 !== c) {
                    if (((r = n[n.length - 1]), e[r] < c)) {
                      ;(t[o] = r), n.push(o)
                      continue
                    }
                    for (s = 0, l = n.length - 1; s < l; )
                      (i = ((s + l) / 2) | 0),
                        e[n[i]] < c ? (s = i + 1) : (l = i)
                    c < e[n[s]] && (s > 0 && (t[o] = n[s - 1]), (n[s] = o))
                  }
                }
                ;(s = n.length), (l = n[s - 1])
                for (; s-- > 0; ) (n[s] = l), (l = t[l])
                return n
              })(w)
            : g
          for (v = C.length - 1, a = _ - 1; a >= 0; a--) {
            const e = h + a,
              p = t[e],
              f = e + 1 < u ? t[e + 1].el : o
            0 === w[a]
              ? b(null, p, n, f, r, s, l, i, c)
              : x && (v < 0 || a !== C[v] ? K(p, n, f, 2) : v--)
          }
        }
      },
      K = (e, t, o, r, s = null) => {
        const { el: l, type: i, transition: c, children: a, shapeFlag: u } = e
        if (6 & u) return void K(e.component.subTree, t, o, r)
        if (128 & u) return void e.suspense.move(t, o, r)
        if (64 & u) return void i.move(e, t, o, se)
        if (i === so) {
          n(l, t, o)
          for (let e = 0; e < a.length; e++) K(a[e], t, o, r)
          return void n(e.anchor, t, o)
        }
        if (i === co) return void C(e, t, o)
        if (2 !== r && 1 & u && c)
          if (0 === r) c.beforeEnter(l), n(l, t, o), Xn(() => c.enter(l), s)
          else {
            const { leave: e, delayLeave: r, afterLeave: s } = c,
              i = () => n(l, t, o),
              a = () => {
                e(l, () => {
                  i(), s && s()
                })
              }
            r ? r(l, i, a) : a()
          }
        else n(l, t, o)
      },
      Y = (e, t, n, o = !1, r = !1) => {
        const {
          type: s,
          props: l,
          ref: i,
          children: c,
          dynamicChildren: a,
          shapeFlag: u,
          patchFlag: p,
          dirs: f
        } = e
        if ((null != i && Zn(i, null, n, null), 256 & u))
          return void t.ctx.deactivate(e)
        const d = 1 & u && f
        let h
        if (((h = l && l.onVnodeBeforeUnmount) && eo(h, t, e), 6 & u))
          Q(e.component, n, o)
        else {
          if (128 & u) return void e.suspense.unmount(n, o)
          d && Nn(e, null, t, 'beforeUnmount'),
            64 & u
              ? e.type.remove(e, t, n, r, se, o)
              : a && (s !== so || (p > 0 && 64 & p))
                ? ee(a, t, n, !1, !0)
                : ((s === so && (128 & p || 256 & p)) || (!r && 16 & u)) &&
                  ee(c, t, n),
            o && X(e)
        }
        ;((h = l && l.onVnodeUnmounted) || d) &&
          Xn(() => {
            h && eo(h, t, e), d && Nn(e, null, t, 'unmounted')
          }, n)
      },
      X = e => {
        const { type: t, el: n, anchor: r, transition: s } = e
        if (t === so) return void Z(n, r)
        if (t === co) return void $(e)
        const l = () => {
          o(n), s && !s.persisted && s.afterLeave && s.afterLeave()
        }
        if (1 & e.shapeFlag && s && !s.persisted) {
          const { leave: t, delayLeave: o } = s,
            r = () => t(n, l)
          o ? o(e.el, l, r) : r()
        } else l()
      },
      Z = (e, t) => {
        let n
        for (; e !== t; ) (n = f(e)), o(e), (e = n)
        o(t)
      },
      Q = (e, t, n) => {
        const { bum: o, effects: r, update: s, subTree: l, um: i } = e
        if ((o && G(o), r)) for (let c = 0; c < r.length; c++) oe(r[c])
        s && (oe(s), Y(l, e, t, n)),
          i && Xn(i, t),
          Xn(() => {
            e.isUnmounted = !0
          }, t),
          t &&
            t.pendingBranch &&
            !t.isUnmounted &&
            e.asyncDep &&
            !e.asyncResolved &&
            e.suspenseId === t.pendingId &&
            (t.deps--, 0 === t.deps && t.resolve())
      },
      ee = (e, t, n, o = !1, r = !1, s = 0) => {
        for (let l = s; l < e.length; l++) Y(e[l], t, n, o, r)
      },
      te = e =>
        6 & e.shapeFlag
          ? te(e.component.subTree)
          : 128 & e.shapeFlag
            ? e.suspense.next()
            : f(e.anchor || e.el),
      re = (e, t, n) => {
        null == e
          ? t._vnode && Y(t._vnode, null, null, !0)
          : b(t._vnode || null, e, t, null, null, null, n),
          jt(),
          (t._vnode = e)
      },
      se = { p: b, um: Y, m: K, r: X, mt: j, mc: T, pc: H, pbc: A, n: te, o: e }
    let le, ie
    t && ([le, ie] = t(se))
    return { render: re, hydrate: le, createApp: Dn(re, le) }
  })(e, zn)
}
function eo(e, t, n, o = null) {
  gt(e, t, 7, [n, o])
}
function to(e, t, n = !1) {
  const o = e.children,
    r = t.children
  if (E(o) && E(r))
    for (let s = 0; s < o.length; s++) {
      const e = o[s]
      let t = r[s]
      1 & t.shapeFlag &&
        !t.dynamicChildren &&
        ((t.patchFlag <= 0 || 32 === t.patchFlag) &&
          ((t = r[s] = So(r[s])), (t.el = e.el)),
        n || to(e, t))
    }
}
function no(e, t) {
  return (
    (function(e, t, n = !0, o = !1) {
      const r = Kt || Wo
      if (r) {
        const n = r.type
        if ('components' === e) {
          const e = Xo(n)
          if (e && (e === t || e === D(t) || e === q(D(t)))) return n
        }
        const s = ro(r[e] || n[e], t) || ro(r.appContext[e], t)
        return !s && o ? n : s
      }
    })('components', e, !0, t) || e
  )
}
const oo = Symbol()
function ro(e, t) {
  return e && (e[t] || e[D(t)] || e[q(D(t))])
}
const so = Symbol(void 0),
  lo = Symbol(void 0),
  io = Symbol(void 0),
  co = Symbol(void 0),
  ao = []
let uo = null
function po(e = !1) {
  ao.push((uo = e ? null : []))
}
function fo() {
  ao.pop(), (uo = ao[ao.length - 1] || null)
}
function ho(e, t, n, o, r) {
  const s = _o(e, t, n, o, r, !0)
  return (s.dynamicChildren = uo || g), fo(), uo && uo.push(s), s
}
function mo(e) {
  return !!e && !0 === e.__v_isVNode
}
function vo(e, t) {
  return e.type === t.type && e.key === t.key
}
const go = '__vInternal',
  yo = ({ key: e }) => (null != e ? e : null),
  bo = ({ ref: e }) =>
    null != e ? (L(e) || lt(e) || T(e) ? { i: Kt, r: e } : e) : null,
  _o = function(e, t = null, n = null, o = 0, r = null, s = !1) {
    ;(e && e !== oo) || (e = io)
    if (mo(e)) {
      const o = xo(e, t, !0)
      return n && Eo(o, n), o
    }
    ;(l = e), T(l) && '__vccOpts' in l && (e = e.__vccOpts)
    var l
    if (t) {
      ;(nt(t) || go in t) && (t = w({}, t))
      let { class: e, style: n } = t
      e && !L(e) && (t.class = d(e)),
        I(n) && (nt(n) && !E(n) && (n = w({}, n)), (t.style = a(n)))
    }
    const i = L(e)
        ? 1
        : (e => e.__isSuspense)(e)
          ? 128
          : (e => e.__isTeleport)(e)
            ? 64
            : I(e)
              ? 4
              : T(e)
                ? 2
                : 0,
      c = {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e,
        props: t,
        key: t && yo(t),
        ref: t && bo(t),
        scopeId: Gt,
        slotScopeIds: null,
        children: null,
        component: null,
        suspense: null,
        ssContent: null,
        ssFallback: null,
        dirs: null,
        transition: null,
        el: null,
        anchor: null,
        target: null,
        targetAnchor: null,
        staticCount: 0,
        shapeFlag: i,
        patchFlag: o,
        dynamicProps: r,
        dynamicChildren: null,
        appContext: null
      }
    if ((Eo(c, n), 128 & i)) {
      const { content: e, fallback: t } = (function(e) {
        const { shapeFlag: t, children: n } = e
        let o, r
        return (
          32 & t
            ? ((o = sn(n.default)), (r = sn(n.fallback)))
            : ((o = sn(n)), (r = $o(null))),
          { content: o, fallback: r }
        )
      })(c)
      ;(c.ssContent = e), (c.ssFallback = t)
    }
    !s && uo && (o > 0 || 6 & i) && 32 !== o && uo.push(c)
    return c
  }
function xo(e, t, n = !1) {
  const { props: o, ref: r, patchFlag: s, children: l } = e,
    i = t ? Oo(o || {}, t) : o
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: i,
    key: i && yo(i),
    ref:
      t && t.ref ? (n && r ? (E(r) ? r.concat(bo(t)) : [r, bo(t)]) : bo(t)) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: l,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== so ? (-1 === s ? 16 : 16 | s) : s,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && xo(e.ssContent),
    ssFallback: e.ssFallback && xo(e.ssFallback),
    el: e.el,
    anchor: e.anchor
  }
}
function ko(e = ' ', t = 0) {
  return _o(lo, null, e, t)
}
function wo(e, t) {
  const n = _o(co, null, e)
  return (n.staticCount = t), n
}
function Co(e = '', t = !1) {
  return t ? (po(), ho(io, null, e)) : _o(io, null, e)
}
function $o(e) {
  return null == e || 'boolean' == typeof e
    ? _o(io)
    : E(e)
      ? _o(so, null, e)
      : 'object' == typeof e
        ? null === e.el
          ? e
          : xo(e)
        : _o(lo, null, String(e))
}
function So(e) {
  return null === e.el ? e : xo(e)
}
function Eo(e, t) {
  let n = 0
  const { shapeFlag: o } = e
  if (null == t) t = null
  else if (E(t)) n = 16
  else if ('object' == typeof t) {
    if (1 & o || 64 & o) {
      const n = t.default
      return void (n && (n._c && Wt(1), Eo(e, n()), n._c && Wt(-1)))
    }
    {
      n = 32
      const o = t._
      o || go in t
        ? 3 === o &&
          Kt &&
          (1024 & Kt.vnode.patchFlag
            ? ((t._ = 2), (e.patchFlag |= 1024))
            : (t._ = 1))
        : (t._ctx = Kt)
    }
  } else
    T(t)
      ? ((t = { default: t, _ctx: Kt }), (n = 32))
      : ((t = String(t)), 64 & o ? ((n = 16), (t = [ko(t)])) : (n = 8))
  ;(e.children = t), (e.shapeFlag |= n)
}
function Oo(...e) {
  const t = w({}, e[0])
  for (let n = 1; n < e.length; n++) {
    const o = e[n]
    for (const e in o)
      if ('class' === e)
        t.class !== o.class && (t.class = d([t.class, o.class]))
      else if ('style' === e) t.style = a([t.style, o.style])
      else if (x(e)) {
        const n = t[e],
          r = o[e]
        n !== r && (t[e] = n ? [].concat(n, o[e]) : r)
      } else '' !== e && (t[e] = o[e])
  }
  return t
}
function Ro(e, t, n = !1) {
  const o = Wo || Kt
  if (o) {
    const r =
      null == o.parent
        ? o.vnode.appContext && o.vnode.appContext.provides
        : o.parent.provides
    if (r && e in r) return r[e]
    if (arguments.length > 1) return n && T(t) ? t() : t
  }
}
let To = !0
function Lo(e, t, n = [], o = [], r = [], s = !1) {
  const {
      mixins: l,
      extends: i,
      data: c,
      computed: a,
      methods: u,
      watch: p,
      provide: f,
      inject: d,
      components: h,
      directives: m,
      beforeMount: g,
      mounted: b,
      beforeUpdate: _,
      updated: x,
      activated: k,
      deactivated: C,
      beforeDestroy: $,
      beforeUnmount: S,
      destroyed: O,
      unmounted: R,
      render: L,
      renderTracked: A,
      renderTriggered: P,
      errorCaptured: F,
      expose: M
    } = t,
    j = e.proxy,
    U = e.ctx,
    N = e.appContext.mixins
  if (
    (s && L && e.render === y && (e.render = L),
    s ||
      ((To = !1),
      Ao('beforeCreate', 'bc', t, e, N),
      (To = !0),
      Po(e, N, n, o, r)),
    i && Lo(e, i, n, o, r, !0),
    l && Po(e, l, n, o, r),
    d)
  )
    if (E(d))
      for (let v = 0; v < d.length; v++) {
        const e = d[v]
        U[e] = Ro(e)
      }
    else
      for (const v in d) {
        const e = d[v]
        I(e) ? (U[v] = Ro(e.from || v, e.default, !0)) : (U[v] = Ro(e))
      }
  if (u)
    for (const v in u) {
      const e = u[v]
      T(e) && (U[v] = e.bind(j))
    }
  if (
    (s
      ? c && n.push(c)
      : (n.length && n.forEach(t => Fo(e, t, j)), c && Fo(e, c, j)),
    a)
  )
    for (const v in a) {
      const e = a[v],
        t = Zo({
          get: T(e) ? e.bind(j, j) : T(e.get) ? e.get.bind(j, j) : y,
          set: !T(e) && T(e.set) ? e.set.bind(j) : y
        })
      Object.defineProperty(U, v, {
        enumerable: !0,
        configurable: !0,
        get: () => t.value,
        set: e => (t.value = e)
      })
    }
  var V
  if (
    (p && o.push(p),
    !s &&
      o.length &&
      o.forEach(e => {
        for (const t in e) Mo(e[t], U, j, t)
      }),
    f && r.push(f),
    !s &&
      r.length &&
      r.forEach(e => {
        const t = T(e) ? e.call(j) : e
        Reflect.ownKeys(t).forEach(e => {
          !(function(e, t) {
            if (Wo) {
              let n = Wo.provides
              const o = Wo.parent && Wo.parent.provides
              o === n && (n = Wo.provides = Object.create(o)), (n[e] = t)
            }
          })(e, t[e])
        })
      }),
    s &&
      (h && w(e.components || (e.components = w({}, e.type.components)), h),
      m && w(e.directives || (e.directives = w({}, e.type.directives)), m)),
    s || Ao('created', 'c', t, e, N),
    g && yn(g.bind(j)),
    b && bn(b.bind(j)),
    _ && _n(_.bind(j)),
    x && xn(x.bind(j)),
    k && An(k.bind(j), 'a', V),
    C &&
      (function(e, t) {
        An(e, 'da', t)
      })(C.bind(j)),
    F &&
      ((e, t = Wo) => {
        vn('ec', e, t)
      })(F.bind(j)),
    A && $n(A.bind(j)),
    P && Cn(P.bind(j)),
    S && kn(S.bind(j)),
    R && wn(R.bind(j)),
    E(M) && !s)
  )
    if (M.length) {
      const t = e.exposed || (e.exposed = pt({}))
      M.forEach(e => {
        t[e] = ht(j, e)
      })
    } else e.exposed || (e.exposed = v)
}
function Ao(e, t, n, o, r) {
  for (let s = 0; s < r.length; s++) Io(e, t, r[s], o)
  Io(e, t, n, o)
}
function Io(e, t, n, o) {
  const { extends: r, mixins: s } = n,
    l = n[e]
  if ((r && Io(e, t, r, o), s))
    for (let i = 0; i < s.length; i++) Io(e, t, s[i], o)
  l && gt(l.bind(o.proxy), o, t)
}
function Po(e, t, n, o, r) {
  for (let s = 0; s < t.length; s++) Lo(e, t[s], n, o, r, !0)
}
function Fo(e, t, n) {
  To = !1
  const o = t.call(n, n)
  ;(To = !0), I(o) && (e.data === v ? (e.data = Xe(o)) : w(e.data, o))
}
function Mo(e, t, n, o) {
  const r = o.includes('.')
    ? (function(e, t) {
        const n = t.split('.')
        return () => {
          let t = e
          for (let e = 0; e < n.length && t; e++) t = t[n[e]]
          return t
        }
      })(n, o)
    : () => n[o]
  if (L(e)) {
    const n = t[e]
    T(n) && En(r, n)
  } else if (T(e)) En(r, e.bind(n))
  else if (I(e))
    if (E(e)) e.forEach(e => Mo(e, t, n, o))
    else {
      const o = T(e.handler) ? e.handler.bind(n) : t[e.handler]
      T(o) && En(r, o, e)
    }
}
function jo(e, t, n) {
  const o = n.appContext.config.optionMergeStrategies,
    { mixins: r, extends: s } = t
  s && jo(e, s, n), r && r.forEach(t => jo(e, t, n))
  for (const l in t)
    o && S(o, l) ? (e[l] = o[l](e[l], t[l], n.proxy, l)) : (e[l] = t[l])
}
const Uo = e =>
    e ? (zo(e) ? (e.exposed ? e.exposed : e.proxy) : Uo(e.parent)) : null,
  No = w(Object.create(null), {
    $: e => e,
    $el: e => e.vnode.el,
    $data: e => e.data,
    $props: e => e.props,
    $attrs: e => e.attrs,
    $slots: e => e.slots,
    $refs: e => e.refs,
    $parent: e => Uo(e.parent),
    $root: e => Uo(e.root),
    $emit: e => e.emit,
    $options: e =>
      (function(e) {
        const t = e.type,
          { __merged: n, mixins: o, extends: r } = t
        if (n) return n
        const s = e.appContext.mixins
        if (!s.length && !o && !r) return t
        const l = {}
        return s.forEach(t => jo(l, t, e)), jo(l, t, e), (t.__merged = l)
      })(e),
    $forceUpdate: e => () => It(e.update),
    $nextTick: e => At.bind(e.proxy),
    $watch: e => Rn.bind(e)
  }),
  Vo = {
    get({ _: e }, t) {
      const {
        ctx: n,
        setupState: o,
        data: r,
        props: s,
        accessCache: l,
        type: i,
        appContext: c
      } = e
      if ('__v_skip' === t) return !0
      let a
      if ('$' !== t[0]) {
        const i = l[t]
        if (void 0 !== i)
          switch (i) {
            case 0:
              return o[t]
            case 1:
              return r[t]
            case 3:
              return n[t]
            case 2:
              return s[t]
          }
        else {
          if (o !== v && S(o, t)) return (l[t] = 0), o[t]
          if (r !== v && S(r, t)) return (l[t] = 1), r[t]
          if ((a = e.propsOptions[0]) && S(a, t)) return (l[t] = 2), s[t]
          if (n !== v && S(n, t)) return (l[t] = 3), n[t]
          To && (l[t] = 4)
        }
      }
      const u = No[t]
      let p, f
      return u
        ? ('$attrs' === t && ue(e, 0, t), u(e))
        : (p = i.__cssModules) && (p = p[t])
          ? p
          : n !== v && S(n, t)
            ? ((l[t] = 3), n[t])
            : ((f = c.config.globalProperties), S(f, t) ? f[t] : void 0)
    },
    set({ _: e }, t, n) {
      const { data: o, setupState: r, ctx: s } = e
      if (r !== v && S(r, t)) r[t] = n
      else if (o !== v && S(o, t)) o[t] = n
      else if (S(e.props, t)) return !1
      return ('$' !== t[0] || !(t.slice(1) in e)) && ((s[t] = n), !0)
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: n,
          ctx: o,
          appContext: r,
          propsOptions: s
        }
      },
      l
    ) {
      let i
      return (
        void 0 !== n[l] ||
        (e !== v && S(e, l)) ||
        (t !== v && S(t, l)) ||
        ((i = s[0]) && S(i, l)) ||
        S(o, l) ||
        S(No, l) ||
        S(r.config.globalProperties, l)
      )
    }
  },
  Bo = w({}, Vo, {
    get(e, t) {
      if (t !== Symbol.unscopables) return Vo.get(e, t, e)
    },
    has: (e, t) => '_' !== t[0] && !i(t)
  }),
  Do = Vn()
let Ho = 0
let Wo = null
const qo = e => {
  Wo = e
}
function zo(e) {
  return 4 & e.vnode.shapeFlag
}
let Ko = !1
function Go(e, t, n) {
  T(t) ? (e.render = t) : I(t) && (e.setupState = pt(t)), Jo(e)
}
function Jo(e, t) {
  const n = e.type
  e.render ||
    ((e.render = n.render || y),
    e.render._rc && (e.withProxy = new Proxy(e.ctx, Bo))),
    (Wo = e),
    ce(),
    Lo(e, n),
    ae(),
    (Wo = null)
}
function Yo(e, t = Wo) {
  t && (t.effects || (t.effects = [])).push(e)
}
function Xo(e) {
  return (T(e) && e.displayName) || e.name
}
function Zo(e) {
  const t = (function(e) {
    let t, n
    return (
      T(e) ? ((t = e), (n = y)) : ((t = e.get), (n = e.set)),
      new mt(t, n, T(e) || !e.set)
    )
  })(e)
  return Yo(t.effect), t
}
function Qo(e, t, n) {
  const o = arguments.length
  return 2 === o
    ? I(t) && !E(t)
      ? mo(t)
        ? _o(e, null, [t])
        : _o(e, t)
      : _o(e, null, t)
    : (o > 3
        ? (n = Array.prototype.slice.call(arguments, 2))
        : 3 === o && mo(n) && (n = [n]),
      _o(e, t, n))
}
function er(e, t) {
  let n
  if (E(e) || L(e)) {
    n = new Array(e.length)
    for (let o = 0, r = e.length; o < r; o++) n[o] = t(e[o], o)
  } else if ('number' == typeof e) {
    n = new Array(e)
    for (let o = 0; o < e; o++) n[o] = t(o + 1, o)
  } else if (I(e))
    if (e[Symbol.iterator]) n = Array.from(e, t)
    else {
      const o = Object.keys(e)
      n = new Array(o.length)
      for (let r = 0, s = o.length; r < s; r++) {
        const s = o[r]
        n[r] = t(e[s], s, r)
      }
    }
  else n = []
  return n
}
const tr = '3.0.11',
  nr = 'http://www.w3.org/2000/svg',
  or = 'undefined' != typeof document ? document : null
let rr, sr
const lr = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null)
  },
  remove: e => {
    const t = e.parentNode
    t && t.removeChild(e)
  },
  createElement: (e, t, n, o) => {
    const r = t
      ? or.createElementNS(nr, e)
      : or.createElement(e, n ? { is: n } : void 0)
    return (
      'select' === e &&
        o &&
        null != o.multiple &&
        r.setAttribute('multiple', o.multiple),
      r
    )
  },
  createText: e => or.createTextNode(e),
  createComment: e => or.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t
  },
  setElementText: (e, t) => {
    e.textContent = t
  },
  parentNode: e => e.parentNode,
  nextSibling: e => e.nextSibling,
  querySelector: e => or.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, '')
  },
  cloneNode(e) {
    const t = e.cloneNode(!0)
    return '_value' in e && (t._value = e._value), t
  },
  insertStaticContent(e, t, n, o) {
    const r = o
      ? sr || (sr = or.createElementNS(nr, 'svg'))
      : rr || (rr = or.createElement('div'))
    r.innerHTML = e
    const s = r.firstChild
    let l = s,
      i = l
    for (; l; ) (i = l), lr.insert(l, t, n), (l = r.firstChild)
    return [s, i]
  }
}
const ir = /\s*!important$/
function cr(e, t, n) {
  if (E(n)) n.forEach(n => cr(e, t, n))
  else if (t.startsWith('--')) e.setProperty(t, n)
  else {
    const o = (function(e, t) {
      const n = ur[t]
      if (n) return n
      let o = D(t)
      if ('filter' !== o && o in e) return (ur[t] = o)
      o = q(o)
      for (let r = 0; r < ar.length; r++) {
        const n = ar[r] + o
        if (n in e) return (ur[t] = n)
      }
      return t
    })(e, t)
    ir.test(n)
      ? e.setProperty(W(o), n.replace(ir, ''), 'important')
      : (e[o] = n)
  }
}
const ar = ['Webkit', 'Moz', 'ms'],
  ur = {}
const pr = 'http://www.w3.org/1999/xlink'
let fr = Date.now,
  dr = !1
if ('undefined' != typeof window) {
  fr() > document.createEvent('Event').timeStamp &&
    (fr = () => performance.now())
  const e = navigator.userAgent.match(/firefox\/(\d+)/i)
  dr = !!(e && Number(e[1]) <= 53)
}
let hr = 0
const mr = Promise.resolve(),
  vr = () => {
    hr = 0
  }
function gr(e, t, n, o, r = null) {
  const s = e._vei || (e._vei = {}),
    l = s[t]
  if (o && l) l.value = o
  else {
    const [n, i] = (function(e) {
      let t
      if (yr.test(e)) {
        let n
        for (t = {}; (n = e.match(yr)); )
          (e = e.slice(0, e.length - n[0].length)), (t[n[0].toLowerCase()] = !0)
      }
      return [W(e.slice(2)), t]
    })(t)
    if (o) {
      !(function(e, t, n, o) {
        e.addEventListener(t, n, o)
      })(
        e,
        n,
        (s[t] = (function(e, t) {
          const n = e => {
            const o = e.timeStamp || fr()
            ;(dr || o >= n.attached - 1) &&
              gt(
                (function(e, t) {
                  if (E(t)) {
                    const n = e.stopImmediatePropagation
                    return (
                      (e.stopImmediatePropagation = () => {
                        n.call(e), (e._stopped = !0)
                      }),
                      t.map(e => t => !t._stopped && e(t))
                    )
                  }
                  return t
                })(e, n.value),
                t,
                5,
                [e]
              )
          }
          return (
            (n.value = e),
            (n.attached = (() => hr || (mr.then(vr), (hr = fr())))()),
            n
          )
        })(o, r)),
        i
      )
    } else
      l &&
        (!(function(e, t, n, o) {
          e.removeEventListener(t, n, o)
        })(e, n, l, i),
        (s[t] = void 0))
  }
}
const yr = /(?:Once|Passive|Capture)$/
const br = /^on[a-z]/
const _r = w(
  {
    patchProp: (e, t, n, o, r = !1, s, l, i, a) => {
      switch (t) {
        case 'class':
          !(function(e, t, n) {
            if ((null == t && (t = ''), n)) e.setAttribute('class', t)
            else {
              const n = e._vtc
              n && (t = (t ? [t, ...n] : [...n]).join(' ')), (e.className = t)
            }
          })(e, o, r)
          break
        case 'style':
          !(function(e, t, n) {
            const o = e.style
            if (n)
              if (L(n)) {
                if (t !== n) {
                  const t = o.display
                  ;(o.cssText = n), '_vod' in e && (o.display = t)
                }
              } else {
                for (const e in n) cr(o, e, n[e])
                if (t && !L(t)) for (const e in t) null == n[e] && cr(o, e, '')
              }
            else e.removeAttribute('style')
          })(e, n, o)
          break
        default:
          x(t)
            ? k(t) || gr(e, t, 0, o, l)
            : (function(e, t, n, o) {
                if (o)
                  return 'innerHTML' === t || !!(t in e && br.test(t) && T(n))
                if ('spellcheck' === t || 'draggable' === t) return !1
                if ('form' === t) return !1
                if ('list' === t && 'INPUT' === e.tagName) return !1
                if ('type' === t && 'TEXTAREA' === e.tagName) return !1
                if (br.test(t) && L(n)) return !1
                return t in e
              })(e, t, o, r)
              ? (function(e, t, n, o, r, s, l) {
                  if ('innerHTML' === t || 'textContent' === t)
                    return o && l(o, r, s), void (e[t] = null == n ? '' : n)
                  if ('value' !== t || 'PROGRESS' === e.tagName) {
                    if ('' === n || null == n) {
                      const o = typeof e[t]
                      if ('' === n && 'boolean' === o) return void (e[t] = !0)
                      if (null == n && 'string' === o)
                        return (e[t] = ''), void e.removeAttribute(t)
                      if ('number' === o)
                        return (e[t] = 0), void e.removeAttribute(t)
                    }
                    try {
                      e[t] = n
                    } catch (i) {}
                  } else {
                    e._value = n
                    const t = null == n ? '' : n
                    e.value !== t && (e.value = t)
                  }
                })(e, t, o, s, l, i, a)
              : ('true-value' === t
                  ? (e._trueValue = o)
                  : 'false-value' === t && (e._falseValue = o),
                (function(e, t, n, o) {
                  if (o && t.startsWith('xlink:'))
                    null == n
                      ? e.removeAttributeNS(pr, t.slice(6, t.length))
                      : e.setAttributeNS(pr, t, n)
                  else {
                    const o = c(t)
                    null == n || (o && !1 === n)
                      ? e.removeAttribute(t)
                      : e.setAttribute(t, o ? '' : n)
                  }
                })(e, t, o, r))
      }
    },
    forcePatchProp: (e, t) => 'value' === t
  },
  lr
)
let xr,
  kr = !1
const wr = (...e) => {
  const t = ((xr = kr ? xr : Qn(_r)), (kr = !0), xr).createApp(...e),
    { mount: n } = t
  return (
    (t.mount = e => {
      const t = (function(e) {
        if (L(e)) {
          return document.querySelector(e)
        }
        return e
      })(e)
      if (t) return n(t, !0, t instanceof SVGElement)
    }),
    t
  )
}
const Cr = 'undefined' != typeof window
function $r(e, t) {
  const n = (function(e, t) {
    t.sort((e, t) => {
      const n = t.split('/').length - e.split('/').length
      return 0 !== n ? n : t.length - e.length
    })
    for (const n of t) if (e.startsWith(n)) return n
  })(t, Object.keys(e))
  return n ? e[n] : void 0
}
function Sr(e, t) {
  t = (function(e, t) {
    if (!Cr) return t
    const n = e.base,
      o = n.endsWith('/') ? n.slice(0, -1) : n
    return t.slice(o.length)
  })(e, t)
  const n = $r(e.locales || {}, t) || {},
    o = $r((e.themeConfig && e.themeConfig.locales) || {}, t) || {}
  return s(s(s({}, e), n), {
    themeConfig: s(s(s({}, e.themeConfig), o), { locales: {} }),
    lang: o.lang || e.lang,
    locales: {}
  })
}
function Er(e, t) {
  return `${e}${t}`.replace(/\/+/g, '/')
}
function Or(e) {
  let t = e.replace(/\.html$/, '')
  if ((t.endsWith('/') && (t += 'index'), Cr)) {
    const e = '/vue-next-analysis/'
    t = t.slice(e.length).replace(/\//g, '_') + '.md'
    const n = __VP_HASH_MAP__[t.toLowerCase()]
    t = `${e}assets/${t}.${n}.js`
  } else t = `./${t.slice(1).replace(/\//g, '_')}.md.js`
  return t
}
const Rr = Symbol()
function Tr() {
  return (function() {
    const e = Ro(Rr)
    if (!e) throw new Error('useRouter() is called without provider.')
    return e
  })().route
}
function Lr(e, t, n = !1) {
  const o = document.querySelector('.nav-bar').offsetHeight,
    r = e.classList.contains('.header-anchor')
      ? e
      : document.querySelector(decodeURIComponent(t))
  if (r) {
    const e = r.offsetTop - o - 15
    !n || Math.abs(e - window.scrollY) > window.innerHeight
      ? window.scrollTo(0, e)
      : window.scrollTo({ left: 0, top: e, behavior: 'smooth' })
  }
}
const Ar = Kn({
    name: 'VitePressContent',
    setup() {
      const e = Tr()
      return () => (e.component ? Qo(e.component) : null)
    }
  }),
  Ir = Kn({
    setup(e, { slots: t }) {
      const n = it(!1)
      return (
        bn(() => {
          n.value = !0
        }),
        () => (n.value && t.default ? t.default() : null)
      )
    }
  })
const Pr = it(
  ((Fr =
    '{"lang":"en-US","title":"Vue3源码解析","description":"A VitePress site","base":"/vue-next-analysis/","head":[],"themeConfig":{"nav":[{"text":"Github","link":"https://github.com/diy4869/vue-next-analysis"}],"sidebar":[{"text":"☆ 个人介绍","link":"/page/my"},{"text":"一些流程图","children":[{"text":"☆ vue-next 渲染流程","link":"/page/flow"}]},{"text":"准备工作","children":[{"text":"☆ 一些基本知识","link":"/page/base"},{"text":"☆ 如何debug","link":"/page/debug"},{"text":"☆ 位运算","link":"/page/bitOperators"},{"text":"☆ 浏览器渲染过程","link":"/page/browserRender"},{"text":"☆ VNode","link":"/page/vnode"},{"text":"☆ AST 抽象语法树","link":"compiler/ast"},{"text":"Rollup","link":""},{"text":"Typescript","link":""}]},{"text":"初始化渲染","children":[{"text":"☆ createApp","link":"/page/createApp"},{"text":"☆ mount 挂载","link":"/page/mount"},{"text":"☆ render 渲染","link":"/page/render"},{"text":"☆ mountComponent 挂载组件","link":"/page/mountComponent"},{"text":"☆ setupComponent 安装组件","link":"/page/setupComponent"}]},{"text":"compiler 编译","children":[{"text":"☆ baseCompile 基本编译","link":"/compiler/baseCompile"},{"text":"☆ parse 一 初始化解析","link":"/compiler/parse"},{"text":"☆ parse 二 解析子节点","link":"/compiler/parseChildren"},{"text":"☆ parse 三 一些解析工具函数","link":"/compiler/utils"},{"text":"☆ parse 四 解析标签","link":"/compiler/parseTag"},{"text":"☆ parse 五 解析属性","link":"/compiler/parseAttribute"},{"text":"☆ parse 六 解析文本","link":"/compiler/parseText"},{"text":"☆ parse 七 解析元素","link":"/compiler/parseElement"},{"text":"☆ parse 八 结束","link":"/compiler/parseEnd"},{"text":"☆ transform 初始化","link":"/compiler/transform"},{"text":"☆ transform 创建转换器上下文","link":"/compiler/createTransformContext"},{"text":"☆ transform 转换节点","link":"/compiler/traverseNode"},{"text":"☆ transform 一些转换的工具函数","link":"/compiler/transformUtils"},{"text":"☆ transform 转换元素","link":"/compiler/transformElement"},{"text":"☆ transform createVNodeCall","link":"/compiler/createVNodeCall"},{"text":"☆ transform 静态提升","link":"/compiler/staticHoist"},{"text":"☆ transform 创建根节点代码生成","link":"/compiler/createRootCodegen"},{"text":"☆ transform 结束","link":"/compiler/transformEnd"},{"text":"☆ generate","link":"/compiler/generate"}]},{"text":"渲染 render","children":[{"text":"v-show","link":"/directive/v-show"},{"text":"v-on","link":"/directive/v-on"}]},{"text":"指令 directive","children":[{"text":"v-show","link":"/directive/v-show"},{"text":"v-on","link":"/directive/v-on"}]},{"text":"内置组件 components","children":[{"text":"keepAlive","link":"/components/keepAlive"},{"text":"suspense","link":"/components/suspense"},{"text":"teleport","link":"/components/teleport"}]},{"text":"响应式","children":[{"text":"reactive","link":""},{"text":"ref","link":""},{"text":"...","link":""}]},{"text":"服务端渲染","children":[{"text":"serverRender","link":""},{"text":"...","link":""}]}]},"locales":{},"customData":{}}'),
  Ze(JSON.parse(Fr)))
)
var Fr
function Mr() {
  return Pr
}
function jr(e) {
  const t = e || Tr()
  return Zo(() => Sr(Pr.value, t.path))
}
function Ur(e) {
  const t = e || Tr()
  return Zo(() => t.data)
}
function Nr(e, t) {
  const n = Array.from(document.querySelectorAll('meta'))
  let o = !0
  const r = e => {
    o
      ? (o = !1)
      : (n.forEach(e => document.head.removeChild(e)),
        (n.length = 0),
        e &&
          e.length &&
          e.forEach(e => {
            const t = (function([e, t, n]) {
              const o = document.createElement(e)
              for (const r in t) o.setAttribute(r, t[r])
              n && (o.innerHTML = n)
              return o
            })(e)
            document.head.appendChild(t), n.push(t)
          }))
  }
  var s
  On(
    () => {
      const n = e.data,
        o = t.value,
        s = n && n.title,
        l = n && n.description,
        i = n && n.frontmatter.head
      var c
      ;(document.title = (s ? s + ' | ' : '') + o.title),
        r([
          ['meta', { charset: 'utf-8' }],
          [
            'meta',
            { name: 'viewport', content: 'width=device-width,initial-scale=1' }
          ],
          ['meta', { name: 'description', content: l || o.description }],
          ...o.head,
          ...((i &&
            ((c = i),
            c.filter(e => {
              return !(
                'meta' === (t = e)[0] &&
                t[1] &&
                'description' === t[1].name
              )
              var t
            }))) ||
            [])
        ])
    },
    null,
    s
  )
}
function Vr() {
  const e = Ur()
  return Zo(() => e.value.frontmatter)
}
Yt('data-v-35c33521')
const Br = _o('p', { class: 'title' }, 'Debug', -1),
  Dr = { class: 'block' },
  Hr = { class: 'block' },
  Wr = { class: 'block' }
Xt()
Kn({
  expose: [],
  setup(e) {
    const t = it(null),
      n = it(!1)
    return (
      En(n, e => {
        !1 === e && (t.value.scrollTop = 0)
      }),
      (e, o) => (
        po(),
        ho(
          'div',
          {
            class: ['debug', { open: n.value }],
            ref: t,
            onClick: o[1] || (o[1] = e => (n.value = !n.value))
          },
          [
            Br,
            _o('pre', Dr, '$page ' + h(e.$page), 1),
            _o('pre', Hr, '$siteByRoute ' + h(e.$siteByRoute), 1),
            _o('pre', Wr, '$site ' + h(e.$site), 1)
          ],
          2
        )
      )
    )
  }
}).__scopeId = 'data-v-35c33521'
const qr = /#.*$/,
  zr = /(index)?\.(md|html)$/,
  Kr = /\/$/,
  Gr = /^[a-z]+:/i
function Jr(e) {
  return Array.isArray(e)
}
function Yr(e) {
  return Gr.test(e)
}
function Xr(e) {
  return decodeURI(e)
    .replace(qr, '')
    .replace(zr, '')
}
function Zr(e) {
  return /^\//.test(e) ? e : `/${e}`
}
function Qr(e) {
  return e.replace(/(index)?(\.(md|html))?$/, '') || '/'
}
function es(e, t) {
  if (
    (function(e) {
      return !1 === e || 'auto' === e || Jr(e)
    })(e)
  )
    return e
  t = Zr(t)
  for (const n in e) if (t.startsWith(Zr(n))) return e[n]
  return 'auto'
}
function ts(e) {
  return e.reduce(
    (e, t) => (
      t.link && e.push({ text: t.text, link: Qr(t.link) }),
      (function(e) {
        return void 0 !== e.children
      })(t) && (e = [...e, ...ts(t.children)]),
      e
    ),
    []
  )
}
const ns = {},
  os = Zt()(
    (e, t) => (
      po(),
      ho(
        'a',
        {
          class: 'nav-bar-title',
          href: e.$withBase(e.$localePath),
          'aria-label': `${e.$siteByRoute.title}, back to home`
        },
        [
          e.$themeConfig.logo
            ? (po(),
              ho(
                'img',
                {
                  key: 0,
                  class: 'logo',
                  src: e.$withBase(e.$themeConfig.logo),
                  alt: 'Logo'
                },
                null,
                8,
                ['src']
              ))
            : Co('v-if', !0),
          ko(' ' + h(e.$site.title), 1)
        ],
        8,
        ['href', 'aria-label']
      )
    )
  )
;(ns.render = os), (ns.__scopeId = 'data-v-8dbfef3c')
const rs = ['GitHub', 'GitLab', 'Bitbucket'].map(e => [e, new RegExp(e, 'i')])
function ss() {
  const e = jr()
  return Zo(() => {
    const t = e.value.themeConfig,
      n = t.docsRepo || t.repo
    if (!n) return null
    const o = /^https?:/.test((r = n)) ? r : `https://github.com/${r}`
    var r
    return {
      text: (function(e, t) {
        if (t) return t
        const n = e.match(/^https?:\/\/[^/]+/)
        if (!n) return 'Source'
        const o = rs.find(([e, t]) => t.test(n[0]))
        if (o && o[0]) return o[0]
        return 'Source'
      })(o, t.repoLabel),
      link: o
    }
  })
}
function ls(e) {
  const t = Tr(),
    { withBase: n } = (function() {
      const e = Mr()
      return {
        withBase: function(t) {
          return Er(e.value.base, t)
        }
      }
    })(),
    o = Yr(e.value.link)
  return {
    props: Zo(() => {
      const r = is(`/${t.data.relativePath}`)
      let s = !1
      if (e.value.activeMatch) s = new RegExp(e.value.activeMatch).test(r)
      else {
        const t = is(n(e.value.link))
        s = '/' === t ? t === r : r.startsWith(t)
      }
      return {
        class: { active: s, isExternal: o },
        href: o ? e.value.link : n(e.value.link),
        target: e.value.target || o ? '_blank' : null,
        rel: e.value.rel || o ? 'noopener noreferrer' : null,
        'aria-label': e.value.ariaLabel
      }
    }),
    isExternal: o
  }
}
function is(e) {
  return e
    .replace(/#.*$/, '')
    .replace(/\?.*$/, '')
    .replace(/\.(html|md)$/, '')
    .replace(/\/index$/, '/')
}
const cs = {},
  as = {
    class: 'icon outbound',
    xmlns: 'http://www.w3.org/2000/svg',
    'aria-hidden': 'true',
    x: '0px',
    y: '0px',
    viewBox: '0 0 100 100',
    width: '15',
    height: '15'
  },
  us = _o(
    'path',
    {
      fill: 'currentColor',
      d:
        'M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z'
    },
    null,
    -1
  ),
  ps = _o(
    'polygon',
    {
      fill: 'currentColor',
      points:
        '45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9'
    },
    null,
    -1
  )
;(cs.render = function(e, t) {
  return po(), ho('svg', as, [us, ps])
}),
  Yt('data-v-45eb32c6')
const fs = { class: 'nav-link' }
Xt()
var ds = Kn({
  expose: [],
  props: { item: { type: null, required: !0 } },
  setup(e) {
    const t = ft(e),
      { props: n, isExternal: o } = ls(t.item)
    return (t, r) => (
      po(),
      ho('div', fs, [
        _o(
          'a',
          Oo({ class: 'item' }, at(n)),
          [
            ko(h(e.item.text) + ' ', 1),
            at(o) ? (po(), ho(cs, { key: 0 })) : Co('v-if', !0)
          ],
          16
        )
      ])
    )
  }
})
;(ds.__scopeId = 'data-v-45eb32c6'), Yt('data-v-d552fd76')
const hs = { class: 'nav-dropdown-link-item' },
  ms = _o('span', { class: 'arrow' }, null, -1),
  vs = { class: 'text' },
  gs = { class: 'icon' }
Xt()
var ys = Kn({
  expose: [],
  props: { item: { type: null, required: !0 } },
  setup(e) {
    const t = ft(e),
      { props: n, isExternal: o } = ls(t.item)
    return (t, r) => (
      po(),
      ho('div', hs, [
        _o(
          'a',
          Oo({ class: 'item' }, at(n)),
          [
            ms,
            _o('span', vs, h(e.item.text), 1),
            _o('span', gs, [
              at(o) ? (po(), ho(cs, { key: 0 })) : Co('v-if', !0)
            ])
          ],
          16
        )
      ])
    )
  }
})
;(ys.__scopeId = 'data-v-d552fd76'), Yt('data-v-6bbf01f6')
const bs = { class: 'button-text' },
  _s = { class: 'dialog' }
Xt()
var xs = Kn({
  expose: [],
  props: { item: { type: null, required: !0 } },
  setup(e) {
    const t = Tr(),
      n = it(!1)
    function o() {
      n.value = !n.value
    }
    return (
      En(
        () => t.path,
        () => {
          n.value = !1
        }
      ),
      (t, r) => (
        po(),
        ho(
          'div',
          { class: ['nav-dropdown-link', { open: n.value }] },
          [
            _o(
              'button',
              { class: 'button', 'aria-label': e.item.ariaLabel, onClick: o },
              [
                _o('span', bs, h(e.item.text), 1),
                _o(
                  'span',
                  { class: ['button-arrow', n.value ? 'down' : 'right'] },
                  null,
                  2
                )
              ],
              8,
              ['aria-label']
            ),
            _o('ul', _s, [
              (po(!0),
              ho(
                so,
                null,
                er(
                  e.item.items,
                  e => (
                    po(),
                    ho('li', { key: e.text, class: 'dialog-item' }, [
                      _o(ys, { item: e }, null, 8, ['item'])
                    ])
                  )
                ),
                128
              ))
            ])
          ],
          2
        )
      )
    )
  }
})
;(xs.__scopeId = 'data-v-6bbf01f6'), Yt('data-v-38e3b123')
const ks = { key: 0, class: 'nav-links' },
  ws = { key: 1, class: 'item' },
  Cs = { key: 2, class: 'item' }
Xt()
var $s = Kn({
  expose: [],
  setup(e) {
    const t = jr(),
      n = (function() {
        const e = Tr(),
          t = Mr()
        return Zo(() => {
          const n = t.value.themeConfig.locales
          if (!n) return null
          const o = Object.keys(n)
          if (o.length <= 1) return null
          const r = Cr ? t.value.base : '/',
            s = r.endsWith('/') ? r.slice(0, -1) : r,
            l = e.path.slice(s.length),
            i = o.find(e => '/' !== e && l.startsWith(e)),
            c = i ? l.substring(i.length - 1) : l,
            a = o.map(e => {
              const t = e.endsWith('/') ? e.slice(0, -1) : e
              return { text: n[e].label, link: `${t}${c}` }
            }),
            u = i || '/'
          return {
            text: n[u].selectText ? n[u].selectText : 'Languages',
            items: a
          }
        })
      })(),
      o = ss(),
      r = Zo(() => s.value || o.value),
      s = Zo(() => t.value.themeConfig.nav)
    return (e, t) =>
      at(r)
        ? (po(),
          ho('nav', ks, [
            at(s)
              ? (po(!0),
                ho(
                  so,
                  { key: 0 },
                  er(
                    at(s),
                    e => (
                      po(),
                      ho('div', { key: e.text, class: 'item' }, [
                        e.items
                          ? (po(),
                            ho(xs, { key: 0, item: e }, null, 8, ['item']))
                          : (po(),
                            ho(ds, { key: 1, item: e }, null, 8, ['item']))
                      ])
                    )
                  ),
                  128
                ))
              : Co('v-if', !0),
            at(n)
              ? (po(),
                ho('div', ws, [_o(xs, { item: at(n) }, null, 8, ['item'])]))
              : Co('v-if', !0),
            at(o)
              ? (po(),
                ho('div', Cs, [_o(ds, { item: at(o) }, null, 8, ['item'])]))
              : Co('v-if', !0)
          ]))
        : Co('v-if', !0)
  }
})
$s.__scopeId = 'data-v-38e3b123'
const Ss = { emits: ['toggle'] },
  Es = _o(
    'svg',
    {
      class: 'icon',
      xmlns: 'http://www.w3.org/2000/svg',
      'aria-hidden': 'true',
      role: 'img',
      viewBox: '0 0 448 512'
    },
    [
      _o('path', {
        fill: 'currentColor',
        d:
          'M436 124H12c-6.627 0-12-5.373-12-12V80c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12z',
        class: ''
      })
    ],
    -1
  )
;(Ss.render = function(e, t, n, o, r, s) {
  return (
    po(),
    ho(
      'div',
      {
        class: 'sidebar-button',
        onClick: t[1] || (t[1] = t => e.$emit('toggle'))
      },
      [Es]
    )
  )
}),
  Yt('data-v-5df6160f')
const Os = { class: 'nav-bar' },
  Rs = _o('div', { class: 'flex-grow' }, null, -1),
  Ts = { class: 'nav' }
Xt()
var Ls = Kn({
  expose: [],
  emits: ['toggle'],
  setup: e => (e, t) => (
    po(),
    ho('header', Os, [
      _o(Ss, { onToggle: t[1] || (t[1] = t => e.$emit('toggle')) }),
      _o(ns),
      Rs,
      _o('div', Ts, [_o($s)]),
      qt(e.$slots, 'search', {}, void 0, !0)
    ])
  )
})
function As() {
  let e = null,
    t = null
  const n = (function(e, t) {
    let n,
      o = !1
    return () => {
      n && clearTimeout(n),
        o
          ? (n = setTimeout(e, t))
          : (e(),
            (o = !0),
            setTimeout(() => {
              o = !1
            }, t))
    }
  })(o, 300)
  function o() {
    const e = (function(e) {
      return [].slice
        .call(document.querySelectorAll('.header-anchor'))
        .filter(t => e.some(e => e.hash === t.hash))
    })([].slice.call(document.querySelectorAll('.sidebar a.sidebar-link-item')))
    for (let t = 0; t < e.length; t++) {
      const n = e[t],
        o = e[t + 1],
        [s, l] = Ps(t, n, o)
      if (s)
        return history.replaceState(null, document.title, l || ' '), void r(l)
    }
  }
  function r(n) {
    if (
      (s(t), s(e), (t = document.querySelector(`.sidebar a[href="${n}"]`)), !t)
    )
      return
    t.classList.add('active')
    const o = t.closest('.sidebar-links > ul > li')
    o && o !== t.parentElement
      ? ((e = o.querySelector('a')), e && e.classList.add('active'))
      : (e = null)
  }
  function s(e) {
    e && e.classList.remove('active')
  }
  bn(() => {
    o(), window.addEventListener('scroll', n)
  }),
    xn(() => {
      r(decodeURIComponent(location.hash))
    }),
    wn(() => {
      window.removeEventListener('scroll', n)
    })
}
function Is(e) {
  const t = document.querySelector('.nav-bar').offsetHeight
  return e.parentElement.offsetTop - t - 15
}
function Ps(e, t, n) {
  const o = window.scrollY
  return 0 === e && 0 === o
    ? [!0, null]
    : o < Is(t)
      ? [!1, null]
      : !n || o < Is(n)
        ? [!0, decodeURIComponent(t.hash)]
        : [!1, null]
}
function Fs(e, t) {
  const n = []
  if (void 0 === e) return []
  let o
  return (
    e.forEach(({ level: e, title: r, slug: s }) => {
      if (e - 1 > t) return
      const l = { text: r, link: `#${s}` }
      2 === e
        ? ((o = l), n.push(l))
        : o && (o.children || (o.children = [])).push(l)
    }),
    n
  )
}
Ls.__scopeId = 'data-v-5df6160f'
const Ms = e => {
  const t = Tr(),
    n = Mr(),
    o = t.data.headers,
    r = e.item.text,
    s = (function(e, t) {
      if (void 0 === t) return t
      if (t.startsWith('#')) return t
      return (function(e, t) {
        const n = e.endsWith('/'),
          o = t.startsWith('/')
        return n && o ? e.slice(0, -1) + t : n || o ? e + t : `${e}/${t}`
      })(e, t)
    })(n.value.base, e.item.link),
    l = e.item.children,
    i = (function(e, t) {
      return void 0 !== t && Xr(`/${e.data.relativePath}`) === Xr(t)
    })(t, e.item.link),
    c = js(i, l, o)
  return Qo('li', { class: 'sidebar-link' }, [
    Qo(
      s ? 'a' : 'p',
      { class: { 'sidebar-link-item': !0, active: i }, href: s },
      r
    ),
    c
  ])
}
function js(e, t, n) {
  return t && t.length > 0
    ? Qo('ul', { class: 'sidebar-links' }, t.map(e => Qo(Ms, { item: e })))
    : e && n
      ? js(
          !1,
          (function(e) {
            return Us(
              (function(e) {
                let t
                return (
                  (e = e.map(e => Object.assign({}, e))).forEach(e => {
                    2 === e.level
                      ? (t = e)
                      : t && (t.children || (t.children = [])).push(e)
                  }),
                  e.filter(e => 2 === e.level)
                )
              })(e)
            )
          })(n)
        )
      : null
}
function Us(e) {
  return e.map(e => ({
    text: e.title,
    link: `#${e.slug}`,
    children: e.children ? Us(e.children) : void 0
  }))
}
const Ns = { key: 0, class: 'sidebar-links' }
var Vs = Kn({
    expose: [],
    setup(e) {
      const t = (function() {
        const e = Tr(),
          t = jr()
        return (
          As(),
          Zo(() => {
            const n = e.data.headers,
              o = e.data.frontmatter.sidebar,
              r = e.data.frontmatter.sidebarDepth
            if (!1 === o) return []
            if ('auto' === o) return Fs(n, r)
            const s = es(t.value.themeConfig.sidebar, e.data.relativePath)
            return !1 === s ? [] : 'auto' === s ? Fs(n, r) : s
          })
        )
      })()
      return (e, n) =>
        at(t).length > 0
          ? (po(),
            ho('ul', Ns, [
              (po(!0),
              ho(
                so,
                null,
                er(
                  at(t),
                  e => (
                    po(),
                    ho(at(Ms), { key: e.text, item: e }, null, 8, ['item'])
                  )
                ),
                128
              ))
            ]))
          : Co('v-if', !0)
    }
  }),
  Bs = Kn({
    expose: [],
    props: { open: { type: Boolean, required: !0 } },
    setup: e => (t, n) => (
      po(),
      ho(
        'aside',
        { class: ['sidebar', { open: e.open }] },
        [
          _o($s, { class: 'nav' }),
          qt(t.$slots, 'sidebar-top', {}, void 0, !0),
          _o(Vs),
          qt(t.$slots, 'sidebar-bottom', {}, void 0, !0)
        ],
        2
      )
    )
  })
Bs.__scopeId = 'data-v-58e261f2'
const Ds = /bitbucket.org/
function Hs() {
  const e = jr(),
    t = Ur()
  return {
    url: Zo(() => {
      const n =
        null == t.value.frontmatter.editLink
          ? e.value.themeConfig.editLinks
          : t.value.frontmatter.editLink
      const {
          repo: o,
          docsDir: r = '',
          docsBranch: s = 'master',
          docsRepo: l = o
        } = e.value.themeConfig,
        { relativePath: i } = t.value
      return n && i && o
        ? (function(e, t, n, o, r) {
            return Ds.test(e)
              ? (function(e, t, n, o, r) {
                  return (
                    (Yr(t) ? t : e).replace(Kr, '') +
                    `/src/${o}/` +
                    (n ? n.replace(Kr, '') + '/' : '') +
                    r +
                    `?mode=edit&spa=0&at=${o}&fileviewer=file-view-default`
                  )
                })(e, t, n, o, r)
              : (function(e, t, n, o, r) {
                  return (
                    (Yr(t) ? t : `https://github.com/${t}`).replace(Kr, '') +
                    `/edit/${o}/` +
                    (n ? n.replace(Kr, '') + '/' : '') +
                    r
                  )
                })(0, t, n, o, r)
          })(o, l, r, s, i)
        : null
    }),
    text: Zo(() => e.value.themeConfig.editLinkText || 'Edit this page')
  }
}
Yt('data-v-3ae295f1')
const Ws = { class: 'edit-link' }
Xt()
var qs = Kn({
  expose: [],
  setup(e) {
    const { url: t, text: n } = Hs()
    return (e, o) => (
      po(),
      ho('div', Ws, [
        at(t)
          ? (po(),
            ho(
              'a',
              {
                key: 0,
                class: 'link',
                href: at(t),
                target: '_blank',
                rel: 'noopener noreferrer'
              },
              [ko(h(at(n)) + ' ', 1), _o(cs, { class: 'icon' })],
              8,
              ['href']
            ))
          : Co('v-if', !0)
      ])
    )
  }
})
;(qs.__scopeId = 'data-v-3ae295f1'), Yt('data-v-52854a16')
const zs = { key: 0, class: 'last-updated' },
  Ks = { class: 'prefix' },
  Gs = { class: 'datetime' }
Xt()
var Js = Kn({
  expose: [],
  setup(e) {
    const t = jr(),
      n = Ur(),
      o = Zo(() => {
        const e = t.value.themeConfig.lastUpdated
        return void 0 !== e && !1 !== e
      }),
      r = Zo(() => {
        const e = t.value.themeConfig.lastUpdated
        return !0 === e ? 'Last Updated' : e
      }),
      s = it('')
    return (
      bn(() => {
        s.value = new Date(n.value.lastUpdated).toLocaleString('en-US')
      }),
      (e, t) =>
        at(o)
          ? (po(),
            ho('p', zs, [
              _o('span', Ks, h(at(r)) + ':', 1),
              _o('span', Gs, h(s.value), 1)
            ]))
          : Co('v-if', !0)
    )
  }
})
;(Js.__scopeId = 'data-v-52854a16'), Yt('data-v-5a019cc9')
const Ys = { class: 'page-footer' },
  Xs = { class: 'edit' },
  Zs = { class: 'updated' }
Xt()
var Qs = Kn({
  expose: [],
  setup: e => (e, t) => (
    po(), ho('footer', Ys, [_o('div', Xs, [_o(qs)]), _o('div', Zs, [_o(Js)])])
  )
})
function el() {
  const e = jr(),
    t = Ur(),
    n = Zo(() => Qr(Zr(t.value.relativePath))),
    o = Zo(() => {
      const t = es(e.value.themeConfig.sidebar, n.value)
      return Jr(t) ? ts(t) : []
    }),
    r = Zo(() => o.value.findIndex(e => e.link === n.value)),
    s = Zo(() => {
      if (
        !1 !== e.value.themeConfig.nextLinks &&
        r.value > -1 &&
        r.value < o.value.length - 1
      )
        return o.value[r.value + 1]
    }),
    l = Zo(() => {
      if (!1 !== e.value.themeConfig.prevLinks && r.value > 0)
        return o.value[r.value - 1]
    }),
    i = Zo(() => !!s.value || !!l.value)
  return { next: s, prev: l, hasLinks: i }
}
Qs.__scopeId = 'data-v-5a019cc9'
const tl = {},
  nl = { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24' },
  ol = _o(
    'path',
    {
      d:
        'M19,11H7.4l5.3-5.3c0.4-0.4,0.4-1,0-1.4s-1-0.4-1.4,0l-7,7c-0.1,0.1-0.2,0.2-0.2,0.3c-0.1,0.2-0.1,0.5,0,0.8c0.1,0.1,0.1,0.2,0.2,0.3l7,7c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L7.4,13H19c0.6,0,1-0.4,1-1S19.6,11,19,11z'
    },
    null,
    -1
  )
tl.render = function(e, t) {
  return po(), ho('svg', nl, [ol])
}
const rl = {},
  sl = { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24' },
  ll = _o(
    'path',
    {
      d:
        'M19.9,12.4c0.1-0.2,0.1-0.5,0-0.8c-0.1-0.1-0.1-0.2-0.2-0.3l-7-7c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l5.3,5.3H5c-0.6,0-1,0.4-1,1s0.4,1,1,1h11.6l-5.3,5.3c-0.4,0.4-0.4,1,0,1.4c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l7-7C19.8,12.6,19.9,12.5,19.9,12.4z'
    },
    null,
    -1
  )
;(rl.render = function(e, t) {
  return po(), ho('svg', sl, [ll])
}),
  Yt('data-v-6683615c')
const il = { key: 0, class: 'next-and-prev-link' },
  cl = { class: 'container' },
  al = { class: 'prev' },
  ul = { class: 'text' },
  pl = { class: 'next' },
  fl = { class: 'text' }
Xt()
var dl = Kn({
  expose: [],
  setup(e) {
    const { hasLinks: t, prev: n, next: o } = el()
    return (e, r) =>
      at(t)
        ? (po(),
          ho('div', il, [
            _o('div', cl, [
              _o('div', al, [
                at(n)
                  ? (po(),
                    ho(
                      'a',
                      { key: 0, class: 'link', href: e.$withBase(at(n).link) },
                      [
                        _o(tl, { class: 'icon icon-prev' }),
                        _o('span', ul, h(at(n).text), 1)
                      ],
                      8,
                      ['href']
                    ))
                  : Co('v-if', !0)
              ]),
              _o('div', pl, [
                at(o)
                  ? (po(),
                    ho(
                      'a',
                      { key: 0, class: 'link', href: e.$withBase(at(o).link) },
                      [
                        _o('span', fl, h(at(o).text), 1),
                        _o(rl, { class: 'icon icon-next' })
                      ],
                      8,
                      ['href']
                    ))
                  : Co('v-if', !0)
              ])
            ])
          ]))
        : Co('v-if', !0)
  }
})
;(dl.__scopeId = 'data-v-6683615c'), Yt('data-v-d36a7fda')
const hl = { class: 'page' },
  ml = { class: 'container' },
  vl = { class: 'content' }
Xt()
var gl = Kn({
  expose: [],
  setup: e => (e, t) => {
    const n = no('Content')
    return (
      po(),
      ho('main', hl, [
        _o('div', ml, [
          qt(e.$slots, 'top', {}, void 0, !0),
          _o('div', vl, [_o(n)]),
          _o(Qs),
          _o(dl),
          qt(e.$slots, 'bottom', {}, void 0, !0)
        ])
      ])
    )
  }
})
gl.__scopeId = 'data-v-d36a7fda'
const yl = { key: 0, id: 'ads-container' }
var bl = Kn({
  expose: [],
  setup(e) {
    const t = Gn(() => import('./Home.93893f19.js')),
      n = () => null,
      o = n,
      r = n,
      s = n,
      l = Tr(),
      i = Mr(),
      c = jr(),
      a = Zo(() => i.value.themeConfig),
      u = Ur(),
      p = Zo(() => !!l.data.frontmatter.customLayout),
      f = Zo(() => !!l.data.frontmatter.home),
      d = Zo(() => {
        const { themeConfig: e } = c.value,
          { frontmatter: t } = l.data
        return (
          !1 !== t.navbar &&
          !1 !== e.navbar &&
          (i.value.title || e.logo || e.repo || e.nav)
        )
      }),
      h = it(!1),
      m = Zo(() => {
        const { frontmatter: e } = l.data
        if (e.home || !1 === e.sidebar) return !1
        const { themeConfig: t } = c.value
        return !(Jr((n = es(t.sidebar, l.data.relativePath)))
          ? 0 === n.length
          : !n)
        var n
      }),
      v = e => {
        h.value = 'boolean' == typeof e ? e : !h.value
      },
      g = v.bind(null, !1)
    En(l, g)
    const y = Zo(() => [
      { 'no-navbar': !d.value, 'sidebar-open': h.value, 'no-sidebar': !m.value }
    ])
    return (e, n) => {
      const l = no('Content'),
        i = no('Debug')
      return (
        po(),
        ho(
          so,
          null,
          [
            _o(
              'div',
              { class: ['theme', at(y)] },
              [
                at(d)
                  ? (po(),
                    ho(
                      Ls,
                      { key: 0, onToggle: v },
                      {
                        search: Qt(() => [
                          qt(e.$slots, 'navbar-search', {}, () => [
                            at(a).algolia
                              ? (po(),
                                ho(
                                  at(s),
                                  {
                                    options: at(a).algolia,
                                    multilang: !!at(a).locales,
                                    key: at(c).lang
                                  },
                                  null,
                                  8,
                                  ['options', 'multilang']
                                ))
                              : Co('v-if', !0)
                          ])
                        ]),
                        _: 1
                      }
                    ))
                  : Co('v-if', !0),
                _o(
                  Bs,
                  { open: h.value },
                  {
                    'sidebar-top': Qt(() => [qt(e.$slots, 'sidebar-top')]),
                    'sidebar-bottom': Qt(() => [
                      qt(e.$slots, 'sidebar-bottom')
                    ]),
                    _: 1
                  },
                  8,
                  ['open']
                ),
                Co(' TODO: make this button accessible '),
                _o('div', {
                  class: 'sidebar-mask',
                  onClick: n[1] || (n[1] = e => v(!1))
                }),
                at(p)
                  ? (po(), ho(l, { key: 1 }))
                  : at(f)
                    ? (po(),
                      ho(
                        at(t),
                        { key: 2 },
                        {
                          hero: Qt(() => [qt(e.$slots, 'home-hero')]),
                          features: Qt(() => [qt(e.$slots, 'home-features')]),
                          footer: Qt(() => [qt(e.$slots, 'home-footer')]),
                          _: 1
                        }
                      ))
                    : (po(),
                      ho(
                        gl,
                        { key: 3 },
                        {
                          top: Qt(() => [
                            qt(e.$slots, 'page-top-ads', {}, () => [
                              at(a).carbonAds && at(a).carbonAds.carbon
                                ? (po(),
                                  ho('div', yl, [
                                    _o(
                                      at(o),
                                      {
                                        key: 'carbon' + at(u).relativePath,
                                        code: at(a).carbonAds.carbon,
                                        placement: at(a).carbonAds.placement
                                      },
                                      null,
                                      8,
                                      ['code', 'placement']
                                    )
                                  ]))
                                : Co('v-if', !0)
                            ]),
                            qt(e.$slots, 'page-top')
                          ]),
                          bottom: Qt(() => [
                            qt(e.$slots, 'page-bottom'),
                            qt(e.$slots, 'page-bottom-ads', {}, () => [
                              at(a).carbonAds && at(a).carbonAds.custom
                                ? (po(),
                                  ho(
                                    at(r),
                                    {
                                      key: 'custom' + at(u).relativePath,
                                      code: at(a).carbonAds.custom,
                                      placement: at(a).carbonAds.placement
                                    },
                                    null,
                                    8,
                                    ['code', 'placement']
                                  ))
                                : Co('v-if', !0)
                            ])
                          ]),
                          _: 1
                        }
                      ))
              ],
              2
            ),
            _o(i)
          ],
          64
        )
      )
    }
  }
})
const _l = { class: 'theme' },
  xl = _o('h1', null, '404', -1)
const kl = {
    Layout: bl,
    NotFound: Kn({
      expose: [],
      setup(e) {
        const t = [
          "There's nothing here.",
          'How did we get here?',
          "That's a Four-Oh-Four.",
          "Looks like we've got some broken links."
        ]
        return (e, n) => (
          po(),
          ho('div', _l, [
            xl,
            _o(
              'blockquote',
              null,
              h(t[Math.floor(Math.random() * t.length)]),
              1
            ),
            _o(
              'a',
              { href: e.$site.base, 'aria-label': 'go to home' },
              'Take me home.',
              8,
              ['href']
            )
          ])
        )
      }
    })
  },
  wl = new Set(),
  Cl = () => document.createElement('link')
let $l
const Sl =
  Cr &&
  ($l = Cl()) &&
  $l.relList &&
  $l.relList.supports &&
  $l.relList.supports('prefetch')
    ? e => {
        const t = Cl()
        ;(t.rel = 'prefetch'), (t.href = e), document.head.appendChild(t)
      }
    : e => {
        const t = new XMLHttpRequest()
        t.open('GET', e, (t.withCredentials = !0)), t.send()
      }
const El = kl.NotFound || (() => '404 Not Found'),
  Ol = {
    name: 'VitePressApp',
    setup() {
      const e = jr()
      return (
        bn(() => {
          En(
            () => e.value.lang,
            e => {
              document.documentElement.lang = e
            },
            { immediate: !0 }
          )
        }),
        (function() {
          if (!Cr) return
          if (!window.IntersectionObserver) return
          let e
          if (
            (e = navigator.connection) &&
            (e.saveData || /2g/.test(e.effectiveType))
          )
            return
          const t = window.requestIdleCallback || setTimeout
          let n = null
          const o = () => {
            n && n.disconnect(),
              (n = new IntersectionObserver(e => {
                e.forEach(e => {
                  if (e.isIntersecting) {
                    const t = e.target
                    n.unobserve(t)
                    const { pathname: o } = t
                    if (!wl.has(o)) {
                      wl.add(o)
                      const e = Or(o)
                      Sl(e)
                    }
                  }
                })
              })),
              t(() => {
                document.querySelectorAll('#app a').forEach(e => {
                  const { target: t, hostname: o, pathname: r } = e,
                    s = r.match(/\.\w+$/)
                  ;(s && '.html' !== s[0]) ||
                    ('_blank' !== t &&
                      o === location.hostname &&
                      (r !== location.pathname ? n.observe(e) : wl.add(r)))
                })
              })
          }
          bn(o)
          const r = Tr()
          En(() => r.path, o),
            wn(() => {
              n && n.disconnect()
            })
        })(),
        () => Qo(kl.Layout)
      )
    }
  }
function Rl() {
  const e = (function() {
      let e,
        t = Cr
      return (function(e, t) {
        const n = Xe({ path: '/', component: null, data: null })
        function o(e = Cr ? location.href : '/') {
          const t = new URL(e, 'http://a.com')
          return (
            t.pathname.endsWith('/') ||
              t.pathname.endsWith('.html') ||
              ((t.pathname += '.html'), (e = t.pathname + t.search + t.hash)),
            Cr &&
              (history.replaceState(
                { scrollPosition: window.scrollY },
                document.title
              ),
              history.pushState(null, '', e)),
            s(e)
          )
        }
        let r = null
        async function s(o, s = 0) {
          const l = new URL(o, 'http://a.com'),
            i = (r = l.pathname)
          try {
            let t = e(i)
            if (
              ('then' in t && 'function' == typeof t.then && (t = await t),
              r === i)
            ) {
              r = null
              const { default: e, __pageData: o } = t
              if (!e) throw new Error(`Invalid route component: ${e}`)
              ;(n.path = i),
                (n.component = rt(e)),
                (n.data = Ze(JSON.parse(o))),
                Cr &&
                  At(() => {
                    if (l.hash && !s) {
                      const e = document.querySelector(
                        decodeURIComponent(l.hash)
                      )
                      if (e) return void Lr(e, l.hash)
                    }
                    window.scrollTo(0, s)
                  })
            }
          } catch (c) {
            c.message.match(/fetch/) || console.error(c),
              r === i &&
                ((r = null), (n.path = i), (n.component = t ? rt(t) : null))
          }
        }
        return (
          Cr &&
            (window.addEventListener(
              'click',
              e => {
                const t = e.target.closest('a')
                if (t) {
                  const {
                      href: n,
                      protocol: r,
                      hostname: s,
                      pathname: l,
                      hash: i,
                      target: c
                    } = t,
                    a = window.location,
                    u = l.match(/\.\w+$/)
                  e.ctrlKey ||
                    e.shiftKey ||
                    e.altKey ||
                    e.metaKey ||
                    '_blank' === c ||
                    r !== a.protocol ||
                    s !== a.hostname ||
                    (u && '.html' !== u[0]) ||
                    (e.preventDefault(),
                    l === a.pathname
                      ? i &&
                        i !== a.hash &&
                        (history.pushState(null, '', i),
                        Lr(t, i, t.classList.contains('header-anchor')))
                      : o(n))
                }
              },
              { capture: !0 }
            ),
            window.addEventListener('popstate', e => {
              s(location.href, (e.state && e.state.scrollPosition) || 0)
            }),
            window.addEventListener('hashchange', e => {
              e.preventDefault()
            })),
          { route: n, go: o }
        )
      })(n => {
        let o = Or(n)
        return (
          t && (e = o),
          (t || e === o) && (o = o.replace(/\.js$/, '.lean.js')),
          Cr ? ((t = !1), import(o)) : require(o)
        )
      }, El)
    })(),
    t = wr(Ol)
  t.provide(Rr, e)
  const n = jr(e.route),
    o = Ur(e.route)
  return (
    Cr && Nr(e.route, n),
    (function(e, t, n, o) {
      Object.defineProperties(e.config.globalProperties, {
        $site: { get: () => t.value },
        $siteByRoute: { get: () => n.value },
        $themeConfig: { get: () => n.value.themeConfig },
        $page: { get: () => o.value },
        $frontmatter: { get: () => o.value.frontmatter },
        $lang: { get: () => n.value.lang },
        $localePath: {
          get() {
            const { locales: e } = t.value,
              { lang: o } = n.value,
              r = Object.keys(e).find(t => e[t].lang === o)
            return (e && r) || '/'
          }
        },
        $title: {
          get: () =>
            o.value.title
              ? o.value.title + ' | ' + n.value.title
              : n.value.title
        },
        $description: { get: () => o.value.description || n.value.description },
        $withBase: { value: e => Er(t.value.base, e) }
      })
    })(t, Pr, n, o),
    (function(e) {
      e.component('Content', Ar),
        e.component('ClientOnly', Ir),
        e.component('Debug', () => null)
    })(t),
    kl.enhanceApp && kl.enhanceApp({ app: t, router: e, siteData: Pr }),
    { app: t, router: e }
  )
}
if (Cr) {
  const { app: e, router: t } = Rl()
  t.go().then(() => {
    e.mount('#app')
  })
}
export {
  so as F,
  ds as _,
  wo as a,
  _o as b,
  ho as c,
  Rl as createApp,
  ko as d,
  Xt as e,
  Co as f,
  Kn as g,
  Vr as h,
  Zo as i,
  at as j,
  er as k,
  qt as l,
  po as o,
  Yt as p,
  no as r,
  h as t,
  jr as u,
  Zt as w
}
