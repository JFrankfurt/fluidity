import BigNumber from 'bignumber.js'
import { DateTime } from 'luxon'

const units = {
  wei: 1,
  gwei: 1000000000,
  ether: 1000000000000000000,
  eth: 1000000000000000000,
}

export const dateParser = timestamp => {
  const date = DateTime.fromSeconds(parseInt(timestamp, 10))
  return date.toLocaleString()
}

export const weiParser = (wei, unit, precision = 5) => {
  wei = new BigNumber(wei)
  return wei.div(units[unit]).toFixed(precision)
}

export const hexStringToInt = (hex, precision = 0) => {
  const num = new BigNumber(hex)
  return num.toFixed(precision)
}
