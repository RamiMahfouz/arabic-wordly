import { DICTIONARY_TYPES, getDictWords } from '../constants/wordlist'
import {CONFIG} from '../game.config';


export const LETTERS_SYNONYMS = [
    ["ا", "أ", "آ", "إ", "ٱ"],
    ["ء", "ئ", "ؤ"],
    ["ه", "ة"],
    ["ي", "ى"],
    ["و", "ؤ"],
]



export function genereateSynonymsOfWord(word: string): string[] {
    if (!CONFIG.ALLOW_SYNONYMS_LETTERS)
        return [];
    else {
        let result = [];
        for (const synonymGroup of LETTERS_SYNONYMS) {

            for (let synonymLetterIndex = 0; synonymLetterIndex < synonymGroup.length; synonymLetterIndex++) {

                let currentSynonymLetter = synonymGroup[synonymLetterIndex];
                let synonymsOfLetter = synonymGroup.filter((_, i) => i !== synonymLetterIndex);


                // currentSynonymLetter can exist in multiple locations
                let letterLocations =
                    word
                        .slice()
                        .split('')
                        .map((_l, index) => _l === currentSynonymLetter ? index : -1)
                        .filter(x => x >= 0);

                // try all locations
                for (let letterLocation of letterLocations) {

                    // try synonyms of letter for each letter location
                    for (let synonymLetter of synonymsOfLetter) {

                        let newWord = word
                            .slice()
                            .split('')
                            .map((originalLetter, i) => i === letterLocation ? synonymLetter : originalLetter)
                            .join("");

                        result.push(newWord);

                    }

                }
            }
        }
        return result;
    }
}



export const isWordInWordList = async (word: string, guesses: string[]) => {

    // same word input repeated
    if (guesses.includes(word))
        return false;

    let dictionary = getDictWords('main');
    let meaningDictionary = getDictWords('meaning');
    let exist = dictionary.concat(meaningDictionary).includes(word)
    if (exist)
        return true;
    else {

        let synonyms = genereateSynonymsOfWord(word);
        //console.log({ synonyms });
        for (let synonymWord of synonyms) {
            if (dictionary.includes(synonymWord))
                return true;
        }

        return false;
    }


}

export const isWinningWord = (word: string, solution: string) => {


    return solution === word
}

export function getWordOfDay(dictType: DICTIONARY_TYPES) {
    // January 1, 2022 Game Epoch
    const epochMs = new Date('January 1, 2022 00:00:00').valueOf()
    const now = Date.now()
    const msInDay = 86400000
    const index = Math.floor((now - epochMs) / msInDay)
    const nextday = (index + 1) * msInDay + epochMs

    const dictionary = getDictWords(dictType);

    return {
        solution: dictionary[index % dictionary.length].toUpperCase(),
        solutionIndex: index,
        tomorrow: nextday,
    }
}
