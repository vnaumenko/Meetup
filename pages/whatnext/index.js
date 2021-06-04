import React from 'react';
import Head from 'next/head';

function Winner() {
  return (
    <>
      <Head>
        <title>Что дальше?</title>
      </Head>
      <div id="whatnext" className="whatnext">
        <div>
          Легенды не врали.
          <br />
          Вы избранный и нашли путь к источнику Знаний!
          <br />
          <br />
          Ждите следующих подсказок, они найдут вас
        </div>
      </div>
    </>
  );
}

export default Winner;
