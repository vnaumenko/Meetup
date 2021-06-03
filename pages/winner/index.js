import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';

function Winner() {
  const [isWinner, setWinner] = useState(false);

  useEffect(() => {
    window.IAmWinner = (secret) => {
      if (secret === 'secret') {
        setWinner(true);
      }
    };
  }, []);

  if (!isWinner) return null;

  return (
    <>
      <Head>
        <title>УРА, ТЫ ПОБЕДИЛ</title>
      </Head>
      <div id="winner" className="winner basicPage">
        <div className="container">
          <ul className="miniMenu">
            <li>
              <Link href="/">Вернуться на главную</Link>
            </li>
          </ul>
          <h1 className="title">Вы победили!</h1>
          <p>Ваш приз: {'{podarok}'}</p>
        </div>
      </div>
    </>
  );
}

export default Winner;
