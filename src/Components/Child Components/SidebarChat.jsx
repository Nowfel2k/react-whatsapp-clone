import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import '../../Styles/SidebarChat.css'
import db from '../../firebase-config'
import { Link } from 'react-router-dom'

function SidebarChat({ id, name, addNewChat }) {

    const [seed, setSeed] = useState('')

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [])

    const createChat = () => {
        const roomName = prompt("Type Group Subject Here...")

        db.collection('rooms').add({
            name: roomName,
        })
    }

    return addNewChat ? (
        <div onClick={createChat} className="sidebarChat add-new-option">
            ADD NEW CHAT
        </div>
    ) : (
            <Link to={`/rooms/${id}`}>
                <div className="sidebarChat">
                    <Avatar src={`https://avatars.dicebear.com/api/jdenticon/${seed}.svg`} />
                    <div className="sidebarChat__info">
                        <h2>{name}</h2>
                        <p>Last Message...</p>
                    </div>
                </div>
            </Link>
        )
}

export default SidebarChat
