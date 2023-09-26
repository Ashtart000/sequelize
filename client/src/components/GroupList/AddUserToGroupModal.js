import React, { useState } from 'react';
import Modal from 'react-modal';
import {Formik, Form, Field, ErrorMessage } from 'formik';
import { addUserToGroup } from '../../api';

Modal.setAppElement('#root');

const customStyles = {
    content: {
      top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%', transform: 'translate(-50%, -50%)',},
  };

const initialState = {
    id: ''
}

const AddUserToGroupModal = (props) => {
    const {selectedGroup} = props;
    const [userNotFoundError, setUserNotFoundError] = useState(null);

    const handleSubmitToFormik = async (values, actions) => {
        try {
            const serverResponce = await addUserToGroup(values.id, selectedGroup.id);
            console.log(serverResponce)
            if(serverResponce.message) {
                actions.resetForm();
                props.setIsModalOpen(false);
                props.resetGroupUsers();
            } else {
                setUserNotFoundError(serverResponce.error);
            }

        } catch (error) {
            console.error(error);
        } 
    }

const clearError = () => {
    setUserNotFoundError(null)
}

    return (
        <Modal
                isOpen={props.isModalOpen}
                onRequestClose={() => {props.setIsModalOpen(false); setUserNotFoundError(null)}}
                style={customStyles}
        >
                <Formik 
                initialValues={initialState} 
                onSubmit={handleSubmitToFormik}>
                    {(formikProps) => {
                        return (
                            <Form style={{display: 'flex', flexDirection: 'column'}}>
                                <Field placeholder='Enter user id' name='id'/>
                                <ErrorMessage name='id' component="p"/>
                                <button type='submit'>Add User</button>
                            </Form>
                        )
                    }}
                </Formik>
                <div>
                    {userNotFoundError ? <p>{userNotFoundError}</p> : null}
                </div>
                <button onClick={() => {
                    props.setIsModalOpen(false);
                    setUserNotFoundError(null)
                    }
                    }>Cancel</button>
        </Modal>
    );
}

export default AddUserToGroupModal;