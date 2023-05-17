import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { createStore } from 'redux'
import { Provider as ReduxProvider } from 'react-redux'
import { rootReducer } from './store/reducers/root.reducer'
import { WordleGameLoader } from './game.loader'
import React, { Suspense } from 'react'
import { GameLayout } from './game.layout'

const WordleGame = React.lazy(() => import('./game'))

const store = createStore(rootReducer, undefined)
export type RootState = ReturnType<typeof rootReducer>

export function Root() {
  return (
    <ReduxProvider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<GameLayout />}>
            <Route
              path="/"
              element={
                <Suspense fallback={<WordleGameLoader />}>
                  <WordleGame dictionaryType="main" />
                </Suspense>
              }
            />
            <Route
              path="/adjactives"
              element={
                <Suspense fallback={<WordleGameLoader />}>
                  <WordleGame dictionaryType="adjactives" />
                </Suspense>
              }
            />
            <Route
              path="/verbs"
              element={
                <Suspense fallback={<WordleGameLoader />}>
                  <WordleGame dictionaryType="verbs" />
                </Suspense>
              }
            />
            <Route
              path="/nouns"
              element={
                <Suspense fallback={<WordleGameLoader />}>
                  <WordleGame dictionaryType="nouns" />
                </Suspense>
              }
            />
            <Route
              path="/names"
              element={
                <Suspense fallback={<WordleGameLoader />}>
                  <WordleGame dictionaryType="names" />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ReduxProvider>
  )
}
