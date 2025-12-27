import React from 'react'
import './FriendInfo.css'

export default function FriendInfo({ message, status }) {
    return (
        <div className="friend-info">
            <div className="img-stauts-container">
                <div className="img-container">
                    <img src="https://img.freepik.com/free-photo/fair-haired-woman-looking-with-pleased-calm-expression_176420-15145.jpg?semt=ais_hybrid&w=740&q=80" alt="" />
                </div>
                <div className="status-dot"></div>
            </div>
            <div className="friend-name-status-container">
                <p>Natacha </p>
                {status && <p className='online'>Online</p>}
                {message && <p className='last-message'>Hey you forget to feed your cat, also contact me as soon as possible Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo esse iure quae! Eaque vel nesciunt voluptatibus aut molestias itaque iusto beatae ratione maiores temporibus, dolorum deserunt eos cum aliquam eius?</p>}
            </div>
        </div>
    )
}
