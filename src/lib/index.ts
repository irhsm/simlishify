export const website = 'https://www.simlishify.cc'

export function isDigit(char: string): boolean {
  return /^[0-9]$/.test(char)
}

export function isAlphabetic(input: string): boolean {
  return /^[A-Za-z]+$/.test(input)
}

export function isSquareBracketed(str: string): boolean {
  return str.startsWith('[') && str.endsWith(']')
}

export function isEmptyString(str: string): boolean {
  return !str || str.trim() === ''
}
