import { useEffect, useState } from 'react';

export const Records = () => {
  const [toggledRecords, setToggledRecords] = useState(0);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetch('/api/getRecords').then(async (res) => {
      const { records: backendRecords } = await res.json();
      setRecords(backendRecords);
    });
  }, [toggledRecords]);

  const onButtonClick = (id) => {
    const formData = new FormData();
    formData.set('recordID', id);
    fetch('/api/toggleRecord', { method: 'POST', body: formData }).then(() => {
      setToggledRecords((prevState) => prevState + 1);
    });
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
      } = record;
      return (
        <tr key={id}>
          <th scope="row">{new Date(recordDatetime).toLocaleDateString()}</th>
          <td>{recordName}</td>
          <td>{recordSkype}</td>
          <td>{recordEmail}</td>
          <td>{meetupLabel}</td>
          <td>{meetupSpeaker}</td>
          <td>{new Date(meetupDatetime).toLocaleDateString()}</td>
          <td>
            <button
              type="button"
              onClick={() => {
                onButtonClick(id);
              }}
            >
              123
            </button>
          </td>
        </tr>
      );
    });

  return (
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
          <th scope="col">Галка</th>
        </tr>
      </thead>
      <tbody>{renderRecords()}</tbody>
    </table>
  );
};
