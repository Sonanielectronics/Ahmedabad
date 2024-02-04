// var Tutorial = require("../db/conn")

const HTTP = require("../../constant/response.constant");

require('dotenv').config();

// var Tutorial = require("../db/conn") Position 1 Now i Have define below it's means Position 1
var Tutorial = require("../db/conn")

var jwt = require("jsonwebtoken");
var path = require("path");
var bcrypt = require("bcryptjs");
var nodemailer = require('nodemailer');

// var Tutorial = require("../db/conn") // Position 2

const session = require("express-session");

// var Tutorial = require("../db/conn") // Position 3

var SECRET_KEY = process.env.SECRET_KEY || "YOURSECRETKEYGOESHERE";

// var Tutorial = require("../db/conn") // Position 4

function sendEmail(to, subject, text) {
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.user,
            pass: process.env.pass,
        },
    });
    const mailOptions = {
        from: "your@email.com",
        to: to,
        subject: subject,
        html: text,
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
}

function between(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

class class1 {

    static a = async (req, res) => {
        try {
            
            res.render("CustomerRegistration");

        } catch (e) {
            console.log(e);
            var a = { "message": `${err}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };

    static b = async (req, res) => {
        try {

            res.render("AdminRegistration");

        } catch (e) {
            console.log(e);
            var a = { "message": `${err}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };

    static c = async (req, res) => {
        try {

            Tutorial.findAndCountAll({ where: { Email: req.body.Email } }).then(async data => {

                if (data.rows.length == 0) {

                    if (req.body.FirstName && req.body.LastName && req.body.Email && req.body.Password) {

                        const hashedPassword = await bcrypt.hash(req.body.Password, 12);

                        var otp = await between(100000, 999999);
                        sendEmail(`${req.body.Email}`, "Email Verification", `${otp}`);

                        var sessionstore = req.session;
                        sessionstore.FirstName = req.body.FirstName;
                        sessionstore.LastName = req.body.LastName;
                        sessionstore.Email = req.body.Email;
                        sessionstore.Password = hashedPassword;
                        sessionstore.Role = "Customer";
                        sessionstore.otp = otp;
                        sessionstore.save();

                        var response = { "message": "Otp Send", "status": `${HTTP.SUCCESS}` }
                        res.status(HTTP.SUCCESS).json(response);

                    } else {

                        var response = { "message": "Does Not Send Otp Due to Insufficient Data", "status": `${HTTP.BAD_REQUEST}` }
                        res.status(HTTP.BAD_REQUEST).json(response);

                    }

                } else {

                    const response = { "message": "Does Not Send Otp Due to User Exist", "status": HTTP.UNAUTHORIZED };
                    res.status(HTTP.UNAUTHORIZED).json(response); // status code

                }

            })

        } catch (err) {
            console.log(err);
            var response = { "message": `${err}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(response);
        }
    };

    static d = async (req, res) => {
        try {

            Tutorial.findAndCountAll({ where: { Email: req.body.Email } }).then(async data => {

                if (data.rows.length == 0) {

                    if (req.body.FirstName && req.body.LastName && req.body.Email && req.body.Password) {

                        const hashedPassword = await bcrypt.hash(req.body.Password, 12);

                        var otp = between(100000, 999999);
                        sendEmail(`${req.body.Email}`, "Email Verification", `${otp}`);

                        var sessionstore = req.session;
                        sessionstore.FirstName = req.body.FirstName;
                        sessionstore.LastName = req.body.LastName;
                        sessionstore.Email = req.body.Email;
                        sessionstore.Password = hashedPassword;
                        sessionstore.Role = "Admin";
                        sessionstore.otp = otp;
                        sessionstore.save();

                        var response = { "message": "Otp Send", "status": `${HTTP.SUCCESS}` }
                        res.status(HTTP.SUCCESS).json(response);

                    } else {

                        var response = { "message": "Does Not Send Otp Due to Insufficient Data", "status": `${HTTP.BAD_REQUEST}` }
                        res.status(HTTP.BAD_REQUEST).json(response);

                    }

                } else {

                    const response = { "message": "Does Not Send Otp Due to User Exist", "status": HTTP.UNAUTHORIZED };
                    res.status(HTTP.UNAUTHORIZED).json(response); // status code

                }

            })

        } catch (err) {
            console.log(err);
            var response = { "message": `${err}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(response);
        }
    };

    static e = async (req, res) => {
        try {

            res.render("Login");

        } catch (err) {
            console.log(err);
            var a = { "message": `${err}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };

    static f = async (req, res) => {
        try {

            Tutorial.findAndCountAll({ where: { Email: req.body.Email } }).then(async data => {

                if (data.rows.length == 1) {

                    if (data.rows[0].Role == "Admin") {

                        var Passwordmatch = await bcrypt.compare(req.body.Password, data.rows[0].Password);

                        if (Passwordmatch) {

                            var signuptoken = await jwt.sign({ Email: req.body.Email }, SECRET_KEY);

                            var sessionstore = req.session;
                            sessionstore.userid = signuptoken;
                            sessionstore.save();

                            var message = { "message": "Data Load Successfully", "status": `${HTTP.SUCCESS}` }
                            res.status(HTTP.SUCCESS).json(message);

                        } else {
                            var a = { "message": "Wrong PassWord", "status": `${HTTP.UNAUTHORIZED}` }
                            res.status(HTTP.UNAUTHORIZED).json(a);
                        }

                    } else {

                        var a = { "message": "You are not allowed to login from here", "status": `${HTTP.NOT_ALLOWED}` }
                        res.status(HTTP.NOT_ALLOWED).json(a);

                    }

                } else {

                    var a = { "message": "Account Not Exist", "status": `${HTTP.NOT_FOUND}` }
                    res.status(HTTP.NOT_FOUND).json(a);

                }

            })

        } catch (err) {
            console.log(err);
            var a = { "message": `${err}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };

    static g = async (req, res) => {
        try {

            if (req.session) {

                res.render("DashBoard");

            } else {

                res.redirect('/Login');

            }

        } catch (err) {
            console.log(err);
            var a = { "message": `${err}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };

    static h = async (req, res) => {
        try {

            var a = {
                FirstName: req.session.FirstName,
                LastName: req.session.LastName,
                Email: req.session.Email,
                Password: req.session.Password,
                Role: req.session.Role,
                otp: req.session.otp,
            }

            res.render("Otp", { a });

        } catch (err) {
            console.log(err);
            var a = { "message": `${err}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };

    static i = async (req, res) => {
        try {

            if (req.body.FirstName && req.body.LastName && req.body.Email && req.body.Password && req.body.Role && req.body.otp) {

                if (req.body.otp == req.body.Bodyotp) {
                    
                    const data = {
                        FirstName: req.body.FirstName,
                        LastName: req.body.LastName,
                        Email: req.body.Email,
                        Password: req.body.Password,
                        Role: req.body.Role
                    };

                    await Tutorial.create(data)

                    var response = { "message": "Account Create Successfully", "status": `${HTTP.SUCCESS}` }
                    res.status(HTTP.SUCCESS).json(response);

                } else {


                    var response = { "message": "Wrong Otp", "status": `${HTTP.UNAUTHORIZED}` }
                    res.status(HTTP.UNAUTHORIZED).json(response);

                }

            } else {

                var response = { "message": "Wrong Otp", "status": `${HTTP.UNAUTHORIZED}` }
                res.status(HTTP.UNAUTHORIZED).json(response);

            }

        } catch (err) {
            console.log(err);
            var a = { "message": `${err}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };

}

module.exports = { class1 };

