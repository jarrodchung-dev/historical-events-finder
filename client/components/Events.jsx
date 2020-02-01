import React from "react";
import Event from "./Event.jsx";

const Events = (props) => {
  return (
    <div className="block">
      {props.events.map((event) => {
        return (
          <Event
            key={event.id}
            id={event.id}
            description={event.description}
            date={props.formatDate(event.date)}
            favoriteEvent={props.favoriteEvent}
          />
        );
      })}
    </div>
  );
};

export default Events;
