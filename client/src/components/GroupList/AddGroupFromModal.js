import React from 'react';
import Modal from 'react-modal';
import {Formik, Form, Field, ErrorMessage } from 'formik';
import { createGroup } from '../../api';

Modal.setAppElement('#root');

const customStyles = {
    content: {
      top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%', transform: 'translate(-50%, -50%)',},
  };

const initialState = {
    name: '',
    description: '',
    groupAvatar: []
}

const AddGroupFromModal = (props) => {

    const handleSubmitToFormik = async (values, actions) => {
        // const serverResponce = await createGroup(values);
        // console.log(serverResponce);
        // actions.resetForm();
        // props.setIsModalOpen(false);
        // await props.loadGroups(props.page);
        const { setSubmitting } = actions;
        const formData = new FormData();
        values.groupAvatar.forEach((file) => {
            formData.append("groupAvatar", file)
        });
        values.groupAvatar.forEach((name) => {
            formData.append("name", values.name)
        });
        values.groupAvatar.forEach((description) => {
            formData.append("description", values.description)
        });
        
        console.log(...formData)

        try {
            const serverResponse = await createGroup(formData);
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
                onRequestClose={() => {props.setIsModalOpen(false)}}
                style={customStyles}
        >
                <Formik 
                initialValues={initialState} 
                onSubmit={handleSubmitToFormik}>
                    {({isSubmitting, setFieldValue}) => {
                        return (
                            <Form style={{display: 'flex', flexDirection: 'column'}}>
                                <Field placeholder='Name of group' name='name'/>
                                <ErrorMessage name='name' component="p"/>
                                <Field placeholder='Description of group' name='description'/>
                                <ErrorMessage name='description' component="p"/>
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
                                <button type='submit'>Add Group</button>
                            </Form>
                        )
                    }}
                </Formik>
                <button onClick={() => props.setIsModalOpen(false)}>Cancel</button>
        </Modal>
    );
}

export default AddGroupFromModal;
