function merge(obj) {
  let i = 1
  let target
  let key

  for (; i < arguments.length; i++) {
    target = arguments[i]
    for (key in target) {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        obj[key] = target[key]
      }
    }
  }

  return obj
}

function noop() {}
noop.exec = noop

function escape(html, encode) {
  return html
    .replace(encode ? /&/g : /&(?!#?\w+;)/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function unescape(html) {
	// explicitly match decimal, hex, and named HTML entities
  return html.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/g, (_, n) => {
    n = n.toLowerCase()
    if (n === 'colon') return ':'
    if (n.charAt(0) === '#') {
      return n.charAt(1) === 'x' ?
        String.fromCharCode(parseInt(n.substring(2), 16)) :
        String.fromCharCode(Number(n.substring(1)))
    }
    return ''
  })
}

function replace(regex, opt) {
  regex = regex.source
  opt = opt || ''
  return function self(name, val) {
    if (!name) return new RegExp(regex, opt)
    val = val.source || val
    val = val.replace(/(^|[^\[])\^/g, '$1')
    regex = regex.replace(name, val)
    return self
  }
}

export {
  merge,
  noop,
  escape,
  unescape,
  replace
}
