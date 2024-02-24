const { execute } = require("../database/queryExecute");
const apiController = {
  // done post data
  scData: async (req, res) => {
    try {
      console.log(req.body);
      const results = await execute(
        `INSERT INTO school (SchoolName) VALUES (?)`,
        [req.body.SchoolName]
      );
      res.status(200).send(results);
    } catch (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Internal Server Error");
    }
  },
  // data send from the body side
  // done post data
  stData: async (req, res) => {
    try {
      console.log(req.body);
      const results = await execute(
        `INSERT INTO student (Fname,SchoolId) VALUES (?,?)`,
        [req.body.Fname, req.body.SchoolId]
      );
      res.status(200).send(results);
    } catch (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Internal Server Error");
    }
  },
  // done get data
  getDataStudent: async (req, res) => {
    try {
      const results = await execute(`SELECT * FROM students`);
      res.json(results);
    } catch (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  // done get data
  getDataSchool: async (req, res) => {
    try {
      const results = await execute(`SELECT * FROM school`);
      res.json(results);
    } catch (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  featchData: async (req, res) => {
    try {
      const { Fname } = req.params;
      if (!Fname) {
        res.status(400).send("Fname is required");
        return;
      }
      const results = await execute(
        `SELECT school.* FROM students
         JOIN school ON students.SchoolId = school.id
         WHERE students.id = ?`,
        [Fname]
      );
      res.status(200).json(results);
    } catch (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  PrintData: async (req, res) => {
    try {
      const { schoolId } = req.body;
      if (!schoolId) {
        res.status(400).send("schoolId is required");
        return;
      }
      if (schoolId) {
        const schoolResults = await execute(
          `SELECT COUNT(students.id) AS totalStudents FROM students
           WHERE students.SchoolId = ?`,
          [schoolId]
        );
        const totalStudents = schoolResults[0].totalStudents;
        res
          .status(200)
          .send(
            `There are ${totalStudents} students in this schoolId ${schoolId}`
          );
        return;
      }
      // const results = await execute(
      //   `SELECT school.* FROM student
      //    JOIN school ON student.SchoolId = school.id
      //    WHERE student.Fname = ?`,
      //   [Fname]
      // );
      // res.status(200).json(results);
    } catch (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // testing
  // PrintData: async (req, res) => {
  //   try {
  //     const { schoolId } = req.body;
  //     // if (!schoolId) {
  //     //   res.status(400).send("schoolId is required");
  //     //   return;
  //     // }
  //     const Results = await execute(
  //       `select * from mydb.student where SchoolId = ?`,
  //       [schoolId]
  //     );
  //     console.log(Results);
  //     if (Results.length) {
  //       const allResult = `select * from student where SchoolId = ${Results[0].SchoolId}`;
  //       console.log(allResult);
  //       const result1 = await res.status(200).send(`hello`);
  //       return;
  //     }
  //   } catch (err) {
  //     console.error("Error executing query:", err);
  //     res.status(500).json({ error: "Internal Server Error" });
  //   }
  // },
  // PrintData: async (req, res) => {
  //   try {
  //     const { schoolId } = req.body;
  //     // if (!schoolId) {
  //     //   res.status(400).send("schoolId is required");
  //     //   return;
  //     // }
  //     const Results = await execute(
  //       `select * from mydb.student where SchoolId = ?`,
  //       [schoolId]
  //     );
  //     console.log(Results);
  //     if (Results.length) {
  //       const studentId = Results[0].StudentId; // Assuming there's a StudentId column
  //       if (schoolId === studentId) {
  //         console.log("hello it is done");
  //         return res
  //           .status(200)
  //           .send(`there are ${studentId} in this schoolId ${schoolId} `);
  //       } else {
  //         const allResult = `select * from student where SchoolId = ${Results[0].SchoolId}`;
  //         console.log(allResult);
  //         // You can remove the following line if it's not necessary
  //         const result1 = await res.status(200).send(`hello`);
  //         return;
  //       }
  //     }
  //   } catch (err) {
  //     console.error("Error executing query:", err);
  //     res.status(500).json({ error: "Internal Server Error" });
  //   }
  // },
};

module.exports = { apiController };

// all student total print
// featchData: async (req, res) => {
//   try {
//     const { Fname } = req.body;
//     if (!Fname) {
//       res.status(400).send("Fname is required");
//       return;
//     }
//     const results = await execute(
//       `SELECT school.* FROM student
//     `,
//       [Fname]
//     );
//     res.status(200).json(results);
//   } catch (err) {
//     console.error("Error executing query:", err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// },
// PrintData: async (req, res) => {
//   try {
//     const { Fname } = req.body;
//     if (!Fname) {
//       res.status(400).send("Fname is required");
//       return;
//     }
//     const results = await execute(
//       `SELECT school.* FROM student
//        JOIN school ON student.SchoolId = school.id
//        WHERE student.Fname = ?`,
//       [Fname]
//     );
//     res.status(200).json(results);
//   } catch (err) {
//     console.error("Error executing query:", err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// },
