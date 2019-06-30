import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import GifItem from './GifItem'
import './Gif.css'


interface IGifListState {
    gifs: Array<string>,
    value: string,
}

export default class GifList extends Component<{},IGifListState> {

    state = {
        gifs: [],
        value: '',
    }

    async getImages(type: string, value: string, numb: number) {
        const API_KEY = "A3CQtr8DQVI2kM215yBVSwvdwvJgyMcU";
        const API = `https://api.giphy.com/v1/${type}/search?q=${value}&limit=${numb}&api_key=${API_KEY}`;

        const response = await fetch(API);
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
        console.log(value);
        this.getImages('gifs',value,12);
    }

    toLocStor = (url: string) => {
        const saved = localStorage.getItem('gifs');
        if(saved) {
            const parseGifs = JSON.parse(saved);
            parseGifs.push(url);
            localStorage.setItem('gifs', JSON.stringify(parseGifs));
        } 
        else {
            const gifs = new Array();
            gifs.push(url);
            localStorage.setItem('gifs', JSON.stringify(gifs));
        } 
    }

    onScrollList(event: any) {
        const scrollBottom = event.target.scrollTop + 
              event.target.offsetHeight == event.target.scrollHeight;
          if (scrollBottom) {
            this.getImages('gifs','cat',5);
          }
    }

    render () { 
        const a = this.state.gifs;
        return (
            <div className='bar' onScroll={event => this.onScrollList(event)}>
                <Link to="/" className='btn btn-outline-dark back'>&larr; Go back</Link>
                <SearchBar onChange={this.search}/>
                <div className="btn-group btn-group-justified">
                    <button onClick={() => this.getImages('gifs',this.state.value, 9)}
                            className='btn btn-outline-dark'>
                                Gifs
                    </button>
                    <button onClick={() => this.getImages('stickers',this.state.value, 9)}
                            className='btn btn-outline-dark'>
                                Stickers
                    </button>
                </div>
                <br/>
                <div className='gifList'>
                    {a.map ( e =>   
                    <GifItem onClick={this.toLocStor} url={e}/>)}
                </div> 
            </div>
        )
    }
}