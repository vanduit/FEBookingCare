import axios from '../axios';

const handleLogin = (userEmail, userPasswor) => {
    return axios.post('api/login', { email: userEmail, password: userPasswor });
}


const getAllUsers = (inputId) => {
    //teamplate string
    return axios.get(`/api/get-all-users?id=${inputId}`);
}

const createNewUserService = (data) => {
    console.log('Check data from service', data);
    return axios.post('/api/crete-new-user', data);
}

const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: userId
        }
    });
}

const editUserService = (inputData) => {
    return axios.put('/api/edit-user', inputData);
}

export { handleLogin, getAllUsers, createNewUserService, deleteUserService, editUserService }

