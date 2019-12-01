import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { rootReducer, initialState } from './reducers'

const store = createStore( rootReducer )

export default store
