/**
 * Created by juanleyba on 5/3/17.
 */
import React, { Component } from 'react';

class SlideComponent extends Component {

  displayCaption = () => {
    let ret = ''
    this.props.media.edge_media_to_caption.edges.map(item => {
      ret += item.node.text;
    });

    return ret
  };

  render() {
    return (
      <div className={this.props.isActive ? 'single-slide active' : 'single-slide'}>
        <div className="caption">
          <p>
            {this.displayCaption()}
          </p>
        </div>
        <div className="pic">
          <img
            src={this.props.media.display_url}
            alt={this.displayCaption()}/>
        </div>
      </div>
    )
  }
}

export default SlideComponent;