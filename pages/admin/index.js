import React, { useState } from 'react';
import classnames from 'classnames';
import AdminEvents from './events';
import AdminRecords from './records';

function Admin() {
  const [currentPage, setCurrentPage] = useState('records');

  const renderContent = () => {
    if (currentPage === 'records') return <AdminRecords />;
    if (currentPage === 'events') return <AdminEvents />;
    return null;
  };

  return (
    <div
      id="admin"
      className={classnames('admin basicPage', {
        'admin-records': currentPage === 'records',
        'admin-events': currentPage === 'events',
      })}
    >
      <div className="container">
        <ul className="miniMenu">
          <li>
            <a href="#" onClick={() => setCurrentPage('records')}>
              Участники
            </a>
          </li>
          <li>
            <a href="#" onClick={() => setCurrentPage('events')}>
              События
            </a>
          </li>
        </ul>
        {renderContent()}
      </div>
    </div>
  );
}

export default Admin;
