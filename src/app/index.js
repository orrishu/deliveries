import 'react-hot-loader/patch'
import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'mobx-react'
import * as stores from 'stores'

function mount() {
  const App = require('./components/App').default
  render(
    <AppContainer>
      <Provider {...stores}>
        <App />
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  )
}

if (module.hot) {
  module.hot.accept('App', mount)
}
mount()
