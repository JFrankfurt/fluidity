import React from 'react'
import styled from 'styled-components'
import { NoDecLink } from '../common/index'
import { dateParser, weiParser } from '../../utils/parsing'
import { theme } from '../../styles/theme'

const BlockItem = styled.div`
  flex: 1 1 auto;
  padding: 4px 0;
  position: relative;
  width: 100%;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
`

const Time = styled.div`
  color: ${theme.darkText};
  font-size: 0.7em;
  position: absolute;
  right: 4px;
  top: 4px;
`

export default ({ minedBlocks = [] }) => (
  <>
    {minedBlocks.length > 0 ? (
      minedBlocks.map(({ blockNumber, blockReward, timeStamp }) => (
        <BlockItem key={blockNumber + timeStamp}>
          <Time>{dateParser(timeStamp)}</Time>
          <Row>Ξ {weiParser(blockReward, 'eth', 3)}</Row>
          <Row>
            block:&nbsp;
            <NoDecLink to={`/block/${blockNumber}`}>#{blockNumber}</NoDecLink>
          </Row>
        </BlockItem>
      ))
    ) : (
      <h3>NONE!</h3>
    )}
  </>
)
