import React, { useState, useEffect } from 'react';
import { getAllGroups } from '../../api';
import GroupCard from './GroupCard';
import GroupCardModal from './GroupCardModal';
import AddGroupFromModal from './AddGroupFromModal';

const GroupList = () => {
    const [groups, setGroups] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    // стан для відкриття-закриття модального вікна перегляду інформації
    const [isModalOpen, setIsModalOpen] = useState(false);
    // стан для зберігання обраної групи
    const [selectedGroup, setSelectedGroup] = useState(null);
    // стан для відкриття-закриття модального вікна додавання групи
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);

    const loadGroups = (pageNumber) => {
        getAllGroups(pageNumber)
        .then((data) => {
            setGroups(data);
        })
        .catch((error) => {
            setError(error);
        })
        .finally(() => {
            setIsLoading(false);
        })
    }

    useEffect(() => {
        loadGroups(page);
    }, [page])

    const renderGroups = () => {
        return groups.map((group) => <GroupCard 
        group={group} 
        key={group.id}
        onClick={() => { // це не обробник, це пропс
            setSelectedGroup(group)
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
            <h1>GroupList</h1>
            <button onClick={() => setIsModalAddOpen(true)}>Add group</button>
            <section className='card-container'>
                {error && <h2>{error.message}</h2>}
                {groups.length > 0 ? renderGroups() : <h2>Груп немає</h2>}
            </section>
            <div>
                <button onClick={prevButtonHandler} disabled={page===1}>Previous page</button>
                <button onClick={nextButtonHandler}disabled={groups.length<4}>Next page</button>
            </div>

            <GroupCardModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                selectedGroup={selectedGroup}
            />

            <AddGroupFromModal
                isModalOpen={isModalAddOpen}
                setIsModalOpen={setIsModalAddOpen}
            />
        </>
    );
}

export default GroupList;
