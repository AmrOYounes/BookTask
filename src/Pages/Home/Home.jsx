import React from 'react'
import Book from '../../Components/book';
function Home() {
  console.log(localStorage.getItem('access-token'))
  return (
    <Book/>
  )
}

export default Home