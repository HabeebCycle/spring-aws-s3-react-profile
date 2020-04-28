import React from 'react'
import {Card, Image} from 'react-bootstrap'
import user_pic from '../img/userpic.png';
import './UserDetails.css';

export function UserDetails({user}) {
    const {name, imageLink} = user;
    
    return (
        <Card className="Card">
            <Image src={imageLink?imageLink:user_pic} alt={name} className="Card__pic" fluid/>
            <span className="Card__details">
                <h1 className="Card__name">{name}</h1>
                <p className="Card__status">Lore impsum... thank you... love</p>
            </span>
        </Card>
    )
}

