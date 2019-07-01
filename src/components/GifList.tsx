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
        const data = await response.json();
        const mass = data["data"];
        let images: Array<string> = [];
        mass.forEach((element: any) => {
            images = [...images, element['images']['original']['url']]
        });
        this.setState({
            gifs: images,
        });
    }

    search = (value: string) => {
        this.setState({
            value: value,
        });
        this.getImages(value);
    }

    toLocStor = (url: string) => {
        const saved = localStorage.getItem('gifs');
        if(saved) {
            const parseGifs = JSON.parse(saved);
            parseGifs.push(url);
            alert("You saved this gif(sticker)");
            localStorage.setItem('gifs', JSON.stringify(parseGifs));
        } 
        else {
            const gifs = [];
            gifs.push(url);
            alert("You saved this gif(sticker)");
            localStorage.setItem('gifs', JSON.stringify(gifs));
        } 
    }

    fetchMoreData = () => {
        this.setState ({
            count: this.state.count + 8,
        })
        this.getImages(this.state.value);
    }

    changeType = (type: string) => {
        this.state.type = type;
        this.getImages(this.state.value);
    }

    render () { 
        const currentGifs = this.state.gifs;
        return (
            <div className='bar'>
                <Link to="/" className='btn btn-outline-dark back'>&larr; Go back</Link>
                <SearchBar onChange={this.search}/>
                <div className="btn-group btn-group-justified">
                    <button onClick={() => this.changeType('gifs')} className='btn btn-outline-dark'> Gifs</button>
                    <button onClick={() => this.changeType('stickers')} className='btn btn-outline-dark'> Stickers</button>
                </div>
                <br/>
                <div className='gifList'>
                    <InfiniteScroll dataLength={this.state.gifs.length}
                                    next={this.fetchMoreData}
                                    hasMore={true}
                                    loader={<h4> </h4>} >
                        {currentGifs.map ( e => <GifItem onClick={this.toLocStor} url={e} key={e}/>)}
                    </InfiniteScroll> 
                </div> 
            </div>
        )
    }
}