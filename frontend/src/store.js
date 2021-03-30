import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import userReducer from './reducers/userReducer'
import sessionReducer from './reducers/sessionReducer'
import scaleReducer from './reducers/scaleReducer'
import intervalReducer from './reducers/intervalReducer'

const reducer = combineReducers({
  user: userReducer,
  session: sessionReducer,
  scales: scaleReducer,
  intervals: intervalReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store
