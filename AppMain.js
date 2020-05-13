import React from 'react'
import { useSelector } from 'react-redux'
import Home from './screens/Home'
import Main from './screens/Main'

export default function AppMain() {
  const screen = useSelector(state => state.navigation)

  const display = {
      'home': <Home />,
      'main': <Main />
  }

  return (
    <>
        {display[screen]}
    </>
  )
}