import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import '../../Styles/SidebarChat.css'
import db from '../../firebase'
import { Link } from 'react-router-dom'

function SidebarChat({ id, name, addNewChat }) {

    const [seed, setSeed] = useState('')
    const [messages, setMessages] = useState('')

    useEffect(() => {
        if (id) {
            db.collection('rooms')
                .doc(id)
                .collection('messages')
                .orderBy('timestamp', 'desc')
                .onSnapshot(
                    snapshot => setMessages(snapshot.docs
                        .map(
                            doc => doc.data()
                        )
                    )
                )
        }
    }, [id])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [])

    return (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/jdenticon/${(seed)}.svg`} />
                <div className="sidebarChat__info">
                    <h2>{name}</h2>
                    {messages.length > 0 ? (<p>
                        {/* MESSAGES IMPORTED IN DESCENDING ORDER */}
                        {messages[0]?.message}
                    </p>) : (<p>No Messages</p>)}

                </div>
            </div>
        </Link>
    )
}

export default SidebarChat
