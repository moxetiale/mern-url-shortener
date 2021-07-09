import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import moment from 'moment';

import Header from './../components/Header';

function MyVisitedUrls() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  // Get urr from api (useffect similar to componentdidmount)
  useEffect(() => {

    fetch("http://localhost:8082/url/stats/by-user")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {

    return <>
      <Header />
      <div className="container list">
        <div className="columns">
          <div className="column is-12">
            <div className="has-text-centered has-text-weight-bold">Error: {error.message}</div>
          </div>
        </div>
      </div>
    </>;

  } else if (!isLoaded) {

    return <>
      <Header />
      <div className="container list">
        <div className="columns">
          <div className="column is-12">
            <div className="has-text-centered has-text-weight-bold">Loading ...</div>
          </div>
        </div>
      </div>
    </>;

  } else {
    return <>
      <Header />
      <div className="container list">
        <div className="columns">
          <div className="column is-12">
          <h1 className="is-size-3">Last 30 Days</h1>
          {items.last_month && items.last_month.length > 0 > 0 ? <table className="table is-fullwidth">
            <thead>
              <tr>
                <th>URL</th>
                <th>Visited at</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {items.last_month && items.last_month.map(item => (
              <tr key={item._id}>
                <td>
                  <Router>
                    <Link target="_blank" to={ '/' + item.url.shortUrl}>
                    { 'http://localhost:3000/' + item.url.shortUrl}
                    </Link>
                  </Router>
                </td>
                <td>{ moment(item.created_at).format('DD MMMM YYYY HH:mm') }</td>
                <td>
                <Router>
                  <Link title="Visit url" className="eye" target="_blank" to={ '/' + item.url.shortUrl}>
                    <i className="fas fa-eye"></i>
                  </Link>
                  <Link title="Statistics" target="_blank" to={ '/stats/' + item.url.shortUrl}>
                  <i className="fas fa-chart-bar"></i>
                  </Link>
                </Router>
                </td>
              </tr>
            ))}

            </tbody>
          </table> : <div className="has-text-centered has-text-weight-bold">You dont have visited urls</div> }
          </div>
        </div>

      </div>

      <div className="container list">
        <div className="columns">
          <div className="column is-12">
          <h1 className="is-size-3">Last 7 Days</h1>
          {items.last_week && items.last_week.length > 0 > 0 ? <table className="table is-fullwidth">
            <thead>
              <tr>
                <th>URL</th>
                <th>Visited at</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {items.last_week && items.last_week.map(item => (
              <tr key={item._id}>
                <td>
                  <Router>
                    <Link target="_blank" to={ '/' + item.url.shortUrl}>
                    { 'http://localhost:3000/' + item.url.shortUrl}
                    </Link>
                  </Router>
                </td>
                <td>{ moment(item.created_at).format('DD MMMM YYYY HH:mm') }</td>
                <td>
                <Router>
                  <Link title="Visit url" className="eye" target="_blank" to={ '/' + item.url.shortUrl}>
                    <i className="fas fa-eye"></i>
                  </Link>
                  <Link title="Statistics" target="_blank" to={ '/stats/' + item.url.shortUrl}>
                  <i className="fas fa-chart-bar"></i>
                  </Link>
                </Router>
                </td>
              </tr>
            ))}

            </tbody>
          </table> : <div className="has-text-centered has-text-weight-bold">You dont have visited urls</div> }
          </div>
        </div>

      </div>



      <div className="container list">
        <div className="columns">
          <div className="column is-12">
          <h1 className="is-size-3">Last 1 Days</h1>
          {items.last_day && items.last_day.length > 0 > 0 ? <table className="table is-fullwidth">
            <thead>
              <tr>
                <th>URL</th>
                <th>Visited at</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {items.last_day && items.last_day.map(item => (
              <tr key={item._id}>
                <td>
                  <Router>
                    <Link target="_blank" to={ '/' + item.url.shortUrl}>
                    { 'http://localhost:3000/' + item.url.shortUrl}
                    </Link>
                  </Router>
                </td>
                <td>{ moment(item.created_at).format('DD MMMM YYYY HH:mm') }</td>
                <td>
                <Router>
                  <Link title="Visit url" className="eye" target="_blank" to={ '/url/' + item.urlshortUrl}>
                    <i className="fas fa-eye"></i>
                  </Link>
                  <Link title="Statistics" target="_blank" to={ '/stats/' + item.url.shortUrl}>
                  <i className="fas fa-chart-bar"></i>
                  </Link>
                </Router>
                </td>
              </tr>
            ))}

            </tbody>
          </table> : <div className="has-text-centered has-text-weight-bold">You dont have visited urls</div> }
          </div>
        </div>

      </div>



      <div className="container list">
        <div className="columns">
          <div className="column is-12">
          <h1 className="is-size-3">Last Hour</h1>
          {items.last_hour && items.last_hour.length > 0 > 0 ? <table className="table is-fullwidth">
            <thead>
              <tr>
                <th>URL</th>
                <th>Visited at</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {items.last_hour && items.last_hour.map(item => (
              <tr key={item._id}>
                <td>
                  <Router>
                    <Link target="_blank" to={ '/' + item.url.shortUrl}>
                    { 'http://localhost:3000/url/' + item.url.shortUrl}
                    </Link>
                  </Router>
                </td>
                <td>{ moment(item.created_at).format('DD MMMM YYYY HH:mm') }</td>
                <td>
                <Router>
                  <Link title="Visit url" className="eye" target="_blank" to={ '/' + item.urlshortUrl}>
                    <i className="fas fa-eye"></i>
                  </Link>
                  <Link title="Statistics" target="_blank" to={ '/stats/' + item.url.shortUrl}>
                  <i className="fas fa-chart-bar"></i>
                  </Link>
                </Router>
                </td>
              </tr>
            ))}

            </tbody>
          </table> : <div className="has-text-centered has-text-weight-bold">You dont have visited urls</div> }
          </div>
        </div>

      </div>


      <div className="container list">
        <div className="columns">
          <div className="column is-12">
          <h1 className="is-size-3">All</h1>
          {items.all && items.all.length > 0 > 0 ? <table className="table is-fullwidth">
            <thead>
              <tr>
                <th>URL</th>
                <th>Visited at</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {items.all && items.all.map(item => (
              <tr key={item._id}>
                <td>
                  <Router>
                    <Link target="_blank" to={ '/' + item.url.shortUrl}>
                    { 'http://localhost:3000/' + item.url.shortUrl}
                    </Link>
                  </Router>
                </td>
                <td>{ moment(item.created_at).format('DD MMMM YYYY HH:mm') }</td>
                <td>
                <Router>
                  <Link title="Visit url" className="eye" target="_blank" to={ '/' + item.urlshortUrl}>
                    <i className="fas fa-eye"></i>
                  </Link>
                  <Link title="Statistics" target="_blank" to={ '/stats/' + item.url.shortUrl}>
                  <i className="fas fa-chart-bar"></i>
                  </Link>
                </Router>
                </td>
              </tr>
            ))}

            </tbody>
          </table> : <div className="has-text-centered has-text-weight-bold">You dont have visited urls</div> }
          </div>
        </div>

      </div>

    </>;
  }
}


export default MyVisitedUrls;
