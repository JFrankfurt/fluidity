import { RECEIVED_ADDRESS } from './address'

export const CHECK_FOR_RECENT_ADDRESSES = 'CHECK_FOR_RECENT_ADDRESSES'
export const ADDRESSES_FROM_LOCAL_STORAGE = 'ADDRESSES_FROM_LOCAL_STORAGE'

export const checkForRecentAddressesAction = () => ({
  type: CHECK_FOR_RECENT_ADDRESSES,
})

export default (state = [], action) => {
  switch (action.type) {
    case RECEIVED_ADDRESS:
      let recent = []
      if (state.length > 4) {
        recent = [...state]
        while (recent.length > 4) {
          recent.shift()
        }
        recent = [...recent, action.address]
      } else {
        recent = [...state, action.address]
      }
      return Array.from(new Set(recent))
    case ADDRESSES_FROM_LOCAL_STORAGE:
      return action.addresses
    default:
      return state
  }
}
