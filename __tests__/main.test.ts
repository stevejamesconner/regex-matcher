import {matcher} from '../src/matcher'
import {expect, test} from '@jest/globals'
test('Extracts Number From String', async () => {
  const matches = await matcher('\\d+', 'v1/develop', 'g')
  const matchesArray = Array.from(matches)
  expect(matchesArray.length).toBe(1)
  expect(matchesArray[0].length).toBe(1)
  expect(matchesArray[0][0]).toBe('1')
})

test('Extracts Major Number From Semver', async () => {
  const matches = await matcher('(\\d+).', '2.3.4', 'g')
  const matchesArray = Array.from(matches)
  expect(matchesArray.length).toBe(2)
  expect(matchesArray[0].length).toBe(2)
  expect(matchesArray[0][0]).toBe('2.')
  expect(matchesArray[0][1]).toBe('2')
  expect(matchesArray[1].length).toBe(2)
  expect(matchesArray[1][0]).toBe('3.')
  expect(matchesArray[1][1]).toBe('3')
})

test('Regex Matches Converts to JSON', async () => {
  const matches = await matcher('\\d+', 'v1/develop', 'g')
  const matchesArray = Array.from(matches)
  const jsonData = JSON.stringify(matchesArray)
  expect(jsonData).toBe('[["1"]]')
})

test('Regex Matches Converts to JSON with Groups', async () => {
  const matches = await matcher('(\\d+).', '2.3.4', 'g')
  const matchesArray = Array.from(matches)
  const jsonData = JSON.stringify(matchesArray)
  expect(jsonData).toBe('[["2.","2"],["3.","3"]]')
})