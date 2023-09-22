import React, { useState, useEffect } from 'react';
import { getUsers } from '../../api';
import UserCard from './UserCard';
import UserCardModal from './UserCardModal';
import AddUserFromModal from './AddUserFromModal';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    // стан для відкриття-закриття модального вікна перегляду інформації
    const [isModalOpen, setIsModalOpen] = useState(false);
    // стан для зберігання обраного користувача
    const [selectedUser, setSelectedUser] = useState(null);
    // стан для відкриття-закриття модального вікна додавання користувача
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);


    const loadUsers = (pageNumber) => {
        getUsers(pageNumber)
        .then((data) => {
            setUsers(data);
        })
        .catch((error) => {
            setError(error);
        })
        .finally(() => {
            setIsLoading(false);
        })
    }

    useEffect(() => {
        loadUsers(page);
    }, [page])

    const renderUsers = () => {
        return users.map((user) => <UserCard 
        user={user} 
        key={user.id}
        onClick={() => { // це не обробник, це пропс
            setSelectedUser(user)
            setIsModalOpen(true)
        }}
        />)
    }

    const prevButtonHandler = () => {
        if(page > 1) {
            setPage(page - 1)
        }
    }

    const nextButtonHandler = () => {
        setPage(page + 1)
    }

    return (
        <>
            <h1>UserList</h1>
            <button onClick={() => setIsModalAddOpen(true)}>Add user</button>
            <section className='card-container'>
                {error && <h2>{error.message}</h2>}
                {users.length > 0 ? renderUsers() : <h2>Юзерів немає</h2>}
            </section>
            <div>
                <button onClick={prevButtonHandler} disabled={page===1}>Previous page</button>
                <button onClick={nextButtonHandler}disabled={users.length<4}>Next page</button>
            </div>

            <UserCardModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                selectedUser={selectedUser}
            />

            <AddUserFromModal 
                isModalOpen={isModalAddOpen}
                setIsModalOpen={setIsModalAddOpen}
            />
        </>
    );
}

export default UserList;
