import React from 'react';
import './style.css'

const ShowGroupUsersCard = (props) => {
    const { id, firstName, lastName } = props.user;
    return (
        <>
        <article className='groups-users-card' onClick={props.onClick}>
            <h1>{firstName} {lastName}</h1>
            <p> // id:{id}</p>
        </article>
        </>
    );
}

export default ShowGroupUsersCard;
