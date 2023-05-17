import { Fragment, ReactNode, useCallback, useRef, useState } from 'react'
import classnames from 'classnames'
import { KeyValue } from '../../lib/keyboard'
import { CharStatus } from '../../lib/statuses'
import { Popover, Transition } from '@headlessui/react'

type Props = {
    children?: ReactNode
    value: KeyValue
    width?: number
    status?: CharStatus
    onClick: (value: KeyValue) => void,
    extraLetters?: KeyValue[],
}

export const Key = ({
    children,
    status,
    width = 40,
    value,
    onClick,
    extraLetters
}: Props) => {

    const classes = classnames(
        'flex items-center justify-center rounded  text-md font-bold cursor-pointer select-none dark:text-slate-100',
        {
            'bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 active:bg-slate-400':
                !status,
            'bg-slate-400 text-slate-100': status === 'absent',
            'bg-green-500 hover:bg-green-600 active:bg-green-700 text-slate-100':
                status === 'correct',
            'bg-orange-500 hover:bg-orange-600 active:bg-orange-700 dark:bg-orange-700 text-slate-100':
                status === 'present',
        }
    )

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        onClick(value)
        event.currentTarget.blur()
    }


    const popoverRef = useRef<any>();

    const onLongPress = () => {

        if (popoverRef && popoverRef.current) {
            popoverRef.current.click();
        }
    };


    const longPressEvent = useLongPress({ onLongPress, onClick: handleClick as any }, {
        shouldPreventDefault: true,
        delay: 900,
    });





    return (
        <div
            className="relative"
        >

            <button
                style={{
                    width: '100%',
                    height: '100%',
                }}
                className={classes}
                {...longPressEvent}
            >
                {children || value}
            </button>

            <div
                style={{ position: 'absolute', top: '-104px', left: 0, width: '100%' }}
            >
                {
                    extraLetters?.length ?
                        <Popover className="relative">
                            {({ open, close }) => (
                                <>
                                    <Popover.Button
                                        ref={popoverRef}
                                    >
                                    </Popover.Button>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-200"
                                        enterFrom="opacity-0 translate-y-1"
                                        enterTo="opacity-100 translate-y-0"
                                        leave="transition ease-in duration-150"
                                        leaveFrom="opacity-100 translate-y-0"
                                        leaveTo="opacity-0 translate-y-1"
                                    >
                                        <Popover.Panel
                                            className="absolute z-10 max-w-sm px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 ">
                                            <div className="overflow-hidden rounded-lg ring-1 ring-black ring-opacity-5">

                                                <div className="flex bg-slate-400 px-1 py-1">
                                                    {
                                                        extraLetters?.map(extraLetter => (
                                                            <button
                                                                key={extraLetter}
                                                                style={{ width: `${width}px`, height: '58px', }}
                                                                className={classes+' mx-1'}
                                                                onClick={() => {
                                                                    onClick(extraLetter);
                                                                    close();
                                                                }}
                                                            >
                                                                {extraLetter}
                                                            </button>
                                                        ))
                                                    }
                                                </div>


                                            </div>
                                        </Popover.Panel>
                                    </Transition>
                                </>
                            )}
                        </Popover>
                        :
                        null
                }
            </div>

        </div>
    )
}



function preventDefault(e: Event) {
    if (!isTouchEvent(e)) return;

    if (e.touches.length < 2 && e.preventDefault) {
        e.preventDefault();
    }
};

export function isTouchEvent(e: Event): e is TouchEvent {
    return e && "touches" in e;
};

interface PressHandlers<T> {
    onLongPress: (e: React.MouseEvent<T> | React.TouchEvent<T>) => void,
    onClick?: (e: React.MouseEvent<T> | React.TouchEvent<T>) => void,
}

interface Options {
    delay?: number,
    shouldPreventDefault?: boolean
}

export default function useLongPress<T>(
    { onLongPress, onClick }: PressHandlers<T>,
    { delay = 300, shouldPreventDefault = true }
        : Options
        = {}
) {
    const [longPressTriggered, setLongPressTriggered] = useState(false);
    const timeout = useRef<NodeJS.Timeout>();
    const target = useRef<EventTarget>();

    const start = useCallback(
        (e: React.MouseEvent<T> | React.TouchEvent<T>) => {
            e.persist();
            const clonedEvent = { ...e };

            if (shouldPreventDefault && e.target) {
                e.target.addEventListener(
                    "touchend",
                    preventDefault,
                    { passive: false }
                );
                target.current = e.target;
            }

            timeout.current = setTimeout(() => {
                onLongPress(clonedEvent);
                setLongPressTriggered(true);
            }, delay);
        },
        [onLongPress, delay, shouldPreventDefault]
    );

    const clear = useCallback((
        e: React.MouseEvent<T> | React.TouchEvent<T>,
        shouldTriggerClick = true
    ) => {
        timeout.current && clearTimeout(timeout.current);
        shouldTriggerClick && !longPressTriggered && onClick?.(e);

        setLongPressTriggered(false);

        if (shouldPreventDefault && target.current) {
            target.current.removeEventListener("touchend", preventDefault);
        }
    },
        [shouldPreventDefault, onClick, longPressTriggered]
    );

    return {
        onMouseDown: (e: React.MouseEvent<T>) => start(e),
        onTouchStart: (e: React.TouchEvent<T>) => start(e),
        onMouseUp: (e: React.MouseEvent<T>) => clear(e),
        onMouseLeave: (e: React.MouseEvent<T>) => clear(e, false),
        onTouchEnd: (e: React.TouchEvent<T>) => clear(e)
    };
};
