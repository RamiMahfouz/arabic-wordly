import Countdown from 'react-countdown'
import { StatBar } from '../stats/StatBar'
//import { Histogram } from '../stats/Histogram'
import { GameStats } from '../../lib/localStorage'
import { shareStatus } from '../../lib/share'
import { BaseModal } from './BaseModal'
import {
    STATISTICS_TITLE,
    //GUESS_DISTRIBUTION_TEXT,
    NEW_WORD_TEXT,
    SHARE_TEXT,
} from '../../constants/strings'
import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../root'
import { closeDialog } from '../../store/actions/dialogs'

type StatsModalProps = {
    guesses: string[]
    gameStats: GameStats
    isGameLost: boolean
    isGameWon: boolean
    handleShare: () => void,
    tomorrow: number,
    solutionIndex: number,
    solution: string,
}

export function StatsModal({
    guesses,
    gameStats,
    isGameLost,
    isGameWon,
    handleShare,
    tomorrow,
    solution,
    solutionIndex,
}: StatsModalProps) {


    const isOpen = useSelector((state: RootState) => state.dialogs.stats);
    const dispatch = useDispatch();
    const handleClose = useCallback(() => dispatch(closeDialog({ dialogName: 'stats' })), []);


    if (gameStats.totalGames <= 0) {
        return (
            <BaseModal
                title={STATISTICS_TITLE}
                isOpen={isOpen}
                handleClose={handleClose}
            >
                <StatBar gameStats={gameStats} />
            </BaseModal>
        )
    }
    return (
        <BaseModal
            title={STATISTICS_TITLE}
            isOpen={isOpen}
            handleClose={handleClose}
        >
            <StatBar gameStats={gameStats} />

            {/*
            <h4 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
                {GUESS_DISTRIBUTION_TEXT}
            </h4>

            <Histogram gameStats={gameStats} />
            */}
            {(isGameLost || isGameWon) && (
                <div className="mt-5 sm:mt-6 columns-2 dark:text-white">
                    <div>
                        <h5>{NEW_WORD_TEXT}</h5>
                        <Countdown
                            className="text-lg font-medium text-gray-900 dark:text-gray-100"
                            date={tomorrow}
                            daysInHours={true}
                        />
                    </div>
                    <button
                        type="button"
                        className="mt-2 w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                        onClick={() => {
                            shareStatus(guesses, isGameLost, solutionIndex, solution)
                            handleShare()
                        }}
                    >
                        {SHARE_TEXT}
                    </button>
                </div>
            )}
        </BaseModal>
    )
}