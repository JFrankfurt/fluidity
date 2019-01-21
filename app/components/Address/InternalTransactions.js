import React from 'react'
import { Confirmations, Row, Time, TransactionItem } from './EthTransactions'
import { dateParser, weiParser } from '../../utils/parsing'
import { NoDecLink } from '../common'
import HashTrunc from '../common/HashTrunc'
import styled from 'styled-components'
import { theme } from '../../styles/theme'

const Type = styled.div`
  color: ${theme.darkText};
  font-size: 0.7em;
  position: absolute;
  right: 4px;
  top: 16px;
`

export default ({ internalTransactions = [] }) => (
  <>
    {internalTransactions.length > 0 ? (
      internalTransactions.map((transfer, i) => {
        const {
          blockNumber,
          from: sender,
          gas,
          gasUsed,
          hash,
          input,
          timeStamp,
          to,
          value,
          type,
        } = transfer
        console.log(transfer)
        return (
          <TransactionItem key={blockNumber + hash + input + i}>
            <Time>{dateParser(timeStamp)}</Time>
            <Type>{type}</Type>
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
              used {gasUsed} of {gas}
            </Row>
          </TransactionItem>
        )
      })
    ) : (
      <h3>NONE!</h3>
    )}
  </>
)
