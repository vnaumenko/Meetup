import fs from 'fs/promises'

class Eventer {
  static instance;
  static async getEventer() {
    if (!Eventer.instance) {
      Eventer.instance = new Eventer();
      await Eventer.instance.fetchRecords();
      return Eventer.instance;
    }
    return Eventer.instance
  }

  async fetchRecords() {
    const text = await fs.readFile('meetups', 'utf-8')
    if (text) {
      this.records = JSON.parse(text)
    } else {
      this.records = {};
    }
  }

  async addRecord(info) {
    this.records.push(info);
    await fs.writeFile('meetups', JSON.stringify(this.records), 'utf-8')
  }

  getRecords() {
    return this.records;
  }
}

export default Eventer
