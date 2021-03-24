  function _defineProperty(e, t, i) {
    return t in e ? Object.defineProperty(e, t, {
      value: i, enumerable: !0, configurable: !0, writable: !0,
    }) : (e[t] = i), e;
  }
  const _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
    ? function (e) {
      return typeof e;
    }
    : function (e) {
      return e && typeof Symbol === 'function' && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
    };
  !(function () {
    for (
      let e = ['DocumentType', 'Element', 'CharacterData'],
        t = function () {
          this.parentNode != null && this.parentNode.removeChild(this);
        },
        i = 0;
      i < e.length;
      i++
    ) {
      const r = e[i];
      window[r] && !window[r].prototype.remove && (window[r].prototype.remove = t);
    }
  }()),
  (function (e) {
    function t() {}
    function i(e, t) {
      return function () {
        e.apply(t, arguments);
      };
    }
    function r(e) {
      if (_typeof(this) !== 'object') throw new TypeError('Promises must be constructed via new');
      if (typeof e !== 'function') throw new TypeError('not a function');
      (this._state = 0), (this._handled = !1), (this._value = void 0), (this._deferreds = []), u(e, this);
    }
    function n(e, t) {
      for (; e._state === 3;) e = e._value;
      return e._state === 0
        ? void e._deferreds.push(t)
        : ((e._handled = !0),
        void r._immediateFn(() => {
          const i = e._state === 1 ? t.onFulfilled : t.onRejected;
          if (i === null) return void (e._state === 1 ? o : s)(t.promise, e._value);
          let r;
          try {
            r = i(e._value);
          } catch (n) {
            return void s(t.promise, n);
          }
          o(t.promise, r);
        }));
    }
    function o(e, t) {
      try {
        if (t === e) throw new TypeError('A promise cannot be resolved with itself.');
        if (t && ((typeof t === 'undefined' ? 'undefined' : _typeof(t)) === 'object' || typeof t === 'function')) {
          const n = t.then;
          if (t instanceof r) return (e._state = 3), (e._value = t), void a(e);
          if (typeof n === 'function') return void u(i(n, t), e);
        }
        (e._state = 1), (e._value = t), a(e);
      } catch (o) {
        s(e, o);
      }
    }
    function s(e, t) {
      (e._state = 2), (e._value = t), a(e);
    }
    function a(e) {
      e._state === 2
        && e._deferreds.length === 0
        && r._immediateFn(() => {
          e._handled || r._unhandledRejectionFn(e._value);
        });
      for (let t = 0, i = e._deferreds.length; t < i; t++) n(e, e._deferreds[t]);
      e._deferreds = null;
    }
    function l(e, t, i) {
      (this.onFulfilled = typeof e === 'function' ? e : null), (this.onRejected = typeof t === 'function' ? t : null), (this.promise = i);
    }
    function u(e, t) {
      let i = !1;
      try {
        e(
          (e) => {
            i || ((i = !0), o(t, e));
          },
          (e) => {
            i || ((i = !0), s(t, e));
          },
        );
      } catch (r) {
        if (i) return;
        (i = !0), s(t, r);
      }
    }
    const d = setTimeout;
    (r.prototype.catch = function (e) {
      return this.then(null, e);
    }),
    (r.prototype.then = function (e, i) {
      const r = new this.constructor(t);
      return n(this, new l(e, i, r)), r;
    }),
    (r.all = function (e) {
      const t = Array.prototype.slice.call(e);
      return new r((e, i) => {
        function r(o, s) {
          try {
            if (s && ((typeof s === 'undefined' ? 'undefined' : _typeof(s)) === 'object' || typeof s === 'function')) {
              const a = s.then;
              if (typeof a === 'function') {
                return void a.call(
                  s,
                  (e) => {
                    r(o, e);
                  },
                  i,
                );
              }
            }
            (t[o] = s), --n === 0 && e(t);
          } catch (l) {
            i(l);
          }
        }
        if (t.length === 0) return e([]);
        for (var n = t.length, o = 0; o < t.length; o++) r(o, t[o]);
      });
    }),
    (r.resolve = function (e) {
      return e && (typeof e === 'undefined' ? 'undefined' : _typeof(e)) === 'object' && e.constructor === r
        ? e
        : new r((t) => {
          t(e);
        });
    }),
    (r.reject = function (e) {
      return new r((t, i) => {
        i(e);
      });
    }),
    (r.race = function (e) {
      return new r((t, i) => {
        for (let r = 0, n = e.length; r < n; r++) e[r].then(t, i);
      });
    }),
    (r._immediateFn = (typeof setImmediate === 'function'
          && function (e) {
            setImmediate(e);
          })
        || function (e) {
          d(e, 0);
        }),
    (r._unhandledRejectionFn = function (e) {
      typeof console !== 'undefined' && console && console.warn('Possible Unhandled Promise Rejection:', e);
    }),
    (r._setImmediateFn = function (e) {
      r._immediateFn = e;
    }),
    (r._setUnhandledRejectionFn = function (e) {
      r._unhandledRejectionFn = e;
    }),
    typeof module !== 'undefined' && module.exports ? (module.exports = r) : e.Promise || (e.Promise = r);
  }(window)),
  (function (e) {
    e.Promise || (e.Promise = Promise);
    const t = 'required';
    const i = 'email';
    const r = 'minLength';
    const n = 'maxLength';
    const o = 'password';
    const s = 'zip';
    const a = 'phone';
    const l = 'remote';
    const u = 'strength';
    const d = 'function';
    const c = function (e, t) {
      if (typeof e === 'string') return e;
      const i = t.toLowerCase() === 'post' ? '' : '?';
      return Array.isArray(e)
        ? i
              + e
                .map((e) => `${e.name}=${e.value}`)
                .join('&')
        : i
              + Object.keys(e)
                .map((t) => `${t}=${e[t]}`)
                .join('&');
    };
    const h = function (e) {
      const t = e.url;
      const i = e.method;
      const r = e.data;
      const n = e.debug;
      const o = e.callback;
      const s = e.error;
      if (n) return void o('test');
      const a = e.async !== !1;
      const l = new XMLHttpRequest();
      let u = c(r, 'get');
      let d = null;
      i.toLowerCase() === 'post' && ((d = c(r, 'post')), (u = '')),
      l.open(i, t + u, a),
      l.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'),
      (l.onreadystatechange = function () {
        this.readyState === 4 && (this.status === 200 ? o(this.responseText) : s && s(this.responseText));
      }),
      l.send(d);
    };
    const f = function (e, t) {
      (this.options = t || {}),
      (this.rules = this.options.rules || {}),
      (this.messages = this.options.messages || void 0),
      (this.colorWrong = this.options.colorWrong || '#B81111'),
      (this.result = {}),
      (this.elements = []),
      (this.tooltip = this.options.tooltip || {}),
      (this.tooltipFadeOutTime = this.tooltip.fadeOutTime || 5e3),
      (this.tooltipFadeOutClass = this.tooltip.fadeOutClass || 'just-validate-tooltip-hide'),
      (this.tooltipSelectorWrap = document.querySelectorAll(this.tooltip.selectorWrap).length
        ? document.querySelectorAll(this.tooltip.selectorWrap)
        : document.querySelectorAll('.just-validate-tooltip-container')),
      (this.bindHandlerKeyup = this.handlerKeyup.bind(this)),
      (this.submitHandler = this.options.submitHandler || void 0),
      (this.invalidFormCallback = this.options.invalidFormCallback || void 0),
      (this.promisesRemote = []),
      (this.isValidationSuccess = !1),
      (this.focusWrongField = this.options.focusWrongField || !1),
      (this.REGEXP = {
        email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        zip: /^\d{5}(-\d{4})?$/,
        phone: /^([0-9]( |-)?)?(\(?[0-9]{3}\)?|[0-9]{3})( |-)?([0-9]{3}( |-)?[0-9]{4}|[a-zA-Z0-9]{7})$/,
        password: /[^\w\d]*(([0-9]+.*[A-Za-z]+.*)|[A-Za-z]+.*([0-9]+.*))/,
        strengthPass: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/,
      }),
      (this.DEFAULT_REMOTE_ERROR = 'Error'),
      (this.state = { tooltipsTimer: null }),
      this.setForm(document.querySelector(e));
    };
    (f.prototype = {
      defaultRules: {
        email: { required: !0, email: !0 },
        name: { required: !0, minLength: 3, maxLength: 15 },
        text: { required: !0, maxLength: 300, minLength: 5 },
        password: {
          required: !0, password: !0, minLength: 4, maxLength: 8,
        },
        zip: { required: !0, zip: !0 },
        phone: { phone: !0 },
      },
      defaultMessages: {
        required: 'The field is required',
        email: 'Please, type a valid email',
        maxLength: 'The field must contain a maximum of :value characters',
        minLength: 'The field must contain a minimum of :value characters',
        password: 'Password is not valid',
        remote: 'Email already exists',
        strength: 'Password must contents at least one uppercase letter, one lowercase letter and one number',
        function: 'Function returned false',
      },
      handlerKeyup(e) {
        const t = e.target;
        const i = { name: t.getAttribute('data-validate-field'), value: t.value };
        delete this.result[i.name], this.validateItem({
          name: i.name, value: i.value, group: [], isKeyupChange: !0,
        }), this.renderErrors();
      },
      setterEventListener(e, t, i, r) {
        switch ((t === 'keyup' && (i = this.bindHandlerKeyup), r)) {
        case 'add':
          e.addEventListener(t, i);
          break;
        case 'remove':
          e.removeEventListener(t, i);
        }
      },
      getElementsRealValue() {
        for (var e = this.$form.querySelectorAll('*'), t = void 0, i = {}, r = 0, n = e.length; r < n; ++r) {
          if ((t = e[r].getAttribute('name'))) {
            if (e[r].type === 'checkbox') {
              i[t] = e[r].checked;
              continue;
            }
            i[t] = e[r].value;
          }
        }
        return i;
      },
      validationFailed() {
        this.invalidFormCallback && this.invalidFormCallback(this.result);
        const e = document.querySelector('.js-validate-error-field');
        this.focusWrongField && e && e.focus && e.focus();
      },
      validationSuccess() {
        if (Object.keys(this.result).length === 0) {
          if (((this.isValidationSuccess = !1), this.submitHandler)) {
            const e = this.getElementsRealValue();
            return void this.submitHandler(this.$form, e, h);
          }
          this.$form.submit();
        }
      },
      setForm(e) {
        const t = this;
        (this.$form = e),
        this.$form.setAttribute('novalidate', 'novalidate'),
        this.$form.addEventListener('submit', (e) => (
          e.preventDefault(),
          (t.result = []),
          t.getElements(),
          t.promisesRemote.length
            ? void Promise.all(t.promisesRemote).then(() => {
              (t.promisesRemote = []), t.isValidationSuccess ? t.validationSuccess() : t.validationFailed();
            })
            : void (t.isValidationSuccess ? t.validationSuccess() : t.validationFailed())
        ));
      },
      isEmail(e) {
        return this.REGEXP.email.test(e);
      },
      isZip(e) {
        return this.REGEXP.zip.test(e);
      },
      isPhone(e) {
        return this.REGEXP.phone.test(e);
      },
      isPassword(e) {
        return this.REGEXP.password.test(e);
      },
      isEmpty(e) {
        let t = e;
        return e.trim && (t = e.trim()), !t;
      },
      checkLengthMax(e, t) {
        return e.length <= t;
      },
      checkLengthMin(e, t) {
        return e.length >= t;
      },
      checkStrengthPass(e) {
        return this.REGEXP.strengthPass.test(e);
      },
      getElements() {
        const e = this;
        const t = this.$form.querySelectorAll('[data-validate-field]');
        this.elements = [];
        for (
          let i = function (i, r) {
              const n = t[i];
              const o = n.getAttribute('data-validate-field');
              let s = n.value;
              let a = !1;
              const l = [];
              if (
                (n.type === 'checkbox'
                  && ((s = n.checked || ''),
                  n.addEventListener('change', (t) => {
                    const i = t.target;
                    const r = { name: i.getAttribute('data-validate-field'), value: i.checked };
                    delete e.result[r.name], e.validateItem({ name: r.name, value: r.value, group: [] }), e.renderErrors();
                  })),
                n.type === 'radio')
              ) {
                const u = e.elements.filter((e) => {
                  if (e.name === o) return e;
                })[0];
                u ? (u.group.push(n.checked), (a = !0)) : l.push(n.checked),
                n.addEventListener('change', (t) => {
                  const i = t.target;
                  const r = { name: i.getAttribute('data-validate-field'), value: i.checked };
                  delete e.result[r.name], e.validateItem({ name: r.name, value: r.value, group: [] }), e.renderErrors();
                });
              }
              e.setterEventListener(n, 'keyup', e.handlerKeyup, 'add'), a || e.elements.push({ name: o, value: s, group: l });
            },
            r = 0,
            n = t.length;
          r < n;
          ++r
        ) i(r, n);
        this.validateElements();
      },
      validateRequired(e) {
        return !this.isEmpty(e);
      },
      validateEmail(e) {
        return this.isEmail(e);
      },
      validatePhone(e) {
        return this.isPhone(e);
      },
      validateMinLength(e, t) {
        return this.checkLengthMin(e, t);
      },
      validateMaxLength(e, t) {
        return this.checkLengthMax(e, t);
      },
      validateStrengthPass(e) {
        return this.checkStrengthPass(e);
      },
      validatePassword(e) {
        return this.isPassword(e);
      },
      validateZip(e) {
        return this.isZip(e);
      },
      validateRemote(e) {
        const t = e.value;
        const i = e.name;
        const r = e.url;
        const n = e.successAnswer;
        const o = e.sendParam;
        const s = e.method;
        return new Promise((e) => {
          h({
            url: r,
            method: s,
            data: _defineProperty({}, o, t),
            async: !0,
            callback(t) {
              t.toLowerCase() === n.toLowerCase() && e('ok'), e({ type: 'incorrect', name: i });
            },
            error() {
              e({ type: 'error', name: i });
            },
          });
        });
      },
      generateMessage(e, t, i) {
        const r = this.messages || this.defaultMessages;
        let n = (r[t] && r[t][e])
            || (this.messages && typeof this.messages[t] === 'string' && r[t])
            || this.defaultMessages[e]
            || this.DEFAULT_REMOTE_ERROR;
        i && (n = n.replace(':value', i.toString())), (this.result[t] = { message: n });
      },
      validateElements() {
        const e = this;
        return (
          this.lockForm(),
          this.elements.forEach((t) => {
            e.validateItem({ name: t.name, value: t.value, group: t.group });
          }),
          this.promisesRemote.length
            ? void Promise.all(this.promisesRemote).then((t) => {
              t.forEach((t) => (t === 'ok'
                ? void e.renderErrors()
                : (t.type === 'error' && alert('Server error occured. Please try later.'), e.generateMessage(l, t.name), void e.renderErrors())));
            })
            : void this.renderErrors()
        );
      },
      validateItem(e) {
        const c = this;
        const h = e.name;
        const f = e.group;
        const m = e.value;
        const v = e.isKeyupChange;
        const p = this.rules[h] || this.defaultRules[h] || !1;
        if (p) {
          for (const g in p) {
            const y = p[g];
            if (g !== t && g !== d && m == '') return;
            switch (g) {
            case d:
              if (typeof y !== 'function') break;
              if (y(h, m)) break;
              return void this.generateMessage(d, h, y);
            case t:
              if (!y) break;
              if (f.length) {
                var b = !1;
                if (
                  (f.forEach((e) => {
                    c.validateRequired(e) && (b = !0);
                  }),
                  b)
                ) break;
              } else if (this.validateRequired(m)) break;
              return void this.generateMessage(t, h);
            case i:
              if (!y) break;
              if (this.validateEmail(m)) break;
              return void this.generateMessage(i, h);
            case r:
              if (!y) break;
              if (this.validateMinLength(m, y)) break;
              return void this.generateMessage(r, h, y);
            case n:
              if (!y) break;
              if (this.validateMaxLength(m, y)) break;
              return void this.generateMessage(n, h, y);
            case a:
              if (!y) break;
              if (this.validatePhone(m)) break;
              return void this.generateMessage(a, h);
            case o:
              if (!y) break;
              if (this.validatePassword(m)) break;
              return void this.generateMessage(o, h);
            case u:
              if (!y || (typeof y === 'undefined' ? 'undefined' : _typeof(y)) !== 'object') break;
              if (y.default && this.validateStrengthPass(m)) break;
              if (y.custom) {
                let E = void 0;
                try {
                  E = new RegExp(y.custom);
                } catch (w) {
                  (E = this.REGEXP.strengthPass), console.error('Custom regexp for strength rule is not valid. Default regexp was used.');
                }
                if (E.test(m)) break;
              }
              return void this.generateMessage(u, h);
            case s:
              if (!y) break;
              if (this.validateZip(m)) break;
              return void this.generateMessage(s, h);
            case l:
              if (v) break;
              if (!y) break;
              var k = y.url;
              var _ = y.successAnswer;
              var P = y.method;
              var R = y.sendParam;
              var S = this.$form.querySelector(`input[data-validate-field="${h}"]`);
              return (
                this.setterEventListener(S, 'keyup', this.handlerKeyup, 'remove'),
                void this.promisesRemote.push(this.validateRemote({
                  name: h, value: m, url: k, method: P, sendParam: R, successAnswer: _,
                }))
              );
            }
          }
        }
      },
      clearErrors() {
        for (var e = document.querySelectorAll('.js-validate-error-label'), t = 0, i = e.length; t < i; ++t) e[t].remove();
        e = document.querySelectorAll('.js-validate-error-field');
        for (let r = 0, n = e.length; r < n; ++r) e[r].classList.remove('js-validate-error-field'), (e[r].style.border = ''), (e[r].style.color = '');
      },
      renderErrors() {
        const e = this;
        if ((this.clearErrors(), this.unlockForm(), (this.isValidationSuccess = !1), Object.keys(this.result).length === 0)) return void (this.isValidationSuccess = !0);
        for (const t in this.result) {
          const i = this.result[t].message;
          const r = this.$form.querySelectorAll(`[data-validate-field="${t}"]`);
          const n = r[r.length - 1];
          const o = document.createElement('div');
          if (
            ((o.innerHTML = i),
            (o.className = 'js-validate-error-label'),
            o.setAttribute('style', `color: ${this.colorWrong}`),
            (n.style.border = `1px solid ${this.colorWrong}`),
            (n.style.color = `${this.colorWrong}`),
            n.classList.add('js-validate-error-field'),
            n.type === 'checkbox' || n.type === 'radio')
          ) {        const s = document.querySelector(`label[for="${n.getAttribute('id')}"]`); n.parentNode.tagName.toLowerCase() === 'label'  ? n.parentNode.parentNode.insertBefore(o, null)
              : s  ? s.parentNode.insertBefore(o, s.nextSibling) : n.parentNode.insertBefore(o, n.nextSibling);  } else n.parentNode.insertBefore(o, n.nextSibling);  }   this.tooltipSelectorWrap.length && (this.state.tooltipsTimer = setTimeout(() => { e.hideTooltips();}, this.tooltipFadeOutTime)); },  hideTooltips() { const e = this; const t = document.querySelectorAll('.js-validate-error-label'); t.forEach((t) => { t.classList.add(e.tooltipFadeOutClass); }),(this.state.tooltipsTimer = null);}, lockForm() {   for (let e = this.$form.querySelectorAll('input, textarea, button, select'), t = 0, i = e.length; t < i; ++t) {
          e[t].setAttribute('disabled', 'disabled'),    (e[t].style.pointerEvents = 'none'),          (e[t].style.webitFilter = 'grayscale(100%)'),     (e[t].style.filter = 'grayscale(100%)');        }      },      unlockForm() {        for (let e = this.$form.querySelectorAll('input, textarea, button, select'), t = 0, i = e.length; t < i; ++t) e[t].removeAttribute('disabled'), (e[t].style.pointerEvents = ''), (e[t].style.webitFilter = ''), (e[t].style.filter = '');
      },    }),    (e.JustValidate = f);  }(window));
