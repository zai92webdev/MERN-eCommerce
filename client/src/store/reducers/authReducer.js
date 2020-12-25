import { 
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    UPDATE_USER_ROLE_SUCCESS,
    UPDATE_USER_ROLE_FAIL,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_REQUEST
} from '../actions/'

const initialState = {
    token: localStorage.getItem('Auth-token'),
    isAuthenticated: false,
    isAdmin: false,
    isLoading: true,
    users: [],
    user:{},
    msg : null
}

export default function auth(state= initialState, action) {
    switch(action.type){
        case USER_LOADING :
            return {
                ...state,
                isLoading: true
            }
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                isAdmin:action.payload.isAdmin,
                user: action.payload,
                username:action.payload.username
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('Auth-token', action.payload.token);
            return {
                token: action.payload.token,
                user: action.payload.user,
                username:action.payload.user.username,
                isAuthenticated: true,
                isLoading: false,
                isAdmin:action.payload.user.isAdmin
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isAuthenticated: false,
                isLoading: false
            }
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.removeItem('Auth-token');
            return {
                user : {}
            }
        case USER_LIST_REQUEST:
            return {
                ...state,
                isLoading: true
            }

        case USER_LIST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                users: action.payload
            }
        case USER_DELETE_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case USER_DELETE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                msg: action.payload.msg,
                users: state.users.filter(bug => bug._id !== action.payload.id)
            }
        case UPDATE_USER_ROLE_SUCCESS:
            return {
                ...state,
                msg: action.payload
            }
        case UPDATE_USER_ROLE_FAIL:
            return {
                ...state,
                msg: action.payload
            }
        case USER_UPDATE_REQUEST:
            return{
                ...state,
                isLoading: true
            }
        case USER_UPDATE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                msg: action.payload.msg,
                username: action.payload.username
                
                }
        default:
        return state
    }
}