import React from 'react';
import { Link } from 'react-router-dom';
import './App.css'

function getSavedGifs () {
    const gifs = localStorage.getItem('gifs') || '';
    return (gifs === '')? [] : JSON.parse(gifs);
} 

const Home = () => {
    const gifs = getSavedGifs();
    return (
        <div>
            <h1>Hello! All your saved gifs are stored here. But ...</h1>
            <Link to="/giflist" className='btn btn-outline-dark start'>..start search other cool gifs!</Link>
            <br></br>
            {gifs.map( (url: string) => <img src={url} className='saveImg img-thumbnail' alt=''/>)}
        </div>
    )
}

export default Home;