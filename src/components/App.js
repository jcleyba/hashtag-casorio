import React, {Component} from 'react';
import {instagramFetch, inputChanged, tagSaved, fetchTag} from '../actions'
import {connect} from 'react-redux';
import  SlideshowComponent from './Slideshow'
import styles from '../css/styles.css';


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            token: null,
            tag: ""
        };
        this.fetchData = this.fetchData.bind(this);
        this.props.fetchTag();
    }

    componentWillMount() {
        const hash = this.props.location.hash;
        if (hash.length > 0) {
            var query = hash.split("=");
            var token = query[1];
            this.setState({token: token});
        }
        else {
            window.location.href = 'https://api.instagram.com/oauth/authorize/?client_id=0fdb55a9411944a7b1cc6c98e86537e7&redirect_uri=http://127.0.0.1:3000&response_type=token&scope=public_content';
        }
    }

    fetchData(tag) {
        this.props.instagramFetch(this.state.token, tag);
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
                <h1>#hashtag</h1>
                <form onSubmit={this.saveTag.bind(this)} className="tag-form">
                    #<input type="text" placeholder="Mi hashtag" onChange={this.inputChanged.bind(this)}
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

    render() {
        return (
            <div className="App">
                <h1>{this.props.tag ? '#' + this.props.tag : ''}</h1>
                {!this.props.tag && this.props.tag === '' ?
                    this.renderForm() :
                    this.renderSlideshow()
                }
            </div>
        );
    }
}

const mapStateToProps = ({instagram}) => {
    const {media, tag} = instagram;
    return {media, tag};
};

export default connect(mapStateToProps, {instagramFetch, inputChanged, tagSaved, fetchTag})(App);