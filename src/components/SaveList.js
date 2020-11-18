import React, { Component } from 'react';

class SaveList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      video: null,
    };
  }

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <ul className='list-group'>
              {this.props.videos.map(video =>
                <li key={video.idx} className='list-group-item'>
                  <div className='row'>
                    <div className='col'>{video.snippet.title}</div>
                    <div className='col-auto'>
                      <input
                        type='button'
                        value='View'
                        className='btn btn-info btn-sm'
                        onClick={function() {
                            this.props.handleFavoriteSelect(video);
                        }.bind(this)}
                      ></input>
                      <input
                        type='button'
                        value='Delete'
                        className='btn btn-danger btn-sm'
                        onClick={function() {
                            this.props.handleFavoriteDelete(video.idx);
                        }.bind(this)}
                      ></input>
                    </div>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default SaveList;
