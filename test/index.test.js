import fs from 'mz/fs'
import marked3 from '../src'

process.chdir(__dirname)

test('main', () => {
  expect(typeof marked3).toBe('function')
})

describe('renderer', () => {
  it('render headings', async () => {
    const actual = marked3(await fs.readFile('./fixtures/headings.md', 'utf8'))
    const expected = await fs.readFile('./fixtures/headings.html', 'utf8')
    expect(actual).toBe(expected)
  })
})
