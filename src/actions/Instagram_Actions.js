/**
 * Created by juanleyba on 5/3/17.
 */
import $ from 'jquery';
import {
    INSTAGRAM_FETCH,
    INSTAGRAM_FETCH_SUCCESS,
    INSTAGRAM_FETCH_FAILED,
} from './Constants'

const ajaxFetch = (dispatch, tag, max_id, ret) => {
    var retur = ret;
    const api = '/instagram';
    var options = {
        url: api,
        headers: {
            'Content-Type': 'application/json',
        },
        type: "POST",
        data: JSON.stringify({
            "tag": tag,
            "max_id": max_id
        })
    };
    $.when($.ajax(options)).then(data => {
        if (data.page_info.has_next_page) {
            retur = retur.concat(data.nodes);
            ajaxFetch(dispatch, tag, data.page_info.end_cursor, retur);
        }
        else {
            dispatch({type: INSTAGRAM_FETCH_SUCCESS, payload: retur})
        }
    }).catch(error => {
        console.log(error);
        dispatch({type: INSTAGRAM_FETCH_FAILED, payload: error.responseText});
    });
};

export const instagramFetch = (tag) => {

    return (dispatch) => {
        dispatch({type: INSTAGRAM_FETCH});
        ajaxFetch(dispatch, tag, '', []);
    };

};

