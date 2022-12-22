import { useState } from 'react'
import useAuth from '../../hooks/useAuth'

function WelcomeCard() {
  const { auth } = useAuth()
  const [greeting,setGreeting] = useState("Aloha, ")
  return (
    <div className='card'>
      <div className='card-body'>
        <div className='jumbotron mb-0 bg-light'>
          <h1 className='display-4'>{greeting}{auth?.name ?? null}!</h1>
          <p className='lead'>Have a nice day at work!</p>
          {/* <hr className="my-4" /> */}
        </div>
      </div>
    </div>
  )
}

export default WelcomeCard
