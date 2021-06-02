import React, { useState } from 'react';
import Modal from 'react-modal';

function Event({ event }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [form, updateForm] = useState({
    name: '',
    email: '',
  });

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const submitForm = (e) => {
    e.preventDefault();
    setIsOpen(false);
    // eslint-disable-next-line no-console
    console.log(form);
  };

  return (
    <>
      <div className={'timetable-event'} key={event.id}>
        <p className={'type'}>{event.type}</p>
        <p className={'title'}>{event.title}</p>
        <p className={'name'}>{event.speaker.name}</p>
        <div className={'info'}>
          <div className={'photo'}>
            <img src={event.speaker.photo} alt={event.speaker.name} />
          </div>
          <div className="desc">
            <p>{event.description}</p>
            <button type={'button'} className={'btn btn-primary'} onClick={openModal}>
              Записаться
            </button>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className="modal"
        overlayClassName="modal-overlay"
        closeTimeoutMS={300}
      >
        <div className="title">
          Вы записываетесь на
          <h1>{event.title}</h1>
          <time>27 июня, среда в 16:30</time>
        </div>
        <div className={'form'}>
          <form onSubmit={submitForm}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Имя
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={form.name}
                onChange={({ target }) => {
                  updateForm((prevState) => ({
                    ...prevState,
                    name: target.value,
                  }));
                }}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="form-label">
                Рабочая почта
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={form.email}
                onChange={({ target }) => {
                  updateForm((prevState) => ({
                    ...prevState,
                    email: target.value,
                  }));
                }}
              />
            </div>
            <button type="submit" className="btn btn-primary me-3">
              Записаться
            </button>
            <button type="submit" className="btn btn-link" onClick={closeModal}>
              Отмена
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default Event;
