import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import App from './App'

/*
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
*/

// function importAll(r) {
//   let images = {};
//   r.keys().forEach((key) => (images[key] = r(key)));
//   return images
// }

// const noteImages = importAll(require.context('../images/notes', false, '/\.svg$/'))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

