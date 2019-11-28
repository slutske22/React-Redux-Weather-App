import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { searchReducer, initialState } from './reducers'

const store = createStore( searchReducer, applyMiddleware(thunk) )
