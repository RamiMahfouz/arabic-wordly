import { getGuessStatuses } from './statuses'
import { GAME_TITLE } from '../constants/strings'

export const shareStatus = (guesses: string[], lost: boolean, solutionIndex: number, solution: string) => {
    //  navigator.clipboard.writeText

    copyTextToClipboard(
        `${GAME_TITLE} ${solutionIndex} ${lost ? 'X' : guesses.length}/6\n\n` +
        generateEmojiGrid(guesses, solution)
        + `\n مجرّة | https://kalimat.majarra.com`
    )
}

export const generateEmojiGrid = (guesses: string[], solution: string) => {
    return guesses
        .map((guess) => {
            const status = getGuessStatuses(guess, solution)
            return guess
                .split('')
                .map((letter, i) => {
                    switch (status[i]) {
                        case 'correct':
                            return '🟩'
                        case 'present':
                            return '🟨'
                        default:
                            return '⬜'
                    }
                })
                .join('')
        })
        .join('\n')
}

function fallbackCopyTextToClipboard(text: string) {
    var textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
}
function copyTextToClipboard(text: string) {
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
    }
    navigator.clipboard.writeText(text).then(function() {
        console.log('Async: Copying to clipboard was successful!');
    }, function(err) {
        console.error('Async: Could not copy text: ', err);
    });
}
