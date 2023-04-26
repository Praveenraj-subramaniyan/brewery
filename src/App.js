// import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [breweryData, setbreweryData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      fetch(`https://api.openbrewerydb.org/breweries/`)
        .then((response) => response.json())
        .then((data) => {
          data.sort((a, b) => {
            if (a.name.common < b.name.common) {
              return -1;
            }
            if (a.name.common > b.name.common) {
              return 1;
            }
            return 0;
          });
          setbreweryData(data);
          console.log(data[0].name);
        })
        .catch((error) => console.log(error));
    }
    fetchData();
  }, []);

  return (
    <div className="MainDiv">
      <div className="bgimageDiv">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Brewery name"
            className="inputBox"
          ></input>
          <button >Search</button>
        </div>
      </div>
      <div className="details">
        <div>
          {
            breweryData.map((data) =>(
          <div class="card">
            <div class="container">
              <p>
                <b>{data.name} - {data.brewery_type}</b>
              </p>
              <p>{data.address_1},{data.city},{data.state_province},{data.country} - {data.postal_code} </p>
              <a href={data.website_url}><b>Website :</b> {data.website_url}</a>
              <p><b>Phone : </b>{data.phone}</p>
            </div>
          </div>
          ))
        }
        </div>
      </div>
    </div>
  );
}

export default App;
