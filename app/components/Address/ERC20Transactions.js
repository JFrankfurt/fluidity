import React from 'react'
import { dateParser, weiParser } from '../../utils/parsing'
import { NoDecLink } from '../common/index'
import { Confirmations, Row, Time, TransactionItem } from './EthTransactions'
import styled from 'styled-components'
import { theme } from '../../styles/theme'
import HashTrunc from '../common/HashTrunc'

const Token = styled.div`
  color: ${theme.darkText};
  font-size: 0.7em;
  position: absolute;
  right: 4px;
  top: 27px;
`

export default ({ tokenTransfers = [] }) => (
  <>
    {tokenTransfers.length > 0 ? (
      tokenTransfers.map(
        (
          {
            blockHash,
            blockNumber,
            confirmations,
            from: sender,
            gas,
            gasPrice,
            hash,
            input,
            timeStamp,
            to,
            value,
            tokenSymbol,
          },
          i
        ) => (
          <TransactionItem key={blockHash + hash + input + i}>
            <Time>{dateParser(timeStamp)}</Time>
            <Confirmations>conf: {confirmations}</Confirmations>
            <Token>{tokenSymbol}</Token>
            <Row>
              <div>Ξ {weiParser(value, 'eth', 3)}</div>
            </Row>
            <Row>
              <NoDecLink to={sender}>
                <HashTrunc hash={sender} length={8} />
              </NoDecLink>
              ⟿
              <NoDecLink to={to}>
                <HashTrunc hash={to} length={8} />
              </NoDecLink>
            </Row>
            <Row>
              block:&nbsp;
              <NoDecLink to={`/block/${blockNumber}`}>#{blockNumber}</NoDecLink>
            </Row>
            <Row>
              gas: {gas}@{weiParser(gasPrice, 'gwei', 1)} gwei
            </Row>
          </TransactionItem>
        )
      )
    ) : (
      <h3>NONE!</h3>
    )}
  </>
)
