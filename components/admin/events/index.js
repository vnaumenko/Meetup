import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import Modal from 'react-modal';
import { Event } from './components/Event';

function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);

  const fetchEvents = () => {
    fetch('/api/getAllEvents').then(async (res) => {
      const { events: backendEvents } = await res.json();
      setEvents(Object.values(backendEvents));
    });
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const initialFormValues = {
    theme: '',
    date: '',
    speaker: '',
    department: '',
    type: '',
  };

  const [form, updateForm] = useState(initialFormValues);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    updateForm(initialFormValues);
    setIsOpen(false);
  };

  const onFieldChange = ({ target }) => {
    const { id, value } = target;
    updateForm((prevState) => ({ ...prevState, [id]: value }));
  };

  const submitForm = (e) => {
    const { theme, date, speaker, department, type } = form;
    e.preventDefault();
    const formData = new FormData();
    formData.set('label', theme);
    formData.set('datetime', new Date(date).getTime().toString());
    formData.set('speaker', speaker);
    formData.set('department', department);
    formData.set('type', type);
    fetch('/api/createEvent', { method: 'POST', body: formData }).then(() => {
      fetchEvents();
      setIsOpen(false);
    });
  };

  const isSubmitDisabled = Object.values(form).some((value) => !value);

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
                  <Event event={event} onEventChanged={fetchEvents} />
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
        <button type="button" className="btn btn-primary" onClick={openModal}>
          Новый митап
        </button>
      </h1>
      {renderTimetable()}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal"
        overlayClassName="modal-overlay"
        closeTimeoutMS={300}
      >
        <div className="title">
          <h1>Новый митап</h1>
        </div>
        <div className="form">
          <form onSubmit={submitForm}>
            <div className="mb-3">
              <label htmlFor="theme" className="form-label">
                Тема доклада
              </label>
              <input
                type="text"
                className="form-control"
                id="theme"
                value={form.theme}
                onChange={onFieldChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="date" className="form-label">
                Дата
              </label>
              <input
                type="datetime-local"
                className="form-control"
                id="date"
                value={form.date}
                onChange={onFieldChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="speaker" className="form-label">
                Спикер
              </label>
              <input
                type="text"
                className="form-control"
                id="speaker"
                value={form.speaker}
                onChange={onFieldChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="department" className="form-label">
                Отдел
              </label>
              <input
                type="text"
                className="form-control"
                id="department"
                value={form.department}
                onChange={onFieldChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="type" className="form-label">
                Тип доклада
              </label>
              <select className="form-select" id="type" value={form.type} onChange={onFieldChange}>
                <option selected value="" disabled hidden />
                <option value="lifestyle">Lifestyle</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary me-3" disabled={isSubmitDisabled}>
              Добавить
            </button>
            <button type="button" className="btn btn-link" onClick={closeModal}>
              Отмена
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default AdminEvents;
