export default class Renderer {
  constructor(options) {
    this.options = options || {}
  }

  code(code, lang, escaped) {
    if (this.options.highlight) {
      const out = this.options.highlight(code, lang)
      if (out !== null && out !== code) {
        escaped = true
        code = out
      }
    }

    if (!lang) {
      return `<pre><code>${escaped ? code : escape(code, true)}\n</code></pre>`
    }

    return `<pre><code class="${this.options.langPrefix}${escape(lang, true)}">${escaped ? code : escape(code, true)}\n</code></pre>\n`
  }

  blockquote(quote) {
    return `<blockquote>\n${quote}</blockquote>\n`
  }

  html(html) {
    return html
  }

  heading(text, level, raw) {
    return `<h${level} id="${this.options.headerPrefix}${raw.toLowerCase().replace(/[^\w]+/g, '-')}">${text}</h${level}>\n`
  }

  hr() {
    return this.options.xhtml ? '<hr/>\n' : '<hr>\n'
  }

  list(body, ordered, taskList) {
    const type = ordered ? 'ol' : 'ul'
    const classNames = taskList ? ' class="task-list"' : ''
    return `<${type}${classNames}>\n${body}</${type}>\n`
  }

  listitem(text, checked) {
    if (checked === undefined) {
      return `<li>${text}</li>\n`
    }

    return '<li class="task-list-item">' +
     '<input type="checkbox" class="task-list-item-checkbox"' +
     (checked ? ' checked' : '') +
     '> ' +
     text +
     '</li>\n'
  }

  paragraph(text) {
    return `<p>${text}</p>\n`
  }

  table(header, body) {
    return `<table>\n<thead>\n${header}</thead>\n<tbody>\n${body}</tbody>\n</table>\n`
  }

  tablerow(content) {
    return `<tr>\n${content}</tr>\n`
  }

  tablecell(content, flags) {
    const type = flags.header ? 'th' : 'td'
    const tag = flags.align ?
      `<${type} style="text-align:${flags.align}">` :
      `<${type}>`
    return `${tag + content}</${type}>\n`
  }

  // span level renderer
  strong(text) {
    return `<strong>${text}</strong>`
  }

  em(text) {
    return `<em>${text}</em>`
  }

  codespan(text) {
    return `<code>${text}</code>`
  }

  br() {
    return this.options.xhtml ? '<br/>' : '<br>'
  }

  del(text) {
    return `<del>${text}</del>`
  }

  link(href, title, text) {
    if (this.options.sanitize) {
      let prot
      try {
        prot = decodeURIComponent(unescape(href))
          .replace(/[^\w:]/g, '')
          .toLowerCase()
      } catch (err) {
        return ''
      }
      if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0 || prot.indexOf('data:') === 0) { // eslint-disable-line no-script-url
        return ''
      }
    }
    let out = `<a href="${href}"`
    if (title) {
      out += ` title="${title}"`
    }
    out += `>${text}</a>`
    return out
  }

  image(href, title, text) {
    let out = `<img src="${href}" alt="${text}"`
    if (title) {
      out += ` title="${title}"`
    }
    out += this.options.xhtml ? '/>' : '>'
    return out
  }

  text(text) {
    return text
  }
}
