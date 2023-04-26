// import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [breweryData, setbreweryData] = useState([]);
  const [searchData, setsearchData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  function Search() {
    const value = document.getElementById("inputBox").value.trim();
    if (value === "") {
      setsearchData(breweryData);
    } else {
      const filteredData = breweryData.filter((data) =>
        data.name.toLowerCase().includes(value.toLowerCase())
      );
      setsearchData(filteredData);
    }
  }
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
          setsearchData(data);
        })
        .catch((error) => console.log(error));
    }
    fetchData();
    setsearchData(breweryData);
  }, []);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(searchData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentList = searchData.slice(startIndex, endIndex);

  return (
    <div className="MainDiv">
      <div className="bgimageDiv">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Brewery name"
            className="inputBox"
            id="inputBox"
          ></input>
          <button onClick={() => Search()}>Search</button>
        </div>
      </div>
      <div className={`${currentList[0] ? "details" : "detailsEmpty"} `}>
        <div>
          {currentList[0] &&
            currentList.map((data) => (
              <div class="card">
                <div class="container">
                  <p>
                    <b>
                      {data.name} - {data.brewery_type}
                    </b>
                  </p>
                  <p>
                    {data.address_1},{data.city},{data.state_province},
                    {data.country} - {data.postal_code}{" "}
                  </p>
                  <a href={data.website_url}>
                    <b>Website :</b> {data.website_url}
                  </a>
                  <p>
                    <b>Phone : </b>
                    {data.phone}
                  </p>
                </div>
              </div>
            ))}
        </div>
        {currentList[0] &&(
                  <div id="buttons" className="">
                  <ul className="pagination" id="pagination">
                    <button
                      id="previous"
                      className=" page-link"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(currentPage - 1)}
                    >
                      Previous
                    </button>
                    {Array.from({ length: totalPages }).map((_, index) => (
                      <button
                        className={`page-link  ${
                          currentPage === index + 1 ? "active" : ""
                        }`}
                        onClick={() => setCurrentPage(index + 1)}
                      >
                        {index + 1}
                      </button>
                    ))}
        
                    <button
                      id="next"
                      className=" page-link"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >
                      Next
                    </button>
                  </ul>
                </div>
        )}

      </div>
    </div>
  );
}

export default App;
