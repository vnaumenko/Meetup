const Formidable = require('formidable');
import Recorder from "../../lib/Recorder";


export default async (req, res) => {
  const { fields } = await new Promise((resolve, reject) => {
    const form = new Formidable()

    form.parse(req, (err, fields, files) => {
      if (err) reject({ err })
      resolve({ err, fields, files })
    })
  })

  const recorder = await Recorder.getRecorder();
  await recorder.addRecord(fields)

  res.status(200).json({
    status: 'ok',
    fields
  })
}
export const config = {
  api: {
    bodyParser: false
  }
}

