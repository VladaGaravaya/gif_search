import React, {Component} from 'react';
import './Gif.css'

interface IGifItemProps {
    url: string,
    onClick: (str: string) => void,
}

export default class GifItem extends Component<IGifItemProps> {
    render() {
        return (
            <div className="box">
                <img src={this.props.url} className='image img-thumbnail' 
                     onClick={() => this.props.onClick!(this.props.url)}
                     alt=''/>
                <div className='saveBox'>
                    Save
                </div>
            </div>
        )
    }
}