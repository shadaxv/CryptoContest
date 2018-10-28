const GetUsersData = require('./getUsersData.js');
const File = require('./file.js');

const user = new GetUsersData();
const file = new File();

class index {
  constructor() {
    this.freshData = {};
    this.filenames = [];
    this.filesForResult = [];
    this.filesContent = {};
    this.result = [];
  }

  async getUsersData() {
    const self = this;

    try {
      self.freshData = await user.getData();
      this.saveUsersData();
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  async saveUsersData() {
    const self = this;

    try {
      await file.save(self.freshData);
      this.loadFileNames();
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  async loadFileNames() {
    const self = this;

    try {
      self.filenames = await file.loadFileNames();
      self.filenames.sort();
      self.getFilesContent();
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  async getFilesContent() {
    const self = this;

    this.filesForResult = this.filenames;
    if (this.filesForResult.length > 2) {
      this.filesForResult.splice(1, this.filenames.length - 2);
    }
    try {
      self.filesContent = await file.loadFiles(this.filesForResult);
      self.generateResults();
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  async generateResults() {
    const self = this;
    const fullTable = [];
    const resultTable = [];
    try {
      for (let table of self.filesContent) {
        table = JSON.parse(table);
        delete table['Date and time'];
        fullTable.push(table);
      }
      if (fullTable.length > 1) {
        for (let user in fullTable[0]) {
          const userResult = {
            'Name': user,
            'PnL': fullTable[1][user]['PnL [%]'] - fullTable[0][user]['PnL [%]'] || 0,
            'Starting balance': fullTable[0][user].Balance,
            'Ending balance': fullTable[1][user].Balance
          }
          await resultTable.push(userResult);
        }
        resultTable.sort((a, b) => (a.PnL > b.PnL) ? -1 : ((b.PnL > a.PnL) ? 1 : 0));
        self.result = resultTable;
      } else {
        self.result = "Need more data for calculate";
      }
      self.displayResults();
    } catch (error) {
      console.log(`Error: ${error}`);
    }


  }

  async displayResults() {
    console.log(this.result)
    await console.log("Work Done!");
  }
}

const main = new index();
main.getUsersData();

module.exports = index;
