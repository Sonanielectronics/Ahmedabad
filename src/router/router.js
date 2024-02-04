var express = require("express");
const router = express.Router();

var { class1 } = require('../controller/controller');

router.get("/CustomerRegistration", class1.a);
router.get("/AdminRegistration", class1.b);
router.post("/CustomerRegistration", class1.c);
router.post("/AdminRegistration", class1.d);
router.get("/Login", class1.e);
router.post("/Login", class1.f);
router.get("/DashBoard", class1.g);
router.get("/Otp", class1.h);
router.post("/Otp", class1.i);

module.exports = router;