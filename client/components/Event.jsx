import React, { Component } from "react";
import Modal from "react-modal";
import axios from "axios";
import "./Event.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "80%",
    transform: "translate(-50%, -50%)",
    background: "rgba(100, 181, 246)"
  }
};

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      description: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  componentDidMount() {
    let description = this.props.description;
    this.setState({ description });
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.updateDescription();
    this.closeModal();
  }
  updateDescription() {
    let id = this.props.id;
    let description = this.state.description;
    axios
      .patch(`/api/events/${id}`, { description })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  }
  openModal() {
    this.setState({ modalIsOpen: true });
  }
  afterOpenModal() {
    // Do something after modal opens
  }
  closeModal() {
    this.setState({ modalIsOpen: false });
  }
  render() {
    return (
      <div style={{ padding: "2.5px" }}>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          ariaHideApp={false}
        >
          <form className="form" onSubmit={this.handleSubmit}>
            <label className="label has-text-centered" style={{ color: "white" }}>
              Edit Event
            </label>
            <div className="control">
              <textarea
                className="textarea is-info"
                name="description"
                value={this.state.description}
                onChange={this.handleChange}
                rows="10"
              />
            </div>
            <br />
            <div className="field has-addons" id="button-field">
              <p className="control">
                <button className="button" onClick={this.handleSubmit}>
                  Save
                </button>
              </p>
              &nbsp;
              <p className="control">
                <button className="button" onClick={this.closeModal}>
                  Close
                </button>
              </p>
            </div>
          </form>
        </Modal>
        <article className="message is-info" id="article">
          <div className="message-header">
            <p id="date">{this.props.date}</p>
            <button className="button is-small" onClick={this.openModal}>
              <span>
                <i className="fas fa-edit"></i>
              </span>
            </button>
          </div>
          <div className="message-body" id="description">
            {this.state.description}
          </div>
        </article>
      </div>
    );
  }
}

export default Event;
