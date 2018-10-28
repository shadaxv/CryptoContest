const RestClient = require("deribit-api").RestClient;
const ApiKeys = require('./apiKeys.js');
const GetDate = require('./getDate.js');
const api = new ApiKeys();
const date = new GetDate();

class getUsersData {
  constructor() {
    this.users = {};
  }

  async getData() {
    const self = this;
    this.users['Date and time'] = date.now;

    for (let key of api.keys) {
      const restClient = new RestClient(key.id, key.secret);
      await restClient.account().then((result) => {
        // console.log('');
        // console.log('           Name: ', key.name);
        // console.log('        Balance: ', result.result.balance);
        // console.log('      PnL [BTC]: ', result.result.PNL);
        // console.log('        PnL [%]: ', (result.result.balance - result.result.PNL) / result.result.PNL * 100 || 0, '%');
        // console.log('Deposit address: ', result.result.depositAddress);
        // console.log('  Date and time: ', date.now);
        // console.log('');
        // console.log('------------------------------');
        const name = key.name;
        self.users[name] = {
          'Balance': result.result.balance,
          'PnL [BTC]': result.result.PNL,
          'PnL [%]': result.result.balance / result.result.PNL * 100 || 0 + '%',
          'Deposit address': result.result.depositAddress,
          'Date and time': date.now
        };
      })
    }

    return this.users;
  }
}

module.exports = getUsersData;
