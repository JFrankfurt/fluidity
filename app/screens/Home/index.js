import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Button, Input } from '../../components/common'
import { Link, Redirect } from 'react-router-dom'
import { isAddress } from '../../utils/validation'
import { getAddress } from '../../api'
import { receivedAddressDataAction } from '../../reducers/address'
import { checkForRecentAddressesAction } from '../../reducers/recent'

const HomeRoot = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 380px;
`

const Address = styled(Link)`
  color: black;
`

const Home = ({ checkForRecentAddresses, recent, receivedAddressData }) => {
  const [address, setAddress] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [redirect, setRedirect] = useState('')

  useEffect(
    () => {
      if (recent.length === 0) {
        checkForRecentAddresses()
      }
    },
    [recent]
  )

  function handleText({ target: { value } }) {
    setAddress(value)
    if (isAddress(value) || value.length === 0) {
      setError(false)
    } else {
      setError(true)
    }
  }

  function handleClick() {
    if (!error && !loading && address) {
      setLoading(true)
      getAddress(address)
        .then(x => x.json())
        .then(data => {
          setLoading(false)
          setError(false)
          receivedAddressData(address, data)
          setRedirect(`/address/${address}`)
        })
        .catch(() => {
          setLoading(false)
          setError(true)
        })
    }
  }

  if (redirect) {
    return <Redirect to={redirect} push />
  }
  return (
    <HomeRoot>
      <Input
        error={error}
        onChange={handleText}
        onKeyPress={({key}) => {
          if (key === 'Enter') {
            handleClick()
          }
        }}
        placeholder="eth address"
        type="text"
        value={address}
        style={{ width: '100%' }}
      />
      <Button disabled={error || !address} onClick={handleClick}>
        {loading ? 'loading...' : 'search'}
      </Button>
      {recent.length > 0 && (
        <>
          <br />
          <h4>Recent Addresses</h4>
          {recent.map(address => (
            <Address to={`/address/${address}`} key={address}>
              {address}
            </Address>
          ))}
        </>
      )}
    </HomeRoot>
  )
}

const mapStateToProps = ({ recent }) => ({ recent })
const mapDispatchToProps = dispatch => ({
  checkForRecentAddresses: () => dispatch(checkForRecentAddressesAction()),
  receivedAddressData: (address, data) =>
    dispatch(receivedAddressDataAction(address, data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
