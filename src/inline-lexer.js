import defaultOptions from './defaults'
import Renderer from './renderer'
import inlineRules from './inline-rules'
import { escape } from './utils'

class InlineLexer {
  constructor(links, options = defaultOptions) {
    this.options = options
    this.links = links
    this.renderer = this.options.renderer || new Renderer()
    this.renderer.options = this.options

    if (!this.links) {
      throw new Error('Tokens array requires a `links` property.')
    }

    if (this.options.gfm) {
      if (this.options.breaks) {
        this.rules = inlineRules.breaks
      } else {
        this.rules = inlineRules.gfm
      }
    } else if (this.options.pedantic) {
      this.rules = inlineRules.pedantic
    } else {
      this.rules = inlineRules.normal
    }
  }

  static output(src, links, options) {
    return new InlineLexer(links, options).output(src)
  }

  output(src) {
    let out = ''
    let link
    let text
    let href
    let cap

    while (src) {
      // escape
      if (cap = this.rules.escape.exec(src)) {
        src = src.substring(cap[0].length)
        out += cap[1]
        continue
      }

      // autolink
      if (cap = this.rules.autolink.exec(src)) {
        src = src.substring(cap[0].length)
        if (cap[2] === '@') {
          text = cap[1].charAt(6) === ':' ?
            this.mangle(cap[1].substring(7)) :
            this.mangle(cap[1])
          href = this.mangle('mailto:') + text
        } else {
          text = escape(cap[1])
          href = text
        }
        out += this.renderer.link(href, null, text)
        continue
      }

      // url (gfm)
      if (!this.inLink && (cap = this.rules.url.exec(src))) {
        src = src.substring(cap[0].length)
        text = escape(cap[1])
        href = text
        out += this.renderer.link(href, null, text)
        continue
      }

      // tag
      if (cap = this.rules.tag.exec(src)) {
        if (!this.inLink && /^<a /i.test(cap[0])) {
          this.inLink = true
        } else if (this.inLink && /^<\/a>/i.test(cap[0])) {
          this.inLink = false
        }
        src = src.substring(cap[0].length)
        out += this.options.sanitize ?
          this.options.sanitizer ?
            this.options.sanitizer(cap[0]) :
            escape(cap[0]) :
          cap[0]
        continue
      }

      // link
      if (cap = this.rules.link.exec(src)) {
        src = src.substring(cap[0].length)
        this.inLink = true
        out += this.outputLink(cap, {
          href: cap[2],
          title: cap[3]
        })
        this.inLink = false
        continue
      }

      // reflink, nolink
      if ((cap = this.rules.reflink.exec(src)) ||
          (cap = this.rules.nolink.exec(src))) {
        src = src.substring(cap[0].length)
        link = (cap[2] || cap[1]).replace(/\s+/g, ' ')
        link = this.links[link.toLowerCase()]
        if (!link || !link.href) {
          out += cap[0].charAt(0)
          src = cap[0].substring(1) + src
          continue
        }
        this.inLink = true
        out += this.outputLink(cap, link)
        this.inLink = false
        continue
      }

      // strong
      if (cap = this.rules.strong.exec(src)) {
        src = src.substring(cap[0].length)
        out += this.renderer.strong(this.output(cap[2] || cap[1]))
        continue
      }

      // em
      if (cap = this.rules.em.exec(src)) {
        src = src.substring(cap[0].length)
        out += this.renderer.em(this.output(cap[2] || cap[1]))
        continue
      }

      // code
      if (cap = this.rules.code.exec(src)) {
        src = src.substring(cap[0].length)
        out += this.renderer.codespan(escape(cap[2], true))
        continue
      }

      // br
      if (cap = this.rules.br.exec(src)) {
        src = src.substring(cap[0].length)
        out += this.renderer.br()
        continue
      }

      // del (gfm)
      if (cap = this.rules.del.exec(src)) {
        src = src.substring(cap[0].length)
        out += this.renderer.del(this.output(cap[1]))
        continue
      }

      // text
      if (cap = this.rules.text.exec(src)) {
        src = src.substring(cap[0].length)
        out += this.renderer.text(escape(this.smartypants(cap[0])))
        continue
      }

      if (src) {
        throw new Error('Infinite loop on byte: ' + src.charCodeAt(0))
      }
    }

    return out
  }

  outputLink(cap, link) {
    const href = escape(link.href)
    const title = link.title ? escape(link.title) : null

    return cap[0].charAt(0) === '!' ?
      this.renderer.image(href, title, escape(cap[1])) :
      this.renderer.link(href, title, this.output(cap[1]))
  }

  smartypants(text) {
    if (!this.options.smartypants) return text
    return text
      // em-dashes
      .replace(/---/g, '\u2014')
      // en-dashes
      .replace(/--/g, '\u2013')
      // opening singles
      .replace(/(^|[-\u2014/(\[{"\s])'/g, '$1\u2018')
      // closing singles & apostrophes
      .replace(/'/g, '\u2019')
      // opening doubles
      .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1\u201c')
      // closing doubles
      .replace(/"/g, '\u201d')
      // ellipses
      .replace(/\.{3}/g, '\u2026')
  }

  mangle(text) {
    if (!this.options.mangle) return text
    let out = ''
    let i = 0
    let ch

    for (; i < text.length; i++) {
      ch = text.charCodeAt(i)
      if (Math.random() > 0.5) {
        ch = 'x' + ch.toString(16)
      }
      out += '&#' + ch + ';'
    }

    return out
  }
}

InlineLexer.rules = inlineRules

export default InlineLexer
