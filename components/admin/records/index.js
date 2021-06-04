import React, { useEffect, useState } from 'react';
import classes from './style.module.scss';

function AdminRecords() {
  const [records, setRecords] = useState([]);
  const [filter, setFilter] = useState(undefined);

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

  const filterContent = ({ target }) => {
    const rawData = target.getAttribute('data-rawData');
    const col = target.getAttribute('data-col');
    setFilter({ [col]: rawData });
  };

  const renderRecords = () =>
    Object.values(records)
      .filter((record) => {
        if (filter === undefined) return true;
        const [[key, value]] = Object.entries(filter);
        return record[key].toString() === value;
      })
      .map((record) => {
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
            <th
              scope="row"
              className={classes.cell}
              data-col={'recordDatetime'}
              data-rawData={recordDatetime}
              onClick={filterContent}
            >
              {new Date(recordDatetime).toLocaleDateString()}
            </th>
            <td
              className={classes.cell}
              data-col={'recordName'}
              data-rawData={recordName}
              onClick={filterContent}
            >
              {recordName}
            </td>
            <td
              className={classes.cell}
              data-col={'recordSkype'}
              data-rawData={recordSkype}
              onClick={filterContent}
            >
              {recordSkype}
            </td>
            <td
              className={classes.cell}
              data-col={'recordEmail'}
              data-rawData={recordEmail}
              onClick={filterContent}
            >
              {recordEmail}
            </td>
            <td
              className={classes.cell}
              data-col={'meetupLabel'}
              data-rawData={meetupLabel}
              onClick={filterContent}
            >
              {meetupLabel}
            </td>
            <td
              className={classes.cell}
              data-col={'meetupSpeaker'}
              data-rawData={meetupSpeaker}
              onClick={filterContent}
            >
              {meetupSpeaker}
            </td>
            <td
              className={classes.cell}
              data-col={'meetupDatetime'}
              data-rawData={meetupDatetime}
              onClick={filterContent}
            >
              {new Date(meetupDatetime).toLocaleDateString()}
            </td>
            <td
              className={classes.cell}
              data-col={'meetupActiveStatus'}
              data-rawData={meetupActiveStatus}
              onClick={filterContent}
            >
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

  const renderClearFilter = () => {
    if (filter === undefined) return null;

    return (
      <button
        type={'button'}
        className={'btn btn-danger btn-sm mb-3'}
        onClick={() => {
          setFilter(undefined);
        }}
      >
        Очистить фильтр
      </button>
    );
  };

  return (
    <>
      <h1 className="title mb-5">
        Участники
        {renderClearFilter()}
      </h1>

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
