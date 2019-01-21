import { combineReducers } from 'redux'
import address from './address'
import block from './block'
import recent from './recent'

export const rootReducer = combineReducers({
  address,
  block,
  recent,
})
