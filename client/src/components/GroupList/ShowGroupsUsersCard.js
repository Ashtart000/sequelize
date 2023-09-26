import React, { useState } from 'react';
import './style.css'
import RemoveUserFromGroupModal from './RemoveUserFromGroupModal';

const ShowGroupUsersCard = (props) => {
    const { user, group } = props;
    const [isModalRemoveUserOpen, setIsModalRemoveUserOpen] = useState(false);

    return (
        <>
        <article className='groups-users-card' onClick={props.onClick}>
            <h1>{user.firstName} {user.lastName}</h1>
            <div className='delete-btn-wrapper'>
                <p> // id:{user.id} //</p>
                <button onClick={() => {
                    console.log(user)
                    setIsModalRemoveUserOpen(true);
                    }} className='delete-btn'>X</button>

                <RemoveUserFromGroupModal 
                    isModalOpen={isModalRemoveUserOpen}
                    setIsModalOpen={setIsModalRemoveUserOpen}
                    user={user}
                    group={group}
                />
            </div>
        </article>
        </>
    );
}

export default ShowGroupUsersCard;
