import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from './reducers'
import AppMain from './AppMain'

const store = createStore(reducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default function App() {

  return (
    <>
    <Provider store={store}>
        <AppMain />
    </Provider>
    </>
  )
}