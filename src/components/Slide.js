/**
 * Created by juanleyba on 5/3/17.
 */
import React, {Component} from 'react';

class SlideComponent extends Component {
    render() {
        return (
            <div className={this.props.isActive ? 'single-slide active' : 'single-slide'}>
                <div className="caption">
                    <div className="user">
                        <img className="avatar" src={this.props.media.caption.from.profile_picture}
                             alt={this.props.media.caption.from.full_name}/>
                        <h3>
                            {this.props.media.caption.from.full_name}
                        </h3>
                    </div>
                    <p>
                        {this.props.media.caption.text}
                    </p>
                </div>
                <div className="pic">
                    <img
                        src={this.props.media.images.standard_resolution.url}
                        alt={this.props.media.caption.text}/>
                </div>
            </div>
        )
    }
}

export default SlideComponent;