import { RECEIVED_ADDRESS } from '../reducers/address'
import {
  ADDRESSES_FROM_LOCAL_STORAGE,
  CHECK_FOR_RECENT_ADDRESSES,
} from '../reducers/recent'

export const recentAddressMiddleware = ({
  dispatch,
  getState,
}) => next => action => {
  const returnValue = next(action)
  const nextState = getState()
  if (action.type === RECEIVED_ADDRESS) {
    localStorage.setItem('recent-addresses', JSON.stringify(nextState.recent))
  } else if (
    action.type === CHECK_FOR_RECENT_ADDRESSES &&
    nextState.recent.length === 0
  ) {
    let addresses = JSON.parse(localStorage.getItem('recent-addresses')) || []
    addresses = Array.from(new Set(addresses))
    if (addresses.length > 0) {
      dispatch({
        type: ADDRESSES_FROM_LOCAL_STORAGE,
        addresses,
      })
    }
  }
  return returnValue
}
