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

export const createGroup = async (formData) => {
    const url = 'http://localhost:5000/api/groups/';

    const requestOptions = {
        method: 'POST',
        body: formData
    }

    const response = await fetch(url, requestOptions);
    const data = await response.json();
    return data;
}

export const createGroupImage = async (image, groupId) => {
    const url = `http://localhost:5000/api/groups/${groupId}`;

    const requestOptions = {
        method: 'POST',
        body: image
    }

    const response = await fetch(url, requestOptions);
    const data = await response.json();
    return data;
}

export const deleteGroup = async (groupId) => {
    const url = `http://localhost:5000/api/groups/${groupId}`;

    const requestOptions = {
        method: 'DELETE',
        body: JSON.stringify(groupId)
    }

    const response = await fetch(url, requestOptions);
    const data = await response.json();
    return data;
}

export const showGroupUsers = async (groupId) => {
    const url = `http://localhost:5000/api/groups/get-users/${groupId}`;

    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export const addUserToGroup = async (userId, groupId) => {
    try {
        const url = `http://localhost:5000/api/groups/${userId}/${groupId}`;

        const requestOptions = {
        method: 'PUT',
        body: JSON.stringify(userId, groupId)
    }

        const response = await fetch(url, requestOptions);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error)
    }

}


export const removeUserFromGroup = async (userId, groupId) => {
    const url = `http://localhost:5000/api/groups/${userId}/${groupId}`;

    const requestOptions = {
        method: 'DELETE',
        body: JSON.stringify({userId, groupId})
    }

    const response = await fetch(url, requestOptions);
    const data = await response.json();
    return data;
}