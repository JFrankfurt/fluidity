import React from 'react'
import styled from 'styled-components'
import HashTrunc from '../common/HashTrunc'
import { dateParser, hexStringToInt, weiParser } from '../../utils/parsing'
import { theme } from '../../styles/theme'
import { NoDecLink } from '../common'

export const Confirmations = styled.div`
  color: ${theme.darkText};
  font-size: 0.7em;
  position: absolute;
  right: 4px;
  top: 16px;
`

export const TransactionItem = styled.div`
  flex: 1 1 auto;
  padding: 4px 0;
  position: relative;
  width: 100%;
`

export const Row = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
`

export const Time = styled.div`
  color: ${theme.darkText};
  font-size: 0.7em;
  position: absolute;
  right: 4px;
  top: 4px;
`

export default ({ timestamp, transactions = [] }) => (
  <>
    {transactions.length > 0 ? (
      transactions.map(
        ({
          confirmations,
          from: sender,
          gas,
          gasPrice,
          hash,
          to,
          value,
        }) => (
          <TransactionItem key={hash}>
            <Time>{dateParser(hexStringToInt(timestamp))}</Time>
            <Row>
              <div>Ξ {weiParser(value, 'eth', 3)}</div>
            </Row>
            <Row>
              <NoDecLink to={`/address/${sender}`}>
                <HashTrunc hash={sender} length={8} />
              </NoDecLink>
              ⟿
              <NoDecLink to={`/address/${to}`}>
                <HashTrunc hash={to} length={8} />
              </NoDecLink>
            </Row>
            <Row>
              gas: {hexStringToInt(gas)}@
              {weiParser(gasPrice, 'gwei', 1)} gwei
            </Row>
          </TransactionItem>
        )
      )
    ) : (
      <h3>NONE!</h3>
    )}
  </>
)
