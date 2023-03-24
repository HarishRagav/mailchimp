// jshint esversion : 6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { json } = require("body-parser");
const { post } = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
    app.post("/", function(req, res) {
        const firstName = req.body.first;
        const secondName = req.body.second;
        const email = req.body.mail;

        const composed = "first name :" + firstName + "; Second name :" + secondName + "; Mail Id :" + email + ".";
        console.log(composed);

        const data = {
            members: [{
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: secondName,
                }
            }]
        };
        const jsonData = JSON.stringify(data);

        const url = 'https://us18.api.mailchimp.com/3.0/lists/36762c7ae2';

        const option = {
            method: "POST",
            auth: "harish:499d92ed4f25316821695f0d9a76aab9-us18",
        }
        const request = https.request(url, option, function(response) {
            response.on("data", function(data) {
                console.log(JSON.parse(data));
            })
        })
        request.write(jsonData);
        request.end();

    })



}).listen(3000, function(response) {
    console.log("this port is currently working on the server 3000")
});