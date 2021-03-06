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

  async save(data, fileName) {

    await writeFile(`${this.path}${fileName}.json`, JSON.stringify(data), {
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
      if (fileName.includes('result')) {
        self.files.push(fileName);
      }
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
