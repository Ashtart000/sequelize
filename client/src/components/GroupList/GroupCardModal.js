import React, { useState } from 'react'; 
import Modal from 'react-modal';
import { Formik, Form } from 'formik';
import { createGroupImage, deleteGroup, showGroupUsers } from '../../api'
import ShowGroupUsersCard from './ShowGroupsUsersCard';
import AddUserToGroupModal from './AddUserToGroupModal';
import UserCardModal from '../UserList/UserCardModal';

Modal.setAppElement('#root');

const customStyles = {
    content: {
      top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%', transform: 'translate(-50%, -50%)',},
  };

const GroupCardModal = (props) => {
    const {selectedGroup} = props;
    const [groupUsers, setGroupUsers] = useState([]);
    const [showUsersToggle, setShowUsersToggle] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalAddUserOpen, setIsModalAddUserOpen] = useState(false);
    const [isModalAboutUserOpen, setIsModalAboutUserOpen] = useState(false);

    const deleteBtnHandler = async () => {
        try {
            const serverResponse = await deleteGroup(selectedGroup.id);
            props.setIsModalOpen(false);
            await props.loadGroups(props.page);
        } catch (error) {
            console.error(error);
        }      
    }

    const showUsers = async () => {
        try {
            if(showUsersToggle) {
                setGroupUsers([]);
                setShowUsersToggle(false);
            } else {
                const groupUsersData = await showGroupUsers(selectedGroup.id);
                console.log(groupUsersData);
                setGroupUsers(groupUsersData);
                setShowUsersToggle(true);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const renderGroupUsers = () => {
        return groupUsers.map((user) => (
            <ShowGroupUsersCard
            user={user}
            key={user.id}
            group={props.selectedGroup}
            onClick={() => { // це не обробник, це пропс
                setSelectedUser(user)
                setIsModalAboutUserOpen(true)
            }}
            />
        ))
    }

    const resetGroupUsers = () => {
        setGroupUsers([]);
        setShowUsersToggle(false);
    }

    const setImageHandler = async (values, actions) => {
        const { setSubmitting } = actions;
        const formData = new FormData();
        values.groupAvatar.forEach((file) => {
            formData.append("groupAvatar", file)
        })
        
        console.log(...formData)

        try {
            const serverResponse = await createGroupImage(formData, selectedGroup.id);
            console.log(serverResponse);
            props.setIsModalOpen(false);
            await props.loadGroups(props.page);
        } catch (error) {
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <Modal
                isOpen={props.isModalOpen}
                onRequestClose={() => {
                    props.setIsModalOpen(false); 
                    resetGroupUsers();
                }}
                style={customStyles}
            >
                {props.selectedGroup &&(
                <div>
                    <img 
                        src={`http://localhost:5000/${selectedGroup.imagePath}`} 
                        alt={selectedGroup.name}
                        style={{width: '200px', height: '200px'}} 
                    />
                    <button style={{display: 'block'}} onClick={deleteBtnHandler}>Delete group</button>
                    <h2>{selectedGroup.name}</h2>
                    <div>Set new image</div>
                    <Formik 
                        initialValues={{groupAvatar: []}}
                        onSubmit={setImageHandler}
                    >
                        {({isSubmitting, setFieldValue}) => (
                            <Form>
                                <input 
                                    type="file" 
                                    name="groupAvatar" 
                                    accept="image/*" 
                                    // multiple
                                    onChange={(event) => {
                                        const files = [...event.target.files]
                                        setFieldValue("groupAvatar", files)
                                    }}
                                />
                                <button type="submit" disabled={isSubmitting}>Add image</button>
                            </Form>
                        )}
                    </Formik>


                    <p>id: {selectedGroup.id}</p>
                    <h3>description: {selectedGroup.description}</h3>
                    <p>Created At: {selectedGroup.createdAt}</p>
                    <p>Updated At: {selectedGroup.updatedAt}</p>
                    <div className='groups-users-btn'>
                        <button onClick={showUsers}>
                            {showUsersToggle ? 'Hide group\'s users' : 'Show group\'s users'}
                        </button>
                        <button onClick={() => setIsModalAddUserOpen(true)}>Add user to group</button>
                    </div>
                    <section style={{
                        height: groupUsers.length > 0 ? '160px' : '0px',
                        overflowY: 'auto' 
                    }}>
                        {groupUsers.length > 0 ? renderGroupUsers() : null}
                    </section>                    
                    <button 
                        style={{marginTop: '15px'}} 
                        onClick={() => props.setIsModalOpen(false)}
                        >Close window
                    </button>

                    <UserCardModal
                    isModalOpen={isModalAboutUserOpen}
                    setIsModalOpen={setIsModalAboutUserOpen}
                    selectedUser={selectedUser}
                    />

                    <AddUserToGroupModal
                    isModalOpen={isModalAddUserOpen}
                    setIsModalOpen={setIsModalAddUserOpen}
                    selectedGroup={selectedGroup}
                    resetGroupUsers={resetGroupUsers}
                    />
                </div>
                )}
        </Modal>
    );
}

export default GroupCardModal;