import { CONFIG } from '../../game.config';
import { CharStatus, getGuessStatuses } from '../../lib/statuses'
import { LETTERS_SYNONYMS } from '../../lib/words';
import { Cell } from './Cell'

type CompletedRowProps = {
    guess: string,
    solution: string,
}


export function updateStatusesAccordingToSynonyms(_statuses: CharStatus[], guess: string, solution: string) {

    //let statuses = _statuses.slice();
    // we don't accept synonyms letters anymore
    let acceptedSynonyms = Array(guess.length).fill(0);


    if (!CONFIG.ALLOW_SYNONYMS_LETTERS)
        return { statuses: _statuses, acceptedSynonyms };
    else {
        for (const synonymGroup of LETTERS_SYNONYMS) {

            for (let synonymLetterIndex = 0; synonymLetterIndex < synonymGroup.length; synonymLetterIndex++) {

                let currentSynonymLetter = synonymGroup[synonymLetterIndex];
                let synonymsOfLetter = synonymGroup.filter((_, i) => i !== synonymLetterIndex);


                // one letter can exist in multiple locations
                let letterLocations =
                    guess
                        .slice()
                        .split('')
                        .map((_l, index) => _l === currentSynonymLetter ? index : -1)
                        .filter(x => x >= 0);


                // try all locations
                for (let letterLocation of letterLocations) {
                    if (_statuses[letterLocation] === 'absent') {
                        // try synonyms of letter for each letter location
                        for (let synonymLetter of synonymsOfLetter) {

                            let newWord = guess
                                .slice()
                                .split('')
                                .map((originalLetter, i) => i === letterLocation ? synonymLetter : originalLetter)
                                .join("");

                            if (newWord[letterLocation] === solution[letterLocation]) {
                                _statuses[letterLocation] = 'correct';
                                //acceptedSynonyms[letterLocation] = newWord[letterLocation];
                            }
                            else {
                                let existInAnotherPlace = solution.slice().split('').some(_letter => _letter === synonymLetter);
                                if (existInAnotherPlace) {
                                    _statuses[letterLocation] = 'present';
                                    //acceptedSynonyms[letterLocation] = newWord[letterLocation];
                                }
                            }

                        }

                    }

                }


            }
        }
        return { statuses: _statuses, acceptedSynonyms };
    }

}




export function CompletedRow({ guess, solution }: CompletedRowProps) {

    const _statuses = getGuessStatuses(guess, solution)

    const {
        statuses,
        //acceptedSynonyms,
    } = updateStatusesAccordingToSynonyms(_statuses, guess, solution);

    return (
        <div className="flex justify-center mb-1">
            {guess.split('').map((letter, i) => (
                <Cell
                    key={i}
                    value={
                        letter
                        /*(statuses[i] === 'present' || statuses[i] === 'correct') && acceptedSynonyms[i] !== 0 ?
                            acceptedSynonyms[i]
                            :
                            letter*/
                    }
                    status={statuses[i]}
                />
            ))}
        </div>
    )
}
