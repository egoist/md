import fs from 'mz/fs'
import mmark from '../src'

process.chdir(__dirname)

test('main', () => {
  expect(typeof mmark).toBe('function')
})

describe('renderer', () => {
  it('render headings', async () => {
    const actual = mmark(await fs.readFile('./fixtures/headings.md', 'utf8'))
    const expected = await fs.readFile('./fixtures/headings.html', 'utf8')
    expect(actual).toBe(expected)
  })
})
