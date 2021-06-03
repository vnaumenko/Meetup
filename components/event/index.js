import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import HardIllustration from '../../public/hard.svg';
import LifestyleIllustration from '../../public/lifestyle.svg';

function Event({ event }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [formSent, setFormSent] = useState(false);

  const [form, updateForm] = useState({
    name: '',
    email: '',
    skype: '',
  });

  useEffect(() => {
    if (formSent) {
      console.clear();
      console.log(
        '%c СЮРПРИЗ ',
        'color: white; background-color: #2274A5; font-size: 32px;',
        'секретное слово'
      );
    }
  }, [formSent]);

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
    const { name, email, skype } = form;
    const { id: meetupID } = event;
    e.preventDefault();
    const formData = new FormData();
    formData.set('name', name);
    formData.set('email', email);
    formData.set('skype', skype);
    formData.set('meetupID', meetupID);
    fetch('/api/register', { method: 'POST', body: formData }).then(() => {
      setIsOpen(false);
      setFormSent(true);
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

  const renderButton = () => {
    if (formSent)
      return (
        <>
          Вы успешно записались,
          <br />
          не забудь заглянуть в консоль,
          <br />
          там подарок. 😉
        </>
      );

    return (
      <button type="button" className="btn btn-primary" onClick={openModal}>
        Записаться
      </button>
    );
  };

  return (
    <>
      <div className="timetable-event" key={event.id}>
        <div className="header">
          <p className="time">{renderTime()}</p>
          <div className="person">
            <p className="name">{event.speaker}</p>
            <p className="department">{event.department}</p>
          </div>
        </div>
        <p className="title">{event.label}</p>
        {renderButton()}
        {renderIllustration()}
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
          <h1>{event.label}</h1>
          <time>{renderFullDate()}</time>
        </div>
        <div className="form">
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
            <div className="mb-3">
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
