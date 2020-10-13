import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, InsertEmoticon, MoreVert, SearchOutlined } from '@material-ui/icons'
import MicIcon from '@material-ui/icons/Mic'
import React, { useState, useEffect } from 'react'
import '../Styles/Chat.css'
import { useParams } from 'react-router-dom'
import db from '../firebase'
import { useStateValue } from '../StateProvider'
import firebase from 'firebase'

function Chat() {

    const [seed, setSeed] = useState('')
    const [input, setInput] = useState('')
    const [roomName, setRoomName] = useState('')
    const { roomId } = useParams();
    const [messages, setMessages] = useState([])
    const [{ user }] = useStateValue()

    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc').onSnapshot(
                snapshot => (
                    setMessages(snapshot.docs.map(
                        doc => (
                            doc.data()
                        )
                    ))
                )
            )
        }

    }, [roomId])

    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
                setRoomName(snapshot.data().name)
            ))
        }
    }, [roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [])

    const sendMessage = (e) => {
        e.preventDefault()
        // messaging
        console.log(input)

        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })


        setInput("")
    }

    return (
        <div className="chat">
            <div className="chat__header">
                <IconButton>
                    <Avatar src={`https://avatars.dicebear.com/api/jdenticon/${seed}.svg`} />
                </IconButton>
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>

                    {messages.length > 0 ? (<p>Last Activity at {
                        new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()
                    }</p>) : <p>New Group</p>}

                </div>
                <div className="chat__headerRight">
                    <IconButton >
                        <SearchOutlined />
                    </IconButton>

                    <IconButton >
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className="chat__body">

                {messages.map((message, id) => (
                    <p key={id} className={`chat__message && ${message.name === user.displayName && "chat__reciever"}`}>
                        <span className="chat__name">
                            {message.name}
                        </span>
                        {message.message}
                        <span className="chat__timestamp">
                            {
                                new Date(message.timestamp?.toDate()).toLocaleTimeString().slice(0, -6)
                            }
                        </span>
                    </p>

                ))}

            </div>

            <div className="chat__footer">
                <IconButton>
                    <InsertEmoticon />
                </IconButton>

                <IconButton >
                    <AttachFile />
                </IconButton>

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
