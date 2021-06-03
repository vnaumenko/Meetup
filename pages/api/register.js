const Formidable = require('formidable');
import Recorder from '../../lib/Recorder';

export default async (req, res) => {
  const { fields } = await new Promise((resolve, reject) => {
    const form = new Formidable();

    form.parse(req, (err, fields, files) => {
      if (err) reject({ err });
      resolve({ err, fields, files });
    });
  });

  const { email: recordEmail, name: recordName, skype: recordSkype, meetupID } = fields;
  const record = {
    isHandled: false,
    recordDatetime: new Date().getTime(),
    recordEmail,
    recordName,
    recordSkype,
    meetupID,
  };
  const recorder = await Recorder.getRecorder();
  await recorder.addRecord(record);

  res.status(200).json({ status: 'ok' });
};
export const config = {
  api: {
    bodyParser: false,
  },
};
