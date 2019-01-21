export const RECEIVED_BLOCK = 'RECEIVED_BLOCK'

export const receivedBlockDataAction = (blockNumber, data) => ({
  type: RECEIVED_BLOCK,
  blockNumber,
  data,
})

export default (state = {}, action) => {
  switch(action.type) {
    case RECEIVED_BLOCK:
      return {
        ...state,
        [action.blockNumber]: action.data
      }
    default:
      return state
  }
}
