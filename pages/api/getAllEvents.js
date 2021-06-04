import Eventer from '../../lib/Eventer';

export default async (req, res) => {
  const eventer = await Eventer.getEventer();
  const events = eventer.getAllEvents();

  res.status(200).json({
    status: 'ok',
    events,
  });
};
