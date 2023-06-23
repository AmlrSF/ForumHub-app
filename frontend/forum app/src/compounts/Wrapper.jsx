import React from 'react'

const Wrapper = (props) => {
  return (
    <main className='relative mb-5'>
        {props.children}
    </main>
  )
}

export default Wrapper