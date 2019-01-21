import React from 'react'
import styled from 'styled-components'

const Root = styled.div`
  cursor: pointer;
`

export default ({ className, hash = ' ', length = Math.MAX_SAFE_INTEGER }) => {
  const handleClick = e => {
    e.stopPropagation()
    navigator.clipboard
      .writeText(hash)
      .then(() => console.log('copied to clipboard'))
      .catch(() => console.warn('failed to write to clipboard'))
  }
  return (
    <Root className={className} onClick={handleClick}>
      {hash && hash.substring(0, length)}
    </Root>
  )
}
