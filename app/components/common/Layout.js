import React, { Suspense } from 'react'
import styled from 'styled-components'
import { theme } from '../../styles/theme'
import Background from './Background'
import Spinner from './Spinner'

const LayoutRoot = styled.div`
  align-items: center;
  background-color: ${theme.canvas.light};
  display: flex;
  justify-content: center;
  min-height: 100vh;
`
const Content = styled.div`
  align-items: center;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  justify-content: center;
  z-index: 2;
`

export default ({ children }) => (
  <Suspense fallback={<Spinner />}>
    <LayoutRoot>
      <Content>{children}</Content>
      <Background />
    </LayoutRoot>
  </Suspense>
)
