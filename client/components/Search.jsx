import React from "react";

const Search = (props) => {
  return (
    <div className="container">
      <form className="form" onSubmit={props.handleSubmit}>
        <div className="field">
          <div className="control has-icons-right">
            <input
              className="input is-rounded"
              name="search"
              value={props.search}
              onChange={props.handleChange}
              placeholder="History is written by the victors..."
            />
            <span className="icon is-right">
              <i className="fas fa-search"></i>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Search;
