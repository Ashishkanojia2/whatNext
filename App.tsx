import React from 'react'
import Navigation from './src/Navigations'
import { SafeAreaView } from 'react-native-safe-area-context'

const App = () => {
  return (
   <SafeAreaView style={{flex:1 , backgroundColor:"#000"}}>
    <Navigation/>
   </SafeAreaView>
  )
}

export default App