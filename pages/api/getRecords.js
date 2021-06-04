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

    const eventInfo = events[meetupID];
    if (eventInfo !== undefined) {
      const {
        datetime: meetupDatetime,
        speaker: meetupSpeaker,
        label: meetupLabel,
        isActive: meetupActiveStatus,
      } = events[meetupID];

      extendedRecords[recordKey] = {
        ...restRecord,
        meetupDatetime,
        meetupSpeaker,
        meetupLabel,
        meetupActiveStatus,
      };
    }
  });

  res.status(200).json({
    status: 'ok',
    records: extendedRecords,
  });
};
