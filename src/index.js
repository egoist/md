import { merge } from './utils'
import defaultOptions from './defaults'
import Parser from './parser'
import Lexer from './lexer'
import Renderer from './renderer'
import InlineLexer from './inline-lexer'

function mmark(src, opt, callback) {
  if (callback || typeof opt === 'function') {
    if (!callback) {
      callback = opt
      opt = null
    }

    opt = merge({}, defaultOptions, opt || {})

    const highlight = opt.highlight
    let tokens
    let pending
    let i = 0

    try {
      tokens = Lexer.lex(src, opt)
    } catch (err) {
      return callback(err)
    }

    pending = tokens.length

    const done = function (error) {
      if (error) {
        opt.highlight = highlight
        return callback(error)
      }

      let out

      try {
        out = Parser.parse(tokens, opt)
      } catch (err) {
        error = err
      }

      opt.highlight = highlight

      return error ?
        callback(error) :
        callback(null, out)
    }

    if (!highlight || highlight.length < 3) {
      return done()
    }

    delete opt.highlight

    if (!pending) return done()

    for (; i < tokens.length; i++) {
      (function (token) { // eslint-disable-line no-loop-func
        if (token.type !== 'code') {
          return --pending || done()
        }
        return highlight(token.text, token.lang, (err, code) => {
          if (err) return done(err)
          if (code === null || code === token.text) {
            return --pending || done()
          }
          token.text = code
          token.escaped = true
          --pending || done()
        })
      })(tokens[i])
    }

    return
  }

  try {
    if (opt) opt = merge({}, defaultOptions, opt)
    return Parser.parse(Lexer.lex(src, opt), opt)
  } catch (err) {
    err.message += '\nPlease report this to https://github.com/egoist/mmark.'
    if ((opt || defaultOptions).silent) {
      return '<p>An error occured:</p><pre>' +
        escape(String(err.message), true) +
        '</pre>'
    }
    throw err
  }
}

mmark.Renderer = Renderer
mmark.Parser = Parser
mmark.Lexer = Lexer
mmark.InlineLexer = InlineLexer

export default mmark
