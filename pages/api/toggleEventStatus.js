const Formidable = require('formidable');
import Eventer from '../../lib/Eventer';

export default async (req, res) => {
  const { fields } = await new Promise((resolve, reject) => {
    const form = new Formidable();

    form.parse(req, (err, fields, files) => {
      if (err) reject({ err });
      resolve({ err, fields, files });
    });
  });

  const { id } = fields;

  const eventer = await Eventer.getEventer();
  await eventer.toggleEventStatus(id);

  res.status(200).json({ status: 'ok' });
};
export const config = {
  api: {
    bodyParser: false,
  },
};
