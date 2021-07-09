import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import moment from 'moment';
import Header from './../components/Header';

function MyUrls() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  // Get urr from api (useffect similar to componentdidmount)
  useEffect(() => {

    fetch("http://localhost:8082/url/user-urls")
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
          { items.length > 0 ?
          <table className="table">
            <thead>
              <tr>
                <th>URL</th>
                <th>Created at</th>
                <th>Updated at</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {items.map(item => (
              <tr key={item._id}>
                <td>
                  <Router>
                    <Link target="_blank" to={ '/' + item.shortUrl}>
                    { 'http://localhost:3000/' + item.shortUrl}
                    </Link>
                  </Router>
                </td>
                <td>{moment(item.created_at).format('DD MMMM YYYY h:mm')}</td>
                <td>{moment(item.updated_at).format('DD MMMM YYYY h:mm')}</td>
                <td>
                <Router>
                  <Link title="Visit url" className="eye" target="_blank" to={ '/' + item.shortUrl}>
                    <i className="fas fa-eye"></i>
                  </Link>
                  <Link title="Statistics" target="_blank" to={ '/stats/' + item.shortUrl}>
                  <i className="fas fa-chart-bar"></i>
                  </Link>
                </Router>
                </td>
              </tr>
            ))}

            </tbody>
          </table> : <div className="has-text-centered has-text-weight-bold">You dont have url added yet</div> }
          </div>
        </div>

      </div>

    </>;
  }
}


export default MyUrls;
