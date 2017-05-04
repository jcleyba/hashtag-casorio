import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux';
import {BrowserRouter, Route} from 'react-router-dom';
import ReduxThunk from 'redux-thunk';
import App from './components/App';
import LogoutComponent from './components/Logout';
import reducers from './reducers';

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Route exact path="/" component={App}/>
                <Route path="/logout" component={LogoutComponent}/>
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);