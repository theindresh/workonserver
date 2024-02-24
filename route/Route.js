const express = require("express");
const router = express();
const { apiController } = require("../controller/UserControl");
const {authController} = require("../controller/AdminControl")

router.post("/schooldata", apiController.scData);
router.post("/studentdata", apiController.stData);
router.get("/schooldata", apiController.getDataSchool);
router.get("/studentdata", apiController.getDataStudent);
router.get("/result/:Fname", apiController.featchData);
router.get("/resultprint", apiController.PrintData);
router.get("/getuserdata", authController.getData);
router.post("/signup", authController.signUp);
router.get("/login", authController.login);

// router.get("/result", apiController.login);

module.exports = router;
