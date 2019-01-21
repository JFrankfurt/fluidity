import React from 'react'
import { darken, desaturate, lighten, readableColor } from 'polished'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { theme } from '../../styles/theme'

export const Body = styled.div`
  height: 700px;
  overflow-x: hidden;
  width: 100%;
`

export const Button = styled.div`
  align-items: center;
  background-color: ${({ color = theme.color.blue, disabled = false }) =>
    disabled ? lighten(0.2, desaturate(0.9, color)) : color};
  border-radius: 2px;
  box-shadow: rgba(50, 50, 93, 0.11) 0px 2px 4px,
    rgba(0, 0, 0, 0.08) 0px 1px 2px;
  color: ${({ color = theme.color.blue, disabled = false }) =>
    disabled ? lighten(0.9, readableColor(color)) : readableColor(color)};
  cursor: ${({ disabled = false }) => (disabled ? 'default' : 'pointer')};
  display: flex;
  justify-content: center;
  margin: 2;
  padding: 6px 24px;
  text-transform: uppercase;
  transition: 200ms ease all;
  &:hover {
    background-color: ${({ color = theme.color.blue, disabled = false }) =>
      disabled ? lighten(0.2, desaturate(0.9, color)) : lighten(0.15, color)};
  }
`

export const Container = styled.div`
  background-color: ${darken(0.02, theme.canvas.light)};
  border-radius: 2px;
  box-shadow: rgba(50, 50, 93, 0.11) 0px 2px 4px,
    rgba(0, 0, 0, 0.08) 0px 1px 2px;
  padding: 6px;
`

export const Header = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

export const NavBar = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding-bottom: 2px;
  width: 100%;
`
export const NavBarLink = styled(Link)`
  border-radius: 2px;
  color: #000;
  cursor: pointer;
  display: flex;
  flex: 1 1 auto;
  justify-content: center;
  margin: 0 4px;
  outline-bottom: ${({ active }) =>
    active ? `2px solid ${theme.color.blue}` : 'none'};
  text-decoration: none;
  transition: 200ms ease all;
  &:hover {
    background-color: ${({ active }) =>
      active ? 'none' : darken(0.15, theme.canvas.light)};
  }
`

export const NoDecLink = styled(Link)`
  text-decoration: none;
`

export const SubTitle = styled.span`
  color: ${theme.subTitle};
  font-size: 18px;
  line-height: 32px;
  padding-bottom: 28px;
`

export const Title = styled.h1`
  color: ${theme.title};
  font-size: 64px;
  line-height: 77px;
  padding-bottom: 28px;
  text-align: center;
`
export const TopLine = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`

export const Input = styled.input`
  border: 1px solid ${({ error }) => (error ? 'red' : theme.darkText)};
  border-radius: 2px;
  margin: 4px;
  padding: 2px;
  &:focus {
    border: 1px solid ${theme.color.blue};
    outline: none;
  }
`
