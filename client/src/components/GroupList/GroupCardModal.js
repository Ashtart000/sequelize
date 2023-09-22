import Modal from 'react-modal';
import { Formik, Form } from 'formik';
import { createGroupImage } from '../../api'

Modal.setAppElement('#root');


const customStyles = {
    content: {
      top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%', transform: 'translate(-50%, -50%)',},
  };

const GroupCardModal = (props) => {
    const {selectedGroup} = props;

    return (
        <Modal
                isOpen={props.isModalOpen}
                onRequestClose={() => {props.setIsModalOpen(false)}}
                style={customStyles}
            >
                {props.selectedGroup &&(
                <div>
                    <img 
                        src={`http://localhost:5000/${selectedGroup.imagePath}`} 
                        alt={selectedGroup.name}
                        style={{width: '200px', height: '200px'}} 
                    />
                    <h2>{selectedGroup.name}</h2>
                    <div>Set new image</div>
                    <Formik 
                        initialValues={{groupAvatar: []}}
                        onSubmit={ async (values, actions) => {
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
                        }}
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
                    <p>description: {selectedGroup.description}</p>
                    <p>Created At: {selectedGroup.createdAt}</p>
                    <p>Updated At: {selectedGroup.updatedAt}</p>
                    <button onClick={() => props.setIsModalOpen(false)}>Close</button>
                </div>
                )}
        </Modal>
    );
}

export default GroupCardModal;