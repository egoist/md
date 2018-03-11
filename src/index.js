import { merge, escape } from './utils'
import defaultOptions from './defaults'
import Parser from './parser'
import Lexer from './lexer'
import Renderer from './renderer'
import InlineLexer from './inline-lexer'

function md(src, opt) {
  try {
    if (opt) opt = merge({}, defaultOptions, opt)
    return Parser.parse(Lexer.lex(src, opt), opt)
  } catch (err) {
    err.message += '\nPlease report this to https://github.com/egoist/md.'
    if ((opt || defaultOptions).silent) {
      return (
        '<p>An error occurred:</p><pre>' +
        escape(String(err.message), true) +
        '</pre>'
      )
    }
    throw err
  }
}

md.Renderer = Renderer
md.Parser = Parser
md.Lexer = Lexer
md.InlineLexer = InlineLexer

export default md
