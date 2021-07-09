import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import Header from './../components/Header';



// Get router param

function Redirect() {

  const { shortUrl } = useParams()
  const [error, setError] = useState(null);

  // Get urr from api (useffect similar to componentdidmount)
  useEffect(() => {

    fetch("http://localhost:8082/url/get/" + shortUrl)
      .then(res => res.json())
      .then(
        (result) => {
          window.location.href = result.longUrl;
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else{
    return <div>Redirecting to: <span class="strong">{'http://localhggost:3000/' + shortUrl }</span></div>;
  }



}


export default Redirect;
