import React, { Component } from "react";
import ReactPaginate from "react-paginate";
import Search from "./components/Search.jsx";
import Events from "./components/Events.jsx";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      search: "",
      events: [],
      pages: 0,
      page: 0,
      offset: 0,
      limit: 10,
      sort: "date",
      currentPage: 0
    };
    this.searchEvents = this.searchEvents.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.changePage = this.changePage.bind(this);
    this.formatDate = this.formatDate.bind(this);
  }
  handleChange(event) {
    let search = event.target.value;
    this.setState({ search });
  }
  searchEvents(event) {
    event.preventDefault();
    axios
      .get(`/api/events?=${this.state.search}`)
      .then((res) => {
        let events = res.data;
        this.setState({ pages: Math.ceil(events.length) / 10 }, () => {
          axios
            .get(
              `/api/events?q=${this.state.search}` +
                `&_page=${this.state.page}` +
                `&_limit=${this.state.limit}` +
                `&_sort=${this.state.sort}`
            )
            .then((res) => {
              let events = res.data;
              this.setState({
                page: 1,
                events: res.data,
                search: ""
              });
            })
            .catch((err) => console.log(err));
        });
      })
      .catch((err) => console.log(err));
  }
  handlePageClick(data) {
    let selected = data.selected;
    let offset = Math.ceil(selected(this.state.perPage));
    this.setState({ offset }, () => {
      this.searchEvents(search);
    });
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
  changePage() {
    axios
      .get(
        `/api/events?q=${this.state.search}` +
          `&_page=${this.state.page}` +
          `&_limit=${this.state.limit}` +
          `&_sort=${this.state.sort}`
      )
      .then((res) => {
        let events = res.data;
        this.setState({ events: events, search: "" });
      })
      .then(() => {
        console.log(this.state.events);
      })
      .catch((err) => console.log(err));
  }
  render() {
    return (
      <div>
        <div className="hero">
          <div className="hero-body">
            <h3 className="title is-3 has-text-centered">Historical Events Finder</h3>
          </div>
        </div>
        <Search
          search={this.state.search}
          handleChange={this.handleChange}
          searchEvents={this.searchEvents}
        />
        <div className="container is-fluid">
          <div className="columns">
            <div className="column is-2"></div>
            <div className="column is-8">
              <Events events={this.state.events} formatDate={this.formatDate} />
              <div style={{ display: "flex", flexDirection: "row" }}>
                <ReactPaginate
                  previousLabel={"Prev"}
                  nextLabel={"Next"}
                  breakLabel={"..."}
                  pageCount={this.state.pages}
                  onPageChange={(page) => {
                    this.setState({ page: page.selected + 1 }, this.changePage);
                  }}
                />
              </div>
            </div>
            <div className="column is-2"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
