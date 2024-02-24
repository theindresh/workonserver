const { execute } = require("../database/queryExecute");
const diffapi = {
    getStudentNameById: async(req, res) =>{

        let studentId = req.params.xnt
      
        let query = `select * from studentdata where id = ${studentId}`;
        const result = await execute(query, []);
      
        if (result.length > 0) {
          let schoolid = result[0].schoolid
          let schoolQuery = `select * from schooldata where id = ${schoolid} `
          const result1 = await execute(schoolQuery, []);
          let response = {}
          response.msg = `Student with id ${studentId} read in ${result1[0].schoolname}`
          return res.status(200).send(response);
        } else {
          let response = {}
          response.msg = `Student ${studentId} does not exist`
          return res.status(200).send(response);
        }
      },
      
      getCountOfStudent: async(req, res)=> {
        let schoolId = req.params.id
        let query = `select count(id)
       as totalStudent from studentdata where schoolid = 1`;
        const result1 = await execute(query, []);
        if (result1.length > 0) {
          let response = {}
          response.msg = `School with schoolId ${schoolId} read in ${result1[0].totalStudent}`
          return res.status(200).send(response);
        } else {
          let response = {}
          response.msg = `no student`
          return res.status(200).send(response);
        }
      },
}

module.exports = {diffapi}