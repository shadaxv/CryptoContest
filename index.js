const GetUsersData = require('./getUsersData.js');
const File = require('./file.js');

const user = new GetUsersData();
const file = new File();

class index {
  constructor() {
    this.data = {}
  }

  async saveUsersData() {
    const self = this;

    await try {
      self.data = user.getData();
      console.log(self.data);
    } catch (error) {
      console.log(`message = ${error}`);
    }

    file.save(this.data);
  }
}

const main = new index();
main.saveUsersData();

module.exports = index;
