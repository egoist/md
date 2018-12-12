import marked from '../src'

test('headings', () => {
  const html = marked(`
# hello

# hello

## hi there
  `)

  expect(html).toMatchSnapshot()
})

test('table', () => {
  const html = marked(`
|foo|bar|
|---|---|
|foo|bar|
  `)

  expect(html).toMatchSnapshot()
})

test('links', () => {
  const html = marked(`
[a](b)
`)

  expect(html).toMatchSnapshot()

  const html2 = marked(
    `
[a](b)
  `,
    { linksInNewTab: true }
  )

  expect(html2).toMatchSnapshot()

  const html3 = marked(
    `
[a](b)
  `,
    { linksInNewTab: () => true }
  )

  expect(html3).toMatchSnapshot()

  const html4 = marked(
    `
[a](b)
  `,
    { linksInNewTab: () => false }
  )

  expect(html4).toMatchSnapshot()
})

test('data-line', () => {
  const html = marked(`
\`\`\`js{1,2,3,5-10}
hi
\`\`\`

\`\`\`css
hello
\`\`\`
`)

  expect(html).toMatchSnapshot()
})

test('inline-code', () => {
  const html = marked(`
Paragraph with \`some inline code\`.
  `,
    { codeSpanHighlighted: true }
  )

  expect(html).toMatchSnapshot()
})
