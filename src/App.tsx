import React from 'react';
import Loadable from 'react-loadable';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './components/App.css';

function Loading() {
  return <div>Loading...</div>;
}

const Home = Loadable ({
  loader: () => import('./components/Home'),
  loading: Loading,
});

const GifList = Loadable ({
  loader: () => import('./components/GifList'),
  loading: Loading,
});

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
