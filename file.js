const fs = require('fs');

async function saveResult() {
  try {
    const data = await asyncAction();
    console.log(`message = ${data}`);
  } catch (error) {
    console.log(`message = ${error}`);
  }
}

saveResult();

class file {
  constructor() {
  }

  save(data) {
    const timestamp = data['Date and time'].split(' ').join('').split(':').join('').split('/').join('');
    console.log(timestamp);
    fs.writeFile(`./results/result-${timestamp}.json`, JSON.stringify(data), function(err) {
      if (err) {
        return console.log(err);
      }

      console.log("The file was saved!");
    });
  }

  load() {

  }
}

module.exports = file;
