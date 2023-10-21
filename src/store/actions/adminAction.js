import actionTypes from './actionTypes';
import { getAllCodeServices, createNewUserService, getAllUsers, deleteUserService, editUserService } from '../../services/userService';
import { toast } from 'react-toastify';

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

export const fetchGenderStart =  () => {
    return async (dispatch, getState) =>{
        try{

            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })

            let res = await getAllCodeServices("GENDER");
            console.log('check gender 111 : ', res.data);
            if(res && res.errCode === 0){
                dispatch(fetchGenderSuccess(res.data));
            }else{
                dispatch(fetchGenderfaided());
            }
        }catch(e){
            dispatch(fetchGenderfaided());
            console.log('fetchGenderStart', e);
        }
    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data : genderData
})

export const fetchGenderfaided = () => ({
    type: actionTypes.FETCH_GENDER_FAIDED,
})



export const fetchPositionSuccess = (PositionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data : PositionData
})

export const fetchPositionfaided = () => ({
    type: actionTypes.FETCH_POSITION_FAILDED,
})

export const fetchRoleSuccess = (RoleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data : RoleData
})

export const fetchRolefaided = () => ({
    type: actionTypes.FETCH_ROLE_FAILDED,
})


export const fetchPositionStart =  () => {
    return async (dispatch, getState) =>{
        try{
            let res = await getAllCodeServices("POSITION");
            if(res && res.errCode === 0){
                dispatch(fetchPositionSuccess(res.data));
            }else{
                dispatch(fetchPositionfaided());
            }
        }catch(e){
            dispatch(fetchPositionfaided());
        }
    }
}

export const fetchRoleStart =  () => {
    return async (dispatch, getState) =>{
        try{
            let res = await getAllCodeServices("ROLE");
            if(res && res.errCode === 0){
                dispatch(fetchRoleSuccess(res.data));
            }else{
                dispatch(fetchRolefaided());
            }
        }catch(e){
            dispatch(fetchRolefaided());
        }
    }
}

export const createNewUser = (data)=>{
    return async (dispatch, getState) =>{
        try{
            let res = await createNewUserService(data) ;
            console.log('check create new user redux', res);
            if(res && res.errCode === 0){
                toast.success("Create a new user successd!");
                dispatch(saveUserSuccess());
                dispatch(fetchAllUserStart());
            }else{
                dispatch(saveUserFailded());
            }
        }catch(e){
            dispatch(saveUserFailded());
            console.log('saveUserFailded error', e)
        }
    }
}

export const saveUserSuccess = ()=>({
    type: actionTypes.CREATE_USER_SUCCESS
})

export const saveUserFailded = ()=>({
    type: actionTypes.CREATE_USER_FAILDED
})

export const fetchAllUserStart =  () => {
    return async (dispatch, getState) =>{
        try{
            let res = await getAllUsers("ALL");
            if(res && res.errCode === 0){
                dispatch(fetchAllUsersSuccess(res.users.reverse()));
            }else{
                toast.error("Fetch all users error!");
                dispatch(fetchAllUsersfaided());
            }
        }catch(e){
            toast.error("Fetch all users error!");
            dispatch(fetchAllUsersfaided());
        }
    }
}


export const fetchAllUsersSuccess = (data)=>({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})

export const fetchAllUsersfaided = (data)=>({
    type: actionTypes.FETCH_ALL_USERS_FAILDED
})


export const deleteUser = (userId)=>{
    return async (dispatch, getState) =>{
        try{
            let res = await deleteUserService(userId) ;
            if(res && res.errCode === 0){
                toast.success("Delete the user successd!");
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUserStart());
            }else{
                toast.error("Delete the user error!");
                dispatch(deleteUserFailded());
            }
        }catch(e){
            toast.error("Delete the user error!");
            dispatch(deleteUserFailded());
        }
    }
}

export const deleteUserSuccess = ()=>({
    type: actionTypes.DELETE_USER_SUCCESS
})

export const deleteUserFailded = ()=>({
    type: actionTypes.DELETE_USER_FAILDED
})

export const editUser = (data)=>{
    return async (dispatch, getState) =>{
        try{
            let res = await editUserService(data) ;
            if(res && res.errCode === 0){
                toast.success("Update the user successd!");
                dispatch(editUserSuccess());
                dispatch(fetchAllUserStart());
            }else{
                toast.error("Update the user error!");
                dispatch(editUserFailded());
            }
        }catch(e){
            toast.error("Update the user error!");
            dispatch(editUserFailded());
        }
    }
}

export const editUserSuccess = ()=>({
    type: actionTypes.EDIT_USER_SUCCESS
})

export const editUserFailded = ()=>({
    type: actionTypes.EDIT_USER_FAILDED
})