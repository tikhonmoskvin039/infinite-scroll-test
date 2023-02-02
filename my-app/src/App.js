import React, { useState, useEffect } from 'react'
import { Container, Card } from 'react-bootstrap'
import Loader from './components/Loader'
import './App.css'

/**
 * Component for infinite scroll using randomuser.me API
 * @returns {JSX.Element} - Rendered component
 */

function App () {
  const [myLoading, setMyLoading] = useState(true)
  setTimeout(() => {
    setMyLoading(false)
  }, 1500)

  /**
   * State for storing the list of users
   * @type {Array.<{name: {first: string, last: string}, login: {uuid: string}}>}
   */
  const [users, setUsers] = useState([])

  /**
   * State for storing the current page number
   * @type {number}
   */
  const [page, setPage] = useState(1)

  /**
   * State for loading status
   * @type {boolean}
   */
  const [loading, setLoading] = useState(false)

  /**
   * Fetch random users from the API
   * @returns {Promise}
   */
  const fetchData = async () => {
    setLoading(true)
    const response = await fetch(
      `https://randomuser.me/api/?results=10&page=${page}`
    )
    const data = await response.json()
    setUsers(prevUsers => [...prevUsers, ...data.results])
    setLoading(false)
  }

  /**
   * Adds event listener for scroll event on window
   */
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  /**
   * Handles scroll event on window
   * Sets the next page if the user has scrolled to the bottom of the page and data is not being loaded
   */
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      loading
    )
      return
    setPage(prevPage => prevPage + 1)
  }

  /**
   * Calls the fetchData method on page state change
   */
  useEffect(() => {
    fetchData()
  }, [page])

  /**
   * Renders the component
   */

  return (
    <>
      {myLoading ? (
        <Container className='box'>
          <Loader />
        </Container>
      ) : (
        <Container className='box'>
          <h1 className='title'>Created by Tikhon Moskvin</h1>

          {users.map(user => (
            <Card
              className='card'
              key={user.login.uuid}
              style={{ width: '18rem' }}
            >
              <Card.Img variant='top' src={user?.picture.large} alt='...' />
              <Card.Body>
                <Card.Title>
                  <b>
                    {user?.name.first}&nbsp;{user?.name.last}
                  </b>
                </Card.Title>
                <Card.Text className='text'>{user?.email}</Card.Text>
              </Card.Body>
            </Card>
          ))}
          {loading && <p>Loading...</p>}
        </Container>
      )}
    </>
  )
}

export default App
