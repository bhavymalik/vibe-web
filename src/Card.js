import React, { useState, useEffect } from 'react';
import supabase from './supabaseClient';

export default function Card(props) {
    const [imageIndex, setImageIndex] = useState(0);
    const [hovered, setHovered] = useState(false);

    const additionalImages = props.obj.additional_images
        .replace(/^\[|\]$/g, '') // Remove the square brackets at the start and end
        .split(',')
        .map(url => url.trim().replace(/^"|"$/g, '')); // Remove any extra spaces and quotes

    const images = [props.obj.image, ...additionalImages];
    const imageUrl = images[imageIndex].replace(/"/g, '');

    const handleClick = () => {
        window.open(props.obj.product_url, '_blank');
    };

    async function changeVisibility() {
        const newVisibility = !props.obj.visibility;

        const { data, error } = await supabase
            .from('user_data')
            .update({ visibility: newVisibility })
            .eq('id', props.obj.id);

        if (error) {
            console.error('Error updating visibility:', error);
        } else {
            console.log("Visibility updated successfully:", props.obj.visibility);
            props.setCards(prevCards => 
                prevCards.map(card => 
                    card.props.obj.id === props.obj.id 
                    ? { ...card, props: { ...card.props, obj: { ...card.props.obj, visibility: newVisibility } } }
                    : card
                )
            );
        }
    }

    async function dltitem() {
        const { error } = await supabase
            .from('user_data')
            .delete()
            .eq('id', props.obj.id);

        if (error) {
            console.error('Error deleting data:', error);
        } else {
            props.setCards(prevCards => prevCards.filter(card => card.props.obj.id !== props.obj.id));
        }
    }

    useEffect(() => {
        let timer;
        if (hovered) {
            timer = setInterval(() => {
                setImageIndex(prevIndex => (prevIndex + 1) % images.length);
            }, 1000); // Change image every 1 second
        }
        return () => clearInterval(timer);
    }, [hovered, images.length]);

    return (
        <div 
            className="card" 
            onMouseEnter={() => setHovered(true)} 
            onMouseLeave={() => setHovered(false)}
        >
            <img src={imageUrl} alt="" className="card-photo" onClick={handleClick} />
            {props.obj.price_available && <p className='card-price'><b>From {props.obj.currency} {props.obj.price}</b></p>}
            <div className="icon-container">
                <i 
                    className={props.obj.visibility ? "fa fa-eye" : "fa fa-eye-slash"}
                    onClick={changeVisibility}
                ></i>
                <i className="fa fa-edit" onClick={() => props.editCard(props.obj)}></i>
                <i className="fa fa-trash" onClick={dltitem}></i>
            </div>
            <p className='card-title'>{props.obj.product_title}</p>
            <p className='card-description'>{props.obj.description}</p>
        </div>
    );
}
