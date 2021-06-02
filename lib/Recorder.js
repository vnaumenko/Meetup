import fs from 'fs/promises'
import { v4 } from 'uuid'

class Recorder {
  static instance;
  static async getRecorder() {
    if (!Recorder.instance) {
      Recorder.instance = new Recorder();
      await Recorder.instance.fetchRecords();
      return Recorder.instance;
    }
    return Recorder.instance
  }

  async fetchRecords() {
    const text = await fs.readFile('records', 'utf-8')
    if (text) {
      this.records = JSON.parse(text);
    } else {
      this.records = {};
    }
  }

  async writeRecords() {
    await fs.writeFile('records', JSON.stringify(this.records), 'utf-8')
  }

  async addRecord(record) {
    const id = v4();
    this.records[id] = { id, ...record };
    await this.writeRecords();
  }

  getRecords() {
    return this.records;
  }

  async toggleHandledStatus(recordID) {
    this.records[recordID].isHandled = !this.records[recordID].isHandled
    await this.writeRecords();
  }
}

export default Recorder
