import { Avatar, IconButton } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import '../Styles/Sidebar.css'
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import SearchOutlined from '@material-ui/icons/SearchOutlined'
import SidebarChat from './Child Components/SidebarChat'

import db, { auth } from '../firebase'
import { useStateValue } from '../StateProvider'
import AddSharpIcon from '@material-ui/icons/AddSharp'
import { MoreVertSharp } from '@material-ui/icons'
import { actionTypes } from '../Reducer'

function Sidebar () {
  const [rooms, setRooms] = useState([])
  const [{ user }, dispatch] = useStateValue()

  const logOut = () => {
    const ans = window.confirm('Are you sure you want to log out?')

    if (ans) {
      dispatch({
        type: actionTypes.LOGOUT_USER,
        user: null
      })
    }
  }

  const createChat = () => {
    const roomName = prompt('CREATE NEW GROUP - Type Group Subject Here...')

    if (roomName) {
      db.collection('rooms').add({
        name: roomName
      })
    }
  }

  useEffect(() => {
    const unsubscribe = db.collection('rooms').onSnapshot(snapshot =>
      setRooms(
        snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        }))
      )
    )

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <div className='sidebar'>
      <div className='sidebar__header'>
        <IconButton className='sidebar__avatar'>
          <Avatar src={user?.photoURL} />
        </IconButton>
        <div className='sidebar__headerRight'>
          <IconButton>
            <DonutLargeIcon fontSize='small' />
          </IconButton>
          <IconButton onClick={createChat}>
            <AddSharpIcon />
          </IconButton>
          <IconButton onClick={logOut}>
            <MoreVertSharp fontSize='small' />
          </IconButton>
        </div>
      </div>

      <div className='sidebar__search'>
        <div className='sidebar__searchContainer'>
          <SearchOutlined style={{ cursor: 'pointer' }} />
          <input placeholder='Search or start a new chat' type='text' />
        </div>
      </div>

      <div className='sidebar__chat'>
        {rooms.map(room => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  )
}

export default Sidebar
