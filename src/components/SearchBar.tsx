import React, { Component} from 'react'
import './App.css'

interface ISearchProps {
    onChange: (str: string) => void;
}

interface ISearchState {
    value: string,
}

export default class Search extends Component <ISearchProps, ISearchState> {
    state = {
        value: '',
    }

    render () {
        return (
            <div className="input-group mb-3 bar">
                 <input className="form-control" placeholder="Search" onChange={(e) => this.setState({ value: e.target.value})}></input>
                 <div className="input-group-append">
                     <button className="btn btn-outline-secondary bar" type="button" onClick={() => this.props.onChange(this.state.value)}>Search</button>
                 </div>
            </div>
        )
    }
}