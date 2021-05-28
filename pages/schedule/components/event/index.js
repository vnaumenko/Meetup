function Event({ event }) {
  return <div className={'timetable-event'} key={event.id}>
    <p className={'type'}>{event.type}</p>
    <p className={'title'}>{event.title}</p>
    <p className={'name'}>{event.speaker.name}</p>
    <div className={'info'}>
      <div className={'photo'}>
        <img src={event.speaker.photo} alt={event.speaker.name}/>
      </div>
      <div className="desc">
        <p>{event.description}</p>
        <button className={'btn btn-primary'}>Записаться</button>
      </div>
    </div>
  </div>
}

export default Event;