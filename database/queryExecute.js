const mysql = require("./dbConfig");
const execute = function (query, bindValuesArray) {
  return new Promise((resolve, reject) => {
    mysql.pool.getConnection((err, connection) => {
      if (err) {
        console.log(err);
      }

      if (connection) {
        connection.query(query, bindValuesArray, function (error, resultData) {
          if (error) {
            console.log(error);
          }
          if (resultData) {
            resolve(resultData);
          }
        });
        connection.release();
      }
    });
  });
};

module.exports = { execute };
