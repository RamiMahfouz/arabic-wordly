import MAIN_DICTIONARY from './data/dictionary.json';
import DICTIONARY_NAMES from "./data/noun_props.json";
import DICIONARY_NOUNS from "./data/nouns.json";
import DICTIONARY_VERBS from "./data/verbs.json";
import DICTIONARY_ADJACTIVES from './data/adjs.json';
import DICTIONARY_MEANING from './data/meaning.json';

export type DICTIONARY_TYPES = 'main' | 'adjactives' | 'nouns' | 'names' | 'verbs'|'meaning';

export const getDictWords = (key: DICTIONARY_TYPES) => {
    switch (key) {

        case 'adjactives':
            return DICTIONARY_ADJACTIVES.words;

        case 'nouns':
            return DICIONARY_NOUNS.words;

        case 'names':
            return DICTIONARY_NAMES.words;

        case 'verbs':
            return DICTIONARY_VERBS.words;

        case 'meaning':
            return DICTIONARY_MEANING.words;

        default:
            return MAIN_DICTIONARY.words;
    }
}
