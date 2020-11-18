import React, { Component } from "react";
import * as Icon from 'react-bootstrap-icons';

const searchtext = 'Input search words';

class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            term: searchtext,
        }
    }

    handleChange = (e) => {
        console.log(e.target.value);
        if (e.target.value.length ===0) {
            this.setState({
                term: searchtext
            });
        } else {
            this.setState({ term: e.target.value });
        }
        
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if (this.state.term === searchtext) {
            alert('검색어를 입력하세요');
            return;
        }

        this.props.handleFormSubmit(this.state.term);
    }
    
    render() {
        console.info('SearchBar render');
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <form className='card card-sm' onSubmit={this.handleSubmit}>
                            <div className='card-body row align-items-center'>
                                <div className='col-auto'>
                                    <Icon.Search/>
                                </div>
                                <div className='col'>
                                    <input 
                                        type='search' 
                                        name='youtube-search' 
                                        className='form-control form-control-lg'
                                        style={{ border:'0'}}
                                        placeholder={this.state.term}
                                        onChange={this.handleChange}/>
                                </div>
                                <div className='col-auto'>
                                    <button className='btn btn-sm btn-success' type='submit'>Search</button>     
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchBar;