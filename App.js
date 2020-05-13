import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from './reducers'
import { SafeAreaView, StyleSheet, View, Text, Image } from 'react-native'
import Colors from './styles/Colors'
import { Button } from 'react-native-elements'

const store = createStore(reducers)

function App() {
  return (
    <>
    <Provider store={store}>
      <SafeAreaView style={styles.body}>
        <Image style={{height: '45%', width: 350}} source={require('./assets/logo/pickyeats.png')} />
        <View style={styles.container}>
          <Button buttonStyle={styles.button} titleStyle={styles.buttonText} type="clear" title="LOGIN" />
          <Button buttonStyle={styles.button} titleStyle={styles.buttonText} type="clear" title="SIGN UP" />
        </View>
      </SafeAreaView>
    </Provider>
    </>
  )
}

const styles = StyleSheet.create({
  body: {
    height: '100%',
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.orange,
  },
  button: {
    margin: 10,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 30,
    fontFamily: 'Pompiere-Regular'
  },
  container: {
    flexDirection: 'row'
  }
})

export default App
