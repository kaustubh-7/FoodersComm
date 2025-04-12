'use client';

import { useRef } from 'react';
import classes from './image-picker.module.css';
import { useState } from 'react';
import Image from 'next/image';

export default function ImagePicker({ name, label }) {
    const [pickedImg, setPickedImg] = useState();
    const imageInput = useRef();
    
    function handlePickImgClick() {
        imageInput.current.click(); //ref.current.click(); is a way in React to programmatically trigger a click event on a DOM element
        /*
          ref is a reference to a DOM element
          ref.current gives you direct access to that DOM element.
          click() simulates a mouse click on it. 
        */
    }

    function handleInputChange(event){
        const file = event.target.files[0];

        if (!file){
            setPickedImg(null);
            return;
        }

        const fileReader = new FileReader();

        fileReader.onload = () => {
            setPickedImg(fileReader.result);
        }

        fileReader.readAsDataURL(file);

    }
    return (
        <div className={classes.picker}>
            <label htmlFor={name}>{label}</label>
            <div className={classes.controls}>
                <div className={classes.preview}>
                    {!pickedImg && <p>No image picked yet.</p>}
                    {pickedImg && <Image src={pickedImg} alt="user picked image" fill /> }
                </div>
                <input
                    className={classes.input}
                    type='file'
                    id={name}
                    accept="image/png, image/jpeg" //The accept attribute on an <input type="file"> element is used to restrict the types of files the user can select.
                    name={name}
                    ref={imageInput}
                    required
                    onChange={handleInputChange}
                />
                <button className={classes.button} type='button' onClick={handlePickImgClick}>
                    Pick an Image
                </button>
            </div>
        </div>
    );
}