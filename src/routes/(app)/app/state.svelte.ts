import { isAlphabetic, isDigit, isEmptyString, isSquareBracketed } from "$lib"
import { app } from "$lib/shared.svelte"
import { simlish } from "$lib/simlish"
import { wordBank } from "$lib/wordBank"

export class SimlishifyAppPageState {
  buildWordBankObject = () => {
    if (Object.keys(app.wordBankObject).length) return

    for (const i in wordBank) {
      const firstChar = wordBank[i][0]
      if (Object.keys(app.wordBankObject).includes(firstChar)) {
        app.wordBankObject[firstChar] = [...app.wordBankObject[firstChar], wordBank[i]]
      } else {
        app.wordBankObject = {
          ...app.wordBankObject,
          [wordBank[i][0]]: [wordBank[i]]
        }
      }
    }
  }

  startSimlishifying = (input: string): string => {
    let output = ''

    const bars = input.split('\n')

    for (let i = 0; i < bars.length; i++) {
      const bar = bars[i]

      if (isSquareBracketed(bar)) {
        output = output + bar + '\n'
        continue
      }

      if (isEmptyString(bar)) {
        output = output + '\n'
        continue
      }

      const words = bar.split(' ')

      for (let j = 0; j < words.length; j++) {
        const word = words[j]
        const isLastWord = j === words.length - 1
        const needWhiteSpace = j === 0 || !isLastWord

        if (isSquareBracketed(word)) break

        if (isDigit(word[0])) {
          output = output + word
          if (needWhiteSpace) output = output + ' '
          continue
        }

        if (word.includes('-')) {
          output = output + word
          if (needWhiteSpace) output = output + ' '
          continue
        }

        if (!isAlphabetic(word[0]) && !isAlphabetic(word[word.length - 1])) {
          const startSymbol = word[0]
          let endSymbolCount = 0
          for (let k = word.length; k > 0; k--) {
            if (isAlphabetic(word[k])) {
              continue
            } else {
              endSymbolCount++
            }
          }
          const endSymbol = word.slice(word.length - endSymbolCount, word.length)

          const sliced = word.slice(1, endSymbolCount * -1).toLowerCase()

          if (Object.keys(simlish).includes(sliced)) {
            output = output + `${startSymbol}${simlish[sliced]}${endSymbol}`
            continue
          }

          if (!isAlphabetic(sliced[0])) {
            output = output + word
            if (needWhiteSpace) output = output + ' '
            continue
          }

          if (sliced.length <= 3) {
            output = output + word
            if (needWhiteSpace) output = output + ' '
            continue
          }

          if (Object.keys(app.memoized).includes(sliced)) {
            output = output + `${startSymbol}${app.memoized[sliced]}${endSymbol}`
          } else {
            const wordIndex = app.wordBankObject[sliced[0]].length === 1 ? 0 : Math.floor(Math.random() * app.wordBankObject[sliced[0]].length)
            app.memoized = {
              ...app.memoized,
              [sliced]: app.wordBankObject[sliced[0]][wordIndex]
            }
            output = output + `${startSymbol}${app.memoized[sliced]}${endSymbol}`
          }

          if (needWhiteSpace) output = output + ' '
          continue
        }

        if (!isAlphabetic(word[0])) {
          const startSymbol = word[0]
          const sub = word.substring(1).toLowerCase()

          if (Object.keys(simlish).includes(sub)) {
            output = output + `${startSymbol}${simlish[sub]}`
          } else if (Object.keys(app.memoized).includes(sub)) {
            output = output + `${startSymbol}${app.memoized[sub]}`
          } else {
            const wordIndex = app.wordBankObject[sub[0]].length === 1 ? 0 : Math.floor(Math.random() * app.wordBankObject[sub[0]].length)
            app.memoized = {
              ...app.memoized,
              [sub]: app.wordBankObject[sub[0]][wordIndex]
            }
            output = output + `${startSymbol}${app.memoized[sub]}`
          }

          if (needWhiteSpace) output = output + ' '
          continue
        }

        if (!isAlphabetic(word[word.length - 1])) {
          let endSymbolCount = 0
          for (let k = word.length; k > 0; k--) {
            if (isAlphabetic(word[k])) {
              continue
            } else {
              endSymbolCount++
            }
          }
          const sliced = word.slice(0, endSymbolCount * -1).toLowerCase()
          const endSymbol = word.slice(word.length - endSymbolCount, word.length)

          if (sliced.length <= 3) {
            output = output + `${sliced}${endSymbol}`
          } else if (Object.keys(simlish).includes(sliced)) {
            output = output + `${simlish[sliced]}${endSymbol}`
          } else if (Object.keys(app.memoized).includes(sliced)) {
            output = output + `${app.memoized[sliced]}${endSymbol}`
          } else {
            const wordIndex = app.wordBankObject[sliced[0].toLowerCase()].length === 1 ? 0 : Math.floor(Math.random() * app.wordBankObject[sliced[0].toLowerCase()].length)
            app.memoized = {
              ...app.memoized,
              [sliced]: app.wordBankObject[sliced[0].toLowerCase()][wordIndex]
            }
            output = output + `${app.memoized[sliced]}${endSymbol}`
          }

          if (needWhiteSpace) output = output + ' '
          continue
        }

        if (word.length === 1 || word.length === 2) {
          output = output + word
          if (needWhiteSpace) output = output + ' '
          continue
        }

        if (Object.keys(simlish).includes(word.toLowerCase())) {
          output = output + simlish[word.toLowerCase()]
        } else if (Object.keys(app.memoized).includes(word.toLowerCase())) {
          output = output + app.memoized[word.toLowerCase()]
        } else {
          const wordIndex = app.wordBankObject[word[0].toLowerCase()].length === 1 ? 0 : Math.floor(Math.random() * app.wordBankObject[word[0].toLowerCase()].length)
          app.memoized = {
            ...app.memoized,
            [word.toLowerCase()]: app.wordBankObject[word[0].toLowerCase()][wordIndex]
          }
          output = output + app.memoized[word.toLowerCase()]
        }

        if (needWhiteSpace) output = output + ' '
      }

      output = output + '\n'
    }

    return output
  }
}