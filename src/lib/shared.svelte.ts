type WordBank = Record<string, string[]>
type Memoized = Record<string, string>

type AppState = {
  isModalOpen: boolean,
  memoized: Memoized
  wordBankObject: WordBank
}

export const app = $state<AppState>({ isModalOpen: false, memoized: {}, wordBankObject: {} })