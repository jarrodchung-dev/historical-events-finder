import React, { Component } from "react";
import "./NavMenu.css";

class NavMenu extends Component {
  constructor() {
    super();
    this.state = {
      favoriteSets: {},
      favoriteEvent: ""
    };
  }
  render() {
    return (
      <header>
        <nav className="navbar is-mobile is-spaced is-clearfix">
          <div className="navbar-menu">
            <div className="navbar-start">
              <div className="navbar-item">About</div>
              <div className="navbar-item">Store</div>
            </div>
            <div className="navbar-end">
              <div className="navbar-item">Gmail</div>
              <div className="navbar-item">Images</div>
              <div className="navbar-item">
                <i className="fas fa-th"></i>
              </div>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

export default NavMenu;
