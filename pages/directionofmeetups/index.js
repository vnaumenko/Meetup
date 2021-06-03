import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import AdminEvents from '../../components/admin/events';
import AdminRecords from '../../components/admin/records';
import { useRouter } from 'next/router';

function Admin() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState('records');

  const renderContent = () => {
    if (currentPage === 'records') return <AdminRecords />;
    if (currentPage === 'events') return <AdminEvents />;
    return null;
  };

  useEffect(() => {
    router.push('/promo');
  }, []);

  return null;

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
