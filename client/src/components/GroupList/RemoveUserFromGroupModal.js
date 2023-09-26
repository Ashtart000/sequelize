import React, { useState } from 'react';
import Modal from 'react-modal';
import { removeUserFromGroup } from '../../api';

Modal.setAppElement('#root');

const customStyles = {
    content: {
      top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%', transform: 'translate(-50%, -50%)',},
  };

const RemoveUserFromGroupModal = (props) => {
    
    const {user, group} = props;

    const [removeMessage, setRemoveMessage] = useState(null);

    const removeUser = async () => {
        const result = await removeUserFromGroup(user.id, group.id);
        console.log(result);
        setRemoveMessage(result);
    }

    return (
        <Modal
                isOpen={props.isModalOpen}
                onRequestClose={() => {props.setIsModalOpen(false)}}
                style={customStyles}
        >
                <h3>Are you sure you want to remove this user from the group?</h3>
                <div>
                    <button onClick={removeUser}>YES</button>
                    <button disabled={removeMessage}>NO</button> 
                </div>
                {removeMessage ? <h2>{removeMessage.message}</h2> : null}
        </Modal>
    );
}

export default RemoveUserFromGroupModal;