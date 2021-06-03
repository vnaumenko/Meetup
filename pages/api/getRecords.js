import Recorder from '../../lib/Recorder';
import Eventer from '../../lib/Eventer';

export default async (req, res) => {
  const recorder = await Recorder.getRecorder();
  const records = recorder.getRecords();

  const eventer = await Eventer.getEventer();
  const events = eventer.getEvents();

  const extendedRecords = {};
  Object.keys(records).forEach((recordKey) => {
    const { meetupID, ...restRecord } = records[recordKey];
    const {
      datetime: meetupDatetime,
      speaker: meetupSpeaker,
      label: meetupLabel,
    } = events[meetupID];

    extendedRecords[recordKey] = {
      ...restRecord,
      meetupDatetime,
      meetupSpeaker,
      meetupLabel,
    };
  });

  res.status(200).json({
    status: 'ok',
    records: extendedRecords,
  });
};
