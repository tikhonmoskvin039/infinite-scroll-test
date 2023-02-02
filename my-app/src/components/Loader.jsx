import React from 'react'
import { Container } from 'react-bootstrap'

function Loader () {
  return (
    <Container>
      <div className='lds-roller'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </Container>
  )
}

export default Loader
