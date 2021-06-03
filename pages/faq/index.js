import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import FaqIcon from '../../public/faq.svg';

function Faq() {
  const [showThanks, setShowThanks] = useState(false);

  const timeoutForConsole = () => {
    setTimeout(() => {
      console.clear();
      console.log(
        '%c СЮРПРИЗ ',
        'color: white; background-color: #2274A5; font-size: 32px;',
        'секретное слово'
      );
      setShowThanks(true);
    }, 5000);
  };

  useEffect(() => {
    timeoutForConsole();
  }, []);

  const renderThanks = () => {
    if (!showThanks) return null;

    return (
      <h4 className={'mt-5'}>
        Спасибо, что ознакомились.
        <br />
        Загляните в консоль, там ждет сюрприз.
      </h4>
    );
  };

  return (
    <div id="faq" className="faq basicPage">
      <div className="container">
        <ul className="miniMenu">
          <li>
            <Link href="/">Вернуться на главную</Link>
          </li>
          <li>
            <Link href="/schedule">Расписание</Link>
          </li>
        </ul>
        <h1 className="title">F.A.Q.</h1>
        <div className="questions-list">
          <div className="question">
            <h2>Что за Meetup?</h2>
            <p>
              Meetups – это встреча специалистов одной сферы для обмена опытом и знаниями,
              обсуждения актуальных тем и проблем в неформальной обстановке (не путать с тренингом /
              семинаром / курсом, где лектор активен, а слушатели пассивны).
            </p>
          </div>
          <div className="question">
            <h2>Формат мероприятия</h2>
            <p>
              Формат: короткие 1 - 1.5 часовые мероприятия, где самое важное – тема и интерес
              участников.
              <br />
              Важно! это онлайн звонок с видео трансляцией. Общаемся без галстуков, но с камерами.
              🙂
            </p>
          </div>
          <div className="question">
            <h2>Типы тем</h2>
            <p>
              Hard темы – узкоспециализированные актуальные для направлений разработки /
              автоматизации / аналитики / тестирования и поддержки.
              <br />
              Lifestyle темы – расширяющие кругозор, как правило, в формате «просто о сложном», либо
              помогающие улучшать свои soft-навыки.
            </p>
          </div>
          <div className="question">
            <h2>Как записаться?</h2>
            <p>
              Выбрать тему, оставить свое имя, почту и скайп.
              <br />
              Запись открыта на все митапы для всех желающих.
              <br />
              Но помните, не зарегистрировались – не попали в звонок.{' '}
              <span style={{ fontFamily: 'serif', whiteSpace: 'nowrap' }}>¯\_(ツ)_/¯</span>
            </p>
          </div>
          <div className="question">
            <p>
              <strong>Все встречи будут состоять из двух блоков:</strong>
              <ul>
                <li>вводная часть от ведущего: погружение в тему</li>
                <li>модерируемое обсуждение / идеи / предложения и вопросы</li>
              </ul>
            </p>
            <p className={'lead fw-bold'}>Ждем вас на LifeIT Meetups!</p>
            {renderThanks()}
          </div>
        </div>
        <FaqIcon className="illustration" />
      </div>
    </div>
  );
}

export default Faq;
