import React from 'react'
import styled from 'styled-components'

const Root = styled.div`
  align-items: center;
  display: flex;
  position: relative;
  width: 30%;
`

const Nav = styled.div`
  align-items: center;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: rgba(50, 50, 93, 0.11) 0px 2px 4px,
    rgba(0, 0, 0, 0.08) 0px 1px 2px;
  cursor: pointer;
  display: flex;
  font-size: 2.1em;
  font-weight: bold;
  height: 40px;
  justify-content: center;
  margin: 0 6px;
  width: 40px;
  transition: 200ms ease all;
  &:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  }
`

export default () => (
  <Root>
    <Nav>⥺</Nav>
    <Nav>⥵</Nav>
  </Root>
)
