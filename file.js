const fs = require('fs');
const {
  promisify
} = require('util');
const readDir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

class file {
  constructor() {
    this.path = "./results/";
    this.files = [];
    this.filesContent = [];
  }

  async save(data) {
    const timestamp = data['Date and time'].split(' ').join('').split(':').join('').split('/').join('');

    await writeFile(`${this.path}result-${timestamp}.json`, JSON.stringify(data), {
      encoding: 'utf8'
    });

    return true;
  }


  async loadFileNames() {
    const self = this;

    const fileNames = await readDir(`${this.path}`, {
      encoding: 'utf8'
    });
    fileNames.forEach(fileName => {
      self.files.push(fileName);
    });

    return this.files;
  }

  async loadFiles(fileNames) {
    const self = this;
    const files = [];

    for (let fileName of fileNames) {
      const result = await readFile(`${this.path}${fileName}`, {
        encoding: 'utf8'
      });
      self.filesContent.push(result);
    }

    return this.filesContent;
  }
}

module.exports = file;
