import React, { Component } from "react";
import '../styles/App.css';

import Youtube from '../apis/Youtube';
import ApiService from '../apis/ApiService';  //Spring Boot Backend 용

import SearchBar from './SearchBar';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';
import SaveList from './SaveList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      selecedVideo: null,
      favoriteVideos: [], //즐겨찾기용
    }
  }
  
  handleSubmit = async (term) => {
    const res = await Youtube.get('/search', {
      params: { q: term }
    });
    //debugger;
    this.setState({
      videos: res.data.items
    });
  }

  // videoItem에서 전달된 video 객체를 selectedVideo로 할당, selectedVideo는 videoDetail로 전달
  handleVideoSelect = (video) => {
    this.setState({ selecedVideo: video });
    console.log('▶▶▶', this.state.selecedVideo);
  }

  handleFavoriteSelect = (video) => {
    // debugger;
    console.log('▶▶▶', video);
    this.setState({ selecedVideo: video });
  }

  handleVideoSave = async (video) => {
    // alert('저장 처리');
    var temp = { 
      video_id_videoId: video.id.videoId, 
      video_snippet_title: video.snippet.title, 
      video_snippet_description: video.snippet.description };
    console.log(temp);

    // DB저장
    await ApiService.addMovie(temp)
      .then(res => {
        // alert('저장되었습니다.');
        console.info(res.data);
        this.reloadFavoriteMovies();
      })
      .catch(err => {
        console.error('ApiService.addMovie()', err);
        alert('즐겨찾기 저장오류\n관리자 문의 요망');
      });
  }

  handleFavoriteDelete = async (id) => {
    await ApiService.removeMovie(id)
    .then(res => {
        alert('삭제되었습니다.');
        console.info(res.data);
        this.reloadFavoriteMovies();
      })
      .catch(err =>{
        console.error('ApiService.removeMovie()', err);
        alert('즐겨찾기 삭제오류\n관리자 문의 요망');
      });
  }

  componentDidMount() {
    this.reloadFavoriteMovies();
  }

  reloadFavoriteMovies = async () => {
    await ApiService.fetchMovies()
      .then(res => {
        //debugger;
        let temps = res.data;
        var i = 0;
        var fvl = []; //favorite list
        while (i < temps.length) {
          //TODO :
          fvl.push({
            idx: temps[i].id,
            id: { kind: 'youtube#video', videoId: temps[i].video_id_videoId },
            snippet: { 
              title: temps[i].video_snippet_title,
              description: temps[i].video_snippet_description },
          });
          i += 1;
        }
        console.log('fvl', fvl);
        this.setState({ favoriteVideos: fvl});
      })
      .catch(err => {
        console.error('ApiService.fetchMovies()', err);
        alert('즐겨찾기 가져오기 오류\n관리자 문의 요망');
      });
  }

  render() {
    console.info('App render()');
    return (
      <div className='App container'>
        <div className='row'>
          <div className='col'>
            {/* 검색바 */}
            <SearchBar handleFormSubmit={this.handleSubmit}/>
            <div className='row pt-2'>
              <div className='col-8'>
                {/* 유튜브 플레이어 */}
                <VideoDetail
                  video={this.state.selecedVideo}/>
                {/* 저장리스트 */}
                <SaveList 
                  videos={this.state.favoriteVideos}
                  handleFavoriteSelect={this.handleFavoriteSelect}
                  handleFavoriteDelete={this.handleFavoriteDelete}/>
              </div>
              <div className='col-4'>
                {/* 검색결과 */}
                <VideoList 
                  videos={this.state.videos}
                  handleVideoSelect={this.handleVideoSelect}
                  handleVideoSave={this.handleVideoSave}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
