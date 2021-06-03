import React, { useState } from 'react';
import Modal from 'react-modal';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import HardIllustration from '../../../../public/hard.svg';
import LifestyleIllustration from '../../../../public/lifestyle.svg';

function Event({ event }) {
  const [modalIsOpen, setIsOpen] = useState(false);

  const [form, updateForm] = useState(() => {
    const isoStringDate = new Date(event.datetime).toISOString();
    const dateStringForDateInput = isoStringDate.substring(
      0,
      ((isoStringDate.indexOf('T') | 0) + 6) | 0
    );

    return {
      theme: event.label,
      date: dateStringForDateInput,
      speaker: event.speaker,
      department: event.department,
      type: event.type,
    };
  });

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
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
    formData.set('theme', theme);
    formData.set('date', date);
    formData.set('speaker', speaker);
    formData.set('department', department);
    formData.set('type', type);
    fetch('/api/editEvent', { method: 'POST', body: formData }).then(() => {
      setIsOpen(false);
    });
  };

  const isSubmitDisabled = Object.values(form).some((value) => !value);

  const renderIllustration = () => {
    if (event.type === 'hard') return <HardIllustration />;
    if (event.type === 'lifestyle') return <LifestyleIllustration />;
    return null;
  };

  const renderTime = () => {
    const eventDate = new Date(event.datetime);
    return format(eventDate, 'H:mm');
  };

  const renderFullDate = () => {
    const eventDate = new Date(event.datetime);
    // 27 июня, среда в 16:30
    return format(eventDate, 'd MMMM, EEEE в H:mm', { locale: ru });
  };

  return (
    <>
      <div className="timetable-event" key={event.id}>
        <div className="event-content">
          <div className="header">
            <p className="time">{renderTime()}</p>
            <div className="person">
              <p className="name">{event.speaker}</p>
              <p className="department">{event.department}</p>
            </div>
          </div>
          <p className="title">{event.label}</p>
          <div>
            <button type="button" className="btn btn-primary btn-sm me-3" onClick={openModal}>
              Редактировать
            </button>
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={() => {
                console.log('удалил');
              }}
            >
              Удалить
            </button>
          </div>
        </div>
        {renderIllustration()}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal"
        overlayClassName="modal-overlay"
        closeTimeoutMS={300}
      >
        <div className="title">
          Вы редактируете
          <h1>{event.label}</h1>
        </div>
        <div className="form">
          <form onSubmit={submitForm}>
            <div className="mb-3">
              <label htmlFor="theme" className="form-label">
                Тема
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
                Отдел
              </label>
              <select className="form-select" id="type" value={form.type} onChange={onFieldChange}>
                <option selected value="" disabled hidden />
                <option value="lifestyle">Lifestyle</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary me-3" disabled={isSubmitDisabled}>
              Сохранить
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

export default Event;
