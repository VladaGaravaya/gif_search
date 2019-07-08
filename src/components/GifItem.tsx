import React from 'react';
import './App.css'

interface IGifItemProps {
    url: string,
    onClick: (str: string) => void,
}

const GifItem = (props: IGifItemProps) => {
    return (
        <div className="box">
            <img src={props.url} className='image img-thumbnail' 
                 onClick={() => props.onClick!(props.url)}
                 alt=''
            />
            <div className='saveBox'>
                <img src="https://img.icons8.com/plasticine/100/000000/like.png"/>
            </div>
        </div>
    )
}

export default GifItem;