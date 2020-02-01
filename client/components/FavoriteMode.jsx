import React, { Component } from "react";
import Modal from "react-modal";

class Favorite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      eventId: "",
      favoriteSet: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  render() {
    return (
      <Modal isOpen={this.state.isOpen}>
        <form className="form">
          <div className="field">
            <label className="label">Favorite Set</label>
            <input
              className="input"
              name="favoriteSet"
              value={this.state.favoriteSet}
              onChange={this.handleChange}
            />
          </div>
        </form>
      </Modal>
    );
  }
}

export default Favorite;
