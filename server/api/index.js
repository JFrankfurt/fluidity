const express = require('express')
const fetch = require('node-fetch')
const querystring = require('querystring')
const { numberToHexString } = require('../utils/parsing')

const ETHERSCAN_API_URL = 'http://api.etherscan.io/api'
const INFURA_API_URL = `https://mainnet.infura.io/v3/${
  process.env.INFURA_PROJECT_ID
}`

const urlParser = queryObject => {
  const qs = querystring.stringify({
    ...queryObject,
    apikey: process.env.ETHERSCAN_API_KEY,
  })
  return new URL(`${ETHERSCAN_API_URL}?${qs}`)
}
module.exports = express
  .Router()
  .get('/address/:address', async (req, res) => {
    const { address } = req.params
    const startblock = 0
    const endblock = 99999999
    try {
      const [
        ethBalance,
        internalTransactions,
        minedBlocks,
        tokenTransfers,
        transactions,
      ] = await Promise.all([
        fetch(
          // eth balance
          urlParser({
            module: 'account',
            action: 'balance',
            address,
            tag: 'latest',
          })
        ).then(x => x.json()),
        fetch(
          // internal transactions
          urlParser({
            module: 'account',
            action: 'txlistinternal',
            address,
            startblock,
            endblock,
            sort: 'desc',
          })
        ).then(x => x.json()),
        fetch(
          // mined blocks
          urlParser({
            module: 'account',
            action: 'getminedblocks',
            address,
            blocktype: 'blocks',
          })
        ).then(x => x.json()),
        fetch(
          // token transfers
          urlParser({
            module: 'account',
            action: 'tokentx',
            address,
            startblock,
            endblock,
            sort: 'desc',
          })
        ).then(x => x.json()),
        fetch(
          // normal eth transactions
          urlParser({
            module: 'account',
            action: 'txlist',
            address,
            startblock,
            endblock,
            page: 1,
            offset: 300,
            sort: 'desc',
          })
        ).then(x => x.json()),
      ])
      res.status(200).json({
        ethBalance: ethBalance.result,
        internalTransactions: internalTransactions.result,
        minedBlocks: minedBlocks.result,
        tokenTransfers: tokenTransfers.result,
        transactions: transactions.result.slice(0, 300),
      })
    } catch (error) {
      console.error(error)
      res.status(500).send()
    }
  })
  .get('/block/:blockNumber', async (req, res) => {
    const { blockNumber } = req.params
    try {
      const hexBlock = numberToHexString(parseInt(blockNumber, 10))
      const response = await fetch(INFURA_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'eth_getBlockByNumber',
          params: [hexBlock, true],
          id: 1,
        }),
      })
      if (response.status < 400) {
        const { result } = await response.json()
        res.status(response.status).json(result)
      } else {
        console.warn(response)
        res.status(response.status).send()
      }
    } catch (error) {
      console.error(error)
      res.status(500).send()
    }
  })
