import Eventer from '../../lib/Eventer';

export default async (req, res) => {
  const eventer = await Eventer.getEventer();
  const events = eventer.getEvents();

  res.status(200).json({
    status: 'ok',
    events,
  });
};
