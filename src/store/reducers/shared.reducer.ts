import cyfyDarkLogo from 'assets/images/common/svgs/cyfy-dark-logo.svg';
import cyfyLightLogo from 'assets/images/common/svgs/cyfy-logo.svg';

interface sharedReducerInitialState {
    isLoading: boolean;
    token: null | string;
    isDarkTheme: boolean | null;
    darkThemeLogo: any;
    lightThemeLogo: any;
    user: any;
    domain: string;
    permissions: string[];
    organization: any;
}

const initialState: sharedReducerInitialState = {
    isLoading: false,
    token: null,
    isDarkTheme: null,
    lightThemeLogo: cyfyLightLogo,
    darkThemeLogo: cyfyDarkLogo,
    user: null,
    domain: window.location.hostname,
    permissions: [],
    organization: null,
}

export const SHARED_REDUCER_ACTIONS = {
    LOADING: 'LOADING',
    SAVE_TOKEN: 'SAVE_TOKEN',
    SAVE_USER: 'SAVE_USER',
    SAVE_ORGANIZATION: 'SAVE_ORGANIZATION',
    THEME_CHANGE: 'THEME_CHANGE',
    LOGOUT: 'LOGOUT',
    SAVE_PERMISSIONS: 'SAVE_PERMISSIONS',
}

const sharedReducer = (state: any = initialState, action: any) => {
    switch (action.type) {
        case SHARED_REDUCER_ACTIONS.LOADING:
            return {
                ...state,
                isLoading: action.payload
            };
        case SHARED_REDUCER_ACTIONS.SAVE_TOKEN:
            return {
                ...state,
                token: action.payload,
            };
        case SHARED_REDUCER_ACTIONS.THEME_CHANGE:
            return {
                ...state,
                isDarkTheme: action.payload
            }
        case SHARED_REDUCER_ACTIONS.LOGOUT:
            return {
                ...state,
                token: null,
                isLoading: false,
                user: null,
                permissions: [],
                // organization: null,
                // isDarkTheme: null,
                // lightThemeLogo: '',
                // darkThemeLogo: ''
            }
        case SHARED_REDUCER_ACTIONS.SAVE_USER:
            return {
                ...state,
                user: action.payload,
            }
        case SHARED_REDUCER_ACTIONS.SAVE_PERMISSIONS:
            return {
                ...state,
                permissions: action.payload
            }
        case SHARED_REDUCER_ACTIONS.SAVE_ORGANIZATION:
            return {
                ...state,
                organization: action.payload
            }
        default:
            return state;
    }
}

export default sharedReducer;