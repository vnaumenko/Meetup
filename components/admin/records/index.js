import React, { useEffect, useState } from 'react';
import classes from './style.module.scss';

function AdminRecords() {
  const [records, setRecords] = useState([]);

  const fetchRecords = () => {
    fetch('/api/getRecords').then(async (res) => {
      const { records: backendRecords } = await res.json();
      setRecords(backendRecords);
    });
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const onButtonClick = (id) => {
    const formData = new FormData();
    formData.set('recordID', id);
    fetch('/api/toggleRecord', { method: 'POST', body: formData }).then(() => {
      fetchRecords();
    });
  };

  const copyContent = ({ target }) => {
    const tempInput = document.createElement('input');
    document.body.appendChild(tempInput);
    tempInput.value = target.textContent;
    tempInput.select();
    document.execCommand('copy', false);
    tempInput.remove();
  };

  const renderRecords = () =>
    Object.values(records).map((record) => {
      const {
        id,
        isHandled,
        recordDatetime,
        recordEmail,
        recordName,
        recordSkype,
        meetupDatetime,
        meetupSpeaker,
        meetupLabel,
        meetupActiveStatus,
      } = record;

      const rowClass = meetupActiveStatus ? 'table-light' : 'table-danger';

      return (
        <tr
          key={id}
          className={rowClass}
          style={{ opacity: isHandled ? 0.3 : 1, verticalAlign: 'middle', color: 'black' }}
        >
          <th scope="row" className={classes.cell} onClick={copyContent}>
            {new Date(recordDatetime).toLocaleDateString()}
          </th>
          <td className={classes.cell} onClick={copyContent}>
            {recordName}
          </td>
          <td className={classes.cell} onClick={copyContent}>
            {recordSkype}
          </td>
          <td className={classes.cell} onClick={copyContent}>
            {recordEmail}
          </td>
          <td className={classes.cell} onClick={copyContent}>
            {meetupLabel}
          </td>
          <td className={classes.cell} onClick={copyContent}>
            {meetupSpeaker}
          </td>
          <td className={classes.cell} onClick={copyContent}>
            {new Date(meetupDatetime).toLocaleDateString()}
          </td>
          <td className={classes.cell} onClick={copyContent}>
            {meetupActiveStatus ? 'Митап активен' : 'Митап удалён'}
          </td>
          <td>
            <button
              type="button"
              className="btn btn-light"
              onClick={() => {
                onButtonClick(id);
              }}
            >
              {isHandled ? '❌' : '✔️'}
            </button>
          </td>
        </tr>
      );
    });

  return (
    <>
      <h1 className="title mb-5">Участники</h1>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-dark">
            <tr>
              <th scope="col">Дата записи</th>
              <th scope="col">Слушатель</th>
              <th scope="col">Скайп</th>
              <th scope="col">Почта</th>
              <th scope="col">Название митапа</th>
              <th scope="col">Спикер</th>
              <th scope="col">Дата митапа</th>
              <th scope="col">Статус митапа</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>{renderRecords()}</tbody>
        </table>
      </div>
    </>
  );
}

export default AdminRecords;
