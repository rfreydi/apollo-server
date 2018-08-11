const fs = require('fs');
const Promise = require('promise');

/**
 * Class performing read in Promise
 */
class Reader {

  static directory (path) {
    return new Promise(function (resolve, reject) {
      fs.readdir(path, 'utf8', function (err, files) {
        if (err) {
          reject(err);
        }

        resolve(files);
      });
    });
  }

  static file (path) {
    return new Promise(function (resolve, reject) {
      fs.readFile(path, 'utf8', function (err, data) {
        if (err) {
          reject(err);
        }

        resolve(data);
      });
    });
  }
}

module.exports = Reader;
