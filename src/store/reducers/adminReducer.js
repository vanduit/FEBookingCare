import actionTypes from '../actions/actionTypes';

const initialState = {
    gender: [],
    roles: [],
    positions: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            return {
                ...state
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            let copyState = {...state};
            console.log('Check 2222 :',state);
            //console.log('check state 111 : ',...state);
            copyState.gender = action.data;
            console.log('test fetch gender success :', copyState)
            return {
                ...copyState
            }
        case actionTypes.FETCH_GENDER_FAIDED:
            console.log('test fetch gender faided :', action)
            return {
                ...state
            }
        default:
            return state;
    }
}

export default adminReducer;