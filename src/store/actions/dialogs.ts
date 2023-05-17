export const OPEN_DIALOG = 'OPEN_DIALOG';

type DialogName = 'stats' | 'dictionaries' | 'info';

export interface OpenDialogAction {
    type: typeof OPEN_DIALOG,
    dialogName: DialogName,
}

export interface OpenDialogActionCreator {
    (params: Omit<OpenDialogAction, "type">): OpenDialogAction,
}

export const openDialog: OpenDialogActionCreator = (params) => ({
    ...params,
    type: OPEN_DIALOG
});

/////////////


export const CLOSE_DIALOG = 'CLOSE_DIALOG';

export interface CloseDialogAction {
    type: typeof CLOSE_DIALOG,
    dialogName: DialogName,
}

export interface CloseDialogActionCreator {
    (params: Omit<OpenDialogAction, "type">): CloseDialogAction,
}

export const closeDialog: CloseDialogActionCreator = (params) => ({
    ...params,
    type: CLOSE_DIALOG
});
