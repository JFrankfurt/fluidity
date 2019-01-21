import React, { useEffect, useState } from 'react'
import { Link, Redirect, Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'
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
import { getAddress } from '../../api'
import { receivedAddressDataAction } from '../../reducers/address'
import Spinner from '../../components/common/Spinner'
import EthTransactions from '../../components/Address/EthTransactions'
import MinedBlocks from '../../components/Address/MinedBlocks'
import InternalTransactions from '../../components/Address/InternalTransactions'
import ERC20Transactions from '../../components/Address/ERC20Transactions'
import { weiParser } from '../../utils/parsing'
import HashTrunc from '../../components/common/HashTrunc'
import NavBarBorderBottom from '../../components/common/NavBarBottomBorder'

const AddressRoot = styled(Container)`
  transition: 500ms ease all;
  min-height: 770px;
  padding-bottom: 0;
  width: 400px;
`

const AddressText = styled(HashTrunc)`
  font-size: 16px;
  line-height: 1em;
  padding: 14px 0;
`

const Address = ({ address, data, match, receivedAddressData }) => {
  const [loading, setLoading] = useState(false)
  useEffect(
    () => {
      if (!data) {
        setLoading(true)
        getAddress(address)
          .then(x => x.json())
          .then(data => {
            setLoading(false)
            receivedAddressData(address, data)
          })
          .catch(() => setLoading(false))
      }
    },
    [address, data]
  )
  let balance
  if (data) {
    balance = weiParser(data.ethBalance, 'eth', 3)
  }
  return (
    <>
      <AddressRoot>
        <Header>
          <TopLine>
            <Link to="/home" style={{ color: theme.title }}>
              ↼home
            </Link>
            <SubTitle>Address</SubTitle>
            <span style={{ color: theme.subTitle, minWidth: 75 }}>
              {balance && `Ξ ${balance}`}
            </span>
          </TopLine>
          <AddressText hash={address} />
          <NavBar>
            <NavBarLink to={`/address/${match.params.address}/`}>
              ETH TX
            </NavBarLink>
            <NavBarLink to={`/address/${match.params.address}/mined`}>
              MINED
            </NavBarLink>
            <NavBarLink to={`/address/${match.params.address}/internal`}>
              INTERNAL
            </NavBarLink>
            <NavBarLink to={`/address/${match.params.address}/erc20`}>
              ERC20
            </NavBarLink>
          </NavBar>
          <NavBarBorderBottom />
        </Header>
        {loading ? (
          <Spinner />
        ) : (
          <Body>
            <Switch>
              <Route
                path={`/address/${match.params.address}/mined`}
                render={() => <MinedBlocks {...data} />}
              />
              <Route
                path={`/address/${match.params.address}/internal`}
                render={() => <InternalTransactions {...data} />}
              />
              <Route
                path={`/address/${match.params.address}/erc20`}
                render={() => <ERC20Transactions {...data} />}
              />
              <Route
                path={`/address/${match.params.address}/`}
                render={() => <EthTransactions {...data} />}
              />
              <Route
                render={() => (
                  <Redirect to={`/address/${match.params.address}/`} />
                )}
              />
            </Switch>
          </Body>
        )}
      </AddressRoot>
      <Route
        path={`/address/${match.params.address}/`}
        render={() => {
          return data ? <SubTitle>1-{data.transactions.length}</SubTitle> : <div />
        }}
      />
    </>
  )
}

const mapStateToProps = (state, props) => {
  const address = props.match.params.address
  return {
    address,
    data: state.address[address],
  }
}
const mapDispatchToProps = dispatch => ({
  receivedAddressData: (address, data) =>
    dispatch(receivedAddressDataAction(address, data)),
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Address)
)
