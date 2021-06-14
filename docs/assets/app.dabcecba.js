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
        r = a(I(o) ? d(o) : o)
      if (r) for (const e in r) t[e] = r[e]
    }
    return t
  }
  if (T(e)) return e
}
const u = /;(?![^(]*\))/g,
  f = /:(.+)/
function d(e) {
  const t = {}
  return (
    e.split(u).forEach(e => {
      if (e) {
        const n = e.split(f)
        n.length > 1 && (t[n[0].trim()] = n[1].trim())
      }
    }),
    t
  )
}
function p(e) {
  let t = ''
  if (I(e)) t = e
  else if (E(e))
    for (let n = 0; n < e.length; n++) {
      const o = p(e[n])
      o && (t += o + ' ')
    }
  else if (T(e)) for (const n in e) e[n] && (t += n + ' ')
  return t.trim()
}
const h = e => (null == e ? '' : T(e) ? JSON.stringify(e, v, 2) : String(e)),
  v = (e, t) =>
    O(t)
      ? {
          [`Map(${t.size})`]: [...t.entries()].reduce(
            (e, [t, n]) => ((e[`${t} =>`] = n), e),
            {}
          )
        }
      : R(t)
        ? { [`Set(${t.size})`]: [...t.values()] }
        : !T(t) || E(t) || j(t)
          ? t
          : String(t),
  m = {},
  g = [],
  y = () => {},
  b = () => !1,
  _ = /^on[^a-z]/,
  x = e => _.test(e),
  w = e => e.startsWith('onUpdate:'),
  k = Object.assign,
  C = (e, t) => {
    const n = e.indexOf(t)
    n > -1 && e.splice(n, 1)
  },
  $ = Object.prototype.hasOwnProperty,
  S = (e, t) => $.call(e, t),
  E = Array.isArray,
  O = e => '[object Map]' === M(e),
  R = e => '[object Set]' === M(e),
  L = e => 'function' == typeof e,
  I = e => 'string' == typeof e,
  P = e => 'symbol' == typeof e,
  T = e => null !== e && 'object' == typeof e,
  A = e => T(e) && L(e.then) && L(e.catch),
  F = Object.prototype.toString,
  M = e => F.call(e),
  j = e => '[object Object]' === M(e),
  U = e => I(e) && 'NaN' !== e && '-' !== e[0] && '' + parseInt(e, 10) === e,
  N = l(
    ',key,ref,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted'
  ),
  B = e => {
    const t = Object.create(null)
    return n => t[n] || (t[n] = e(n))
  },
  V = /-(\w)/g,
  D = B(e => e.replace(V, (e, t) => (t ? t.toUpperCase() : ''))),
  W = /\B([A-Z])/g,
  H = B(e => e.replace(W, '-$1').toLowerCase()),
  q = B(e => e.charAt(0).toUpperCase() + e.slice(1)),
  z = B(e => (e ? `on${q(e)}` : '')),
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
function ne(e, t = m) {
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
function fe(e, t, n, o, r, s) {
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
const de = l('__proto__,__v_isRef,__isVue'),
  pe = new Set(
    Object.getOwnPropertyNames(Symbol)
      .map(e => Symbol[e])
      .filter(P)
  ),
  he = be(),
  ve = be(!1, !0),
  me = be(!0),
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
    if (P(o) ? pe.has(o) : de(o)) return l
    if ((e || ue(n, 0, o), t)) return l
    if (lt(l)) {
      return !s || !U(o) ? l.value : l
    }
    return T(l) ? (e ? Ze(l) : Xe(l)) : l
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
      t === ot(r) && (l ? K(o, s) && fe(t, 'set', n, o) : fe(t, 'add', n, o)), i
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
      return o && n && fe(e, 'delete', t, void 0), o
    },
    has: function(e, t) {
      const n = Reflect.has(e, t)
      return (P(t) && pe.has(t)) || ue(e, 0, t), n
    },
    ownKeys: function(e) {
      return ue(e, 0, E(e) ? 'length' : ee), Reflect.ownKeys(e)
    }
  },
  we = { get: me, set: (e, t) => !0, deleteProperty: (e, t) => !0 },
  ke = k({}, xe, { get: ve, set: _e(!0) })
k({}, we, { get: ge })
const Ce = e => (T(e) ? Xe(e) : e),
  $e = e => (T(e) ? Ze(e) : e),
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
function Le(e, t = !1) {
  return (e = e.__v_raw), !t && ue(ot(e), 0, ee), Reflect.get(e, 'size', e)
}
function Ie(e) {
  e = ot(e)
  const t = ot(this)
  return Ee(t).has.call(t, e) || (t.add(e), fe(t, 'add', e, e)), this
}
function Pe(e, t) {
  t = ot(t)
  const n = ot(this),
    { has: o, get: r } = Ee(n)
  let s = o.call(n, e)
  s || ((e = ot(e)), (s = o.call(n, e)))
  const l = r.call(n, e)
  return (
    n.set(e, t), s ? K(t, l) && fe(n, 'set', e, t) : fe(n, 'add', e, t), this
  )
}
function Te(e) {
  const t = ot(this),
    { has: n, get: o } = Ee(t)
  let r = n.call(t, e)
  r || ((e = ot(e)), (r = n.call(t, e))), o && o.call(t, e)
  const s = t.delete(e)
  return r && fe(t, 'delete', e, void 0), s
}
function Ae() {
  const e = ot(this),
    t = 0 !== e.size,
    n = e.clear()
  return t && fe(e, 'clear', void 0, void 0), n
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
      return Le(this)
    },
    has: Re,
    add: Ie,
    set: Pe,
    delete: Te,
    clear: Ae,
    forEach: Fe(!1, !1)
  },
  Ne = {
    get(e) {
      return Oe(this, e, !1, !0)
    },
    get size() {
      return Le(this)
    },
    has: Re,
    add: Ie,
    set: Pe,
    delete: Te,
    clear: Ae,
    forEach: Fe(!1, !0)
  },
  Be = {
    get(e) {
      return Oe(this, e, !0)
    },
    get size() {
      return Le(this, !0)
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
  Ve = {
    get(e) {
      return Oe(this, e, !0, !0)
    },
    get size() {
      return Le(this, !0)
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
  const n = t ? (e ? Ve : Ne) : e ? Be : Ue
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
    (Be[e] = Me(e, !0, !1)),
    (Ne[e] = Me(e, !1, !0)),
    (Ve[e] = Me(e, !0, !0))
})
const We = { get: De(!1, !1) },
  He = { get: De(!1, !0) },
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
  return e && e.__v_isReadonly ? e : Qe(e, !1, xe, We, ze)
}
function Ze(e) {
  return Qe(e, !0, we, qe, Ge)
}
function Qe(e, t, n, o, r) {
  if (!T(e)) return e
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
const st = e => (T(e) ? Xe(e) : e)
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
      fe(ot(this), 'set', 'value', e))
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
function ft(e) {
  return et(e) ? e : new Proxy(e, ut)
}
function dt(e) {
  const t = E(e) ? new Array(e.length) : {}
  for (const n in e) t[n] = ht(e, n)
  return t
}
class pt {
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
  return lt(e[t]) ? e[t] : new pt(e, t)
}
class vt {
  constructor(e, t, n) {
    ;(this._setter = t),
      (this._dirty = !0),
      (this.__v_isRef = !0),
      (this.effect = ne(e, {
        lazy: !0,
        scheduler: () => {
          this._dirty || ((this._dirty = !0), fe(ot(this), 'set', 'value'))
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
function mt(e, t, n, o) {
  let r
  try {
    r = o ? e(...o) : e()
  } catch (s) {
    yt(s, t, n)
  }
  return r
}
function gt(e, t, n, o) {
  if (L(e)) {
    const r = mt(e, t, n, o)
    return (
      r &&
        A(r) &&
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
    if (l) return void mt(l, null, 10, [e, r, s])
  }
  !(function(e, t, n, o = !0) {
    console.error(e)
  })(e, 0, 0, o)
}
let bt = !1,
  _t = !1
const xt = []
let wt = 0
const kt = []
let Ct = null,
  $t = 0
const St = []
let Et = null,
  Ot = 0
const Rt = Promise.resolve()
let Lt = null,
  It = null
function Pt(e) {
  const t = Lt || Rt
  return e ? t.then(this ? e.bind(this) : e) : t
}
function Tt(e) {
  if (
    !(
      (xt.length && xt.includes(e, bt && e.allowRecurse ? wt + 1 : wt)) ||
      e === It
    )
  ) {
    const t = (function(e) {
      let t = wt + 1,
        n = xt.length
      const o = Ut(e)
      for (; t < n; ) {
        const e = (t + n) >>> 1
        Ut(xt[e]) < o ? (t = e + 1) : (n = e)
      }
      return t
    })(e)
    t > -1 ? xt.splice(t, 0, e) : xt.push(e), At()
  }
}
function At() {
  bt || _t || ((_t = !0), (Lt = Rt.then(Nt)))
}
function Ft(e, t, n, o) {
  E(e)
    ? n.push(...e)
    : (t && t.includes(e, e.allowRecurse ? o + 1 : o)) || n.push(e),
    At()
}
function Mt(e, t = null) {
  if (kt.length) {
    for (
      It = t, Ct = [...new Set(kt)], kt.length = 0, $t = 0;
      $t < Ct.length;
      $t++
    )
      Ct[$t]()
    ;(Ct = null), ($t = 0), (It = null), Mt(e, t)
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
    for (wt = 0; wt < xt.length; wt++) {
      const e = xt[wt]
      e && mt(e, null, 14)
    }
  } finally {
    ;(wt = 0),
      (xt.length = 0),
      jt(),
      (bt = !1),
      (Lt = null),
      (xt.length || St.length) && Nt(e)
  }
}
function Bt(e, t, ...n) {
  const o = e.vnode.props || m
  let r = n
  const s = t.startsWith('update:'),
    l = s && t.slice(7)
  if (l && l in o) {
    const e = `${'modelValue' === l ? 'model' : l}Modifiers`,
      { number: t, trim: s } = o[e] || m
    s ? (r = n.map(e => e.trim())) : t && (r = n.map(Y))
  }
  let i,
    c = o[(i = z(t))] || o[(i = z(D(t)))]
  !c && s && (c = o[(i = z(H(t)))]), c && gt(c, e, 6, r)
  const a = o[i + 'Once']
  if (a) {
    if (e.emitted) {
      if (e.emitted[i]) return
    } else (e.emitted = {})[i] = !0
    gt(a, e, 6, r)
  }
}
function Vt(e, t, n = !1) {
  if (!t.deopt && void 0 !== e.__emits) return e.__emits
  const o = e.emits
  let r = {},
    s = !1
  if (!L(e)) {
    const o = e => {
      const n = Vt(e, t, !0)
      n && ((s = !0), k(r, n))
    }
    !n && t.mixins.length && t.mixins.forEach(o),
      e.extends && o(e.extends),
      e.mixins && e.mixins.forEach(o)
  }
  return o || s
    ? (E(o) ? o.forEach(e => (r[e] = null)) : k(r, o), (e.__emits = r))
    : (e.__emits = null)
}
function Dt(e, t) {
  return (
    !(!e || !x(t)) &&
    ((t = t.slice(2).replace(/Once$/, '')),
    S(e, t[0].toLowerCase() + t.slice(1)) || S(e, H(t)) || S(e, t))
  )
}
let Wt = 0
const Ht = e => (Wt += e)
function qt(e, t, n = {}, o, r) {
  let s = e[t]
  Wt++, fo()
  const l = s && zt(s(n)),
    i = ho(
      so,
      { key: n.key || `_${t}` },
      l || (o ? o() : []),
      l && 1 === e._ ? 64 : -2
    )
  return !r && i.scopeId && (i.slotScopeIds = [i.scopeId + '-s']), Wt--, i
}
function zt(e) {
  return e.some(
    e => !vo(e) || (e.type !== io && !(e.type === so && !zt(e.children)))
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
    Wt || fo(!0)
    const o = Jt(t),
      r = e(...n)
    return Jt(o), Wt || po(), r
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
    renderCache: f,
    data: d,
    setupState: p,
    ctx: h
  } = e
  let v
  const m = Jt(e)
  try {
    let e
    if (4 & n.shapeFlag) {
      const t = r || o
      ;(v = $o(u.call(t, t, f, s, p, d, h))), (e = c)
    } else {
      const n = t
      0,
        (v = $o(
          n.length > 1 ? n(s, { attrs: c, slots: i, emit: a }) : n(s, null)
        )),
        (e = t.props ? c : nn(c))
    }
    let m = v
    if (!1 !== t.inheritAttrs && e) {
      const t = Object.keys(e),
        { shapeFlag: n } = m
      t.length &&
        (1 & n || 6 & n) &&
        (l && t.some(w) && (e = on(e, l)), (m = xo(m, e)))
    }
    n.dirs && (m.dirs = m.dirs ? m.dirs.concat(n.dirs) : n.dirs),
      n.transition && (m.transition = n.transition),
      (v = m)
  } catch (g) {
    ;(ao.length = 0), yt(g, e, 1), (v = _o(io))
  }
  return Jt(m), v
}
function tn(e) {
  let t
  for (let n = 0; n < e.length; n++) {
    const o = e[n]
    if (!vo(o)) return
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
    for (const o in e) (w(o) && o.slice(9) in t) || (n[o] = e[o])
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
  if ((L(e) && (e = e()), E(e))) {
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
      ? (e.props = o ? r : Qe(r, !1, ke, He, Ke))
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
      if (s.type !== Function && L(e)) {
        const { propsDefaults: s } = r
        n in s ? (o = s[n]) : (qo(r), (o = s[n] = e(t)), qo(null))
      } else o = e
    }
    s[0] &&
      (S(t, n) || e ? !s[1] || ('' !== o && o !== H(n)) || (o = !0) : (o = !1))
  }
  return o
}
function fn(e, t, n = !1) {
  if (!t.deopt && e.__props) return e.__props
  const o = e.props,
    r = {},
    s = []
  let l = !1
  if (!L(e)) {
    const o = e => {
      l = !0
      const [n, o] = fn(e, t, !0)
      k(r, n), o && s.push(...o)
    }
    !n && t.mixins.length && t.mixins.forEach(o),
      e.extends && o(e.extends),
      e.mixins && e.mixins.forEach(o)
  }
  if (!o && !l) return (e.__props = g)
  if (E(o))
    for (let i = 0; i < o.length; i++) {
      const e = D(o[i])
      dn(e) && (r[e] = m)
    }
  else if (o)
    for (const i in o) {
      const e = D(i)
      if (dn(e)) {
        const t = o[i],
          n = (r[e] = E(t) || L(t) ? { type: t } : t)
        if (n) {
          const t = vn(Boolean, n.type),
            o = vn(String, n.type)
          ;(n[0] = t > -1),
            (n[1] = o < 0 || t < o),
            (t > -1 || S(n, 'default')) && s.push(e)
        }
      }
    }
  return (e.__props = [r, s])
}
function dn(e) {
  return '$' !== e[0]
}
function pn(e) {
  const t = e && e.toString().match(/^\s*function (\w+)/)
  return t ? t[1] : ''
}
function hn(e, t) {
  return pn(e) === pn(t)
}
function vn(e, t) {
  return E(t) ? t.findIndex(t => hn(t, e)) : L(t) && hn(t, e) ? 0 : -1
}
function mn(e, t, n = Ho, o = !1) {
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
const gn = e => (t, n = Ho) => !Ko && mn(e, t, n),
  yn = gn('bm'),
  bn = gn('m'),
  _n = gn('bu'),
  xn = gn('u'),
  wn = gn('bum'),
  kn = gn('um'),
  Cn = gn('rtg'),
  $n = gn('rtc')
const Sn = {}
function En(e, t, n) {
  return On(e, t, n)
}
function On(
  e,
  t,
  { immediate: n, deep: o, flush: r, onTrack: s, onTrigger: l } = m,
  i = Ho
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
                        ? Ln(e)
                        : L(e)
                          ? mt(e, i, 2, [i && i.proxy])
                          : void 0
                )
            : L(e)
              ? t
                ? () => mt(e, i, 2, [i && i.proxy])
                : () => {
                    if (!i || !i.isUnmounted) return a && a(), gt(e, i, 3, [f])
                  }
              : y),
    t && o)
  ) {
    const e = c
    c = () => Ln(e())
  }
  let f = e => {
      a = v.options.onStop = () => {
        mt(e, i, 4)
      }
    },
    d = E(e) ? [] : Sn
  const p = () => {
    if (v.active)
      if (t) {
        const e = v()
        ;(o || u || K(e, d)) &&
          (a && a(), gt(t, i, 3, [e, d === Sn ? void 0 : d, f]), (d = e))
      } else v()
  }
  let h
  ;(p.allowRecurse = !!t),
    (h =
      'sync' === r
        ? p
        : 'post' === r
          ? () => Xn(p, i && i.suspense)
          : () => {
              !i || i.isMounted
                ? (function(e) {
                    Ft(e, Ct, kt, $t)
                  })(p)
                : p()
            })
  const v = ne(c, { lazy: !0, onTrack: s, onTrigger: l, scheduler: h })
  return (
    Yo(v, i),
    t ? (n ? p() : (d = v())) : 'post' === r ? Xn(v, i && i.suspense) : v(),
    () => {
      oe(v), i && C(i.effects, v)
    }
  )
}
function Rn(e, t, n) {
  const o = this.proxy
  return On(I(e) ? () => o[e] : e.bind(o), t.bind(o), n, this)
}
function Ln(e, t = new Set()) {
  if (!T(e) || t.has(e)) return e
  if ((t.add(e), lt(e))) Ln(e.value, t)
  else if (E(e)) for (let n = 0; n < e.length; n++) Ln(e[n], t)
  else if (R(e) || O(e))
    e.forEach(e => {
      Ln(e, t)
    })
  else for (const n in e) Ln(e[n], t)
  return e
}
const In = e => e.type.__isKeepAlive
function Pn(e, t, n = Ho) {
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
  if ((mn(t, o, n), n)) {
    let e = n.parent
    for (; e && e.parent; ) In(e.parent.vnode) && Tn(o, t, n, e), (e = e.parent)
  }
}
function Tn(e, t, n, o) {
  const r = mn(t, e, o, !0)
  kn(() => {
    C(o[t], r)
  }, n)
}
const An = e => '_' === e[0] || '$stable' === e,
  Fn = e => (E(e) ? e.map($o) : [$o(e)]),
  Mn = (e, t, n) => Qt(e => Fn(t(e)), n),
  jn = (e, t) => {
    const n = e._ctx
    for (const o in e) {
      if (An(o)) continue
      const r = e[o]
      if (L(r)) t[o] = Mn(0, r, n)
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
function Bn() {
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
let Vn = 0
function Dn(e, t) {
  return function(n, o = null) {
    null == o || T(o) || (o = null)
    const r = Bn(),
      s = new Set()
    let l = !1
    const i = (r.app = {
      _uid: Vn++,
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
          (e && L(e.install)
            ? (s.add(e), e.install(i, ...t))
            : L(e) && (s.add(e), e(i, ...t))),
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
let Wn = !1
const Hn = e => /svg/.test(e.namespaceURI) && 'foreignObject' !== e.tagName,
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
    a = (n, o, l, i, c, v = !1) => {
      const m = qn(n) && '[' === n.data,
        g = () => p(n, o, l, i, c, m),
        { type: y, ref: b, shapeFlag: _ } = o,
        x = n.nodeType
      o.el = n
      let w = null
      switch (y) {
        case lo:
          3 !== x
            ? (w = g())
            : (n.data !== o.children && ((Wn = !0), (n.data = o.children)),
              (w = r(n)))
          break
        case io:
          w = 8 !== x || m ? g() : r(n)
          break
        case co:
          if (1 === x) {
            w = n
            const e = !o.children.length
            for (let t = 0; t < o.staticCount; t++)
              e && (o.children += w.outerHTML),
                t === o.staticCount - 1 && (o.anchor = w),
                (w = r(w))
            return w
          }
          w = g()
          break
        case so:
          w = m ? d(n, o, l, i, c, v) : g()
          break
        default:
          if (1 & _)
            w =
              1 !== x || o.type.toLowerCase() !== n.tagName.toLowerCase()
                ? g()
                : u(n, o, l, i, c, v)
          else if (6 & _) {
            o.slotScopeIds = c
            const e = s(n),
              a = () => {
                t(o, e, null, l, i, Hn(e), v)
              },
              u = o.type.__asyncLoader
            u ? u().then(a) : a(), (w = m ? h(n) : r(n))
          } else
            64 & _
              ? (w = 8 !== x ? g() : o.type.hydrate(n, o, l, i, c, v, e, f))
              : 128 & _ &&
                (w = o.type.hydrate(n, o, l, i, Hn(s(n)), c, v, e, a))
      }
      return null != b && Zn(b, null, i, o), w
    },
    u = (e, t, n, r, s, i) => {
      i = i || !!t.dynamicChildren
      const { props: c, patchFlag: a, shapeFlag: u, dirs: d } = t
      if (-1 !== a) {
        if ((d && Nn(t, null, n, 'created'), c))
          if (!i || 16 & a || 32 & a)
            for (const t in c) !N(t) && x(t) && o(e, t, null, c[t])
          else c.onClick && o(e, 'onClick', null, c.onClick)
        let p
        if (
          ((p = c && c.onVnodeBeforeMount) && eo(p, n, t),
          d && Nn(t, null, n, 'beforeMount'),
          ((p = c && c.onVnodeMounted) || d) &&
            ln(() => {
              p && eo(p, n, t), d && Nn(t, null, n, 'mounted')
            }, r),
          16 & u && (!c || (!c.innerHTML && !c.textContent)))
        ) {
          let o = f(e.firstChild, t, e, n, r, s, i)
          for (; o; ) {
            Wn = !0
            const e = o
            ;(o = o.nextSibling), l(e)
          }
        } else
          8 & u &&
            e.textContent !== t.children &&
            ((Wn = !0), (e.textContent = t.children))
      }
      return e.nextSibling
    },
    f = (e, t, o, r, s, l, i) => {
      i = i || !!t.dynamicChildren
      const c = t.children,
        u = c.length
      for (let f = 0; f < u; f++) {
        const t = i ? c[f] : (c[f] = $o(c[f]))
        if (e) e = a(e, t, r, s, l, i)
        else {
          if (t.type === lo && !t.children) continue
          ;(Wn = !0), n(null, t, o, null, r, s, Hn(o), l)
        }
      }
      return e
    },
    d = (e, t, n, o, l, a) => {
      const { slotScopeIds: u } = t
      u && (l = l ? l.concat(u) : u)
      const d = s(e),
        p = f(r(e), t, d, n, o, l, a)
      return p && qn(p) && ']' === p.data
        ? r((t.anchor = p))
        : ((Wn = !0), i((t.anchor = c(']')), d, p), p)
    },
    p = (e, t, o, i, c, a) => {
      if (((Wn = !0), (t.el = null), a)) {
        const t = h(e)
        for (;;) {
          const n = r(e)
          if (!n || n === t) break
          l(n)
        }
      }
      const u = r(e),
        f = s(e)
      return l(e), n(null, t, f, u, o, i, Hn(f), c), u
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
      ;(Wn = !1),
        a(t.firstChild, e, null, null, null),
        jt(),
        Wn && console.error('Hydration completed but contains mismatches.')
    },
    a
  ]
}
function Kn(e) {
  return L(e) ? { setup: e, name: e.name } : e
}
function Gn(e) {
  L(e) && (e = { loader: e })
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
  const f = () => {
    let e
    return (
      a ||
      (e = a = t()
        .catch(e => {
          if (((e = e instanceof Error ? e : new Error(String(e))), i))
            return new Promise((t, n) => {
              i(e, () => t((u++, (a = null), f())), () => n(e), u + 1)
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
    __asyncLoader: f,
    name: 'AsyncComponentWrapper',
    setup() {
      const e = Ho
      if (c) return () => Jn(c, e)
      const t = t => {
        ;(a = null), yt(t, e, 13, !o)
      }
      if (l && e.suspense)
        return f()
          .then(t => () => Jn(t, e))
          .catch(e => (t(e), () => (o ? _o(o, { error: e }) : null)))
      const i = it(!1),
        u = it(),
        d = it(!!r)
      return (
        r &&
          setTimeout(() => {
            d.value = !1
          }, r),
        null != s &&
          setTimeout(() => {
            if (!i.value && !u.value) {
              const e = new Error(`Async component timed out after ${s}ms.`)
              t(e), (u.value = e)
            }
          }, s),
        f()
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
              : n && !d.value
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
const Yn = { scheduler: Tt, allowRecurse: !0 },
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
      c = s.refs === m ? (s.refs = {}) : s.refs,
      a = s.setupState
    if (
      (null != i &&
        i !== l &&
        (I(i)
          ? ((c[i] = null), S(a, i) && (a[i] = null))
          : lt(i) && (i.value = null)),
      I(l))
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
    } else L(l) && mt(l, s, 12, [r, c])
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
        parentNode: f,
        nextSibling: d,
        setScopeId: p = y,
        cloneNode: h,
        insertStaticContent: v
      } = e,
      b = (e, t, n, o = null, r = null, s = null, l = !1, i = null, c = !1) => {
        e && !mo(e, t) && ((o = te(e)), Y(e, r, s, !0), (e = null)),
          -2 === t.patchFlag && ((c = !1), (t.dynamicChildren = null))
        const { type: a, ref: u, shapeFlag: f } = t
        switch (a) {
          case lo:
            _(e, t, n, o)
            break
          case io:
            x(e, t, n, o)
            break
          case co:
            null == e && w(t, n, o, l)
            break
          case so:
            F(e, t, n, o, r, s, l, i, c)
            break
          default:
            1 & f
              ? E(e, t, n, o, r, s, l, i, c)
              : 6 & f
                ? M(e, t, n, o, r, s, l, i, c)
                : (64 & f || 128 & f) &&
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
      w = (e, t, n, o) => {
        ;[e.el, e.anchor] = v(e.children, t, n, o)
      },
      C = ({ el: e, anchor: t }, o, r) => {
        let s
        for (; e && e !== t; ) (s = d(e)), n(e, o, r), (e = s)
        n(t, o, r)
      },
      $ = ({ el: e, anchor: t }) => {
        let n
        for (; e && e !== t; ) (n = d(e)), o(e), (e = n)
        o(t)
      },
      E = (e, t, n, o, r, s, l, i, c) => {
        ;(l = l || 'svg' === t.type),
          null == e ? O(t, n, o, r, s, l, i, c) : I(e, t, r, s, l, i, c)
      },
      O = (e, t, o, s, i, c, a, f) => {
        let d, p
        const {
          type: v,
          props: m,
          shapeFlag: g,
          transition: y,
          patchFlag: b,
          dirs: _
        } = e
        if (e.el && void 0 !== h && -1 === b) d = e.el = h(e.el)
        else {
          if (
            ((d = e.el = l(e.type, c, m && m.is, m)),
            8 & g
              ? u(d, e.children)
              : 16 & g &&
                L(
                  e.children,
                  d,
                  null,
                  s,
                  i,
                  c && 'foreignObject' !== v,
                  a,
                  f || !!e.dynamicChildren
                ),
            _ && Nn(e, null, s, 'created'),
            m)
          ) {
            for (const t in m)
              N(t) || r(d, t, null, m[t], c, e.children, s, i, ee)
            ;(p = m.onVnodeBeforeMount) && eo(p, s, e)
          }
          R(d, e, e.scopeId, a, s)
        }
        _ && Nn(e, null, s, 'beforeMount')
        const x = (!i || (i && !i.pendingBranch)) && y && !y.persisted
        x && y.beforeEnter(d),
          n(d, t, o),
          ((p = m && m.onVnodeMounted) || x || _) &&
            Xn(() => {
              p && eo(p, s, e), x && y.enter(d), _ && Nn(e, null, s, 'mounted')
            }, i)
      },
      R = (e, t, n, o, r) => {
        if ((n && p(e, n), o)) for (let s = 0; s < o.length; s++) p(e, o[s])
        if (r) {
          if (t === r.subTree) {
            const t = r.vnode
            R(e, t, t.scopeId, t.slotScopeIds, r.parent)
          }
        }
      },
      L = (e, t, n, o, r, s, l, i, c = 0) => {
        for (let a = c; a < e.length; a++) {
          const c = (e[a] = l ? So(e[a]) : $o(e[a]))
          b(null, c, t, n, o, r, s, l, i)
        }
      },
      I = (e, t, n, o, l, i, c) => {
        const a = (t.el = e.el)
        let { patchFlag: f, dynamicChildren: d, dirs: p } = t
        f |= 16 & e.patchFlag
        const h = e.props || m,
          v = t.props || m
        let g
        if (
          ((g = v.onVnodeBeforeUpdate) && eo(g, n, t, e),
          p && Nn(t, e, n, 'beforeUpdate'),
          f > 0)
        ) {
          if (16 & f) T(a, t, h, v, n, o, l)
          else if (
            (2 & f && h.class !== v.class && r(a, 'class', null, v.class, l),
            4 & f && r(a, 'style', h.style, v.style, l),
            8 & f)
          ) {
            const i = t.dynamicProps
            for (let t = 0; t < i.length; t++) {
              const c = i[t],
                u = h[c],
                f = v[c]
              ;(f !== u || (s && s(a, c))) &&
                r(a, c, u, f, l, e.children, n, o, ee)
            }
          }
          1 & f && e.children !== t.children && u(a, t.children)
        } else c || null != d || T(a, t, h, v, n, o, l)
        const y = l && 'foreignObject' !== t.type
        d
          ? P(e.dynamicChildren, d, a, n, o, y, i)
          : c || W(e, t, a, null, n, o, y, i, !1),
          ((g = v.onVnodeUpdated) || p) &&
            Xn(() => {
              g && eo(g, n, t, e), p && Nn(t, e, n, 'updated')
            }, o)
      },
      P = (e, t, n, o, r, s, l) => {
        for (let i = 0; i < t.length; i++) {
          const c = e[i],
            a = t[i],
            u =
              c.type === so || !mo(c, a) || 6 & c.shapeFlag || 64 & c.shapeFlag
                ? f(c.el)
                : n
          b(c, a, u, null, o, r, s, l, !0)
        }
      },
      T = (e, t, n, o, l, i, c) => {
        if (n !== o) {
          for (const a in o) {
            if (N(a)) continue
            const u = o[a],
              f = n[a]
            ;(u !== f || (s && s(e, a))) &&
              r(e, a, f, u, c, t.children, l, i, ee)
          }
          if (n !== m)
            for (const s in n)
              N(s) || s in o || r(e, s, n[s], null, c, t.children, l, i, ee)
        }
      },
      F = (e, t, o, r, s, l, c, a, u) => {
        const f = (t.el = e ? e.el : i('')),
          d = (t.anchor = e ? e.anchor : i(''))
        let { patchFlag: p, dynamicChildren: h, slotScopeIds: v } = t
        p > 0 && (u = !0),
          v && (a = a ? a.concat(v) : v),
          null == e
            ? (n(f, o, r), n(d, o, r), L(t.children, o, d, s, l, c, a, u))
            : p > 0 && 64 & p && h && e.dynamicChildren
              ? (P(e.dynamicChildren, h, o, s, l, c, a),
                (null != t.key || (s && t === s.subTree)) && to(e, t, !0))
              : W(e, t, o, d, s, l, c, a, u)
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
              uid: Wo++,
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
              propsOptions: fn(o, r),
              emitsOptions: Vt(o, r),
              emit: null,
              emitted: null,
              propsDefaults: m,
              ctx: m,
              data: m,
              props: m,
              attrs: m,
              slots: m,
              refs: m,
              setupState: m,
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
            (s.emit = Bt.bind(null, s)),
            s
          )
        })(e, o, r))
        if (
          (In(e) && (i.ctx.renderer = se),
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
                    (e.proxy = new Proxy(e.ctx, Bo))
                  const { setup: o } = n
                  if (o) {
                    const n = (e.setupContext =
                      o.length > 1
                        ? (function(e) {
                            const t = t => {
                              e.exposed = ft(t)
                            }
                            return {
                              attrs: e.attrs,
                              slots: e.slots,
                              emit: e.emit,
                              expose: t
                            }
                          })(e)
                        : null)
                    ;(Ho = e), ce()
                    const r = mt(o, e, 0, [e.props, n])
                    if ((ae(), (Ho = null), A(r))) {
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
          if ((r && r.registerDep(i, B), !e.el)) {
            const e = (i.subTree = _o(io))
            x(null, e, t, n)
          }
        } else B(i, e, t, n, r, s, l)
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
          if (o.asyncDep && !o.asyncResolved) return void V(o, t, n)
          ;(o.next = t),
            (function(e) {
              const t = xt.indexOf(e)
              t > wt && xt.splice(t, 1)
            })(o.update),
            o.update()
        } else (t.component = e.component), (t.el = e.el), (o.vnode = t)
      },
      B = (e, t, n, o, r, s, l) => {
        e.update = ne(function() {
          if (e.isMounted) {
            let t,
              { next: n, bu: o, u: i, parent: c, vnode: a } = e,
              u = n
            n ? ((n.el = a.el), V(e, n, l)) : (n = a),
              o && G(o),
              (t = n.props && n.props.onVnodeBeforeUpdate) && eo(t, c, n, a)
            const d = en(e),
              p = e.subTree
            ;(e.subTree = d),
              b(p, d, f(p.el), te(p), e, r, s),
              (n.el = d.el),
              null === u &&
                (function({ vnode: e, parent: t }, n) {
                  for (; t && t.subTree === e; )
                    ((e = t.vnode).el = n), (t = t.parent)
                })(e, d.el),
              i && Xn(i, r),
              (t = n.props && n.props.onVnodeUpdated) &&
                Xn(() => {
                  eo(t, c, n, a)
                }, r)
          } else {
            let l
            const { el: i, props: c } = t,
              { bm: a, m: u, parent: f } = e
            a && G(a), (l = c && c.onVnodeBeforeMount) && eo(l, f, t)
            const d = (e.subTree = en(e))
            if (
              (i && ie
                ? ie(t.el, d, e, r, null)
                : (b(null, d, n, o, e, r, s), (t.el = d.el)),
              u && Xn(u, r),
              (l = c && c.onVnodeMounted))
            ) {
              const e = t
              Xn(() => {
                eo(l, f, e)
              }, r)
            }
            const { a: p } = e
            p && 256 & t.shapeFlag && Xn(p, r),
              (e.isMounted = !0),
              (t = n = o = null)
          }
        }, Yn)
      },
      V = (e, t, n) => {
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
                (t && (S(t, s) || ((o = H(s)) !== s && S(t, o)))) ||
                  (c
                    ? !n ||
                      (void 0 === n[s] && void 0 === n[o]) ||
                      (r[s] = un(c, t || m, s, void 0, e))
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
            fe(e, 'set', '$attrs')
          })(e, t.props, o, n),
          ((e, t, n) => {
            const { vnode: o, slots: r } = e
            let s = !0,
              l = m
            if (32 & o.shapeFlag) {
              const e = t._
              e
                ? n && 1 === e
                  ? (s = !1)
                  : (k(r, t), n || 1 !== e || delete r._)
                : ((s = !t.$stable), jn(t, r)),
                (l = t)
            } else t && (Un(e, t), (l = { default: 1 }))
            if (s) for (const i in r) An(i) || i in l || delete r[i]
          })(e, t.children, n),
          ce(),
          Mt(void 0, e.update),
          ae()
      },
      W = (e, t, n, o, r, s, l, i, c = !1) => {
        const a = e && e.children,
          f = e ? e.shapeFlag : 0,
          d = t.children,
          { patchFlag: p, shapeFlag: h } = t
        if (p > 0) {
          if (128 & p) return void z(a, d, n, o, r, s, l, i, c)
          if (256 & p) return void q(a, d, n, o, r, s, l, i, c)
        }
        8 & h
          ? (16 & f && ee(a, r, s), d !== a && u(n, d))
          : 16 & f
            ? 16 & h
              ? z(a, d, n, o, r, s, l, i, c)
              : ee(a, r, s, !0)
            : (8 & f && u(n, ''), 16 & h && L(d, n, o, r, s, l, i, c))
      },
      q = (e, t, n, o, r, s, l, i, c) => {
        t = t || g
        const a = (e = e || g).length,
          u = t.length,
          f = Math.min(a, u)
        let d
        for (d = 0; d < f; d++) {
          const o = (t[d] = c ? So(t[d]) : $o(t[d]))
          b(e[d], o, n, null, r, s, l, i, c)
        }
        a > u ? ee(e, r, s, !0, !1, f) : L(t, n, o, r, s, l, i, c, f)
      },
      z = (e, t, n, o, r, s, l, i, c) => {
        let a = 0
        const u = t.length
        let f = e.length - 1,
          d = u - 1
        for (; a <= f && a <= d; ) {
          const o = e[a],
            u = (t[a] = c ? So(t[a]) : $o(t[a]))
          if (!mo(o, u)) break
          b(o, u, n, null, r, s, l, i, c), a++
        }
        for (; a <= f && a <= d; ) {
          const o = e[f],
            a = (t[d] = c ? So(t[d]) : $o(t[d]))
          if (!mo(o, a)) break
          b(o, a, n, null, r, s, l, i, c), f--, d--
        }
        if (a > f) {
          if (a <= d) {
            const e = d + 1,
              f = e < u ? t[e].el : o
            for (; a <= d; )
              b(null, (t[a] = c ? So(t[a]) : $o(t[a])), n, f, r, s, l, i, c),
                a++
          }
        } else if (a > d) for (; a <= f; ) Y(e[a], r, s, !0), a++
        else {
          const p = a,
            h = a,
            v = new Map()
          for (a = h; a <= d; a++) {
            const e = (t[a] = c ? So(t[a]) : $o(t[a]))
            null != e.key && v.set(e.key, a)
          }
          let m,
            y = 0
          const _ = d - h + 1
          let x = !1,
            w = 0
          const k = new Array(_)
          for (a = 0; a < _; a++) k[a] = 0
          for (a = p; a <= f; a++) {
            const o = e[a]
            if (y >= _) {
              Y(o, r, s, !0)
              continue
            }
            let u
            if (null != o.key) u = v.get(o.key)
            else
              for (m = h; m <= d; m++)
                if (0 === k[m - h] && mo(o, t[m])) {
                  u = m
                  break
                }
            void 0 === u
              ? Y(o, r, s, !0)
              : ((k[u - h] = a + 1),
                u >= w ? (w = u) : (x = !0),
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
              })(k)
            : g
          for (m = C.length - 1, a = _ - 1; a >= 0; a--) {
            const e = h + a,
              f = t[e],
              d = e + 1 < u ? t[e + 1].el : o
            0 === k[a]
              ? b(null, f, n, d, r, s, l, i, c)
              : x && (m < 0 || a !== C[m] ? K(f, n, d, 2) : m--)
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
          patchFlag: f,
          dirs: d
        } = e
        if ((null != i && Zn(i, null, n, null), 256 & u))
          return void t.ctx.deactivate(e)
        const p = 1 & u && d
        let h
        if (((h = l && l.onVnodeBeforeUnmount) && eo(h, t, e), 6 & u))
          Q(e.component, n, o)
        else {
          if (128 & u) return void e.suspense.unmount(n, o)
          p && Nn(e, null, t, 'beforeUnmount'),
            64 & u
              ? e.type.remove(e, t, n, r, se, o)
              : a && (s !== so || (f > 0 && 64 & f))
                ? ee(a, t, n, !1, !0)
                : ((s === so && (128 & f || 256 & f)) || (!r && 16 & u)) &&
                  ee(c, t, n),
            o && X(e)
        }
        ;((h = l && l.onVnodeUnmounted) || p) &&
          Xn(() => {
            h && eo(h, t, e), p && Nn(e, null, t, 'unmounted')
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
        for (; e !== t; ) (n = d(e)), o(e), (e = n)
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
            : d(e.anchor || e.el),
      re = (e, t, n) => {
        null == e
          ? t._vnode && Y(t._vnode, null, null, !0)
          : b(t._vnode || null, e, t, null, null, null, n),
          jt(),
          (t._vnode = e)
      },
      se = { p: b, um: Y, m: K, r: X, mt: j, mc: L, pc: W, pbc: P, n: te, o: e }
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
      const r = Kt || Ho
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
function fo(e = !1) {
  ao.push((uo = e ? null : []))
}
function po() {
  ao.pop(), (uo = ao[ao.length - 1] || null)
}
function ho(e, t, n, o, r) {
  const s = _o(e, t, n, o, r, !0)
  return (s.dynamicChildren = uo || g), po(), uo && uo.push(s), s
}
function vo(e) {
  return !!e && !0 === e.__v_isVNode
}
function mo(e, t) {
  return e.type === t.type && e.key === t.key
}
const go = '__vInternal',
  yo = ({ key: e }) => (null != e ? e : null),
  bo = ({ ref: e }) =>
    null != e ? (I(e) || lt(e) || L(e) ? { i: Kt, r: e } : e) : null,
  _o = function(e, t = null, n = null, o = 0, r = null, s = !1) {
    ;(e && e !== oo) || (e = io)
    if (vo(e)) {
      const o = xo(e, t, !0)
      return n && Eo(o, n), o
    }
    ;(l = e), L(l) && '__vccOpts' in l && (e = e.__vccOpts)
    var l
    if (t) {
      ;(nt(t) || go in t) && (t = k({}, t))
      let { class: e, style: n } = t
      e && !I(e) && (t.class = p(e)),
        T(n) && (nt(n) && !E(n) && (n = k({}, n)), (t.style = a(n)))
    }
    const i = I(e)
        ? 1
        : (e => e.__isSuspense)(e)
          ? 128
          : (e => e.__isTeleport)(e)
            ? 64
            : T(e)
              ? 4
              : L(e)
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
function wo(e = ' ', t = 0) {
  return _o(lo, null, e, t)
}
function ko(e, t) {
  const n = _o(co, null, e)
  return (n.staticCount = t), n
}
function Co(e = '', t = !1) {
  return t ? (fo(), ho(io, null, e)) : _o(io, null, e)
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
      return void (n && (n._c && Ht(1), Eo(e, n()), n._c && Ht(-1)))
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
    L(t)
      ? ((t = { default: t, _ctx: Kt }), (n = 32))
      : ((t = String(t)), 64 & o ? ((n = 16), (t = [wo(t)])) : (n = 8))
  ;(e.children = t), (e.shapeFlag |= n)
}
function Oo(...e) {
  const t = k({}, e[0])
  for (let n = 1; n < e.length; n++) {
    const o = e[n]
    for (const e in o)
      if ('class' === e)
        t.class !== o.class && (t.class = p([t.class, o.class]))
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
  const o = Ho || Kt
  if (o) {
    const r =
      null == o.parent
        ? o.vnode.appContext && o.vnode.appContext.provides
        : o.parent.provides
    if (r && e in r) return r[e]
    if (arguments.length > 1) return n && L(t) ? t() : t
  }
}
let Lo = !0
function Io(e, t, n = [], o = [], r = [], s = !1) {
  const {
      mixins: l,
      extends: i,
      data: c,
      computed: a,
      methods: u,
      watch: f,
      provide: d,
      inject: p,
      components: h,
      directives: v,
      beforeMount: g,
      mounted: b,
      beforeUpdate: _,
      updated: x,
      activated: w,
      deactivated: C,
      beforeDestroy: $,
      beforeUnmount: S,
      destroyed: O,
      unmounted: R,
      render: I,
      renderTracked: P,
      renderTriggered: A,
      errorCaptured: F,
      expose: M
    } = t,
    j = e.proxy,
    U = e.ctx,
    N = e.appContext.mixins
  if (
    (s && I && e.render === y && (e.render = I),
    s ||
      ((Lo = !1),
      Po('beforeCreate', 'bc', t, e, N),
      (Lo = !0),
      Ao(e, N, n, o, r)),
    i && Io(e, i, n, o, r, !0),
    l && Ao(e, l, n, o, r),
    p)
  )
    if (E(p))
      for (let m = 0; m < p.length; m++) {
        const e = p[m]
        U[e] = Ro(e)
      }
    else
      for (const m in p) {
        const e = p[m]
        T(e) ? (U[m] = Ro(e.from || m, e.default, !0)) : (U[m] = Ro(e))
      }
  if (u)
    for (const m in u) {
      const e = u[m]
      L(e) && (U[m] = e.bind(j))
    }
  if (
    (s
      ? c && n.push(c)
      : (n.length && n.forEach(t => Fo(e, t, j)), c && Fo(e, c, j)),
    a)
  )
    for (const m in a) {
      const e = a[m],
        t = Zo({
          get: L(e) ? e.bind(j, j) : L(e.get) ? e.get.bind(j, j) : y,
          set: !L(e) && L(e.set) ? e.set.bind(j) : y
        })
      Object.defineProperty(U, m, {
        enumerable: !0,
        configurable: !0,
        get: () => t.value,
        set: e => (t.value = e)
      })
    }
  var B
  if (
    (f && o.push(f),
    !s &&
      o.length &&
      o.forEach(e => {
        for (const t in e) Mo(e[t], U, j, t)
      }),
    d && r.push(d),
    !s &&
      r.length &&
      r.forEach(e => {
        const t = L(e) ? e.call(j) : e
        Reflect.ownKeys(t).forEach(e => {
          !(function(e, t) {
            if (Ho) {
              let n = Ho.provides
              const o = Ho.parent && Ho.parent.provides
              o === n && (n = Ho.provides = Object.create(o)), (n[e] = t)
            }
          })(e, t[e])
        })
      }),
    s &&
      (h && k(e.components || (e.components = k({}, e.type.components)), h),
      v && k(e.directives || (e.directives = k({}, e.type.directives)), v)),
    s || Po('created', 'c', t, e, N),
    g && yn(g.bind(j)),
    b && bn(b.bind(j)),
    _ && _n(_.bind(j)),
    x && xn(x.bind(j)),
    w && Pn(w.bind(j), 'a', B),
    C &&
      (function(e, t) {
        Pn(e, 'da', t)
      })(C.bind(j)),
    F &&
      ((e, t = Ho) => {
        mn('ec', e, t)
      })(F.bind(j)),
    P && $n(P.bind(j)),
    A && Cn(A.bind(j)),
    S && wn(S.bind(j)),
    R && kn(R.bind(j)),
    E(M) && !s)
  )
    if (M.length) {
      const t = e.exposed || (e.exposed = ft({}))
      M.forEach(e => {
        t[e] = ht(j, e)
      })
    } else e.exposed || (e.exposed = m)
}
function Po(e, t, n, o, r) {
  for (let s = 0; s < r.length; s++) To(e, t, r[s], o)
  To(e, t, n, o)
}
function To(e, t, n, o) {
  const { extends: r, mixins: s } = n,
    l = n[e]
  if ((r && To(e, t, r, o), s))
    for (let i = 0; i < s.length; i++) To(e, t, s[i], o)
  l && gt(l.bind(o.proxy), o, t)
}
function Ao(e, t, n, o, r) {
  for (let s = 0; s < t.length; s++) Io(e, t[s], n, o, r, !0)
}
function Fo(e, t, n) {
  Lo = !1
  const o = t.call(n, n)
  ;(Lo = !0), T(o) && (e.data === m ? (e.data = Xe(o)) : k(e.data, o))
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
  if (I(e)) {
    const n = t[e]
    L(n) && En(r, n)
  } else if (L(e)) En(r, e.bind(n))
  else if (T(e))
    if (E(e)) e.forEach(e => Mo(e, t, n, o))
    else {
      const o = L(e.handler) ? e.handler.bind(n) : t[e.handler]
      L(o) && En(r, o, e)
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
  No = k(Object.create(null), {
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
    $forceUpdate: e => () => Tt(e.update),
    $nextTick: e => Pt.bind(e.proxy),
    $watch: e => Rn.bind(e)
  }),
  Bo = {
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
          if (o !== m && S(o, t)) return (l[t] = 0), o[t]
          if (r !== m && S(r, t)) return (l[t] = 1), r[t]
          if ((a = e.propsOptions[0]) && S(a, t)) return (l[t] = 2), s[t]
          if (n !== m && S(n, t)) return (l[t] = 3), n[t]
          Lo && (l[t] = 4)
        }
      }
      const u = No[t]
      let f, d
      return u
        ? ('$attrs' === t && ue(e, 0, t), u(e))
        : (f = i.__cssModules) && (f = f[t])
          ? f
          : n !== m && S(n, t)
            ? ((l[t] = 3), n[t])
            : ((d = c.config.globalProperties), S(d, t) ? d[t] : void 0)
    },
    set({ _: e }, t, n) {
      const { data: o, setupState: r, ctx: s } = e
      if (r !== m && S(r, t)) r[t] = n
      else if (o !== m && S(o, t)) o[t] = n
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
        (e !== m && S(e, l)) ||
        (t !== m && S(t, l)) ||
        ((i = s[0]) && S(i, l)) ||
        S(o, l) ||
        S(No, l) ||
        S(r.config.globalProperties, l)
      )
    }
  },
  Vo = k({}, Bo, {
    get(e, t) {
      if (t !== Symbol.unscopables) return Bo.get(e, t, e)
    },
    has: (e, t) => '_' !== t[0] && !i(t)
  }),
  Do = Bn()
let Wo = 0
let Ho = null
const qo = e => {
  Ho = e
}
function zo(e) {
  return 4 & e.vnode.shapeFlag
}
let Ko = !1
function Go(e, t, n) {
  L(t) ? (e.render = t) : T(t) && (e.setupState = ft(t)), Jo(e)
}
function Jo(e, t) {
  const n = e.type
  e.render ||
    ((e.render = n.render || y),
    e.render._rc && (e.withProxy = new Proxy(e.ctx, Vo))),
    (Ho = e),
    ce(),
    Io(e, n),
    ae(),
    (Ho = null)
}
function Yo(e, t = Ho) {
  t && (t.effects || (t.effects = [])).push(e)
}
function Xo(e) {
  return (L(e) && e.displayName) || e.name
}
function Zo(e) {
  const t = (function(e) {
    let t, n
    return (
      L(e) ? ((t = e), (n = y)) : ((t = e.get), (n = e.set)),
      new vt(t, n, L(e) || !e.set)
    )
  })(e)
  return Yo(t.effect), t
}
function Qo(e, t, n) {
  const o = arguments.length
  return 2 === o
    ? T(t) && !E(t)
      ? vo(t)
        ? _o(e, null, [t])
        : _o(e, t)
      : _o(e, null, t)
    : (o > 3
        ? (n = Array.prototype.slice.call(arguments, 2))
        : 3 === o && vo(n) && (n = [n]),
      _o(e, t, n))
}
function er(e, t) {
  let n
  if (E(e) || I(e)) {
    n = new Array(e.length)
    for (let o = 0, r = e.length; o < r; o++) n[o] = t(e[o], o)
  } else if ('number' == typeof e) {
    n = new Array(e)
    for (let o = 0; o < e; o++) n[o] = t(o + 1, o)
  } else if (T(e))
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
      ? e.setProperty(H(o), n.replace(ir, ''), 'important')
      : (e[o] = n)
  }
}
const ar = ['Webkit', 'Moz', 'ms'],
  ur = {}
const fr = 'http://www.w3.org/1999/xlink'
let dr = Date.now,
  pr = !1
if ('undefined' != typeof window) {
  dr() > document.createEvent('Event').timeStamp &&
    (dr = () => performance.now())
  const e = navigator.userAgent.match(/firefox\/(\d+)/i)
  pr = !!(e && Number(e[1]) <= 53)
}
let hr = 0
const vr = Promise.resolve(),
  mr = () => {
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
      return [H(e.slice(2)), t]
    })(t)
    if (o) {
      !(function(e, t, n, o) {
        e.addEventListener(t, n, o)
      })(
        e,
        n,
        (s[t] = (function(e, t) {
          const n = e => {
            const o = e.timeStamp || dr()
            ;(pr || o >= n.attached - 1) &&
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
            (n.attached = (() => hr || (vr.then(mr), (hr = dr())))()),
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
const _r = k(
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
              if (I(n)) {
                if (t !== n) {
                  const t = o.display
                  ;(o.cssText = n), '_vod' in e && (o.display = t)
                }
              } else {
                for (const e in n) cr(o, e, n[e])
                if (t && !I(t)) for (const e in t) null == n[e] && cr(o, e, '')
              }
            else e.removeAttribute('style')
          })(e, n, o)
          break
        default:
          x(t)
            ? w(t) || gr(e, t, 0, o, l)
            : (function(e, t, n, o) {
                if (o)
                  return 'innerHTML' === t || !!(t in e && br.test(t) && L(n))
                if ('spellcheck' === t || 'draggable' === t) return !1
                if ('form' === t) return !1
                if ('list' === t && 'INPUT' === e.tagName) return !1
                if ('type' === t && 'TEXTAREA' === e.tagName) return !1
                if (br.test(t) && I(n)) return !1
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
                      ? e.removeAttributeNS(fr, t.slice(6, t.length))
                      : e.setAttributeNS(fr, t, n)
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
  wr = !1
const kr = (...e) => {
  const t = ((xr = wr ? xr : Qn(_r)), (wr = !0), xr).createApp(...e),
    { mount: n } = t
  return (
    (t.mount = e => {
      const t = (function(e) {
        if (I(e)) {
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
function Lr() {
  return (function() {
    const e = Ro(Rr)
    if (!e) throw new Error('useRouter() is called without provider.')
    return e
  })().route
}
function Ir(e, t, n = !1) {
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
const Pr = Kn({
    name: 'VitePressContent',
    setup() {
      const e = Lr()
      return () => (e.component ? Qo(e.component) : null)
    }
  }),
  Tr = Kn({
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
const Ar = it(
  ((Fr =
    '{"lang":"en-US","title":"vue-next源码解析","description":"A VitePress site","base":"/vue-next-analysis/","head":[],"themeConfig":{"nav":[{"text":"Github","link":"https://github.com/diy4869/vue-next-analysis"}],"sidebar":[{"text":"☆ 个人介绍","link":"/components/my"},{"text":"一些流程图","children":[{"text":"☆ vue-next 渲染流程","link":"/page/flow"}]},{"text":"准备工作","children":[{"text":"☆ 一些基本知识","link":"/page/base"},{"text":"☆ 如何debug","link":"/page/debug"},{"text":"☆ 位运算","link":"/page/bitOperators"},{"text":"Rollup","link":""},{"text":"Typescript","link":""}]},{"text":"初始化渲染","children":[{"text":"☆ createApp","link":"/page/createApp"},{"text":"☆ vnode","link":"/page/vnode"},{"text":"render","link":""},{"text":"...","link":""}]},{"text":"编译 compiler","children":[{"text":"ast","link":"/compiler/ast"},{"text":"v-if","link":"/directive/v-if"},{"text":"v-for","link":"/directive/v-for"},{"text":"generate","link":"/compiler/generate"}]},{"text":"渲染 render","children":[{"text":"v-show","link":"/directive/v-show"},{"text":"v-on","link":"/directive/v-on"}]},{"text":"指令 directive","children":[{"text":"v-show","link":"/directive/v-show"},{"text":"v-on","link":"/directive/v-on"}]},{"text":"内置组件 components","children":[{"text":"keepAlive","link":"/components/keepAlive"},{"text":"suspense","link":"/components/suspense"},{"text":"teleport","link":"/components/teleport"}]},{"text":"响应式","children":[{"text":"reactive","link":""},{"text":"ref","link":""},{"text":"...","link":""}]},{"text":"服务端渲染","children":[{"text":"serverRender","link":""},{"text":"...","link":""}]}]},"locales":{},"customData":{}}'),
  Ze(JSON.parse(Fr)))
)
var Fr
function Mr() {
  return Ar
}
function jr(e) {
  const t = e || Lr()
  return Zo(() => Sr(Ar.value, t.path))
}
function Ur(e) {
  const t = e || Lr()
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
function Br() {
  const e = Ur()
  return Zo(() => e.value.frontmatter)
}
Yt('data-v-35c33521')
const Vr = _o('p', { class: 'title' }, 'Debug', -1),
  Dr = { class: 'block' },
  Wr = { class: 'block' },
  Hr = { class: 'block' }
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
        fo(),
        ho(
          'div',
          {
            class: ['debug', { open: n.value }],
            ref: t,
            onClick: o[1] || (o[1] = e => (n.value = !n.value))
          },
          [
            Vr,
            _o('pre', Dr, '$page ' + h(e.$page), 1),
            _o('pre', Wr, '$siteByRoute ' + h(e.$siteByRoute), 1),
            _o('pre', Hr, '$site ' + h(e.$site), 1)
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
      fo(),
      ho(
        'a',
        {
          class: 'nav-bar-title',
          href: e.$withBase(e.$localePath),
          'aria-label': `${e.$siteByRoute.title}, back to home`
        },
        [
          e.$themeConfig.logo
            ? (fo(),
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
          wo(' ' + h(e.$site.title), 1)
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
  const t = Lr(),
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
  fs = _o(
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
  return fo(), ho('svg', as, [us, fs])
}),
  Yt('data-v-45eb32c6')
const ds = { class: 'nav-link' }
Xt()
var ps = Kn({
  expose: [],
  props: { item: { type: null, required: !0 } },
  setup(e) {
    const t = dt(e),
      { props: n, isExternal: o } = ls(t.item)
    return (t, r) => (
      fo(),
      ho('div', ds, [
        _o(
          'a',
          Oo({ class: 'item' }, at(n)),
          [
            wo(h(e.item.text) + ' ', 1),
            at(o) ? (fo(), ho(cs, { key: 0 })) : Co('v-if', !0)
          ],
          16
        )
      ])
    )
  }
})
;(ps.__scopeId = 'data-v-45eb32c6'), Yt('data-v-d552fd76')
const hs = { class: 'nav-dropdown-link-item' },
  vs = _o('span', { class: 'arrow' }, null, -1),
  ms = { class: 'text' },
  gs = { class: 'icon' }
Xt()
var ys = Kn({
  expose: [],
  props: { item: { type: null, required: !0 } },
  setup(e) {
    const t = dt(e),
      { props: n, isExternal: o } = ls(t.item)
    return (t, r) => (
      fo(),
      ho('div', hs, [
        _o(
          'a',
          Oo({ class: 'item' }, at(n)),
          [
            vs,
            _o('span', ms, h(e.item.text), 1),
            _o('span', gs, [
              at(o) ? (fo(), ho(cs, { key: 0 })) : Co('v-if', !0)
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
    const t = Lr(),
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
        fo(),
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
              (fo(!0),
              ho(
                so,
                null,
                er(
                  e.item.items,
                  e => (
                    fo(),
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
const ws = { key: 0, class: 'nav-links' },
  ks = { key: 1, class: 'item' },
  Cs = { key: 2, class: 'item' }
Xt()
var $s = Kn({
  expose: [],
  setup(e) {
    const t = jr(),
      n = (function() {
        const e = Lr(),
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
        ? (fo(),
          ho('nav', ws, [
            at(s)
              ? (fo(!0),
                ho(
                  so,
                  { key: 0 },
                  er(
                    at(s),
                    e => (
                      fo(),
                      ho('div', { key: e.text, class: 'item' }, [
                        e.items
                          ? (fo(),
                            ho(xs, { key: 0, item: e }, null, 8, ['item']))
                          : (fo(),
                            ho(ps, { key: 1, item: e }, null, 8, ['item']))
                      ])
                    )
                  ),
                  128
                ))
              : Co('v-if', !0),
            at(n)
              ? (fo(),
                ho('div', ks, [_o(xs, { item: at(n) }, null, 8, ['item'])]))
              : Co('v-if', !0),
            at(o)
              ? (fo(),
                ho('div', Cs, [_o(ps, { item: at(o) }, null, 8, ['item'])]))
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
    fo(),
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
  Ls = { class: 'nav' }
Xt()
var Is = Kn({
  expose: [],
  emits: ['toggle'],
  setup: e => (e, t) => (
    fo(),
    ho('header', Os, [
      _o(Ss, { onToggle: t[1] || (t[1] = t => e.$emit('toggle')) }),
      _o(ns),
      Rs,
      _o('div', Ls, [_o($s)]),
      qt(e.$slots, 'search', {}, void 0, !0)
    ])
  )
})
function Ps() {
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
        [s, l] = As(t, n, o)
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
    kn(() => {
      window.removeEventListener('scroll', n)
    })
}
function Ts(e) {
  const t = document.querySelector('.nav-bar').offsetHeight
  return e.parentElement.offsetTop - t - 15
}
function As(e, t, n) {
  const o = window.scrollY
  return 0 === e && 0 === o
    ? [!0, null]
    : o < Ts(t)
      ? [!1, null]
      : !n || o < Ts(n)
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
Is.__scopeId = 'data-v-5df6160f'
const Ms = e => {
  const t = Lr(),
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
var Bs = Kn({
    expose: [],
    setup(e) {
      const t = (function() {
        const e = Lr(),
          t = jr()
        return (
          Ps(),
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
          ? (fo(),
            ho('ul', Ns, [
              (fo(!0),
              ho(
                so,
                null,
                er(
                  at(t),
                  e => (
                    fo(),
                    ho(at(Ms), { key: e.text, item: e }, null, 8, ['item'])
                  )
                ),
                128
              ))
            ]))
          : Co('v-if', !0)
    }
  }),
  Vs = Kn({
    expose: [],
    props: { open: { type: Boolean, required: !0 } },
    setup: e => (t, n) => (
      fo(),
      ho(
        'aside',
        { class: ['sidebar', { open: e.open }] },
        [
          _o($s, { class: 'nav' }),
          qt(t.$slots, 'sidebar-top', {}, void 0, !0),
          _o(Bs),
          qt(t.$slots, 'sidebar-bottom', {}, void 0, !0)
        ],
        2
      )
    )
  })
Vs.__scopeId = 'data-v-58e261f2'
const Ds = /bitbucket.org/
function Ws() {
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
const Hs = { class: 'edit-link' }
Xt()
var qs = Kn({
  expose: [],
  setup(e) {
    const { url: t, text: n } = Ws()
    return (e, o) => (
      fo(),
      ho('div', Hs, [
        at(t)
          ? (fo(),
            ho(
              'a',
              {
                key: 0,
                class: 'link',
                href: at(t),
                target: '_blank',
                rel: 'noopener noreferrer'
              },
              [wo(h(at(n)) + ' ', 1), _o(cs, { class: 'icon' })],
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
          ? (fo(),
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
    fo(), ho('footer', Ys, [_o('div', Xs, [_o(qs)]), _o('div', Zs, [_o(Js)])])
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
  return fo(), ho('svg', nl, [ol])
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
  return fo(), ho('svg', sl, [ll])
}),
  Yt('data-v-6683615c')
const il = { key: 0, class: 'next-and-prev-link' },
  cl = { class: 'container' },
  al = { class: 'prev' },
  ul = { class: 'text' },
  fl = { class: 'next' },
  dl = { class: 'text' }
Xt()
var pl = Kn({
  expose: [],
  setup(e) {
    const { hasLinks: t, prev: n, next: o } = el()
    return (e, r) =>
      at(t)
        ? (fo(),
          ho('div', il, [
            _o('div', cl, [
              _o('div', al, [
                at(n)
                  ? (fo(),
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
              _o('div', fl, [
                at(o)
                  ? (fo(),
                    ho(
                      'a',
                      { key: 0, class: 'link', href: e.$withBase(at(o).link) },
                      [
                        _o('span', dl, h(at(o).text), 1),
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
;(pl.__scopeId = 'data-v-6683615c'), Yt('data-v-d36a7fda')
const hl = { class: 'page' },
  vl = { class: 'container' },
  ml = { class: 'content' }
Xt()
var gl = Kn({
  expose: [],
  setup: e => (e, t) => {
    const n = no('Content')
    return (
      fo(),
      ho('main', hl, [
        _o('div', vl, [
          qt(e.$slots, 'top', {}, void 0, !0),
          _o('div', ml, [_o(n)]),
          _o(Qs),
          _o(pl),
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
    const t = Gn(() => import('./Home.da34e339.js')),
      n = () => null,
      o = n,
      r = n,
      s = n,
      l = Lr(),
      i = Mr(),
      c = jr(),
      a = Zo(() => i.value.themeConfig),
      u = Ur(),
      f = Zo(() => !!l.data.frontmatter.customLayout),
      d = Zo(() => !!l.data.frontmatter.home),
      p = Zo(() => {
        const { themeConfig: e } = c.value,
          { frontmatter: t } = l.data
        return (
          !1 !== t.navbar &&
          !1 !== e.navbar &&
          (i.value.title || e.logo || e.repo || e.nav)
        )
      }),
      h = it(!1),
      v = Zo(() => {
        const { frontmatter: e } = l.data
        if (e.home || !1 === e.sidebar) return !1
        const { themeConfig: t } = c.value
        return !(Jr((n = es(t.sidebar, l.data.relativePath)))
          ? 0 === n.length
          : !n)
        var n
      }),
      m = e => {
        h.value = 'boolean' == typeof e ? e : !h.value
      },
      g = m.bind(null, !1)
    En(l, g)
    const y = Zo(() => [
      { 'no-navbar': !p.value, 'sidebar-open': h.value, 'no-sidebar': !v.value }
    ])
    return (e, n) => {
      const l = no('Content'),
        i = no('Debug')
      return (
        fo(),
        ho(
          so,
          null,
          [
            _o(
              'div',
              { class: ['theme', at(y)] },
              [
                at(p)
                  ? (fo(),
                    ho(
                      Is,
                      { key: 0, onToggle: m },
                      {
                        search: Qt(() => [
                          qt(e.$slots, 'navbar-search', {}, () => [
                            at(a).algolia
                              ? (fo(),
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
                  Vs,
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
                  onClick: n[1] || (n[1] = e => m(!1))
                }),
                at(f)
                  ? (fo(), ho(l, { key: 1 }))
                  : at(d)
                    ? (fo(),
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
                    : (fo(),
                      ho(
                        gl,
                        { key: 3 },
                        {
                          top: Qt(() => [
                            qt(e.$slots, 'page-top-ads', {}, () => [
                              at(a).carbonAds && at(a).carbonAds.carbon
                                ? (fo(),
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
                                ? (fo(),
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
const wl = {
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
          fo(),
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
  kl = new Set(),
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
const El = wl.NotFound || (() => '404 Not Found'),
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
                    if (!kl.has(o)) {
                      kl.add(o)
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
                      (r !== location.pathname ? n.observe(e) : kl.add(r)))
                })
              })
          }
          bn(o)
          const r = Lr()
          En(() => r.path, o),
            kn(() => {
              n && n.disconnect()
            })
        })(),
        () => Qo(wl.Layout)
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
                  Pt(() => {
                    if (l.hash && !s) {
                      const e = document.querySelector(
                        decodeURIComponent(l.hash)
                      )
                      if (e) return void Ir(e, l.hash)
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
                        Ir(t, i, t.classList.contains('header-anchor')))
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
    t = kr(Ol)
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
    })(t, Ar, n, o),
    (function(e) {
      e.component('Content', Pr),
        e.component('ClientOnly', Tr),
        e.component('Debug', () => null)
    })(t),
    wl.enhanceApp && wl.enhanceApp({ app: t, router: e, siteData: Ar }),
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
  ps as _,
  _o as a,
  wo as b,
  ho as c,
  Rl as createApp,
  ko as d,
  Xt as e,
  Co as f,
  Kn as g,
  Br as h,
  Zo as i,
  at as j,
  er as k,
  qt as l,
  fo as o,
  Yt as p,
  no as r,
  h as t,
  jr as u,
  Zt as w
}
