import { useCallback, useState } from 'react';

import {SideNav} from './side-nav';
import {TopNavContent} from './top-nav.content';









export function TopNav() {

    const [open, setOpen] = useState(false);

    const closeHandler = useCallback(() => {
        setOpen(false);
    }, []);

    const openHandler = useCallback(() => {
        setOpen(true);
    }, []);


    return (
        <>
            <SideNav
                open={open}
                closeHandler={closeHandler}
            />

            <TopNavContent
                openHandler={openHandler}
            />
        </>
    );
}








