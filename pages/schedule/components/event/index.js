import React, { useState } from 'react';
import Modal from 'react-modal';

function Event({ event }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [form, updateForm] = useState({
    name: '',
    email: '',
    skype: ''
  });

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const onFieldChange = ({ target }) => {
    const { id, value } = target;
    updateForm((prevState) => ({ ...prevState, [id]: value,}));
  }

  const submitForm = (e) => {
    const {name, email, skype} = form;
    e.preventDefault();
    const formData = new FormData();
    formData.set('name', name)
    formData.set('email', email)
    formData.set('skype', skype)
    fetch('/api/register', {method: 'POST', body: formData }).then(() => {
      setIsOpen(false);
    })
  };

  const isSubmitDisabled = Object.values(form).some(value => !value)

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
            <button className={'btn btn-primary'} onClick={openModal}>
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
                onChange={onFieldChange}
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
                onChange={onFieldChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="skype" className="form-label">
                Skype
              </label>
              <input
                type="text"
                className="form-control"
                id="skype"
                value={form.skype}
                onChange={onFieldChange}
              />
            </div>
            <button type="submit" className="btn btn-primary me-3" disabled={isSubmitDisabled}>
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
