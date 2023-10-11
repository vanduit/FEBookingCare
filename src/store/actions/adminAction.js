import actionTypes from './actionTypes';
import { getAllCodeServices } from '../../services/userService';

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
    type: actionTypes.FETCH_POSITION_FAIDED,
})

export const fetchRoleSuccess = (RoleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data : RoleData
})

export const fetchRolefaided = () => ({
    type: actionTypes.FETCH_ROLE_FAIDED,
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