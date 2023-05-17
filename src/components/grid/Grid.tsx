import { CompletedRow } from './CompletedRow'
import { CurrentRow } from './CurrentRow'
import { EmptyRow } from './EmptyRow'

type GridProps = {
    guesses: string[]
    currentGuess: string,
    solution: string,
}

export function Grid ({ guesses, currentGuess, solution }: GridProps){
    const empties =
        guesses.length < 5 ? Array.from(Array(5 - guesses.length)) : []

    return (
        <div className="pb-2" dir="rtl">
            {guesses.map((guess, i) => (
                <CompletedRow key={i} guess={guess} solution={solution} />
            ))}
            {guesses.length < 6 && <CurrentRow guess={currentGuess} />}
            {empties.map((_, i) => (
                <EmptyRow key={i} />
            ))}
        </div>
    )
}


