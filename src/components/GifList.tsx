import React, {Component} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import GifItem from './GifItem';
import './App.css'

interface IGifListState {
    gifs: Array<string>,
    value: string,
    count: number,
    type: string,
}

type Data = {
    images: {
        original: {
            url: string
        }
    }
} 

export default class GifList extends Component<{},IGifListState> {

    state = {
        gifs: [],
        value: '',
        count: 12,
        type: 'gifs',
    }

    async getImages(value: string) {
        const API_KEY = "A3CQtr8DQVI2kM215yBVSwvdwvJgyMcU";
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const API = `https://api.giphy.com/v1/${this.state.type}/search?q=${value}&limit=${this.state.count}&api_key=${API_KEY}`;

        const response = await fetch(proxyUrl+API);
        const dataJSON = await response.json();
        const data = dataJSON.data;
        const massUrls = data.map((element: Data) => { return element.images.original.url });
        this.setState({
            gifs: massUrls,
            value: value,
        });
    }

    search = (value: string) => {
        localStorage.savedInput = value;
        this.getImages(value);
    }

    fetchMoreData = () => {
        this.setState ({
            count: this.state.count + 8,
        });
        this.getImages(this.state.value);
    }

    changeType = (type: string) => {
        this.state.type = type;
        this.getImages(this.state.value);
    }

    render () { 
        const currentGifs = this.state.gifs;
        const savedInput = localStorage.getItem('savedInput') || 'hello';//подгружает последний запрос или выводит гифки с приветствием
        if( currentGifs.length === 0) {
            this.getImages(savedInput);
        }
        return (
            <div className='bar'>
                <Link to="/" className='btn btn-outline-dark back'>&larr; Go back</Link>
                <SearchBar onChange={this.search}/>
                <div className="btn-group btn-group-toggle" data-toggle="buttons">
                    <label className={(this.state.type === 'gifs')? "btn btn-secondary active" : "btn btn-secondary"}>
                        <input type="radio" onClick={() => this.changeType('gifs')}/> Gifs
                    </label>
                    <label className={(this.state.type !== 'gifs')? "btn btn-secondary active" : "btn btn-secondary"}>
                        <input type="radio" onClick={() => this.changeType('stickers')}/> Stickers
                    </label>
                </div>
                <br/>
                <div className='gifList'>
                    <InfiniteScroll dataLength={this.state.gifs.length}
                                    next={this.fetchMoreData}
                                    hasMore={true}
                                    loader={<h4> Loading...</h4>} >
                        {currentGifs.map ( e => <GifItem url={e} key={e}/>)}
                    </InfiniteScroll> 
                </div> 
            </div>
        )
    }
}