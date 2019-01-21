export const RECEIVED_ADDRESS = 'RECEIVED_ADDRESS'

export const receivedAddressDataAction = (address, data) => ({
  type: RECEIVED_ADDRESS,
  address,
  data,
})

export default (state = {}, action) => {
  switch(action.type) {
    case RECEIVED_ADDRESS:
      return {
        ...state,
        [action.address]: action.data
      }
    default:
      return state
  }
}
