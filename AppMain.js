import React from 'react'
import { useSelector } from 'react-redux'
import Home from './screens/Home'


export default function AppMain() {
  const screen = useSelector(state => state.navigation)
  console.log(screen)

  return (
    <>
        {screen === 'home' ? <Home /> : null}
    </>
  )
}