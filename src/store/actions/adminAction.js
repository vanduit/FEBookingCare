import actionTypes from './actionTypes';
import { getAllCodeServices } from '../../services/userService';

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

export const fetchGenderStart =  () => {
    return async (dispatch, getState) =>{
        try{
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
    type: actionTypes.FETCH_GENDER_FAIDED
})


// export const fetchPositionStart =  () => {
//     return async (dispatch, getState) =>{
//         try{
//             let res = await getAllCodeServices("POSITION");
//             //console.log('check gender 111 : ', res.data);
//             if(res && res.errCode === 0){
//                 dispatch(fetchPositionSuccess(res.data));
//             }else{
//                 dispatch(fetchPositionFaided());
//             }
//         }catch(e){
//             dispatch(fetchPositionFaided());
//             console.log('fetchGenderStart', e);
//         }
//     }
// }

// export const fetchPositionSuccess =  (positionData) => {
//     type: actionTypes.FETCH_POSITION_SUCCESS
//     data : positionData
// }

// export const fetchPositionFaided =  () => {
    
// }