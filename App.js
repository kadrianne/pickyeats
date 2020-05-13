import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { SafeAreaView } from 'react-native'
import reducers from './reducers'
import Home from './screens/Home'

const store = createStore(reducers)

function App() {
  return (
    <>
    <Provider store={store}>
      <SafeAreaView style={styles.body}>
        <Home />
      </SafeAreaView>
    </Provider>
    </>
  )
}

export default App
