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

  const { recordID } = fields;
  console.log(recordID);
  const recorder = await Recorder.getRecorder();
  await recorder.toggleHandledStatus(recordID);

  res.status(200).json({ status: 'ok' });
};

export const config = {
  api: {
    bodyParser: false,
  },
};
