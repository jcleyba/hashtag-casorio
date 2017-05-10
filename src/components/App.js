import React, {Component} from 'react';
import {instagramFetch, inputChanged, tagSaved, fetchTag, saveToken, getToken} from '../actions'
import {connect} from 'react-redux';
import  SlideshowComponent from './Slideshow'
import styles from '../css/styles.css';


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tag: ""
        };
        this.fetchData = this.fetchData.bind(this);
        this.props.fetchTag();
    }

    componentWillMount() {
        var tokenUrl = window.location.href.split("=")[1];
        if (tokenUrl) {
            this.props.saveToken(tokenUrl)
        }
        else {
            this.props.getToken();
        }
    }

    fetchData(tag, token) {
        this.props.instagramFetch(tag, token);
    };

    inputChanged(event) {
        this.setState({tag: event.target.value});
    }

    saveTag() {
        this.props.tagSaved(this.state.tag);
    }

    renderForm() {
        return (
            <div className="form">
                <h1>#miEvento</h1>
                <form onSubmit={this.saveTag.bind(this)} className="tag-form">
                    #<input type="text" placeholder="Hashtag" onChange={this.inputChanged.bind(this)}
                            value={this.state.tag}/>
                    <br/>
                    <button type="submit">Guardar</button>
                </form>
            </div>
        )
    }

    renderSlideshow() {
        return (
            <SlideshowComponent data={this.props.media} fetchData={this.fetchData.bind(this)}/>
        )
    }

    renderTitle() {
        if (this.props.tag) {
            return (
                <h1>Usá el hashtag <span className="green">#{this.props.tag}</span>
                </h1>
            )
        }
        return ('');
    }

    render() {
        return (
            <div className="App">
                {this.renderTitle()}
                {!this.props.tag && this.props.tag === '' ?
                    this.renderForm() :
                    this.renderSlideshow()
                }
            </div>
        );
    }
}

const mapStateToProps = ({instagram}) => {
    const {media, tag, tokenValid} = instagram;
    return {media, tag, tokenValid};
};

export default connect(mapStateToProps, {instagramFetch, inputChanged, tagSaved, fetchTag, saveToken, getToken})(App);