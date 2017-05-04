/**
 * Created by juanleyba on 5/3/17.
 */
import {INPUT_CHANGED, TAG_SAVED, TAG_FETCH_SUCCESS, TAG_FETCH_FAIL} from './Constants'

export const inputChanged = (text) => {
    return {
        type: INPUT_CHANGED,
        payload: text
    }
};

export const tagSaved = (text) => {
    localStorage.setItem('tag', text);
    return {
        type: TAG_SAVED,
        payload: text
    }
};

export const fetchTag = () => {
    var tag = localStorage.getItem('tag');
    var ret = {};
    if (tag) {
        ret.type = TAG_FETCH_SUCCESS;
        ret.payload = tag
    }
    else {
        ret.type = TAG_FETCH_FAIL;
        ret.payload = '';
    }
    return ret;
};