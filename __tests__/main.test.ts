import {matcher} from '../src/matcher'
import {expect, test} from '@jest/globals'
test('Extracts Number From String', async () => {
  const matches = await matcher('\d+', 'v1/develop', 'g')
  const matchesArray = Array.from(matches)
  expect(matchesArray.length).toBe(1)
  expect(matchesArray[0]).toBe('1')
})
