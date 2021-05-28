import Link from "next/link";
import ScheduleIcon from '../../public/schedule.svg';
import Event from "./components/event";

function Schedule() {
  const events = [
    {
      id: 1,
      type: 'lifestyle',
      title: 'Как варить пельмени?',
      description: 'Товарищи! консультация с широким активом влечет за собой процесс внедрения и модернизации существенных финансовых и административных условий.',
      speaker: {
        photo: 'https://placekitten.com/100/100',
        name: 'Дмитрий Дмитриев',
      }
    },
    {
      id: 2,
      type: 'lifestyle',
      title: 'Как варить манты?',
      description: 'Товарищи! консультация с широким активом влечет за собой процесс внедрения и модернизации существенных финансовых и административных условий.',
      speaker: {
        photo: 'https://placekitten.com/100/100',
        name: 'Дмитрий Дмитриев',
      }
    },
  ];

  const renderTimetable = () => {

    const renderEvents = () => events.map((event) => {
      return <div className="col-12 col-lg-6">
        <Event event={event} />
      </div>
    });

    return <div className="timetable">
      <div className="timetable-day">
        <p className="timetable-day_title">6 июня, среда</p>
        <div className={'row'}>
          {renderEvents()}
        </div>
      </div>
    </div>
  }

  return (
    <div id={'schedule'} className={'schedule'}>
      <div className="container">
        <ul className={'minimenu'}>
          <li>
            <Link href={"/"}>Вернуться на главную</Link>
          </li>
          <li>
            <Link href={"/faq"}>FAQ</Link>
          </li>
        </ul>
        <h1 className={'title'}>
          Расписание
        </h1>
        <p className={'subtitle-text'}>Товарищи! консультация с широким активом влечет за собой процесс внедрения и
          модернизации существенных финансовых и административных условий. Не следует, однако забывать, что дальнейшее
          развитие различных форм деятельности требуют от нас анализа позиций, занимаемых участниками в отношении
          поставленных задач. Не следует, однако забывать, что сложившаяся структура организации обеспечивает широкому
          кругу (специалистов) участие в формировании дальнейших направлений развития.</p>
        {renderTimetable()}
        <ScheduleIcon className={'illustration'}/>
      </div>
    </div>
  )
}

export default Schedule
