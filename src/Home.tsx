import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './Gif.css'

export default class Home extends Component {

    getSavedGifs () {
        const gifs = localStorage.getItem('gifs');
        if(gifs) {
            return JSON.parse(gifs);
        }
        return [];
    }  

    render () {
        const gifs = this.getSavedGifs();
        return (
            <div>
                <h1>Hello! All your saved gifs are stored here. But ...</h1>
                <Link to="/giflist" className='btn btn-outline-dark start'>..start search other cool gifs!</Link>
                <br></br>
                {gifs.map( (url: string) => <img src={url} className='saveImg img-thumbnail' alt=''/>)}
            </div>
        )
    }
}
