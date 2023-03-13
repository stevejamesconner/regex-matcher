import * as core from '@actions/core'
import {matcher} from './matcher'

async function run(): Promise<void> {
  try {
    const regex: string = core.getInput('regex')
    const data: string = core.getInput('data')
    const flags: string = core.getInput('flags')

    const matches = await matcher(regex, data, flags)
    let index = 0

    for (const match of matches) {
      if (index === 10) {
        return
      }

      if (index === 0) {
        core.setOutput('match', match[0])
      }

      core.setOutput(`group${index}`, match[0])
      index++
    }
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
