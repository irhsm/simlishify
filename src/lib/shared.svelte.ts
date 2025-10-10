type WordBank = Record<string, string[]>
type Memoized = Record<string, string>

type AppState = {
  memoized: Memoized
  wordBankObject: WordBank
}

export const app = $state<AppState>({ memoized: {}, wordBankObject: {} })