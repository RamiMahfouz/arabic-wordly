import { DICTIONARY_TYPES } from '../constants/wordlist'
import {
    GameStats,
    loadStatsFromLocalStorage,
    saveStatsToLocalStorage,
} from './localStorage'

// In stats array elements 0-5 are successes in 1-6 trys

export function addStatsForCompletedGame(
    gameStats: GameStats,
    count: number,
    key: DICTIONARY_TYPES
) {
    // Count is number of incorrect guesses before end.
    const stats = { ...gameStats }

    stats.totalGames += 1

    if (count > 5) {
        // A fail situation
        stats.currentStreak = 0
        stats.gamesFailed += 1
    } else {
        stats.winDistribution[count] += 1
        stats.currentStreak += 1

        if (stats.bestStreak < stats.currentStreak) {
            stats.bestStreak = stats.currentStreak
        }
    }

    stats.successRate = getSuccessRate(stats)

    saveStatsToLocalStorage(key, stats)
    return stats
}

export const defaultStats: GameStats = {
    winDistribution: [0, 0, 0, 0, 0, 0],
    gamesFailed: 0,
    currentStreak: 0,
    bestStreak: 0,
    totalGames: 0,
    successRate: 0,
}

export function loadStats(key: DICTIONARY_TYPES) {
    return loadStatsFromLocalStorage(key) || defaultStats
}

function getSuccessRate(gameStats: GameStats) {
    const { totalGames, gamesFailed } = gameStats

    return Math.round(
        (100 * (totalGames - gamesFailed)) / Math.max(totalGames, 1)
    )
}
