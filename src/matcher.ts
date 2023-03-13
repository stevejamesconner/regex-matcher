export async function matcher(regex: string, data: string, flags: string): Promise<Iterable<RegExpMatchArray>> {
  return new Promise(resolve => {
    if (regex === null || regex.trim() === '') {
      throw new Error('regex input is null or empty')
    }

    const regExp = new RegExp(regex, flags)
    resolve(data.matchAll(regExp))
  })
}