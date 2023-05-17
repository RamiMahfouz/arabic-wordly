import { useState, useEffect, useMemo, useCallback } from 'react'
import { Alert } from './components/alerts/Alert'
import { Grid } from './components/grid/Grid'
import classnames from 'classnames'
import { Keyboard } from './components/keyboard/Keyboard'
import { StatsModal } from './components/modals/StatsModal'
import {
  WIN_MESSAGES,
  GAME_COPIED_MESSAGE,
  NOT_ENOUGH_LETTERS_MESSAGE,
  WORD_NOT_FOUND_MESSAGE,
  CORRECT_WORD_MESSAGE,
  SAME_WORD_ENTERED_BEFORE,
} from './constants/strings'
import { addStatsForCompletedGame, defaultStats, loadStats } from './lib/stats'
import {
  GameStats,
  loadGameSolutionAndGuessesFromLocalStorage,
  saveGameSolutionAndGuessesToLocalStorage,
} from './lib/localStorage'
import { DICTIONARY_TYPES } from './constants/wordlist'
import {
  genereateSynonymsOfWord,
  getWordOfDay,
  isWinningWord,
  isWordInWordList,
} from './lib/words'
import { useDispatch } from 'react-redux'
import { openDialog } from './store/actions/dialogs'
import { ChangeDictionaryTabs } from './components/dictionaries-types-tabs'
import { SubscribeAd } from './components/ads'

const ALERT_TIME_MS = 2000
const ADS_OPENED_ON_STARTUP = 'ADS_ON_START'
const ADS_OPENED_ON_MIDDLE = 'ADS_ON_MIDDLE'
const ADS_OPENED_ON_END = 'ADS_ON_END'

function isMobile(width: number) {
  return width < 1111
}

export default function WordleGame({
  dictionaryType,
}: {
  dictionaryType: DICTIONARY_TYPES
}) {
  const [screenWidth, setScreenWidth] = useState(1200)

  const [openSubscribeAd_Desktop, setOpenSubscribeAd_Desktop] = useState(false)
  const [openSubscribeAd_Mobile, setOpenSubscribeAd_Mobile] = useState(false)

  // user current input
  const [currentGuess, setCurrentGuess] = useState('')

  // mark the game as won or lost
  const [isGameWon, setIsGameWon] = useState(false)
  const [isGameLost, setIsGameLost] = useState(false)

  // warnings messages
  const [sameWordsEnteredBefore, setSameWordEnteredBefore] = useState(false)
  const [isNotEnoughLetters, setIsNotEnoughLetters] = useState(false)
  const [isWordNotFoundAlertOpen, setIsWordNotFoundAlertOpen] = useState(false)
  const [successAlert, setSuccessAlert] = useState('')

  const dispatch = useDispatch()

  const openStatsDialog = useCallback(
    () =>
      dispatch(
        openDialog({
          dialogName: 'stats',
        })
      ),
    []
  )

  function resetGame() {
    setIsGameLost(false)
    setIsGameWon(false)
  }

  useEffect(
    function onUnload() {
      setTimeout(() => {
        setIsGameLost(false)
      }, 5000)

      return resetGame
    },
    [dictionaryType]
  )

  const { _solution, _solutionIndex, _tomorrow } = useMemo(() => {
    let { solution, solutionIndex, tomorrow } = getWordOfDay(dictionaryType)

    return {
      _solution: solution,
      _solutionIndex: solutionIndex,
      _tomorrow: tomorrow,
    }
  }, [dictionaryType])

  // list of all user inputs(guesses)
  const [guesses, setGuesses] = useState<string[]>([])

  useEffect(
    function checkCurrentSolutionFromLocalStorage() {
      const loaded = loadGameSolutionAndGuessesFromLocalStorage(dictionaryType)

      // if we open the game the next day solution will be different
      // so return an empty array
      if (loaded?.solution !== _solution) {
        setGuesses([])
        return resetGame
      }

      const gameWasWon = Boolean(loaded?.guesses?.includes(_solution))
      setIsGameWon(gameWasWon)

      if (loaded.guesses.length === 6 && !gameWasWon) {
        setIsGameLost(true)
      }
      // restore previous guesses
      setGuesses(loaded.guesses)

      return resetGame
    },
    [dictionaryType, _solution]
  )

  const [stats, setStats] = useState<GameStats>({ ...defaultStats })

  useEffect(
    function loadGameStats() {
      setStats(loadStats(dictionaryType))
    },
    [dictionaryType]
  )

  useEffect(
    function reSaveGameStats() {
      saveGameSolutionAndGuessesToLocalStorage(dictionaryType, {
        guesses,
        solution: _solution,
      })
    },
    [guesses, dictionaryType, _solution]
  )

  useEffect(
    function displayAlertBasedOnState() {
      if (isGameWon) {
        setSuccessAlert(
          WIN_MESSAGES[Math.floor(Math.random() * WIN_MESSAGES.length)]
        )
        setTimeout(() => {
          setSuccessAlert('')
          openStatsDialog()
        }, ALERT_TIME_MS)
      }

      if (isGameLost) {
        setTimeout(() => {
          openStatsDialog()
        }, ALERT_TIME_MS)
      }
    },
    [isGameWon, isGameLost, openStatsDialog]
  )

  const onChar = useCallback(
    function _onChar(value: string) {
      if (currentGuess.length < 5 && guesses.length < 6 && !isGameWon) {
        setCurrentGuess(`${currentGuess}${value}`)
      }
    },
    [currentGuess, guesses, isGameWon, setCurrentGuess]
  )

  const onDelete = useCallback(
    function _onDelete() {
      setCurrentGuess(currentGuess.slice(0, -1))
    },
    [currentGuess, setCurrentGuess]
  )

  async function onEnter() {
    if (isGameWon || isGameLost) {
      return
    }

    if (!(currentGuess.length === 5)) {
      setIsNotEnoughLetters(true)
      return setTimeout(() => {
        setIsNotEnoughLetters(false)
      }, ALERT_TIME_MS)
    }

    // same word input repeated
    if (guesses.includes(currentGuess)) {
      setSameWordEnteredBefore(true)
      return setTimeout(() => {
        setSameWordEnteredBefore(false)
      }, ALERT_TIME_MS)
    } else if (!(await isWordInWordList(currentGuess, guesses))) {
      setIsWordNotFoundAlertOpen(true)
      return setTimeout(() => {
        setIsWordNotFoundAlertOpen(false)
      }, ALERT_TIME_MS)
    }

    const winningWord = isWinningWord(currentGuess, _solution)
    let synonymWorlWin = ''

    if (currentGuess.length === 5 && guesses.length < 6 && !isGameWon) {
      if (!winningWord) {
        let synonyms = genereateSynonymsOfWord(currentGuess)
        for (let synonym of synonyms) {
          let isWining = isWinningWord(synonym, _solution)
          if (isWining) synonymWorlWin = synonym
        }
      }

      setGuesses([...guesses, synonymWorlWin || currentGuess])
      setCurrentGuess('')

      if (winningWord || synonymWorlWin) {
        setStats(
          addStatsForCompletedGame(stats, guesses.length, dictionaryType)
        )
        return setIsGameWon(true)
      }

      if (guesses.length === 5) {
        setStats(
          addStatsForCompletedGame(stats, guesses.length + 1, dictionaryType)
        )
        setIsGameLost(true)
      }
    }
  }

  useEffect(function adsObserver() {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const width = entry.contentRect.width
        //const height = entry.contentRect.height;
        setScreenWidth(width)
      }
    })

    resizeObserver.observe(document.body)
  }, [])

  useEffect(
    function displayAdsLogic() {
      if (isMobile(screenWidth)) {
        setOpenSubscribeAd_Desktop(false)

        const openedOnStart = localStorage.getItem(ADS_OPENED_ON_STARTUP)
        const openedOnMiddle = localStorage.getItem(ADS_OPENED_ON_MIDDLE)
        const openedOnEnd = localStorage.getItem(ADS_OPENED_ON_END)
        const numberOfGusses = guesses.length

        if (!openedOnStart && !numberOfGusses) {
          setOpenSubscribeAd_Mobile(true)
          localStorage.setItem(ADS_OPENED_ON_STARTUP, 'true')
        } else if (!openedOnMiddle && numberOfGusses == 3) {
          setOpenSubscribeAd_Mobile(true)
          localStorage.setItem(ADS_OPENED_ON_MIDDLE, 'true')
        } else if (!openedOnEnd && numberOfGusses == 6) {
          setOpenSubscribeAd_Mobile(true)
          localStorage.setItem(ADS_OPENED_ON_END, 'true')
          setTimeout(function removeOnEndAgain() {
            localStorage.removeItem(ADS_OPENED_ON_END)
          }, 2000)
        }
      } else {
        setOpenSubscribeAd_Desktop(true)
        setOpenSubscribeAd_Mobile(false)
      }
    },
    [screenWidth, guesses]
  )

  return (
    <>
      <div
        className={classnames(`absolute top-20`, {
          hidden: !openSubscribeAd_Mobile,
        })}
        style={{
          right: `${(screenWidth - 326) / 2}px`,
        }}
      >
        <SubscribeAd
          closeHandler={() => {
            setOpenSubscribeAd_Mobile(false)
            setOpenSubscribeAd_Desktop(false)
          }}
        />
      </div>
      <div
        className={classnames('absolute bottom-10 right-4', {
          hidden: !openSubscribeAd_Desktop,
        })}
      >
        <SubscribeAd
          closeHandler={() => {
            setOpenSubscribeAd_Desktop(false)
            setOpenSubscribeAd_Mobile(false)
          }}
        />
      </div>

      <div className="content-container">
        <ChangeDictionaryTabs />

        <Grid
          solution={_solution}
          guesses={guesses}
          currentGuess={currentGuess}
        />

        <Keyboard
          onChar={onChar}
          onDelete={onDelete}
          onEnter={onEnter}
          guesses={guesses}
          solution={_solution}
          dicType={dictionaryType}
        />
      </div>

      <StatsModal
        guesses={guesses}
        gameStats={stats}
        isGameLost={isGameLost}
        isGameWon={isGameWon}
        handleShare={() => {
          setSuccessAlert(GAME_COPIED_MESSAGE)
          return setTimeout(() => setSuccessAlert(''), ALERT_TIME_MS)
        }}
        solution={_solution}
        tomorrow={_tomorrow}
        solutionIndex={_solutionIndex}
      />
      <Alert message={NOT_ENOUGH_LETTERS_MESSAGE} isOpen={isNotEnoughLetters} />
      <Alert
        message={SAME_WORD_ENTERED_BEFORE}
        isOpen={sameWordsEnteredBefore}
      />
      <Alert
        message={WORD_NOT_FOUND_MESSAGE}
        isOpen={isWordNotFoundAlertOpen}
      />
      <Alert message={CORRECT_WORD_MESSAGE(_solution)} isOpen={isGameLost} />
      <Alert
        message={successAlert}
        isOpen={successAlert !== ''}
        variant="success"
      />
    </>
  )
}
