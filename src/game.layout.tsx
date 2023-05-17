import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { DictionaryModal } from './components/modals/dictionary-modal'
import { InfoModal } from './components/modals/InfoModal'
import { TopNav } from './components/top-nav'

const packageJson = require('../package.json')
console.log(`version ${packageJson.version}`)

export function GameLayout() {
  const [height, setHeight] = useState(740)

  useEffect(function adsObserver() {
    let observer

    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    }

    /*
     * at first load we know that the main-container has a height of 100vh
     * which is good but not for mobile devices that has a fixed browser on top and some
     * has it on bottom so to solve this we take the intersect of main-container with the window
     * where the height of this intersection is the visible height on screen, then we set that height
     * to the element to exactly match users' screen's heights
     */
    observer = new IntersectionObserver(function handleIntersect(
      entries,
      observer
    ) {
      entries.forEach((entry) => {
        const width = entry?.rootBounds?.width ?? 1200
        const height = entry?.rootBounds?.height
        // we want this only on mobiles
        if (width < 1111) if (height) setHeight(height)
      })
    },
    options)

    let mainContent = document.getElementsByClassName('main-container')[0]
    if (mainContent) observer.observe(mainContent)
  }, [])

  return (
    <div className="main-container" style={{ height: `${height}px` }}>
      <TopNav />
      <InfoModal />
      <DictionaryModal />
      <Outlet />
    </div>
  )
}
