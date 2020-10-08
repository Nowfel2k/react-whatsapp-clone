import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './App.css'
import Chat from './Components/Chat'
import Sidebar from './Components/Sidebar'
import Login from './Components/Login'
import { useStateValue } from './StateProvider'
import Home from './Components/Home'

function App() {
  
  const [{ user }] = useStateValue()

  return (
    <div>
      {!user ? (
        <div className='app__body'><Login /></div>
      ) : (
        <div className='app__body'>
          <Router>
            <Sidebar />

              <Switch>
                

              <Route path='/rooms/:roomId'>
                <Chat />
              </Route>

              <Route path='/'>
                <Home />
              </Route>
                

            </Switch>
          </Router>
        </div>
      )}
    </div>
  )
}

export default App
