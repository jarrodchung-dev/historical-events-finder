import React from "react";

const Events = (props) => {
  return (
    <div className="block">
      {props.events.map((event) => {
        return (
          <article className="message is-info" key={event.description}>
            <div className="message-header">{props.formatDate(event.date)}</div>
            <div className="message-body">{event.description}</div>
          </article>
        );
      })}
    </div>
  );
};

export default Events;
