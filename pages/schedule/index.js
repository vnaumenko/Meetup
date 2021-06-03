import React, { useEffect } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import Eventer from '../../lib/Eventer';
import ScheduleIcon from '../../public/schedule.svg';
import Event from './components/event';
import { useRouter } from 'next/router';

function Schedule(props) {
  const router = useRouter();
  const { events } = props;

  const renderTimetable = () => {
    const dateSet = new Map();

    Object.values(events)
      .sort((a, b) => a.datetime - b.datetime)
      .forEach((event) => {
        const formatDate = format(event.datetime, 'd MMMM, EEEE', { locale: ru });
        if (dateSet.has(formatDate)) {
          const oldDate = dateSet.get(formatDate);
          dateSet.set(formatDate, [...oldDate, event.datetime]);
        } else {
          dateSet.set(formatDate, [event.datetime]);
        }
      });

    const renderDays = () => {
      const renderedDays = [];

      for (const formatDate of dateSet.keys()) {
        renderedDays.push(
          <div className="timetable-day" key={formatDate}>
            <p className="timetable-day_title">{formatDate}</p>
            <div className="row">{renderEvents(formatDate)}</div>
          </div>
        );
      }

      return renderedDays;
    };

    const renderEvents = (formatDate) =>
      dateSet
        .get(formatDate)
        .sort((a, b) => a.datetime - b.datetime)
        .map((timestamp) =>
          Object.values(events)
            .filter((event) => event.datetime === timestamp)
            .map((event) => {
              const { id } = event;
              return (
                <div className="col-12 col-lg-6 mb-4" key={id}>
                  <Event event={event} key={id} />
                </div>
              );
            })
        );

    return <div className="timetable">{renderDays()}</div>;
  };

  useEffect(() => {
    router.push('/promo');
  }, []);

  return (
    <div id="schedule" className="schedule basicPage">
      {/*<div className="container">*/}
      {/*  <ul className="miniMenu">*/}
      {/*    <li>*/}
      {/*      <Link href="/">Вернуться на главную</Link>*/}
      {/*    </li>*/}
      {/*    <li>*/}
      {/*      <Link href="/faq">FAQ</Link>*/}
      {/*    </li>*/}
      {/*  </ul>*/}
      {/*  <h1 className="title">Расписание</h1>*/}
      {/*  <p className="subtitle-text">*/}
      {/*    Товарищи! консультация с широким активом влечет за собой процесс внедрения и модернизации*/}
      {/*    существенных финансовых и административных условий. Не следует, однако забывать, что*/}
      {/*    дальнейшее развитие различных форм деятельности требуют от нас анализа позиций, занимаемых*/}
      {/*    участниками в отношении поставленных задач. Не следует, однако забывать, что сложившаяся*/}
      {/*    структура организации обеспечивает широкому кругу (специалистов) участие в формировании*/}
      {/*    дальнейших направлений развития.*/}
      {/*  </p>*/}
      {/*  {renderTimetable()}*/}
      {/*  <ScheduleIcon className="illustration" />*/}
      {/*</div>*/}
    </div>
  );
}

export async function getStaticProps() {
  const eventer = await Eventer.getEventer();
  const events = eventer.getEvents();
  return {
    props: {
      events,
    },
  };
}

export default Schedule;
