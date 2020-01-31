import React, { Component } from "react";
import ReactPaginate from "react-paginate";
import Search from "./components/Search.jsx";
import Events from "./components/Events.jsx";
import axios from "axios";
import "./images/georgewashington.png";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      events: [],
      prevSearch: "",
      pageCount: 0,
      search: ""
    };
    this.searchEvents = this.searchEvents.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.formatDate = this.formatDate.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.searchEvents(this.state.search, 1);
  }
  handlePageClick(event) {
    const prevSearch = this.state.prevSearch;
    this.searchEvents(prevSearch, event.selected + 1);
  }
  searchEvents(search, pageNumber) {
    axios
      .get("/api/events", {
        params: {
          q: search,
          _page: pageNumber,
          _limit: 10
        }
      })
      .then((res) => {
        this.setState({
          events: res.data,
          prevSearch: search,
          pageCount: Math.ceil(Number(res.headers["x-total-count"])) / 10
        });
      })
      .catch((err) => console.log(err));
  }
  formatDate(date) {
    let newDate = new Date(date);
    let month = newDate.getMonth();
    let day = newDate.getDay();
    let year = newDate.getYear();
    if (year.toString().split("")[0] === "-") {
      year = year.toString().substring(1) + " B.C.";
    }
    return `Month: ${month || "N/A"} | Day: ${day || "N/A"} | Year: ${year || "N/A"}`;
  }
  render() {
    return (
      <div>
        <div className="hero" id="hero">
          <div className="hero-body">
            <h3 className="title is-3 has-text-centered">Historical Events Finder</h3>
          </div>
        </div>
        <Search
          search={this.state.search}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        <div className="container is-fluid">
          <div className="columns">
            <div className="column is-2"></div>
            <div className="column is-8">
              <Events events={this.state.events} formatDate={this.formatDate} />
              <div className="card">
                <div className="card-content">
                  <ReactPaginate
                    previousLabel={"Prev"}
                    nextLabel={"Next"}
                    breakLabel={"..."}
                    pageCount={this.state.pageCount}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}
                  />
                </div>
              </div>
              <div className="column is-2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
