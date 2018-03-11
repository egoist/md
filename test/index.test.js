import test from 'ava'
import marked from '../src'

test('headings', t => {
  const html = marked(`
# hello

# hello

## hi there
  `)

  t.snapshot(html)
})

test('table', t => {
  const html = marked(`
|foo|bar|
|---|---|
|foo|bar|
  `)

  t.snapshot(html)
})

test('links', t => {
  const html = marked(`
[a](b)
`)

  t.snapshot(html)

  const html2 = marked(
    `
[a](b)
  `,
    { linksInNewTab: true }
  )

  t.snapshot(html2)

  const html3 = marked(
    `
[a](b)
  `,
    { linksInNewTab: () => true }
  )

  t.snapshot(html3)

  const html4 = marked(
    `
[a](b)
  `,
    { linksInNewTab: () => false }
  )

  t.snapshot(html4)
})

test('data-line', t => {
  const html = marked(`
\`\`\`js{1,2,3,5-10}
hi
\`\`\`

\`\`\`css
hello
\`\`\`
`)

  t.snapshot(html)
})
