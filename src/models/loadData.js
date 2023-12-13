const fs = require("fs").promises;
const { parse } = require("csv-parse");

// module.exports = {
function loadData() {
  return new Promise((resolve, reject) => {
    try {
      let data = [];

      /**
       * columns: true, //use for convert columns to json format.
       * ltrim: true, //use to trim the whitespace from data.
       * from_line: 2 // use to start read at line
       **/
      fs.createReadStream("./src/model/data_log.csv").pipe(
        parse({ delimiter: ",", columns: true, ltrim: true })
          .on("data", (row) => {
            data.push(row);
          })
          .on("error", (err) => {
            throw err;
          })
          .on("end", () => resolve(data))
      );

      // resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = loadData;
