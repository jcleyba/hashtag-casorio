import {combineReducers} from 'redux';
import InstagramReducer from './Instagram_Reducer';

export default combineReducers({
    instagram: InstagramReducer,
});