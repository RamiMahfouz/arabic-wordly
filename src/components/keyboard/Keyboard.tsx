import { KeyValue } from '../../lib/keyboard'
import { CharStatus, getGuessStatuses } from '../../lib/statuses'
import { Key } from './Key'
import { useCallback, useEffect } from 'react'
import { ENTER_TEXT } from '../../constants/strings'
import { DICTIONARY_TYPES } from '../../constants/wordlist'
import { updateStatusesAccordingToSynonyms } from '../grid/CompletedRow'
import { MajarraButton } from '../button'

type KeyboardProps = {
    onChar: (value: string) => void
    onDelete: () => void
    onEnter: () => void
    guesses: string[],
    solution: string,
    dicType: DICTIONARY_TYPES
}

function generateKeyboardStatuses(
    guesses: string[],
    solution: string,
): { [key: string]: CharStatus } {

    let charsToStatusMap: { [key: string]: CharStatus } = {}

    for (let guess of guesses) {
        let { statuses } = updateStatusesAccordingToSynonyms(getGuessStatuses(guess, solution), guess, solution);
        guess.slice().split('').forEach((letter, index) => {

            charsToStatusMap[letter] = statuses[index];
        })
    }


    return charsToStatusMap;
}

export function Keyboard({ onChar, onDelete, onEnter, guesses, solution, dicType }: KeyboardProps) {

    const charStatuses = generateKeyboardStatuses(guesses, solution)


    const onClick = useCallback((value: KeyValue) => {
        if (value === 'ENTER') {
            onEnter()
        } else if (value === 'DELETE') {
            onDelete()
        } else {
            onChar(value)
        }
    }, [onEnter, onDelete, onChar]);



    const listener = useCallback((e: KeyboardEvent) => {
        if (e.code === 'Enter') {
            onEnter()
        } else if (e.code === 'Backspace') {
            onDelete()
        } else {
            const key = e.key;
            // arabic letters regular expression
            if (key.length && (/^[\u0621-\u064A\u0660-\u0669 ]+$/g).test(key))
                onChar(key);
        }
    }, [onChar, onDelete, onEnter,]);



    useEffect(function eventsBinder() {
        window.addEventListener('keyup', listener)
        return function eventsUnbind() {
            window.removeEventListener('keyup', listener)
        }
    }, [onChar, onDelete, onEnter, dicType, listener])



    return (
        <div className="flex flex-col items-center justify-center">
            <div
                className="keyboard-grid"
            >


                <Key value="ج" onClick={onClick} status={charStatuses['ج']} />
                <Key value="ح" onClick={onClick} status={charStatuses['ح']} />
                <Key value="خ" onClick={onClick} status={charStatuses['خ']} />
                <Key value="ه" onClick={onClick} status={charStatuses['ه']} />
                <Key value="ع" onClick={onClick} status={charStatuses['ع']} />
                <Key value="غ" onClick={onClick} status={charStatuses['غ']} />
                <Key value="ف" onClick={onClick} status={charStatuses['ف']} />
                <Key value="ق" onClick={onClick} status={charStatuses['ق']} />
                <Key value="ث" onClick={onClick} status={charStatuses['ث']} />
                <Key value="ص" onClick={onClick} status={charStatuses['ص']} />
                <Key value="ض" onClick={onClick} status={charStatuses['ض']} />


                <Key value="ط" onClick={onClick} status={charStatuses["ط"]} />
                <Key value="ك" onClick={onClick} status={charStatuses["ك"]} />
                <Key value="م" onClick={onClick} status={charStatuses["م"]} />
                <Key value="ن" onClick={onClick} status={charStatuses["ن"]} />
                <Key value="ت" onClick={onClick} status={charStatuses["ت"]} />
                <Key value="ا" onClick={onClick} status={charStatuses["ا"]} extraLetters={['أ', 'إ', 'آ', 'ء']} />
                <Key value="ل" onClick={onClick} status={charStatuses["ل"]} extraLetters={['لا', 'لآ', 'لأ', 'لإ']} />
                <Key value="ب" onClick={onClick} status={charStatuses["ب"]} />
                <Key value="ي" onClick={onClick} status={charStatuses["ي"]} extraLetters={['ئ']} />
                <Key value="س" onClick={onClick} status={charStatuses["س"]} />
                <Key value="ش" onClick={onClick} status={charStatuses["ش"]} />

                {/* delete key */}
                <Key width={65} value="DELETE" onClick={onClick}>
                    <div className="rotate-180">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" />
                        </svg>
                    </div>
                </Key>

                <Key value="د" onClick={onClick} status={charStatuses['د']} />
                <Key value="ظ" onClick={onClick} status={charStatuses["ظ"]} />
                <Key value="ز" onClick={onClick} status={charStatuses["ز"]} />
                <Key value="و" onClick={onClick} status={charStatuses["و"]} extraLetters={['ؤ']} />
                <Key value="ة" onClick={onClick} status={charStatuses["ة"]} />
                <Key value="ى" onClick={onClick} status={charStatuses["ى"]} extraLetters={['ئ']} />
                <Key value="ر" onClick={onClick} status={charStatuses["ر"]} />
                <Key value="ؤ" onClick={onClick} status={charStatuses["ؤ"]} />
                <Key value="ء" onClick={onClick} status={charStatuses["ء"]} />
                <Key value="ذ" onClick={onClick} status={charStatuses["ذ"]} />


                <div
                    className="col-span-11 mt-2 mb-3"
                >
                    <MajarraButton
                        className="h-[48px] font-bold"
                        variant="contained"
                        fullWidth
                        onClick={() => onClick("ENTER")}
                    >
                        {ENTER_TEXT}
                    </MajarraButton>
                </div>

            </div>



        </div>
    );

}
