import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from './reducers'
import AppMain from './AppMain'

const store = createStore(reducers)

export default function App() {

  return (
    <>
    <Provider store={store}>
        <AppMain />
    </Provider>
    </>
  )
}