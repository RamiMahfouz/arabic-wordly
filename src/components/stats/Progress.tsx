type ProgressProps = {
    index: number
    size: number
    label: string
}

export function Progress({ index, size, label }: ProgressProps) {

    return (
        <div className="flex justify-left m-1">
            <div className="items-center justify-center w-2">{index + 1}</div>
            <div className="rounded-full w-full ml-2">
                <div
                    style={{ width: `${5 + size}%` }}
                    className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 rounded-l-full"
                >
                    {label}
                </div>
            </div>
        </div>
    )
}
