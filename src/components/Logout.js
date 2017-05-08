/**
 * Created by juanleyba on 5/3/17.
 */
import React, {Component} from 'react';
import SpinnerComponent from './Spinner'
class LogoutComponent extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        localStorage.clear();
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <h1>Logging out</h1>
                <SpinnerComponent/>
            </div>
        )
    }
}

export default LogoutComponent;