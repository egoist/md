import { merge } from './utils'
import defaultOptions from './defaults'
import Parser from './parser'
import Lexer from './lexer'
import Renderer from './renderer'
import InlineLexer from './inline-lexer'

function marked2(src, opt) {
  try {
    if (opt) opt = merge({}, defaultOptions, opt)
    return Parser.parse(Lexer.lex(src, opt), opt)
  } catch (err) {
    err.message += '\nPlease report this to https://github.com/egoist/marked2.'
    if ((opt || defaultOptions).silent) {
      return '<p>An error occured:</p><pre>' +
        escape(String(err.message), true) +
        '</pre>'
    }
    throw err
  }
}

marked2.Renderer = Renderer
marked2.Parser = Parser
marked2.Lexer = Lexer
marked2.InlineLexer = InlineLexer

export default marked2
