/**
 * Created by juanleyba on 5/3/17.
 */
import React, {Component} from 'react';
import SlideComponent from './Slide';
import SpinnerComponent from './Spinner';
import {connect} from 'react-redux'

class SlideshowComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentSlide: 0,
            data: props.data || [],

        };
        this.slideNext = this.slideNext.bind(this);
    }

    componentWillMount() {
        this.props.fetchData(this.props.tag);
    }

    componentDidMount() {
        this.slideNext();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({data: nextProps.media});
    }

    slideNext() {
        var self = this;
        setInterval(function () {
            if (self.state.currentSlide < self.state.data.length - 1) {

                self.setState({
                    currentSlide: self.state.currentSlide + 1
                });
            }
            else {
                self.setState({
                    currentSlide: 0
                });
                self.props.fetchData(self.props.tag);
            }
        }, 7000);

    }

    renderSlides() {
        var jsx = [];
        if (this.state.data) {
            this.state.data.map((item, index) => {
                var isActive = this.state.currentSlide === index;
                return jsx.push(<SlideComponent isActive={isActive} key={item.node.id} media={item.node}/>);
            })
        }
        if (this.state.data && this.state.data.length === 0 || this.props.error) {
            return this.renderNoResults();
        }
        if (this.props.loading) {
            return <SpinnerComponent/>
        }

        return jsx;
    }

    renderNoResults() {
        return (
            <div className="no-results">
                <h2>No hay resultados</h2>
                <div><a href="/logout">Cambiar Hashtag</a></div>
            </div>
        )
    }

    render() {
        return (
            <div className="slideshow" data={this.props.data}>
                {this.renderSlides()}
            </div>
        )
    }

}

const mapStateToProps = ({instagram}) => {
    const {media, loading, tag, error}  = instagram;
    return {media, loading, tag, error}
};

export default connect(mapStateToProps, {})(SlideshowComponent);