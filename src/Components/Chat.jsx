import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, InsertEmoticon, MoreVert, SearchOutlined } from '@material-ui/icons'
import MicIcon from '@material-ui/icons/Mic'
import React, { useState, useEffect } from 'react'
import '../Styles/Chat.css'
import { useParams } from 'react-router-dom'
import db from '../firebase-config'

function Chat() {

    const [seed, setSeed] = useState('')
    const [input, setInput] = useState('')
    const [roomName, setRoomName] = useState('')
    const { roomId } = useParams();

    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId).OnSnapshot(snapshot => (
                setRoomName(snapshot.data().name)
            ))
        }
    }, [roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [roomId])

    const sendMessage = (e) => {
        e.preventDefault()
        // messaging
        console.log(input)
        setInput("")
    }

    return (
        <div className="chat">
            <div className="chat__header">
                <IconButton>
                    <Avatar src={seed} />
                </IconButton>
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>Members or Last seen</p>
                </div>
                <div className="chat__headerRight">
                    <IconButton >
                        <SearchOutlined />
                    </IconButton>

                    <IconButton >
                        <AttachFile />
                    </IconButton>

                    <IconButton >
                        <MoreVert/>
                    </IconButton>
                </div>
            </div>

            <div className="chat__body">
                <p className={`chat__message && ${true && "chat__reciever"}`}>
                    <span className="chat__name">
                        Faiz
                    </span>
                    Hi Navfal!
                </p>
            </div>

            <div className="chat__footer">
                <InsertEmoticon />
                <form action="">
                    <input value={input} onChange={e => setInput(e.target.value)} placeholder="Send a message" type="text" />
                    <button onClick={sendMessage}>Send a message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
