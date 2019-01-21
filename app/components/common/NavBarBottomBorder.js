import styled from 'styled-components'
import { theme } from '../../styles/theme'

export default styled.div`
  height: 12px;
  padding-bottom: 4px;
  width: 120%;
  animation: rainbow 7s linear infinite alternate;
  background: linear-gradient(
    124deg,
    ${theme.color.blue},
    ${theme.color.green},
    ${theme.color.purple},
    ${theme.color.pink},
    ${theme.color.yellow},
    ${theme.color.blue},
    ${theme.color.green},
    ${theme.color.purple},
    ${theme.color.pink}
  );
  background-size: 1800% 1800%;
  @keyframes rainbow {
    0% {
      background-position: 0% 82%;
    }
    25% {
      background-position: 100% 19%;
    }
    75% {
      background-position: 0% 90%;
    }
    100% {
      background-position: 100% 10%;
    }
  }
`
