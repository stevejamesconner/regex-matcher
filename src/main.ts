import * as core from '@actions/core'
import {matcher} from './matcher'

async function run(): Promise<void> {
  try {
    const regex: string = core.getInput('regex')
    const data: string = core.getInput('data')
    const flags: string = core.getInput('flags')

    const matches = await matcher(regex, data, flags)
    let matchIndex = 1

    for (const match of matches) {
      if (matchIndex === 4) {
        return
      }

      let matchValueIndex = 0
      for (const matchValue of match) {
        if (matchValueIndex === 4) {
          return
        }

        if (matchValueIndex === 0) {
          core.setOutput(`m${matchIndex}`, matchValue)
          matchValueIndex++
          continue
        }

        core.setOutput(`m${matchIndex}g${matchValueIndex}`, matchValue)
        matchValueIndex++
      }

      matchIndex++
    }

    const jsonMatches = await matcher(regex, data, flags)
    const jsonMatchesArray = Array.from(jsonMatches)
    const jsonOutput = JSON.stringify(jsonMatchesArray)

    core.setOutput('allMatches', jsonOutput)
  } catch (error: unknown) {
    let errorMessage = ''

    if (typeof error === 'string') {
      errorMessage = error.toString()
    } else if (error instanceof Error) {
      errorMessage = error.message
    } else {
      errorMessage = 'Something went wrong processing the regular expression'
    }

    core.error(errorMessage)
    core.setFailed(errorMessage)
  }
}

run()
