/**
 * Created by juanleyba on 5/3/17.
 */
import $ from 'jquery';
import {
    INSTAGRAM_FETCH,
    INSTAGRAM_FETCH_SUCCESS,
    GET_TOKEN_SUCCESS,
    INSTAGRAM_FETCH_FAILED,
    GET_TOKEN
} from './Constants'


export const instagramFetch = (code, tag) => {
    const api = 'https://api.instagram.com/v1/tags/' + tag + '/media/recent?access_token=' + code;

    var options = {
        url: api,
        type: "GET",
        crossDomain: true,
        dataType: "jsonp"
    };

    return (dispatch) => {
        dispatch({type: INSTAGRAM_FETCH});
        $.when($.ajax(options)).then(data => {
            dispatch({type: INSTAGRAM_FETCH_SUCCESS, payload: data.data})
        }).catch(error => {
            console.log(error);
            dispatch({type: INSTAGRAM_FETCH_FAILED})
        })
    }
};