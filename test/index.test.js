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
})
