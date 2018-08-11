const fs = require('fs');
const Promise = require('promise');

/**
 * Class performing write in Promise
 */
class Writer {

  static file (path, data) {
    return new Promise(function (resolve, reject) {
      fs.writeFile(path, data, 'utf8', function (err) {
        if (err) {
          reject(err);
        }

        resolve(data);
      });
    });
  }

}

module.exports = Writer;
