const { execute } = require("../database/queryExecute");
const authController = {
  getData: async (req, res) => {
    try {
      const results = await execute(`SELECT * FROM users`);
      res.json(results);
    } catch (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
//   getData: async (req, res) => {
//     try {
//         const results = await execute(`SELECT * FROM users`);
//         res.json(results);
//     } catch (err) {
//         console.error("Error executing query:", err);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// },


  // send the multiple data from the signup
  signUp: async (req, res) => {
    try {
      // console.log(req.body);
      const userData = req.body;
      const results = await Promise.all(
        userData.map(async (user) => {
          return await execute(
            `INSERT INTO users (fname, lname, email, username, password) VALUES (?, ?, ?, ?, ?)`,
            [user.fname, user.lname, user.email, user.username, user.password]
          );
        })
      );

      res.status(200).send(results);
    } catch (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Internal Server Error");
    }
  },

    // login api
    login: async (req, res) => {
    try {
      const { username, password } = req.body;
      let result = '';
      // console.log(req.body);
      if (!username || !password) {
        return res.json(` ${username} ? password : usrname can  not be null `);
      }else{
        result =await execute(`SELECT * FROM users WHERE username = ? limit 1`,
        [username]) 
      }
      if(result.length == 0){
        return res.json(`username dose not exist`);
      }
      if (result[0].password != password) {
        res.status(401).send("Invalid password");
        return;
      }
      return res.  status(200).send("Login successful");
      // console.log("Login success");
    } catch (err) {
      console.log("internal error");
    }
  },

  // send one data at the one time 2nd approch
  // signUp: async (req, res) => {
  //   try {
  //     // let body =

  //     console.log(req.body);

  //     const results = await execute(
  //       `INSERT INTO signup (fname, lname, email, username, password) VALUES (?, ?, ?, ?, ?)`,
  //       [
  //         req.body.fname,
  //         req.body.lname,
  //         req.body.email,
  //         req.body.username,
  //         req.body.password,
  //       ]
  //     );
  //     // res.json(results);
  //     res.status(200).send(results);
  //     // console.log("success");
  //   } catch (err) {
  //     console.error("Error executing query:", err);
  //     res.status(500).send("Internal Server Error");
  //   }
  // },



};

module.exports = { authController };


