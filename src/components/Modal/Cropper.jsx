import React, { useEffect, useRef, useState } from 'react'
import 'react-image-crop/dist/ReactCrop.css'
import { ReactCrop, convertToPixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop';
import { imagePreview } from './../imagePreview.js'


const minWidth = 200;


export default function Cropper({ closeModal }) {

    const [image, setImage] = useState(null);

    const [crop, setCrop] = useState(null);

    let canvasRef = useRef();

    const imageRef = useRef();

    function handleImageUpload(e) {
        let fileReader = new FileReader()
        fileReader.onload = (ev) => {
            setImage(ev.target.result);
        }
        fileReader.readAsDataURL(e.target.files[0]);
    }

    function handleCropChange(pixel, percent) {
        setCrop(percent)
    }

    function handleCropButton() {
        imagePreview(imageRef.current, canvasRef.current, convertToPixelCrop(crop, imageRef.current.width, imageRef.current.height));
        closeModal(canvasRef.current.toDataURL());

    }

    const onImageLoad = (e) => {
        const { width, height } = e.currentTarget;
        const cropWidthInPercent = (minWidth / width) * 100;

        const crop = makeAspectCrop(
            {
                unit: "%",
                width: cropWidthInPercent,
            },
            1,
            width,
            height
        );
        const centeredCrop = centerCrop(crop, width, height);
        setCrop(centeredCrop);
    };
    return (
        <>
            <ReactCrop
                minWidth={minWidth}
                circularCrop={true}
                crop={crop}
                aspect={1}
                onChange={handleCropChange}>
                <img onLoad={onImageLoad} style={{ maxHeight: '95%', maxWidth: '100%' }} ref={imageRef} src={image} alt="" />
            </ReactCrop >
            <label style={{ position: 'relative' }}>
                <input className='file' onChange={handleImageUpload} type="file" />
            </label>
            {crop &&
                <>
                    <canvas style={{ display: "none" }} ref={canvasRef} ></canvas>
                    <button onClick={handleCropButton} className='button'>Crop</button>
                </>
            }




        </>
    )
}
