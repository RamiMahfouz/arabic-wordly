import { Cell } from './Cell'

type CurrentRowProps = {
  guess: string
}

export function CurrentRow ({ guess }: CurrentRowProps) {

  let _guess=  guess.slice(0,5);
  const splitGuess = _guess.split('')
  const emptyCells = Array.from(Array(5 - splitGuess.length))

  return (
    <div className="flex justify-center mb-1">
      {splitGuess.map((letter, i) => (
        <Cell key={i} value={letter} />
      ))}
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  )
}
