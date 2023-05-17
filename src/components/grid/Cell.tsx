import { CharStatus } from '../../lib/statuses'
import classnames from 'classnames'

type CellProps = {
    value?: string
    status?: CharStatus
}

export function Cell({ value, status }: CellProps) {
    const classes = classnames(
      
  'grid-cell w-12 h-12 border-solid border-2 flex items-center justify-center mx-0.5 text-lg font-bold rounded dark:text-white',
        {
            'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-600':
                !status,
            'border-black dark:border-slate-100': value && !status,
            'bg-slate-400 dark:bg-slate-700 text-white border-slate-400 dark:border-slate-700':
                status === 'absent',
            'bg-green-500 text-white border-green-500': status === 'correct',
            'bg-orange-500 dark:bg-orange-700 text-white border-orange-500 dark:border-orange-700':
                status === 'present',
            'cell-animation': !!value,
        }
    )

    return <div className={classes}>{value}</div>
}
