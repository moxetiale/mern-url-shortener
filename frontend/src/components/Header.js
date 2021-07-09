import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

function Header(){

  const [url, setUrl] = useState('')
  const [fetchedData, setFetchedData] = useState('')

  const submit = e => {
    e.preventDefault()

    fetch('http://localhost:8082/url', {
      method: 'POST',
      body: JSON.stringify({ url }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          if(result){
            window.location.href = 'http://localhost:3000/';
          }
          //
        },

        (error) => {
          alert(error.message)
        }
      )
  }

  return (
    <header className="App-header">
      <div className="container is-widescreen">
        <div className="columns">
          <div className="column is-2">
            <div className="logo navigate">
              <Link to="/">URL Shortener</Link>
            </div>
          </div>
          <div className="column is-10">
            <div className="columns">

              <div className="column is-4">
                <form onSubmit={submit}>
                  <div className="field has-addons">
                    <div className="control">
                      <input className="input" name="url" value={url} onChange={(e) => setUrl(e.target.value)} type="text" placeholder="Shorten url" />
                    </div>
                    <div className="control">
                      <button className="button is-primary">
                        Shorten
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              <div className="column is-4">
                  <ul className="navigate">
                    <li>
                      <Link to="/my-urls">My urls</Link>
                    </li>
                    <li>
                      <Link to="/my-visited-urls">My Visited urls</Link>
                    </li>
                  </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )

}

export default Header
