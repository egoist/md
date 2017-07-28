import { merge } from './utils'
import defaultOptions from './defaults'
import Parser from './parser'
import Lexer from './lexer'
import Renderer from './renderer'
import InlineLexer from './inline-lexer'

function marked3(src, opt) {
  try {
    if (opt) opt = merge({}, defaultOptions, opt)
    return Parser.parse(Lexer.lex(src, opt), opt)
  } catch (err) {
    err.message += '\nPlease report this to https://github.com/egoist/marked3.'
    if ((opt || defaultOptions).silent) {
      return '<p>An error occurred:</p><pre>' +
        escape(String(err.message), true) +
        '</pre>'
    }
    throw err
  }
}

marked3.Renderer = Renderer
marked3.Parser = Parser
marked3.Lexer = Lexer
marked3.InlineLexer = InlineLexer

export default marked3
