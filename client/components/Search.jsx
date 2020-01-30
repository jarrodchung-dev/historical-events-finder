import React from "react";

const Search = (props) => {
  return (
    <div className="container is-fluid">
      <div className="columns">
        <div className="column is-2"></div>
        <div className="column is-8">
          <form className="form" onSubmit={props.handleSubmit}>
            <label className="label">Search</label>
            <div className="control">
              <input
                className="input"
                name="search"
                value={props.search}
                onChange={props.handleChange}
              />
            </div>
            <button className="button" style={{ marginTop: "5px" }}>
              Search
            </button>
          </form>
        </div>
        <div className="column is-2"></div>
      </div>
    </div>
  );
};

export default Search;
