// Initial state
const initialState = {
    isAuthenticated: false,
    userId: null,
    token: null,
};

// Action types
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGOUT = 'LOGOUT';

// Reducer function
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                userId: action.payload.userId,
                token: action.payload.token,
            };
        case LOGOUT:
            return {
                ...initialState,
            };
        default:
            return state;
    }
};

// Action creators
export const loginSuccess = (userId, token) => ({
    type: LOGIN_SUCCESS,
    payload: { userId, token },
});

export const logout = () => ({
    type: LOGOUT,
});

export default authReducer;
