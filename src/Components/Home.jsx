import React from 'react'
import '../Styles/Home.css'

function Home() {
    return (
        <div className="home">
            <div className="home__container">
                <div className="home__logo">
                    <img src="https://www.freeiconspng.com/uploads/logo-whatsapp-picture-images-hd-6.png" alt="Whatsapp Logo" />
                </div>
                <div className="home__info">
                    <h2>
                        Keep your phone connected
                    </h2>
                    <p>Whatsapp connects to your phone to sync messages. To reduce data usage, connect your phone to Wi-Fi.</p>
                </div>
            </div>
        </div>
    )
}

export default Home
