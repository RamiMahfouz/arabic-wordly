import { Dialog, Transition } from '@headlessui/react';
import { useEffect, useState } from 'react';

import {SideNavContent} from './side-nav.content';



export function SideNav({ open, closeHandler }: { open: boolean, closeHandler: () => void, }) {

    const [delayedOpen, setDelayedOpen] = useState(true);

    useEffect(function delayed() {
        setTimeout(() => {
            setDelayedOpen(open);
        }, 0);
    }, [open]);

    return (
        <Dialog
            open={open}
            onClose={closeHandler}
            as="div"
            className="fixed top-0 left-0 w-full h-full z-1000 flex"
        >
            <Transition
                show={delayedOpen}
                enter="transition-transform duration-200"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
            >
                <SideNavContent
                    closeHandler={closeHandler}
                />
            </Transition>

            <Transition
                className="flex-1 h-full"
                show={delayedOpen}
                enter="transition-opacity duration-500"
                enterFrom="opacity-0"
                enterTo="opacity-100"
            >
                <Dialog.Overlay
                    onClick={closeHandler}
                    className="opacity-50 bg-[#000] flex-1 h-full">

                </Dialog.Overlay>
            </Transition>
        </Dialog>
    );
}
