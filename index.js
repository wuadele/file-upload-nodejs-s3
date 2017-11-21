const express = require("express");
const app = express();

const AWS = require('aws-sdk');
AWS.config.loadFromPath('config.json');

var s3 = new AWS.S3();

app.get("/", function(req, res) {
    res.status(200).send({ ok: "Success" });
});

app.post("/upload", function(req, res) {
    var myBucket = 'kt-ad-images'; // Your bucket
    var myKey = 'test'; // Your key name

    s3.putObject({
        Bucket: myBucket,
        Key: myKey,
        Body: 'Hello!'
    }, function(err, data) {
        if (err) {
            console.log(err);
            res.status(400).send({ error: "bad request" });
        } else {
            console.log("Successfully uploaded data to myBucket/myKey");
            res.status(200).send({ ok: "Success" });
        }
    });
});

app.listen(3000, function() {
    console.log("Server start on port 3000.");
});