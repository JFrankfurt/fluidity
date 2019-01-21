import React from 'react'
import styled, { keyframes } from 'styled-components'

const Container = styled.div`
  width: 40px;
  height: 40px;
  position: relative;
  margin: 20px auto;
`

const bounceAnimation = keyframes`
  0%, 100% {
    transform: scale(0.0);
  } 50% {
    transform: scale(1.0);
  }
`

const Bounce = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #333;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;
  animation: ${bounceAnimation} 2s infinite ease-in-out;
`

const Bounce2 = styled(Bounce)`
  animation-delay: -1s;
`

export default () => (
  <Container>
    <Bounce />
    <Bounce2 />
  </Container>
)
