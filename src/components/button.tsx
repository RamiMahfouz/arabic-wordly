import { ReactNode } from "react";
import cn from 'classnames';

export function MajarraButton({
    children,
    variant,
    fullWidth,
    onClick,
    className,
}: {
    children: ReactNode,
    variant?: "contained" | "outlined",
    fullWidth?: boolean,
    onClick?: () => void,
    className?: string,
}) {

    return (
        <button
            className={
                cn(className, {
                    "text-[#5A13A0] border-[#5A13A0] border-2 rounded-lg bg-[#F6EBFF] px-3 py-1": variant == 'outlined',
                    "text-[#fff] rounded-lg bg-[#5A13A0] px-3 py-1": variant == 'contained',
                    'w-full': fullWidth
                })
            }
            onClick={onClick ? onClick : () => { }}
        >
            {children}
        </button>
    );
}
