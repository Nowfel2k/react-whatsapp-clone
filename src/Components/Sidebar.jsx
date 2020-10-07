import { Avatar, IconButton } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import '../Styles/Sidebar.css'
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import SearchOutlined from '@material-ui/icons/SearchOutlined'
import SidebarChat from './Child Components/SidebarChat'

import db from '../firebase-config'

function Sidebar() {

    const [rooms, setRooms] = useState([])

    useEffect(() => {
        const unsubscribe = db.collection('rooms').onSnapshot(snap => (
            
            setRooms(snap.docs.map(
                doc => ({
                    id: doc.id,
                    data: doc.data(),
                })
            )) 

        ));

        return () => {
            unsubscribe()
        }

    }, [])

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <IconButton>
                    <Avatar />
                </IconButton>
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input placeholder="Search or start a new chat" type="text" />
                </div>
            </div>

            <div className="sidebar__chat">
                <SidebarChat addNewChat />
                {rooms.map(room => 
                    (<SidebarChat key={room.id} id={room.id} name={room.data.name} />)
                )}

            </div>
        </div>
    )
}

export default Sidebar
