/**
 * Created by juanleyba on 5/3/17.
 */
import $ from 'jquery';
import {
    INSTAGRAM_FETCH,
    INSTAGRAM_FETCH_SUCCESS,
    INSTAGRAM_FETCH_FAILED,
    TOKEN_HAS_EXPIRED
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

export const instagramFetch = (tag, token) => {
    return (dispatch) => {
        dispatch({type: INSTAGRAM_FETCH});
        //ajaxFetch(dispatch, tag, '', []);
        const api = 'https://api.instagram.com/v1/tags/' + tag + '/media/recent?access_token=' + token;
        instagramFetchFromAPI(dispatch, api, [])
    };

};


const instagramFetchFromAPI = (dispatch, url, ret) => {
    var rett = ret;

    var options = {
        url: url,
        type: "GET",
        dataType: 'jsonp'
    };

    $.when($.ajax(options)).then(data => {
        if (data.meta.code === 400) {
            dispatch({type: TOKEN_HAS_EXPIRED})
        }
        else {
            if (data.pagination.next_url) {
                rett = rett.concat(data.data);
                instagramFetchFromAPI(dispatch, data.pagination.next_url, rett);
            }
            else {
                rett = rett.concat(data.data);
                dispatch({type: INSTAGRAM_FETCH_SUCCESS, payload: rett})
            }
        }

    }).catch(error => {
        console.log(error);
        dispatch({type: INSTAGRAM_FETCH_FAILED, payload: error.responseText});
    });
};

export const removeInstaItem = (list, index) => {
    console.log(list);
    list.splice(index, 1);
    console.log(list);
    return {
        type: INSTAGRAM_FETCH_SUCCESS,
        payload: list
    }
};



