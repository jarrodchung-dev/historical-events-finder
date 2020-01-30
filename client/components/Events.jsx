import React from "react";

const Events = (props) => {
  return (
    <div>
      {props.events.map((event) => {
        return (
          <div className="card" key={event.description}>
            <div className="card-content">
              <div className="media-content">
                <ul>
                  <li>
                    <strong>{props.formatDate(event.date)}</strong>
                  </li>
                  <li>
                    <strong>What:</strong> {event.description}
                  </li>
                  <li>
                    <strong>Where:</strong> {event.category2}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Events;
