export function WordleGameLoader() {
  return (
    <div className="content-container">
      <div className="h-[42px]" />

      <GridLoader />

      <KeyboardLoader />
    </div>
  )
}

export function KeyLoader() {
  const classes =
    'flex items-center justify-center rounded  text-md font-bold cursor-pointer select-none dark:text-slate-100 animate-pulse bg-gray-200 '

  return (
    <div className="relative">
      <button
        style={{
          width: '100%',
          height: '100%',
        }}
        className={classes}
      >
        {' '}
      </button>
    </div>
  )
}

export function KeyboardLoader() {
  return (
    <div className="flex flex-col items-center justify-center mb-[50px]">
      <div className="keyboard-grid">
        {Array(33)
          .fill(0)
          .map((_x, i) => (
            <KeyLoader key={i} />
          ))}
      </div>
    </div>
  )
}

export function GridLoader() {
  return (
    <div className="pb-2" dir="rtl">
      {[1, 2, 3, 4, 5, 6].map((_, i) => (
        <EmptyRowLoader key={i} />
      ))}
    </div>
  )
}

export const EmptyRowLoader = () => {
  const emptyCells = Array.from(Array(5))

  return (
    <div className="flex justify-center mb-1">
      {emptyCells.map((_, i) => (
        <CellLoader key={i} />
      ))}
    </div>
  )
}

export function CellLoader() {
  const classes =
    'grid-cell w-12 h-12 border-solid border-2 flex items-center justify-center mx-0.5 text-lg font-bold rounded dark:text-white animate-pulse bg-gray-200'

  return <div className={classes}>{''}</div>
}
