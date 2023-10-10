import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    gender: [],
    roles: [],
    positions: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            state.isLoadingGender = true;
            console.log('fetch gender start : ', action);
            return {
                ...state
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.gender = action.data;
            state.isLoadingGender = false;
            console.log('test fetch gender success :', action)
            return {
                ...state
            }
        case actionTypes.FETCH_GENDER_FAIDED:
            console.log('test fetch gender faided :', action);
            state.isLoadingGender = false;
            state.gender = [];
            return {
                ...state
            }

        case actionTypes.FETCH_POSITION_START:
            state.isLoadingGender = true;
            console.log('fetch position start : ', action);
            return {
                ...state
            }    

        case actionTypes.FETCH_POSITION_SUCCESS:
            console.log('fetch position success : ', action);
            state.positions = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_POSITION_FAIDED:
            state.positions = [];
            return {
                ...state
            }

        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_FAIDED:
            state.roles = [];
            return {
                ...state
            }
        default:
            return state;
    }
}

export default adminReducer;