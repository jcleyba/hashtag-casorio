/**
 * Created by juanleyba on 5/3/17.
 */
import React, {Component} from 'react';
import image from '../images/ring-alt.gif'
class SpinnerComponent extends Component {

    render() {
        return (
            <div className="spinner">
                <img src={image} alt=""/>
            </div>
        )
    }
}

export default SpinnerComponent;