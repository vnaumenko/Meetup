import { Records } from './components/Records';

function Admin() {
  return (
    <div id="admin" className="admin basicPage">
      <div className="container">
        <h1 className="title mb-5">Управление всем</h1>
        <Records />
      </div>
    </div>
  );
}

export default Admin;
