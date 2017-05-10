/**
 * Created by juanleyba on 5/3/17.
 */
import React, {Component} from 'react';
import SlideComponent from './Slide';
import SpinnerComponent from './Spinner';
import {connect} from 'react-redux'
import {removeInstaItem}from '../actions'

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
        this.props.fetchData(this.props.tag, this.props.token);
    }

    componentDidMount() {
        this.slideNext();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({data: nextProps.media});
    }

    removeSlide(index) {
        this.props.removeInstaItem(this.props.media, index);
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
                self.props.fetchData(self.props.tag, self.props.token);
            }
        }, 7000);

    }

    renderSlides() {
        var jsx = [];
        if (this.state.data) {
            this.state.data.map((item, index) => {
                var isActive = this.state.currentSlide === index;
                return jsx.push(<SlideComponent isActive={isActive} key={index} media={item}
                                                onRemove={() => this.removeSlide(index)}
                                                index={index}/>);
            })
        }
        if (this.state.data && this.state.data.length === 0 || this.props.error) {
            return this.renderNoResults();
        }
        if (!this.props.tokenValid) {
            return this.renderTokenExpired();
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

    renderTokenExpired() {
        return (
            <div className="no-results">
                <h2>Token Expired</h2>
                <div><a
                    href="https://instagram.com/oauth/authorize/?client_id=ba4c844e915a4e878c48ff87e1010f91&redirect_uri=http://instagramwordpress.rafsegat.com/docs/get-access-token/&response_type=token&scope=public_content"
                    target="_blank">Obtener
                    token</a></div>
            </div>
        )
    }

    render() {
        console.log(this.state.data);
        return (
            <div className="slideshow" data={this.props.data}>
                {this.renderSlides()}
            </div>
        )
    }

}

const mapStateToProps = ({instagram}) => {
    const {media, loading, tag, error, token, tokenValid}  = instagram;
    return {media, loading, tag, error, token, tokenValid}
};

export default connect(mapStateToProps, {removeInstaItem})(SlideshowComponent);