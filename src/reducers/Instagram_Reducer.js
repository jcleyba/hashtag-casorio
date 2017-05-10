/**
 * Created by juanleyba on 5/3/17.
 */
import {
    INSTAGRAM_FETCH,
    INSTAGRAM_FETCH_SUCCESS,
    GET_TOKEN,
    GET_TOKEN_SUCCESS,
    INSTAGRAM_FETCH_FAILED, INPUT_CHANGED, TAG_SAVED, TAG_FETCH_SUCCESS, TAG_FETCH_FAIL, TOKEN_HAS_EXPIRED
} from '../actions/Constants';
const INITIAL_STATE = {
    media: null,
    loading: false,
    token: null,
    tag: '',
    error: null,
    tokenValid: true
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case INSTAGRAM_FETCH:
            return {...state, loading: true};
        case INSTAGRAM_FETCH_SUCCESS:
            return {...state, loading: false, media: action.payload};
        case INSTAGRAM_FETCH_FAILED:
            return {...state, loading: false, error: action.payload};
        case GET_TOKEN:
            return {...state, loading: true};
        case TOKEN_HAS_EXPIRED:
            return {...state, loading: false, tokenValid: false};
        case GET_TOKEN_SUCCESS:
            return {...state, loading: false, token: action.payload};
        case INPUT_CHANGED:
            return {...state};
        case TAG_SAVED:
            return {...state, tag: action.payload};
        case TAG_FETCH_SUCCESS:
            return {...state, tag: action.payload};
        case TAG_FETCH_FAIL:
            return {...state, INITIAL_STATE};
        default:
            return state;
    }
};