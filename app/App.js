import React, { useEffect } from 'react'
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from './store'
import Address from './screens/Address'
import Block from './screens/Block'
import Home from './screens/Home'
import { hot } from 'react-hot-loader/root'
import Layout from './components/common/Layout'

const store = configureStore({})

function htmlDecode(input) {
  let e = document.createElement('div')
  e.innerHTML = input
  return e.childNodes[0].nodeValue
}

const useEmojiTitle = () =>
  useEffect(() => {
    const n = setInterval(
      () =>
        fetch('https://ranmoji.herokuapp.com/emojis/api/v.1.0/')
          .then(x => x.json())
          .then(({ emoji }) => {
            const newEmoji = htmlDecode(emoji)
            let emojiArray = Array.from(document.title)
            if (emojiArray.length >= 2) {
              emojiArray.unshift(newEmoji)
              while (emojiArray.length >= 6) {
                emojiArray.pop()
              }
              document.title = emojiArray.join('')
            } else {
              document.title = document.title + newEmoji
            }
          }),
      3000
    )
    return () => clearInterval(n)
  })

const App = () => {
  useEmojiTitle()

  return (
    <Router>
      <Provider store={store}>
        <Layout>
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/address/:address" component={Address} />
            <Route path="/block/:block" component={Block} />
            <Route path="/" render={() => <Redirect to="/home" />} />
          </Switch>
        </Layout>
      </Provider>
    </Router>
  )
}

export default hot(App)
