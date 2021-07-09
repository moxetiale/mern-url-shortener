import './App.css';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Home from './pages/home';
import MyUrls from './pages/my-urls';
import MyVisitedUrls from './pages/my-visited-urls';
import Redirect from './pages/redirect';
import Stats from './pages/stats';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Home} exact path="/">
          <Home />
        </Route>
        <Route component={MyUrls}  path="/my-urls">
          <MyUrls />
        </Route>
        <Route component={MyVisitedUrls}  path="/my-visited-urls">
          <MyVisitedUrls />
        </Route>
        <Route component={Stats}  path="/stats/:shortUrl">
          <Stats />
        </Route>
        <Route component={Redirect}  path="/:shortUrl">
          <Redirect />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
