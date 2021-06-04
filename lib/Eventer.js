import { v4 } from 'uuid';

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

  async writeEvents() {
    await fsp.writeFile('meetups.json', JSON.stringify(this.events), 'utf-8');
  }

  async createEvent(eventInfo) {
    const id = v4();
    this.events[id] = { id, isActive: true, ...eventInfo };
    await this.writeEvents();
  }

  async editEvent(eventInfo) {
    const { id } = eventInfo;
    this.events[id] = { ...this.events[id], ...eventInfo };
    await this.writeEvents();
  }

  async toggleEventStatus(eventID) {
    this.events[eventID].isActive = !this.events[eventID].isActive;
    await this.writeEvents();
  }

  getAllEvents() {
    return this.events;
  }

  getEvents() {
    const events = {};
    const eventsIDs = Object.keys(this.events);
    eventsIDs.forEach((id) => {
      const candidateEvent = this.events[id];
      if (candidateEvent.isActive) events[id] = candidateEvent;
    });
    return events;
  }
}

export default Eventer;
