const fsp = require('fs').promises;

class Eventer {
  static instance;
  static async getEventer() {
    if (!Eventer.instance) {
      Eventer.instance = new Eventer();
      await Eventer.instance.fetchEvents();
      return Eventer.instance;
    }
    return Eventer.instance;
  }

  async fetchEvents() {
    const text = await fsp.readFile('meetups.json', 'utf-8');
    if (text) {
      this.events = JSON.parse(text);
    } else {
      this.events = {};
    }
  }

  async addEvents(info) {
    this.events.push(info);
    await fsp.writeFile('meetups.json', JSON.stringify(this.events), 'utf-8');
  }

  getEvents() {
    return this.events;
  }
}

export default Eventer;
