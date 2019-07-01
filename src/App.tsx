import React from 'react';
import GifList from './components/GifList';
import Home from './components/Home';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './components/App.css';

const App: React.FC = () => {
  
  return (
    <HashRouter>
        <div className="App">
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/giflist" component={GifList} />
            </Switch>
        </div>
    </HashRouter>
  );
}

export default App;
