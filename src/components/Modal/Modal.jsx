import React from 'react'
import './Modal.css'
import Cropper from './Cropper'

export default function Modal({ closeModal }) {
    return (
        <div className="modal">
            <Cropper closeModal={closeModal}> </Cropper>
        </div>

    )
}
