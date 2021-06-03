import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import Event from './components/Event';

function AdminEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('/api/getEvents').then(async (res) => {
      const { events: backendEvents } = await res.json();
      setEvents(Object.values(backendEvents));
    });
  }, []);

  const renderTimetable = () => {
    if (events.length === 0) return null;

    const dateSet = new Map();

    events
      .sort((a, b) => a.datetime - b.datetime)
      .forEach((event) => {
        const formatDate = format(event.datetime, 'd MMMM, EEEE', { locale: ru });
        if (dateSet.has(formatDate)) {
          const oldDate = dateSet.get(formatDate);
          dateSet.set(formatDate, [...oldDate, event.datetime]);
        } else {
          dateSet.set(formatDate, [event.datetime]);
        }
      });

    const renderDays = () => {
      const renderedDays = [];

      for (const formatDate of dateSet.keys()) {
        renderedDays.push(
          <div className="timetable-day" key={formatDate}>
            <p className="timetable-day_title">{formatDate}</p>
            <div className="row">{renderEvents(formatDate)}</div>
          </div>
        );
      }

      return renderedDays;
    };

    const renderEvents = (formatDate) =>
      dateSet
        .get(formatDate)
        .sort((a, b) => a.datetime - b.datetime)
        .map((timestamp) =>
          events
            .filter((event) => event.datetime === timestamp)
            .map((event) => {
              const { id } = event;
              return (
                <div className="col-12 col-lg-6 mb-4" key={id}>
                  <Event event={event} key={id} />
                </div>
              );
            })
        );

    return <div className="timetable">{renderDays()}</div>;
  };

  return (
    <>
      <h1 className="title mb-5">
        События
        <button className="btn btn-primary">Новый митап</button>
      </h1>
      {renderTimetable()}
    </>
  );
}

export default AdminEvents;
