export const getUsers = async (pageNumber) => {
    // limit
    const limit = 4;
    // offset -- || limit * (pageNumber - 1)
    const offset = limit * (pageNumber - 1);
    const url = `http://localhost:5000/api/users/?limit=${limit}&offset=${offset}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export const createUser = async (userData) => {
    const url = 'http://localhost:5000/api/users';

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    }

    const response = await fetch(url, requestOptions);
    const data = await response.json();
    return data;
}

export const getAllGroups = async (pageNumber) => {
    const limit = 4;
    const offset = limit * (pageNumber - 1);
    const url = `http://localhost:5000/api/groups/?limit=${limit}&offset=${offset}`;

    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export const createGroup = async (groupData) => {
    const url = 'http://localhost:5000/api/groups/wi';

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(groupData)
    }

    const response = await fetch(url, requestOptions);
    const data = await response.json();
    return data;
}