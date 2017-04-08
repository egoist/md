import defaultOptions from './defaults'
import InlineLexer from './inline-lexer'
import Renderer from './renderer'

/**
 * Parsing & Compiling
 */

export default class Parser {
  constructor(options = defaultOptions) {
    this.tokens = []
    this.token = null
    this.options = options
    this.options.renderer = this.options.renderer || new Renderer()
    this.renderer = this.options.renderer
    this.renderer.options = this.options
  }

  static parse(src, options, renderer) {
    return new Parser(options, renderer).parse(src)
  }

  /**
   * Parse Loop
   */

  parse(src) {
    this.inline = new InlineLexer(src.links, this.options, this.renderer)
    this.tokens = src.reverse()

    let out = ''
    while (this.next()) {
      out += this.tok()
    }

    // Remove cached headings
    this.renderer._headings = []
    return out
  }

  /**
   * Next Token
   */

  next() {
    this.token = this.tokens.pop()
    return this.token
  }

  /**
   * Preview Next Token
   */

  peek() {
    return this.tokens[this.tokens.length - 1] || 0
  }

  /**
   * Parse Text Tokens
   */

  parseText() {
    let body = this.token.text

    while (this.peek().type === 'text') {
      body += `\n${this.next().text}`
    }

    return this.inline.output(body)
  }

  /**
   * Parse Current Token
   */

  tok() {
    switch (this.token.type) {
      case 'space': {
        return ''
      }
      case 'hr': {
        return this.renderer.hr()
      }
      case 'heading': {
        return this.renderer.heading(
          this.inline.output(this.token.text),
          this.token.depth,
          this.token.text)
      }
      case 'code': {
        return this.renderer.code(this.token.text,
          this.token.lang,
          this.token.escaped)
      }
      case 'table': {
        let header = ''
        let body = ''
        let i
        let row
        let cell
        let j

        // header
        cell = ''
        for (i = 0; i < this.token.header.length; i++) {
          cell += this.renderer.tablecell(
            this.inline.output(this.token.header[i]),
            { header: true, align: this.token.align[i] }
          )
        }
        header += this.renderer.tablerow(cell)

        for (i = 0; i < this.token.cells.length; i++) {
          row = this.token.cells[i]

          cell = ''
          for (j = 0; j < row.length; j++) {
            cell += this.renderer.tablecell(
              this.inline.output(row[j]),
              { header: false, align: this.token.align[j] }
            )
          }

          body += this.renderer.tablerow(cell)
        }
        return this.renderer.table(header, body)
      }
      case 'blockquote_start': {
        let body = ''

        while (this.next().type !== 'blockquote_end') {
          body += this.tok()
        }

        return this.renderer.blockquote(body)
      }
      case 'list_start': {
        let body = ''
        let taskList = false
        const ordered = this.token.ordered

        while (this.next().type !== 'list_end') {
          if (this.token.checked !== undefined) {
            taskList = true
          }
          body += this.tok()
        }

        return this.renderer.list(body, ordered, taskList)
      }
      case 'list_item_start': {
        let body = ''
        const checked = this.token.checked

        while (this.next().type !== 'list_item_end') {
          body += this.token.type === 'text' ?
            this.parseText() :
            this.tok()
        }

        return this.renderer.listitem(body, checked)
      }
      case 'loose_item_start': {
        let body = ''
        const checked = this.token.checked

        while (this.next().type !== 'list_item_end') {
          body += this.tok()
        }

        return this.renderer.listitem(body, checked)
      }
      case 'html': {
        const html = !this.token.pre && !this.options.pedantic ?
          this.inline.output(this.token.text) :
          this.token.text
        return this.renderer.html(html)
      }
      case 'paragraph': {
        return this.renderer.paragraph(this.inline.output(this.token.text))
      }
      case 'text': {
        return this.renderer.paragraph(this.parseText())
      }
      default: {
        throw new Error('Unknow type')
      }
    }
  }
}
