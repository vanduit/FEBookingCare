import actionTypes from './actionTypes';
import { getAllCodeServices } from '../../services/userService';

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

export const fetchGenderStart = (dispatch, getState) => {
    try{

    }catch(e){
        console.log('fetchGenderStart', e);
    }
}

export const fetchGenderSuccess = () => ({
    type: actionTypes.FETCH_GENDER_SUCCESS
})

export const fetchGenderfaided = () => ({
    type: actionTypes.FETCH_GENDER_FAIDED
})