import React, { useEffect, useState } from "react";
import { Switch, Linkm, useParams } from "react-router-dom";
import { Doughnut } from 'react-chartjs-2';
import Header from './../components/Header';

function Stats() {

  const { shortUrl } = useParams()
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  // Get urr from api (useffect similar to componentdidmount)
  useEffect(() => {

    fetch("http://localhost:8082/url/stats/by-url/" + shortUrl )
      .then(res => res.json())
      .then(
        (result) => {

          setItems(result);
          setIsLoaded(true);

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


    const last_month = {
      labels: ['Unique visitors', 'All visitors'],
      datasets: [
        {
          label: '# of Votes',
          data: [items.unique.last_month.length ? items.unique.last_month.length : 0, items.all.last_month.length ? items.all.last_month.length : 0],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

    const last_week = {
      labels: ['Unique visitors', 'All visitors'],
      datasets: [
        {
          label: '# of Votes',
          data: [items.unique.last_week.length, items.all.last_week.length],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

    const last_day = {
      labels: ['Unique visitors', 'All visitors'],
      datasets: [
        {
          label: '# of Votes',
          data: [items.unique.last_day.length, items.all.last_day.length],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

    const last_hour = {
      labels: ['Unique visitors', 'All visitors'],
      datasets: [
        {
          label: '# of Votes',
          data: [items.unique.last_hour.length, items.all.last_hour.length],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

    const all = {
      labels: ['Unique visitors', 'All visitors'],
      datasets: [
        {
          label: '# of Votes',
          data: [items.unique.all.length, items.all.all.length],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

    return <>
      <Header />
      <div className="container list">

        <div className="columns">

          <div className="column is-4">

            <div className="has-text-weight-bold">
              All
            </div>

            <br />
            <br />
            <Doughnut data={all} />

          </div>

          <div className="column is-4">

            <div className="has-text-weight-bold">
              Last 30 Days
            </div>

            <br />
            <br />
            <Doughnut data={last_month} />

          </div>
          <div className="column is-4">
            <div className="has-text-weight-bold">
              Last 7 Days
            </div>
            <br />
            <br />
            <Doughnut data={last_week} />
          </div>
        </div>

        <div className="columns">

          <div className="column is-4">

            <div className="has-text-weight-bold">
              Last Day
            </div>

            <br />
            <br />
            <Doughnut data={last_hour} />

          </div>

          <div className="column is-4">

            <div className="has-text-weight-bold">
              Last Hour
            </div>

            <br />
            <br />
            <Doughnut data={last_hour} />

          </div>
        </div>

      </div>
    </>;


  }
}


export default Stats;
