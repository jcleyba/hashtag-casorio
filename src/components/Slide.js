/**
 * Created by juanleyba on 5/3/17.
 */
import React, {Component} from 'react';

class SlideComponent extends Component {
    render() {
        return (
            <div className={this.props.isActive ? 'single-slide active' : 'single-slide'}>
                <div className="caption">
                    <p>
                        {this.props.media.caption}
                    </p>
                </div>
                <div className="pic">
                    <img
                        src={this.props.media.thumbnail_src}
                        alt={this.props.media.caption}/>
                </div>
            </div>
        )
    }
}

export default SlideComponent;