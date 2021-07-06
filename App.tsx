import React from 'react'
import { NativeRouter, Route, Switch } from 'react-router-native'

import { Home } from './src/pages/Home'
import { Login } from './src/pages/Login'
import { Scroll } from './src/pages/Scroll'
import { Drag } from './src/pages/Drag'

const App = () => {
  return (
    <NativeRouter>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/login" component={Login} />
        <Route path="/scroll" component={Scroll} />
        <Route path="/drag" component={Drag} />
      </Switch>
    </NativeRouter>
  )
}

export default App
