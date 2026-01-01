import React, { useRef, useState } from 'react'
import './Profile.css'
import { FaPencilAlt } from "react-icons/fa";
import { useAuth } from '../../Auth/Auth';
import Modal from '../Modal/Modal';
import server from '../../Server/Server';

export default function Profile() {

    const { user } = useAuth();
    const [name, setName] = useState(user.name);
    const [status, setStatus] = useState(user.status);
    const [alert, setAlert] = useState(null);
    const [imageModal, setImageModal] = useState(false);
    const userImageRef = useRef();
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    function handleName(e) {
        setName(e.target.value);
    }

    function handleStatus(e) {
        setStatus(e.target.value);
    }

    function closeModal(imageUrl) {
        setImageModal(false);
        userImageRef.current = imageUrl;
    }

    async function handleSave() {
        let body = {
            name: name,
            status: status,
            image: userImageRef.current

        }
        let form = new FormData()
        let response = await fetch(userImageRef.current);
        let imageBlob = await response.blob();
        form.append('name', name);
        form.append('status', status);
        form.append('image', imageBlob, 'userImage.png');
        setLoading(true);
        const [res, ok] = await server('/profile', { body: form, method: 'put' }, true);
        setLoading(false);
        userImageRef.current = null;
        console.log(res.user);

        login(res.user);
    }

    if (imageModal) return <Modal closeModal={closeModal}></Modal>

    return (
        <>
            <div className="proflie-container">
                <div className="profile-wrapper">
                    <div className="edit-img-container">
                        <div className="profile-image-container">
                            <img src={userImageRef.current || user.image} alt="" />
                        </div>

                        <div onClick={() => { setImageModal(true) }} className="edit-icon-container">
                            <FaPencilAlt className='edit-icon'></FaPencilAlt>
                        </div>

                    </div>
                    <div className="input-container">
                        <input id='name' required value={name} onChange={handleName} className='profile-input' type="text" />
                        <FaPencilAlt className='edit-input-icon'></FaPencilAlt>
                    </div>

                    <div className="input-container">
                        <textarea id='status' value={status} onChange={handleStatus} placeholder='Enter your status...' className='profile-textarea' type="text" />
                        <FaPencilAlt className='edit-textarea-icon'></FaPencilAlt>
                    </div>

                    <button onClick={handleSave} className='button save'>Save</button>
                </div>
            </div>
        </>
    )
}
