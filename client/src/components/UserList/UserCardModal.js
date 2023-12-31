import Modal from 'react-modal';
Modal.setAppElement('#root');

const customStyles = {
    content: {
      top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%', transform: 'translate(-50%, -50%)',},
  };

const UserCardModal = (props) => {
    const {selectedUser} = props;

    return (
        <Modal
                isOpen={props.isModalOpen}
                onRequestClose={() => {props.setIsModalOpen(false)}}
                style={customStyles}
            >
                {props.selectedUser &&(
                <div>
                    <img 
                    src={`https://robohash.org/${selectedUser.firstName}-${selectedUser.lastName}`} 
                    alt={selectedUser.lastName} 
                    />
                    <h2>{selectedUser.firstName} {selectedUser.lastName}</h2>
                    <p>ID: {selectedUser.id}</p>
                    <p>Email: {selectedUser.email}</p>
                    <p>Birthday: {selectedUser.birthday}</p>
                    <p>Created At: {selectedUser.createdAt}</p>
                    <p>Updated At: {selectedUser.updatedAt}</p>
                    <button onClick={() => props.setIsModalOpen(false)}>Close</button>
                </div>
                )}
        </Modal>
    );
}

export default UserCardModal;
