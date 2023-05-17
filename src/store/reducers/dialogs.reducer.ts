import { OpenDialogAction, CloseDialogAction, OPEN_DIALOG, CLOSE_DIALOG } from "../actions/dialogs";

interface DialogsState {
    stats: boolean,
    dictionaries: boolean,
    info: boolean,
}

const DEFAULT_STATE: DialogsState = {
    stats: false,
    dictionaries: false,
    info: false,
}

export function dialogsReducer(
    state: DialogsState = DEFAULT_STATE,
    action: OpenDialogAction | CloseDialogAction
) {

    switch (action.type) {

        case OPEN_DIALOG: {
            switch (action.dialogName) {
                case 'info': {
                    return {
                        ...state,
                        info: true
                    }
                }
                case 'stats': {
                    return {
                        ...state,
                        stats: true
                    }
                }
                case 'dictionaries': {
                    return {
                        ...state,
                        dictionaries: true
                    }
                }

            }
            break;
        }

        case CLOSE_DIALOG: {
            switch (action.dialogName) {
                case 'info': {
                    return {
                        ...state,
                        info: false
                    }
                }
                case 'stats': {
                    return {
                        ...state,
                        stats: false
                    }
                }
                case 'dictionaries': {
                    return {
                        ...state,
                        dictionaries: false
                    }
                }

            }
            break;
        }


        default:
            return state;
    }


}
