import {Records} from "./components/Records";

function Admin() {
  return (
    <div id={'faq'} className={'faq'}>
      <div className="container">
        <h1 className={'title'}>Управление всем</h1>
      </div>
      <Records/>
    </div>
  );
}

export default Admin;
