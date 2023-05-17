import { useDispatch } from 'react-redux';
import logo from '../logo.png';
import { openDialog } from '../store/actions/dialogs';
import {
    ChartSquareBarIcon,
    DocumentTextIcon,
  MenuIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/outline'
import {useCallback} from 'react';
import {MajarraButton} from './button';



export function TopNavContent({ openHandler }: { openHandler: () => void }) {

    const dispatch = useDispatch();
    const openInfoDialog = useCallback(() => dispatch(openDialog({
        dialogName: 'info'
    })), []);

    const openDictionaryDialog = useCallback(() => dispatch(openDialog({
        dialogName: 'dictionaries'
    })), []);

    const openStatsDialog = useCallback(() => dispatch(openDialog({
        dialogName: 'stats'
    })), []);


    return (
        <div
            className={'border-b-2 border-slate-200 py-4 px-4 grid grid-cols-3 items-center'}
        >

            <div className="flex items-center">
                <MenuIcon
                    className="mx-2 h-7 w-7 cursor-pointer"
                    onClick={openHandler}
                />
                <DocumentTextIcon
                    className="mx-2 h-7 w-7 cursor-pointer md:hidden"
                    onClick={openDictionaryDialog}
                />
                <div className="hidden md:block">
                    <a
                        rel="noreferrer"
                        className=""
                        target="_blank"
                        href="https://majarra.com/">
                        <MajarraButton variant="outlined">
                            {'اكتشف عالم مجرّة'}
                        </MajarraButton>
                    </a>
                </div>
            </div>

            <div
                className={'justify-self-center'}
            >
                <a
                    rel="noreferrer"
                    className=""
                    target="_blank"
                    href="https://majarra.com/">
                    <img
                        src={logo}
                        alt={"مجرة"}
                    />
                </a>
            </div>


            <div className="flex justify-self-end">
                <QuestionMarkCircleIcon
                    className="mx-2 h-7 w-7 cursor-pointer"
                    onClick={openInfoDialog}
                />
                <ChartSquareBarIcon
                    className="mr-2 h-7 w-7 cursor-pointer"
                    onClick={openStatsDialog}
                />
            </div>

        </div>
    );
}
