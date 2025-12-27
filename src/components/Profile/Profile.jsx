import React from 'react'
import './Profile.css'
import { FaPencilAlt } from "react-icons/fa";

export default function Profile() {
    return (
        <div className="proflie-container">
            <div className="profile-wrapper">

                <div className="edit-img-container">
                    <div className="profile-image-container">
                        <img src="https://thumbs.dreamstime.com/b/man-perfect-brilliant-smile-unshaven-face-defocused-background-guy-happy-emotional-expression-outdoors-bearded-man-124640934.jpg" alt="" />
                    </div>
                    <div className="edit-icon-container">
                        <FaPencilAlt className='edit-icon'></FaPencilAlt>
                    </div>

                </div>
                <div className="input-container">
                    <input value='Nicholas Armando' className='profile-input' type="text" />
                    <FaPencilAlt className='edit-input-icon'></FaPencilAlt>
                </div>

                <div className="input-container">
                    <textarea placeholder='Enter your status...' className='profile-textarea' type="text" />
                    <FaPencilAlt className='edit-textarea-icon'></FaPencilAlt>
                </div>

                <button className='button save'>Save</button>
            </div>

        </div>
    )
}
