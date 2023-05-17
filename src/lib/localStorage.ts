import { DICTIONARY_TYPES } from "../constants/wordlist"


type StoredGameState = {
    guesses: string[]
    solution: string
}

export function saveGameSolutionAndGuessesToLocalStorage(dictType: DICTIONARY_TYPES, gameState: StoredGameState) {
    localStorage.setItem(dictType + '_state', JSON.stringify(gameState))
}

export function loadGameSolutionAndGuessesFromLocalStorage(dictType: DICTIONARY_TYPES) {
    const state = localStorage.getItem(dictType + '_state')
    return state ? (JSON.parse(state) as StoredGameState) : null
}


export type GameStats = {
    winDistribution: number[]
    gamesFailed: number
    currentStreak: number
    bestStreak: number
    totalGames: number
    successRate: number
}

export const saveStatsToLocalStorage = (key: DICTIONARY_TYPES, gameStats: GameStats) => {
    localStorage.setItem(key + '_stats', JSON.stringify(gameStats))
}

export const loadStatsFromLocalStorage = (key: DICTIONARY_TYPES) => {
    const stats = localStorage.getItem(key + '_stats')
    return stats ? (JSON.parse(stats) as GameStats) : null
}
