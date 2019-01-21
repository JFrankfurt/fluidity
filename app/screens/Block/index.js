import React, { useEffect, useState } from 'react'
import { Link, Redirect, Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { getBlock } from '../../api'
import { receivedBlockDataAction } from '../../reducers/block'
import {
  Body,
  Container,
  Header,
  NavBar,
  NavBarLink,
  SubTitle,
  TopLine,
} from '../../components/common'
import { theme } from '../../styles/theme'
import Transactions from '../../components/Block/Transactions'
import Spinner from '../../components/common/Spinner'
import HashTrunc from '../../components/common/HashTrunc'
import NavBarBottomBorder from '../../components/common/NavBarBottomBorder'

const BlockRoot = styled(Container)`
  transition: 500ms ease all;
  min-height: 770px;
  padding-bottom: 0;
  width: 400px;
`

const Block = ({ blockNumber, data, match, receivedBlockData }) => {
  const [loading, setLoading] = useState(false)
  useEffect(
    () => {
      if (!data) {
        setLoading(true)
        getBlock(blockNumber)
          .then(x => x.json())
          .then(data => {
            setLoading(false)
            receivedBlockData(blockNumber, data)
          })
          .catch(() => setLoading(false))
      }
    },
    [blockNumber, data]
  )
  return (
    <BlockRoot>
      <Header>
        <TopLine>
          <Link to="/home" style={{ color: theme.title }}>
            ↼home
          </Link>
          <SubTitle>Block</SubTitle>
          <span style={{ color: theme.subTitle, minWidth: 75 }}>
            {data && <HashTrunc hash={data.hash} length={7} />}
          </span>
        </TopLine>
        <NavBar>
          <NavBarLink to={`/block/${match.params.block}/`}>
            TRANSACTIONS
          </NavBarLink>
        </NavBar>
        <NavBarBottomBorder />
      </Header>
      {loading ? (
        <Spinner />
      ) : (
        <Body>
          <Switch>
            <Route
              path={`/block/${match.params.block}`}
              render={() => <Transactions {...data} />}
            />
            <Route
              render={() => <Redirect to={`/block/${match.params.block}/`} />}
            />
          </Switch>
        </Body>
      )}
    </BlockRoot>
  )
}

const mapStateToProps = (state, props) => {
  const blockNumber = props.match.params.block
  return {
    blockNumber,
    data: state.block[blockNumber],
  }
}
const mapDispatchToProps = dispatch => ({
  receivedBlockData: (blockNumber, data) =>
    dispatch(receivedBlockDataAction(blockNumber, data)),
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Block)
)
