import fs from 'fs/promises'

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
      this.records = JSON.parse(text)
    } else {
      this.records = [];
    }
  }

  async addRecord(info) {
    this.records.push(info);
    await fs.writeFile('records', JSON.stringify(this.records), 'utf-8')
  }

  getRecords() {
    return this.records;
  }
}

export default Recorder
