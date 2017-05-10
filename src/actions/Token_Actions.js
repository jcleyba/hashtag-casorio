/**
 * Created by juanleyba on 5/9/17.
 */

import {GET_TOKEN, GET_TOKEN_SUCCESS} from './Constants'

export const getToken = () => {
    window.open('https://instagram.com/oauth/authorize/?client_id=ba4c844e915a4e878c48ff87e1010f91&redirect_uri=http://instagramwordpress.rafsegat.com/docs/get-access-token/&response_type=token&scope=public_content', '_blank');
    return {
        type: GET_TOKEN
    }
};

export const saveToken = (token) => {
    return {
        type: GET_TOKEN_SUCCESS,
        payload: token
    }
};