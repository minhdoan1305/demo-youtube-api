import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YoutubeSearch from 'youtube-api-search';
import SearchBar from './component/search_bar';
import VideoList from './component/video_list';
import VideoDetail from './component/video_detail';

const API_KEY = "AIzaSyCJV9IPhWPUjxT6H1cND3XVgVv6DFKe3qU";


export default class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null,
        };
        this.videoSearch('surfboards');
    }
    videoSearch(term) {
        YoutubeSearch({key: API_KEY, term: term}, (videos) => {
            this.setState({ 
                videos: videos,
                selectedVideo: videos[0],
            });
        });
    }
    render() {
        const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 500)
        return(
            <div>
                <SearchBar onSearchTermChange={videoSearch} />
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList
                    onVideoSelect={(selectedVideo) => {this.setState({selectedVideo})}}
                    videos={this.state.videos} />
            </div>
        );
    };
};

ReactDOM.render(<App />, document.querySelector(".container"));